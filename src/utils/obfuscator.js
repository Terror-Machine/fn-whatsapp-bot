const JavaScriptObfuscator = require("javascript-obfuscator");
const axios = require("axios");

class ObfsMgr {
  constructor() {
    this.opt = {
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      disableConsoleOutput: false,
      identifierNamesGenerator: "hexadecimal",
      log: false,
      renameProperties: false,
      selfDefending: false,
      splitStrings: true,
      splitStringsChunkLength: 5,
      stringArray: true,
      stringArrayEncoding: ["base64"],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 3,
      stringArrayWrappersType: "variable",
      transformObjectKeys: true,
      unicodeEscapeSequence: false,
      identifiersPrefix: "",
    };
  }

  _rUni(len = 3) {
    let r = "";
    for (let i = 0; i < len; i++) {
      r += String.fromCharCode(19968 + Math.floor(Math.random() * (40959 - 19968 + 1)));
    }
    return r;
  }

  _sId(str) {
    return str.replace(/[^a-zA-Z0-9_]/g, "_").replace(/_+/g, "_");
  }

  _sH(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0;
    }
    return h;
  }

  _gOpts(lvl, pfx = "") {
    const opts = { ...this.opt };
    opts.identifiersPrefix = pfx;
    const levelNormalized = lvl.toLowerCase();
    switch (levelNormalized) {
      case "low":
        Object.assign(opts, {
          controlFlowFlattening: false,
          deadCodeInjection: false,
          stringArray: true,
          stringArrayEncoding: ["none"],
          identifierNamesGenerator: "mangled",
        });
        break;
      case "medium":
        Object.assign(opts, {
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.5,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.3,
          stringArray: true,
          stringArrayEncoding: ["base64"],
          identifierNamesGenerator: "hexadecimal",
        });
        break;
      case "high":
        Object.assign(opts, {
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.9,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.9,
          selfDefending: true,
          stringArray: true,
          stringArrayEncoding: ["base64", "rc4"],
          stringArrayWrappersCount: 5,
          stringArrayWrappersType: "function",
          transformObjectKeys: true,
        });
        break;
      case "extreme":
        Object.assign(opts, {
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 1,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 1,
          renameProperties: true,
          selfDefending: true,
          stringArray: true,
          stringArrayEncoding: ["base64", "rc4"],
          stringArrayWrappersCount: 10,
          stringArrayWrappersType: "function",
          transformObjectKeys: true,
        });
        break;
      default:
        Object.assign(opts, {
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.5,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.3,
          stringArray: true,
          stringArrayEncoding: ["base64"],
          identifierNamesGenerator: "hexadecimal",
        });
        break;
    }
    return opts;
  }

  async obfs({ code, level = "low", pass = "DEFAULT_PASSWORD", encoding = "rc4" }) {
    let actualCode = code;
    if (typeof code === "string" && code.startsWith("https://")) {
      try {
        const response = await axios.get(code, {
          headers: {
            Accept: "text/plain, application/javascript, application/json",
          },
          validateStatus: (status) => status >= 200 && status < 300,
        });

        const contentType = response.headers["content-type"];
        if (!contentType || (!contentType.includes("text/") && !contentType.includes("application/javascript") && !contentType.includes("application/json"))) {
          throw new Error(`Invalid Content-Type for ${code}: '${contentType}'. Expected a JavaScript or text file.`);
        }
        actualCode = response.data;
      } catch (error) {
        console.error(`Error fetching code from URL: ${code}`, error.message);
        throw new Error(`Failed to fetch code from URL: ${error.message}`);
      }
    }

    const effEnc = "CODE_OBFUSCATED_BY_" + pass;
    const now = new Date();
    const datePart = now.toLocaleDateString("en-CA").replace(/-/g, "");
    const timePart = now.toLocaleTimeString("en-GB").replace(/:/g, "");
    const dayPart = now.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();

    const sTagMsg = this._sId(effEnc);
    const fullTagMsg = `${sTagMsg}_${datePart}_${timePart}_${dayPart}_FNBOTS`;

    const pfxSEffEnc = this._sId(effEnc);
    const tsHash = Math.abs(this._sH(`${datePart}${timePart}`)).toString(36).substring(0, 5).toUpperCase();
    const hPart = Math.abs(this._sH(effEnc)).toString(36).substring(0, 5).toUpperCase();
    const rHex = Math.floor(Math.random() * 65535).toString(16).toUpperCase();
    let bPfx = `${this._rUni(2)}${tsHash}_${pfxSEffEnc}_${dayPart}`;

    let pfx = "";
    switch (level.toLowerCase()) {
      case "low": pfx = `${bPfx}_L_${rHex}_`; break;
      case "medium": pfx = `${bPfx}_M_${hPart}_${rHex}_`; break;
      case "high": pfx = `${bPfx}_H_${hPart}${rHex}_${this._rUni(1)}${pfxSEffEnc}_`; break;
      case "extreme": pfx = `${bPfx}_X_${hPart}${tsHash}_${now.getFullYear()}${this._rUni(2)}${pfxSEffEnc}_${rHex}_`; break;
      default: pfx = `${bPfx}_D_${rHex}_`; break;
    }

    const opts = this._gOpts(level, pfx);
    opts.unicodeEscapeSequence = true;

    if (encoding !== null) {
      opts.stringArrayEncoding = Array.isArray(encoding) ? encoding : [encoding];
    }

    let iCode = "";
    const visObfTagStrLit = JSON.stringify(fullTagMsg);

    const passStrLit = JSON.stringify(pass);
    iCode = `console.log("Obfuscated System Initialized. ID: " + ${visObfTagStrLit} + ". Original Tag: " + ${passStrLit});`;

    const fCode = iCode + "\n\n" + actualCode;

    try {
      const obfuscationResult = JavaScriptObfuscator.obfuscate(fCode, opts);
      return obfuscationResult.getObfuscatedCode();
    } catch (error) {
      console.error("Obfuscation failed:", error.message);
      console.error("Obfuscation might fail due to syntax errors in the source code or incompatible obfuscation options.");
      throw error;
    }
  }
}

module.exports = ObfsMgr;