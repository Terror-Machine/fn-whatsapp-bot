const {
  decryptMedia,
  create,
  vf
} = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const text2png = require('text2png');
const ffmpeg = require('fluent-ffmpeg')
const exec = require('child_process').exec;
const crypto = require('crypto')
const hxz = require("hxz-api")
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const FormData = require('form-data')
const process = require('process')
const spawn = require('child_process').exec
const pukimak = "pm2 restart main"
let { instagramdl, instagramdlv2 } = require('@bochilteam/scraper')

function os_spawn() {
  this.execCommand = function(txt) {
    return new Promise((resolve, reject) => {
      spawn(txt, (error, stdout, stderr) => {
        if (error) {
          reject(error)
          return;
        }
        resolve(stdout)
      })
    })
  }
}

const unhandledRejections = new Map()
process.on('unhandledRejection', (reason, promise) => {
  unhandledRejections.set(promise, reason)
})
process.on('rejectionHandled', (promise) => {
  unhandledRejections.delete(promise)
})
process.on('Something went wrong', function(err) {
  console.log('Caught exception: ', err)
})
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason)
  var xsa = new os_spawn()
  xsa.execCommand(pukimak).then(res => {}).catch(err => {
    console.log(err)
  })
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fnBots = async(fn = new fn()) => {
  fn.onStateChanged((state) => {
    console.log(color('-> [STATE]'), state)
    if (state === 'CONFLICT') fn.forceRefocus()
    if (state === 'UNPAIRED') fn.forceRefocus()
  })
  fn.onMessage(async(message) => {
    try {
      await bot(fn, message)
    } catch (error) {
      console.log(error.message)
    }
  });
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function addExif(webpSticker, packname, author, categories = [''], extra = {}) {
  const webp = require('node-webpmux') // Optional Feature
  const img = new webp.Image();
  const stickerPackId = crypto.randomBytes(32).toString('hex');
  const json = { 'sticker-pack-id': stickerPackId, 'sticker-pack-name': 'FNBOTS', 'sticker-pack-publisher': 'FN', 'emojis': categories, ...extra };
  let exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
  let jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
  let exif = Buffer.concat([exifAttr, jsonBuffer]);
  exif.writeUIntLE(jsonBuffer.length, 14, 4);
  await img.load(webpSticker)
  img.exif = exif
  return await img.save(null)
}

async function twitter(url) {
  if (!/http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/i) throw 'Link invalid!'
  let form = new FormData()
  form.append('url', encodeURI(url))
  form.append('submit', '')
  let res = await fetch('https://www.expertsphp.com/instagram-reels-downloader.php', {
    method: 'POST',
    headers: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'cookie': '_ga=GA1.2.783835709.1637038175; _gid=GA1.2.880188214.1637038175; __gads=ID=5b4991618655cd86-22e2c7aeadce00ae:T=1637038176:RT=1637038176:S=ALNI_MaCe3McPrVVswzBEqcQlgnVZXtZ1g',
      'origin': 'https://www.expertsphp.com',
      'referer': 'https://www.expertsphp.com/twitter-video-downloader.html',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      ...form.getHeaders()
    },
    body: form
  })
  let html = await res.text()
  const $ = cheerio.load(html)
  let thumbnail = $('#showdata > img').attr('src')
  let result = []
  $('#showdata > div > table > tbody > tr').each(function () {
    result.push({
      link: $(this).find('td:nth-child(1) > a').attr('href'),
      mime: $(this).find('td:nth-child(2) > strong').text()
    })
  })
  let name = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/g
  name = [...url.matchAll(name)][0][1]
  return {
    name,
    thumbnail,
    result
  }
}

async function shortlink(url) {
  isurl = /https?:\/\//.test(url)
  return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''
}

async function bot(fn, message) {
  try {
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
      mimetype,
      fromMe
    } = message
    let { body } = message
    body = (type == 'chat') ? body : ((type && caption)) ? caption : ''
    let txt = body.toLowerCase()
    const args = body.slice('').trim().split(/ +/).slice(1) || body.slice('').trim().split(/ +/).slice(1)
    const arg = body.trim().substring(body.indexOf(' ') + 1)
    if (type == 'chat') {
      if (!(fromMe)) {
        if (txt.match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) {
          const results = await instagramdl(body).catch(async _ => await instagramdlv2(body))
          for (const {
              url
            }
            of results) await fn.sendFileFromUrl(from, url, 'google.mp4', '')
        }
        if (txt.includes('tiktok.com')) {
          let p = await hxz.ttdownloader(body)
          const {
            nowm,
            wm,
            audio
          } = p
          fn.sendFile(from, nowm, 'tiktok.mp4', ``)
        }
        if (txt.includes('twitter.com')) {
          let res = await twitter(body)
          let result = res.result.reverse().filter(({
              mime
            }) => /video/i.test(mime)),
            video, index
          for (let vid of result) {
            try {
              // video = await (await fetch(vid.link)).buffer()
              video = vid.link
              index = result.indexOf(vid)
              break
            } catch (e) {
              err = e
              continue
            }
          }
          if (!video) throw 'Can\'t get video/image'
          let ress = result[index]
          fn.sendFile(from, video, 'twitter' + /video/.test(ress.mime) ? '.mp4' : '.png')
        }
      }
    }
    if (isMedia) {
      if (mimetype == 'image/jpeg') {
        const mediaData = await decryptMedia(message)
        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
        await fn.sendImageAsSticker(from, imageBase64, {
          discord: "568919637366931460",
          author: 'FN',
          keepScale: true,
          pack: 'FNBots'
        })
      } else
      if (mimetype == 'image/gif') {
        const mediaData = await decryptMedia(message)
        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
        await fn.sendMp4AsSticker(from, videoBase64, {
          fps: 10,
          startTime: '00:00:00.0',
          endTime: '00:00:05.0',
          loop: 0,
          crop: false
        }, {
          discord: "568919637366931460",
          author: 'FN',
          keepScale: true,
          pack: 'FNBots'
        })
      } else
      if (mimetype == 'video/mp4') {
        const mediaData = await decryptMedia(message)
        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
        await fn.sendMp4AsSticker(from, videoBase64, {
          fps: 10,
          startTime: '00:00:00.0',
          endTime: '00:00:05.0',
          loop: 0,
          crop: false
        }, {
          discord: "568919637366931460",
          author: 'FN',
          keepScale: true,
          pack: 'FNBots'
        })
      }
    }

    if ((txt == "hi") || (txt == "halo") || (txt == "help") || (txt == "commands") || (txt == "menu") || (txt == "bot") || (txt == "cmd")) {
      let cp = "👋 hello, please send me a video, image, or gif and I'll turn it into a sticker!\n"
      cp += "📦 If you send a picture and then the shape is not a square, then I will change it to contain sticker!\n"
      cp += "🤡 if you send a video or a gif, then i will turn it into a animated sticker!\n"
      cp += "☕️ Buy me a coffee with ```donate``` to support this bot\n"
      cp += "PS. follow @fnbots on instagram, if this bot gets banned, new number will be posted there :)"
      fn.reply(from, cp, id, true)
    } else if (txt == "donate") {
      let tx = 'OVO: 081286118629\n'
      tx += 'DANA: 081286118629\n'
      tx += 'GOPAY: 081286118629\n'
      tx += 'PULSA: 081286118629'
      fn.reply(message.from, tx, message.id, true)
    } else if ((body || '').startsWith('attp ') || (txt == "attp")) {
      if (quotedMsg) {
        if (quotedMsgObj.type === 'chat') {
          if (quotedMsg.body.length >= 100) return
          text = quotedMsg.body
          const animated = (text) => new Promise((resolve, reject) => {
            try {
              canvasx('white', 0, text)
              canvasx('lime', 1, text)
              canvasx('red', 2, text)
              canvasx('blue', 3, text)
              canvasx('yellow', 4, text)
              canvasx('aqua', 5, text)
              canvasx('purple', 6, text)
              exec('convert -delay 20 -loop 0 ./src/frames/*.png -scale 512x512 ./src/ttp.gif', (error, stdout, stderr) => {
                if (error) rejects(error)
                ffmpeg("./src/ttp.gif")
                  .on('error', function (err) {
                    console.error(err)
                  })
                  .on('end', async function () {
                    resolve(await addExif('./src/ttpw.webp', '', ''))
                  })
                  .toFormat('webp')
                  .save('./src/ttpw.webp')
              })
            } catch (error) {
              return reject(error)
            }
          })

          function canvasx(color, i, text) {
            fs.writeFileSync('./src/frames/frame' + i + '.png', text2png(wordWrap(text, 15), randomChoice([{
              font: '400px Bangers',
              localFontPath: './src/Bangers.ttf',
              localFontName: 'Bangers',
              color: color,
              strokeWidth: 12,
              strokeColor: 'black',
              textAlign: 'center',
              lineSpacing: 30,
              padding: 300,
              backgroundColor: 'transparent'
            }])))
          }

          function wordWrap(str, maxWidth) {
            var newLineStr = "\n";
            done = false;
            res = '';
            while (str.length > maxWidth) {
              found = false;
              for (i = maxWidth - 1; i >= 0; i--) {
                if (testWhite(str.charAt(i))) {
                  res = res + [str.slice(0, i), newLineStr].join('')
                  str = str.slice(i + 1)
                  found = true;
                  break;
                }
              }
              if (!found) {
                res += [str.slice(0, maxWidth), newLineStr].join('')
                str = str.slice(maxWidth)
              }
            }
            return res + str;
          }

          function testWhite(x) {
            var white = new RegExp(/^\s$/)
            return white.test(x.charAt(0))
          }
          animated(text).then((res) => {
            fn.sendRawWebpAsSticker(from, res.toString('base64'))
          })
        }
      } else {
        if (args.length === 0) return
        if (arg.length >= 100) return
        const text = arg
        const animated = (text) => new Promise((resolve, reject) => {
          try {
            canvasx('white', 0, text)
            canvasx('lime', 1, text)
            canvasx('red', 2, text)
            canvasx('blue', 3, text)
            canvasx('yellow', 4, text)
            canvasx('aqua', 5, text)
            canvasx('purple', 6, text)
            exec('convert -delay 20 -loop 0 ./src/frames/*.png -scale 512x512 ./src/ttp.gif', (error, stdout, stderr) => {
              if (error) rejects(error)
              ffmpeg("./src/ttp.gif")
                .on('error', function (err) {
                  console.error(err)
                })
                .on('end', async function () {
                  resolve(await addExif('./src/ttpw.webp', '', ''))
                })
                .toFormat('webp')
                .save('./src/ttpw.webp')
            })
          } catch (error) {
            return reject(error)
          }
        })

        function canvasx(color, i, text) {
          fs.writeFileSync('./src/frames/frame' + i + '.png', text2png(wordWrap(text, 15), randomChoice([{
            font: '400px Bangers',
            localFontPath: './src/Bangers.ttf',
            localFontName: 'Bangers',
            color: color,
            strokeWidth: 12,
            strokeColor: 'black',
            textAlign: 'center',
            lineSpacing: 30,
            padding: 300,
            backgroundColor: 'transparent'
          }])))
        }

        function wordWrap(str, maxWidth) {
          var newLineStr = "\n";
          done = false;
          res = '';
          while (str.length > maxWidth) {
            found = false;
            for (i = maxWidth - 1; i >= 0; i--) {
              if (testWhite(str.charAt(i))) {
                res = res + [str.slice(0, i), newLineStr].join('')
                str = str.slice(i + 1)
                found = true;
                break;
              }
            }
            if (!found) {
              res += [str.slice(0, maxWidth), newLineStr].join('')
              str = str.slice(maxWidth)
            }
          }
          return res + str;
        }

        function testWhite(x) {
          var white = new RegExp(/^\s$/)
          return white.test(x.charAt(0))
        }
        animated(text).then((res) => {
          fn.sendRawWebpAsSticker(from, res.toString('base64'))
        })
      }
    }
  } catch (err) {
    console.log('[ERROR]', err)
    fn.sendText(message.chatId, err)
  }
}

const fnOpt = {
  sessionId: 'fnbots',
  multiDevice: true,
  headless: true,
  qrTimeout: 60,
  authTimeout: 0,
  cacheEnabled: false,
  useChrome: true,
  killProcessOnBrowserClose: true,
  throwErrorOnTosBlock: false,
  chromiumArgs: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--aggressive-cache-discard',
    '--disable-cache',
    '--disable-application-cache',
    '--disable-offline-load-stale-cache',
    '--disk-cache-size=0'
  ]
}
create(fnOpt)
  .then((fn) => fnBots(fn))
  .catch(e => {
    console.log('[ERROR]', e)
    var xsa = new os_spawn()
    xsa.execCommand(pukimak).catch(err => {
      console.log("os >>>", err)
    })
  })
