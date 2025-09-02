const fs = require('fs-extra');
const path = require('path');
const axios = require("axios");
const AdmZip = require("adm-zip");
const uglify = require("uglify-js");
const beautify = require("js-beautify");

const FIXED_UGLIFY_OPTIONS = {
  compress: false,
  mangle: false,
  output: {
    indent_start: 0,
    indent_level: 0,
    quote_keys: false,
    ascii_only: false,
    inline_script: true,
    width: 80,
    max_line_len: Infinity,
    beautify: true,
    source_map: null,
    semicolons: true,
    comments: false,
    preserve_line: false
  },
  toplevel: true,
  keep_fnames: true
};

const FIXED_BEAUTIFY_OPTIONS = {
  indent_size: 2,
  indent_char: " ",
  eol: "\n",
  indent_level: 0,
  indent_with_tabs: false,
  preserve_newlines: false,
  max_preserve_newlines: 2,
  jslint_happy: false,
  space_after_anon_function: false,
  brace_style: "collapse,preserve-inline",
  keep_array_indentation: false,
  keep_function_indentation: false,
  space_before_conditional: true,
  break_chained_methods: false,
  eval_code: false,
  unescape_strings: false,
  wrap_line_length: 0,
  wrap_attributes: "auto",
  wrap_attributes_indent_size: 2,
  end_with_newline: false
};

class FileProcessor {
  constructor() {
    this.url = null;
    this.buffer = null;
    this.startTime = new Date();
    this.errorFiles = [];
    this.processedFiles = [];
    this.contentType = null;
    this.inputFileName = "file";
  }

  static async fromUrl(url) {
    const processor = new FileProcessor();
    processor.url = url;
    try {
      const urlParts = new URL(url);
      const pathParts = urlParts.pathname.split("/");
      processor.inputFileName = pathParts[pathParts.length - 1] || "file";
    } catch (e) {
      console.warn("Could not parse URL to get filename:", e.message);
    }
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      processor.buffer = Buffer.from(response.data);
      processor.contentType = response.headers["content-type"];
      if (processor.buffer.length / 1048576 > 15) {
        throw new Error("File size exceeds 15 MB limit");
      }
    } catch (error) {
      throw new Error(`Failed to fetch file from URL: ${error.message}`);
    }
    return processor;
  }

  static async fromPath(filePath) {
    const processor = new FileProcessor();
    processor.inputFileName = path.basename(filePath);
    try {
      processor.buffer = await fs.readFile(filePath);
      processor.contentType = processor.contentTypeToExtension(processor.inputFileName, true);
    } catch (error) {
      throw new Error(`Failed to read file from path: ${error.message}`);
    }
    return processor;
  }

  static fromText(textContent, inputName = 'text-input.js') {
    const processor = new FileProcessor();
    processor.inputFileName = inputName;
    processor.buffer = Buffer.from(textContent, 'utf8');
    processor.contentType = processor.contentTypeToExtension(processor.inputFileName, true);
    return processor;
  }

  determineFileType(fileName, explicitType) {
    if (explicitType) return explicitType.toLowerCase();
    const extension = fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase();
    switch (extension) {
      case "js": case "jsx": case "ts": case "tsx":
        return "js";
      case "html": case "htm":
        return "html";
      case "json":
        return "json";
      case "css":
        return "css";
      case "txt":
        return "txt";
      default:
        return "js";
    }
  }

  beautifyContent(content, fileType) {
    try {
      switch (fileType) {
        case "json": {
          const parsedJson = JSON.parse(content);
          return JSON.stringify(parsedJson, null, 2);
        }
        case "js": case "txt":
          return beautify.js(content, FIXED_BEAUTIFY_OPTIONS);
        case "html":
          return beautify.html(content, FIXED_BEAUTIFY_OPTIONS);
        case "css":
          return beautify.css(content, FIXED_BEAUTIFY_OPTIONS);
        default:
          console.warn(`Unsupported file type for beautification: ${fileType}, attempting JS beautifier.`);
          return beautify.js(content, FIXED_BEAUTIFY_OPTIONS);
      }
    } catch (error) {
      console.error(`Beautification error for type ${fileType}:`, error.message);
      throw new Error(`Failed to beautify content: ${error.message}`);
    }
  }

  async processZip(explicitFileTypeForEntries) {
    const zip = new AdmZip(this.buffer);
    const entries = zip.getEntries();
    const supportedExtensions = [".js", ".jsx", ".tsx", ".html", ".htm", ".css", ".txt"];
    await Promise.all(entries.map(async entry => {
      if (entry.isDirectory) return;
      const entryName = entry.entryName;
      const fileExtensionMatch = entryName.match(/\.([a-zA-Z0-9]+)$/);
      const fileExtension = fileExtensionMatch ? fileExtensionMatch[0].toLowerCase() : "";
      if (!supportedExtensions.includes(fileExtension)) {
        console.log(`Skipping unsupported file in ZIP: ${entryName}`);
        return;
      }
      try {
        const originalContent = entry.getData().toString("utf8");
        let processedCode;
        if ([".js", ".jsx", ".tsx"].includes(fileExtension)) {
          const uglifyResult = uglify.minify(originalContent, FIXED_UGLIFY_OPTIONS);
          if (uglifyResult.error) throw new Error(`UglifyJS failed: ${uglifyResult.error}`);
          processedCode = beautify.js(uglifyResult.code, FIXED_BEAUTIFY_OPTIONS);
        } else {
          const fileType = this.determineFileType(entryName, explicitFileTypeForEntries);
          processedCode = this.beautifyContent(originalContent, fileType);
        }
        zip.updateFile(entryName, Buffer.from(processedCode, "utf8"));
        this.processedFiles.push(entryName);
      } catch (e) {
        this.errorFiles.push(entryName);
        console.error(`Error processing ${entryName} in ZIP: ${e.message}`);
      }
    }));
    return zip.toBuffer();
  }

  async processSingleFile(explicitFileType) {
    try {
      const fileType = this.determineFileType(this.inputFileName, explicitFileType || this.contentTypeToExtension(this.contentType));
      const originalContent = this.buffer.toString("utf8");
      const processedContent = this.beautifyContent(originalContent, fileType);
      return Buffer.from(processedContent, "utf8");
    } catch (error) {
      throw new Error(`Error processing single file (${this.inputFileName}): ${error.message}`);
    }
  }

  contentTypeToExtension(fileNameOrContentType, returnMimeType = false) {
    const extMap = { js: 'application/javascript', html: 'text/html', css: 'text/css', txt: 'text/plain', jsx: 'application/javascript', ts: 'application/javascript', tsx: 'application/javascript', htm: 'text/html', json: 'application/json' };
    const mimeMap = { 'application/javascript': 'js', 'text/html': 'html', 'text/css': 'css', 'text/plain': 'txt', 'application/json': 'js' };
    if (fileNameOrContentType.includes('/')) {
      return mimeMap[fileNameOrContentType.split(';')[0]] || 'txt';
    } else {
      const extension = fileNameOrContentType.slice(fileNameOrContentType.lastIndexOf(".") + 1).toLowerCase();
      if (returnMimeType) {
        return extMap[extension] || 'text/plain';
      }
      return extMap[extension] ? extension : (extension || 'txt');
    }
  }

  getOutputFileName(originalName, processedType) {
    const nameParts = originalName.split(".");
    const originalExt = nameParts.length > 1 ? nameParts.pop() : "";
    const baseName = nameParts.join(".");
    return `beautified-${baseName || "file"}.${processedType || originalExt || "txt"}`;
  }

  getProcessSummary() {
    const timeElapsed = ((new Date() - this.startTime) / 1000).toFixed(2);
    return `Process completed in ${timeElapsed} seconds.\nProcessed files: ${this.processedFiles.length}\nFiles with errors: ${this.errorFiles.length}`;
  }
}

module.exports = FileProcessor;