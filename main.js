const {
  create,
  decryptMedia
} = require('@open-wa/wa-automate')
const mime = require('mime-types');
const fs = require('fs-extra')
const ffmpeg = require('fluent-ffmpeg')
const process = require('process');
const request = require('request')
const sharp = require('sharp')
const { Readable, Writable } = require('stream')


//-----------------------process-----------------------//

const unhandledRejections = new Map();
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason);
})
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise);
})
process.on('Something went wrong', function (err) {
  console.log('Caught exception: ', err)
})
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
})

const convertSticker = function(shape, author, pack, mediaData, type) {
  return new Promise((resolve, reject) => {
    var upfile = "sticker." + type;
    var metadata = {
      "pack": pack,
      "author": author,
      "shape": shape,
      "api_key": "JDJiJDEwJGdmVUtWUHk4eldkYlBhcUJZLklRMHV2eHVUc2Z1M1hrOVZSN1N6eWZFeEN0aWloOUpNT2RX",
    };
    var url = "https://stickerman.org/api/convert";
    var boundary = "sticker";
    let data = "";
    for (var i in metadata) {
      if ({}.hasOwnProperty.call(metadata, i)) {
        data += "--" + boundary + "\r\n";
        data += "Content-Disposition: form-data; name=" + i + "; \r\n\r\n" + metadata[i] + "\r\n";
      }
    };
    data += "--" + boundary + "\r\n";
    data += "Content-Disposition: form-data; name=sticker; filename=" + upfile + "\r\n";
    data += "Content-Type:application/octet-stream\r\n\r\n";
    var payload = Buffer.concat([
      Buffer.from(data, "utf8"),
      new Buffer(mediaData, 'binary'),
      Buffer.from("\r\n--" + boundary + "--\r\n", "utf8"),
    ]);
    var options = {
      method: 'post',
      url: url,
      headers: {
        "Content-Type": "multipart/form-data; boundary=" + boundary
      },
      body: payload,
      encoding: null
    };
    request(options, function(error, response, body) {
      if (error) {
        reject(error)
      } else {
        resolve(body)
      }
    });
  });
};

const stickerPackID = "com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2";
const googleLink = "https://play.google.com/store/apps/details?id=com.marsconstd.stickermakerforwhatsapp";
const appleLink = "https://itunes.apple.com/app/sticker-maker-studio/id1443326857";


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createExif(packname, author) {
  const json = {
    "sticker-pack-id": stickerPackID,
    "sticker-pack-name": packname,
    "sticker-pack-publisher": author,
    "android-app-store-link": googleLink,
    "ios-app-store-link": appleLink
  };

  let length = JSON.stringify(json).length;
  const f = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
  const code = [
    0x00,
    0x00,
    0x16,
    0x00,
    0x00,
    0x00
  ];
  if (length > 256) {
    length = length - 256;
    code.unshift(0x01);
  } else {
    code.unshift(0x00);
  }
  const fff = Buffer.from(code);
  const ffff = Buffer.from(JSON.stringify(json));

  if (length < 16) {
    length = length.toString(16);
    length = "0" + length;
  } else {
    length = length.toString(16);
  }

  const ff = Buffer.from(length, "hex");
  const buffer = Buffer.concat([f, ff, fff, ffff]);
  await fs.writeFileSync('./image/p.exif', buffer, function(err) {
    if (err) return console.error(err);
  });
}

function modifExif(buffer, id, callback) {
  fs.writeFileSync('./image/' + id + '.webp', buffer)
  const {
    spawn
  } = require('child_process')
  spawn('webpmux', ['-set', 'exif', './image/p.exif', './image/' + id + '.webp', '-o', './image/' + id + '.webp'])
    .on('exit', () => {
      callback(fs.readFileSync('./image/' + id + '.webp', {
        encoding: 'base64'
      }))
      fs.unlink('./image/' + id + '.webp').then(() => {})
    })
}

function bufferToStream(buffer) {
  const readable = new Readable()
  readable._read = () => {}
  readable.push(buffer)
  readable.push(null)
  return readable
}

const modifWebp = (id, buffers) => new Promise((resolve) => {
  const stream = bufferToStream(buffers)
  const {
    spawn
  } = require('child_process')
  ffmpeg(stream)
  .inputFormat('mp4')
  .addOutputOptions("-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(150,ih)':force_original_aspect_ratio=decrease, fps=15, pad=150:150:-1:-1:color=white@0.0", '-lossless', '1', "-loop", "1", "-preset", "default", "-an", "-vsync", "0", "-s", "150:150")
  .save(`./image/${id}.webp`)
  .on('end', () => {
    stream.destroy()
    spawn('webpmux', ['-set', 'exif', './image/p.exif', './image/' + id + '.webp', '-o', './image/' + id + '.webp'])
    .on('exit', () => {
      let mediaData = (fs.readFileSync('./image/' + id + '.webp', {
        encoding: 'base64'
      }))
      fs.unlink('./image/' + id + '.webp').then(() => {})
      return resolve(mediaData)
    })
  })
})


//-----------------------process-----------------------//

const fnBots = (fn = new Client()) => {
  fn.onStateChanged(function (state) {
    if (state === "UNLAUNCHED") {
      fn.forceRefocus()
    }
    if (state === "UNPAIRED") {}
  });
  fn.onMessage(async(message) => {
    try {
      await bot(fn, message)
    } catch (error) {
      console.log(error.message)
    }
    fn.getAmountOfLoadedMessages()
      .then((x) => {
        if (x >= 4000) {
          fn.sendText('xxx@c.us', `Loaded message reach ${x}, cutting message cache...`)
          fn.cutMsgCache()
          fn.cutMsgCache()
          fn.cutMsgCache()
          fn.cutMsgCache()
          fn.cutMsgCache()
          fn.cutMsgCache()
        }
      })
  });
}

async function bot(fn, message) {
  const {
    type,
    t,
    caption,
    id,
    from,
    sender,
    isMedia,
    quotedMsg,
    quotedMsgObj,
    mimetype
  } = message
  let {
    body
  } = message
  body = (type == 'chat') ? body : ((type && caption)) ? caption : ''
  const ua = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
  let txt = body.toLowerCase()
  const arg = body.trim().substring(body.indexOf(' ') + 1)
  if (txt == "sticker") {
    const a = "created by: fnbots"
    const b = "fine ganteng banget"
    await createExif(a,b)
    await sleep(3000)
    await fn.reply(from, 'processing data, please wait', message.id)
    if (isMedia && mimetype == 'image/jpeg') {
      decryptMedia(message).then(mediaData => {
        sharp(mediaData).resize({
          width: 512,
          height: 512,
          fit: sharp.fit.contain,
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0
          }
        }).webp().toBuffer().then(buffer => {
          modifExif(buffer, id, (res) => {
            mediaData = res.toString('base64')
            fn.sendRawWebpAsSticker(from, mediaData)
          })
        })
      })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'image/jpeg') {
      decryptMedia(quotedMsg).then(mediaData => {
        sharp(mediaData).resize({
          width: 512,
          height: 512,
          fit: sharp.fit.contain,
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0
          }
        }).webp().toBuffer().then(buffer => {
          modifExif(buffer, id, (res) => {
            mediaData = res.toString('base64')
            fn.sendRawWebpAsSticker(from, mediaData)
          })
        })
      })
    } else if (isMedia && mimetype == 'image/gif') {
      const mediaData = await decryptMedia(message)
      if (Buffer.byteLength(mediaData) >= 6186598.4) return reply(`sizenya terlalu gede sayang, dd gakuat :( max 5,9mb`)
      modifWebp(id, mediaData).then(res => {
        fn.sendRawWebpAsSticker(from, res.toString('base64'), true).catch(() => reply('Maaf, kualitas tidak didukung untuk video tsb'))
      })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'image/gif') {
      const mediaData = await decryptMedia(quotedMsg)
      if (Buffer.byteLength(mediaData) >= 6186598.4) return reply(`sizenya terlalu gede sayang, dd gakuat :( max 5,9mb`)
      modifWebp(id, mediaData).then(res => {
        fn.sendRawWebpAsSticker(from, res.toString('base64'), true).catch(() => reply('Maaf, kualitas tidak didukung untuk video tsb'))
      })
    } else if (isMedia && mimetype == 'video/mp4') {
      const mediaData = await decryptMedia(message)
      if (Buffer.byteLength(mediaData) >= 6186598.4) return reply(`sizenya terlalu gede sayang, dd gakuat :( max 5,9mb`)
      modifWebp(id, mediaData).then(res => {
        fn.sendRawWebpAsSticker(from, res.toString('base64'), true).catch(() => reply('Maaf, kualitas tidak didukung untuk video tsb'))
      })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'video/mp4') {
      const mediaData = await decryptMedia(quotedMsg)
      if (Buffer.byteLength(mediaData) >= 6186598.4) return reply(`sizenya terlalu gede sayang, dd gakuat :( max 5,9mb`)
      modifWebp(id, mediaData).then(res => {
        fn.sendRawWebpAsSticker(from, res.toString('base64'), true).catch(() => reply('Maaf, kualitas tidak didukung untuk video tsb'))
      })
    }
  } else if (txt.startsWith("sticker")) {
    await fn.reply(from, 'processing data, please wait', message.id)
    const pack = arg.split('|')[0]
    const author = arg.split('|')[1]
    if (isMedia && mimetype == 'image/jpeg') {
      await createExif(pack,author)
      await sleep(5000)
      decryptMedia(message).then(mediaData => {
        sharp(mediaData).resize({
          width: 512,
          height: 512,
          fit: sharp.fit.contain,
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0
          }
        }).webp().toBuffer().then(buffer => {
          modifExif(buffer, id, (res) => {
            mediaData = res.toString('base64')
            fn.sendRawWebpAsSticker(from, mediaData)
          })
        })
      })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'image/jpeg') {
      await createExif(pack, author)
      await sleep(5000)
      decryptMedia(quotedMsg).then(mediaData => {
        sharp(mediaData).resize({
          width: 512,
          height: 512,
          fit: sharp.fit.contain,
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0
          }
        }).webp().toBuffer().then(buffer => {
          modifExif(buffer, id, (res) => {
            mediaData = res.toString('base64')
            fn.sendRawWebpAsSticker(from, mediaData)
          })
        })
      })
    } else if (isMedia && mimetype == 'image/gif') {
      const shape = ""
      const type = "gif"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => fn.sendRawWebpAsSticker(from, res.toString("base64")))
    } else if (quotedMsg && quotedMsgObj.mimetype == 'image/gif') {
      const shape = ""
      const type = "gif"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => fn.sendRawWebpAsSticker(from, res.toString("base64")))
    } else if (isMedia && mimetype == 'video/mp4') {
      const shape = ""
      const type = "mp4"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => fn.sendRawWebpAsSticker(from, res.toString("base64")))
    } else if (quotedMsg && quotedMsgObj.mimetype == 'video/mp4') {
      const shape = ""
      const type = "mp4"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => fn.sendRawWebpAsSticker(from, res.toString("base64")))
    }
  } else if (txt.startsWith("circlesticker")) {
    await fn.reply(from, 'processing data, please wait', message.id)
    const pack = arg.split('|')[0]
    const author = arg.split('|')[1]
    if (isMedia && mimetype == 'image/jpeg') {
      await createExif(pack,author)
      await sleep(5000)
      decryptMedia(message).then(mediaData => {
        sharp(mediaData).resize({
          width: 512,
          height: 512,
          fit: sharp.fit.contain,
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0
          }
        }).webp().toBuffer().then(buffer => {
          modifExif(buffer, id, (res) => {
            mediaData = res.toString('base64')
            fn.sendRawWebpAsSticker(from, mediaData)
          })
        })
      })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'image/jpeg') {
      await createExif(pack, author)
      await sleep(5000)
      decryptMedia(quotedMsg).then(mediaData => {
        sharp(mediaData).resize({
          width: 512,
          height: 512,
          fit: sharp.fit.contain,
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0
          }
        }).webp().toBuffer().then(buffer => {
          modifExif(buffer, id, (res) => {
            mediaData = res.toString('base64')
            fn.sendRawWebpAsSticker(from, mediaData)
          })
        })
      })
    } else if (isMedia && mimetype == 'image/gif') {
      const shape = "circle"
      const type = "gif"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => fn.sendRawWebpAsSticker(from, res.toString("base64")))
    } else if (quotedMsg && quotedMsgObj.mimetype == 'image/gif') {
      const shape = "circle"
      const type = "gif"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => fn.sendRawWebpAsSticker(from, res.toString("base64")))
    } else if (isMedia && mimetype == 'video/mp4') {
      const shape = "circle"
      const type = "mp4"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => fn.sendRawWebpAsSticker(from, res.toString("base64")))
    } else if (quotedMsg && quotedMsgObj.mimetype == 'video/mp4') {
      const shape = "circle"
      const type = "mp4"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => fn.sendRawWebpAsSticker(from, res.toString("base64")))
    }
  } else if (txt == "shutdown") {
    await fn.sendText(from, 'please check your screen')
    await fn.reply(from, 'try to logging off', id)
    await fn.sendTextWithMentions(from, `success @${sender.id} !`).then(async() => await fn.kill())
  } else if ((txt == "hi") || (txt == "halo") || (txt == "help") || (txt == "commands") || (txt == "menu") || (txt == "bot") || (txt == "cmd")) {
    let cp = "👋 hello, please send me a video, image, or gif and I'll turn it into a sticker!\n"
    cp += "📦 If you send a picture and then the shape is not a square, then I will change it to contain sticker!\n"
    cp += "🤡 if you send a video or a gif, then i will turn it into a circle sticker!\n"
    cp += "ℹ️ ps. You can change author name and sticker pack name if you send\n\n"
    cp += "        ```sticker``` *authorpack | packname*\n"
    cp += "        or\n"
    cp += "        ```circlesticker``` *authorpack | packname*\n"
    cp += "        or\n"
    cp += "        ```sticker```\n\n"
    cp += "ℹ️ PS. follow @wa.bot on instagram, if this bot gets banned, new number will be posted there :)\n"
    cp += "☕️ Buy me a coffee with ```donate``` to support this bot\n"
    fn.sendText(from, cp)
  } else if (txt == "donate") {
    let tx = 'OVO: 081286118629\n'
    tx += 'DANA: 081286118629\n'
    tx += 'GOPAY: 081286118629\n'
    tx += 'PULSA: 087780778896'
    fn.reply(message.from, tx, message.id)
  } 
}

const fnOpt = {
  sessionId: 'fnbots',
  useChrome: true,
  headless: true,
  qrRefreshS: 17,
  qrTimeout: 0,
  authTimeout: 0,
  autoRefresh: true,
  cacheEnabled: false,
  blockCrashLogs: true,
  restartOnCrash: fnBots,
  throwErrorOnTosBlock: false,
  killProcessOnBrowserClose: true,
  deleteSessionDataOnLogout: false,
  skipBrokenMethodsCheck: true,
  skipUpdateCheck: true,
  disableSpins: false,
  useStealth: true,
  logConsole: true,
  logConsoleErrors: true,
  trace: true
  /*,
  corsFix: true,
  blockAssets: true,
  ProxyServerCredentials: {
    protocol: 'SOCKS5',
    address: '104.225.142.233:1080',
  }*/
}
create(fnOpt)
  .then((fn) => fnBots(fn))
  .catch(e => console.log('[ERROR]', e.message))