const { create, decryptMedia } = require('@open-wa/wa-automate')
const { NotificationLanguage } = require('@open-wa/wa-automate/dist/api/model')
const mime = require('mime-types');
const fs = require('fs-extra')
const process = require('process');

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

//-----------------------process-----------------------//

const fnBots = (fn = new Client()) => {
  fn.onStateChanged(function(state) {
    if (state === "UNLAUNCHED") {
      fn.forceRefocus()
    }
    if (state === "UNPAIRED") {}
  });
  fn.onMessage(async(message) => {
    try {
      await bot(fn, message)
    } catch (e) {
      console.log(e.message)
    }
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
    mimetype
  } = message
  let {
    body
  } = message
  body = (type == 'chat') ? body : ((type && caption)) ? caption : ''
  const ua = "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
  let txt = body.toLowerCase()
  if (txt == "halo") {
    fn.sendText(from, 'loha')
  } else if (txt == "save") { // save your image/video/audio/file to your server
    if (mimetype) {
      const filename = `${t}.${mime.extension(mimetype)}`
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
      fs.writeFile(filename, mediaData, function(err) {
        if (err) {
          return console.log(err)
        }
        fn.sendText(from, 'The file was saved!');
      })
    }
  } else if (txt == "resend") { // resend your image/video/audio/file back
    if (mimetype) {
      const filename = `${t}.${mime.extension(mimetype)}`
      const mediaData = await decryptMedia(message, ua);
      const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
      await fn.sendFile(from, imageBase64, filename, `You just sent me this ${type}`).then(() => console.log(`success resend ${mimetype}`))
    }
  } else if (txt == "sticker") { // create sticker from your image
    if (mimetype) {
      const mediaData = await decryptMedia(message, ua);
      const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
      await fn.sendImageAsSticker(from, imageBase64).then(() => console.log(`success send sticker`))
    }
  } else if (txt == "tagme") {
    fn.sendTextWithMentions(from, `why @${sender.id} ?`)
  } else if (txt == "replyme") {
    fn.reply(from, `why?`, id)
  } else if (txt == "shutdown") {
    await fn.sendText(from, 'please check your screen')
    await fn.reply(from, 'try to logging off', id)
    await fn.sendTextWithMentions(from, `success @${sender.id} !`).then(async() => await fn.kill())
  }
}

const fnOpt = {
  sessionId: 'fnbots',
  useChrome: true,
  headless: true,
  autoRefresh: true,
  qrRefreshS: 60,
  qrTimeout: 0,
  authTimeout: 0,
  cacheEnabled: false,
  blockCrashLogs: true,
  restartOnCrash: fnBots,
  throwErrorOnTosBlock: false,
  killProcessOnBrowserClose: true,
  disableSpins: false,
  trace: true
}
create(fnOpt)
  .then((fn) => fnBots(fn))
  .catch(e => console.log('[ERROR]', e.message))
