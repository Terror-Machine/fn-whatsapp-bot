#!/usr/bin/env node

const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');

function parseArgs(args) {
  const options = {
    method: 'GET',
    headers: {},
    data: null,
    cookie: null,
    proxy: null,
  };
  options.url = args[0];
  if (!options.url) {
    console.error('URL tidak diberikan!');
    process.exit(1);
  }
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    const value = args[i + 1];
    switch (arg) {
      case '--method':
      case '--metode':
        options.method = value.toUpperCase();
        i++;
        break;
      case '--headers':
        value.split(';').forEach(h => {
          const [key, ...val] = h.split(':');
          if (key && val.length > 0) options.headers[key.trim()] = val.join(':').trim();
        });
        i++;
        break;
      case '--data':
        try {
          options.data = JSON.parse(value);
        } catch (e) {
          console.error('Data JSON tidak valid:', e.message);
          process.exit(1);
        }
        i++;
        break;
      case '--cookie':
        options.headers['Cookie'] = value;
        i++;
        break;
      case '--proxy':
        try {
          const proxyUrl = new URL(value);
          options.proxy = {
            protocol: proxyUrl.protocol.replace(':', ''),
            host: proxyUrl.hostname,
            port: proxyUrl.port,
            auth: proxyUrl.username && proxyUrl.password ? {
              username: proxyUrl.username,
              password: proxyUrl.password
            } : undefined
          };
        } catch (e) {
          console.error('URL Proxy tidak valid:', e.message);
          process.exit(1);
        }
        i++;
        break;
    }
  }
  return options;
}

(async () => {
  const cliArgs = process.argv.slice(2);
  const options = parseArgs(cliArgs);
  try {
    const response = await axios({
      url: options.url,
      method: options.method,
      headers: options.headers,
      data: options.data,
      proxy: options.proxy,
      responseType: 'arraybuffer'
    });
    const contentType = response.headers['content-type'] || '';
    const responseDataBuffer = response.data;
    if (contentType.includes('application/json')) {
      try {
        const parsedJson = JSON.parse(responseDataBuffer.toString('utf-8'));
        console.log(JSON.stringify(parsedJson, null, 2));
      } catch {
        console.log(responseDataBuffer.toString('utf-8'));
      }
      return;
    }
    const isDirectDownload = contentType.startsWith('image/') || contentType.startsWith('audio/') || contentType.startsWith('video/') || contentType.startsWith('application/pdf') || contentType.startsWith('application/zip') || contentType.startsWith('application/octet-stream');
    if (isDirectDownload) {
      const tempDir = path.join(__dirname, '../sampah');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      let extension = path.extname(new URL(options.url).pathname).substring(1);
      if (!extension) {
        extension = contentType.split('/')[1].split(';')[0];
      }
      const tempFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${extension || 'tmp'}`;
      const tempFilePath = path.join(tempDir, tempFileName);
      fs.writeFileSync(tempFilePath, responseDataBuffer);
      console.log(`LOCAL_FILE::${tempFilePath}`);
      return;
    }
    if (contentType.includes('text/html')) {
      const pageContentString = responseDataBuffer.toString('utf-8');
      const $ = cheerio.load(pageContentString);
      const preTag = $('pre').first();
      if (preTag.length) {
        const jsonData = JSON.parse(preTag.text());
        console.log(JSON.stringify(jsonData, null, 2));
        return;
      }
      const mediaSelectors = ['video > source', 'audio > source', 'image > source'];
      for (const selector of mediaSelectors) {
        const element = $(selector).first();
        const src = element.attr('src');
        if (element.length && src) {
          const absoluteUrl = new URL(src, options.url).href;
          console.log(`MEDIA_URL::${absoluteUrl}`);
          return;
        }
      }
    }
    const plainText = responseDataBuffer.toString('utf-8');
    console.log(plainText);
  } catch (error) {
    if (error.response) {
      const errorData = Buffer.isBuffer(error.response.data) ? error.response.data.toString('utf-8') : JSON.stringify(error.response.data, null, 2);
      console.error(`Gagal dengan status: ${error.response.status}\n${errorData}`);
    } else if (error.request) {
      console.error('Tidak ada respons dari server:', error.message);
    } else {
      console.error('Terjadi error:', error.message);
    }
    process.exit(1);
  }
})();