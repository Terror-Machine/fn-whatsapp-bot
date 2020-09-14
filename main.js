const { create, decryptMedia } = require('@open-wa/wa-automate')
const { NotificationLanguage } = require('@open-wa/wa-automate/dist/api/model')
const mime = require('mime-types');
const fs = require('fs-extra')
const confObj = {
  executablePath: "/usr/bin/google-chrome-stable",
  headless: true,
  autoRefresh: true,
  qrRefreshS: 30,
  qrTimeout: 0,
  authTimeout: 0,
  cacheEnabled: false,
  blockCrashLogs: true,
  hostNotificationLang: NotificationLanguage.IDID,
  sessionId: 'fnbots'
}
const fnbot = async() => {
  create(confObj)
    .then((fn) => {
      fn.onStateChanged(function (state) {
        if (state === "UNLAUNCHED") {
          fn.forceRefocus()
        }
        if (state === "UNPAIRED") {
        }
      })
      fn.onMessage((message) => {
        bot(fn, message)
      })
    })
    .catch((err) => new Error(err))
}

async function bot(fn, message) {
  try {
    const { type, t, caption, id, from, sender, isMedia, mimetype } = message
    let { body } = message
    body = (type == 'chat') ? body : ((type && caption)) ? caption : ''
    let txt = body.toLowerCase()
    if (txt == "halo") {
      fn.sendText(from, 'loha')
    } else if (txt == "save") { // save your image/video/audio/file to your server
      if (mimetype) {
        const filename = `${t}.${mime.extension(mimetype)}`
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
        fs.writeFile(filename, mediaData, function(err) {
          if (err) {return console.log(err)}
          fn.sendText(from, 'The file was saved!');
        })
      }
    } else if (txt == "resend") { // resend your image/video/audio/file back
      if (mimetype) {
        const filename = `${t}.${mime.extension(mimetype)}`
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
        await fn.sendFile(from, imageBase64, filename, `You just sent me this ${type}`)
          .then(() => console.log(`success resend ${mimetype}`))
      }
    } else if (txt == "sticker") { // create sticker from your image
      if (isMedia && mimetype === 'image') {
        const mediaData = await decryptMedia(message);
        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
        await fn.sendImageAsSticker(from, imageBase64)
          .then(() => console.log(`success send sticker`))
      }
    } else if (txt == "tagme") { 
      fn.sendTextWithMentions(from, `why @${sender.id} ?`)
    } else if (txt == "replyme") { 
      fn.reply(from, `why?`, id)
    } else if (txt == "shutdown") {
      fn.sendText(from, 'please check your screen')
      fn.reply(from, 'try to logging off', id)
      fn.sendTextWithMentions(from, `success @${sender.id} !`)
      fn.kill()
    }
  } catch (err) {
    console.log(err)
  }
}

fnbot()
