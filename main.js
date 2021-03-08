const {
  Client,
  create,
  decryptMedia
} = require('@open-wa/wa-automate')
const process = require('process')
const spawn = require('child_process').exec
const pukimak = "pm2 restart main"


//-----------------------process-----------------------//

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
  let txt = body.toLowerCase()
  if (isMedia) {
    if (mimetype == 'image/jpeg') {
      const mediaData = await decryptMedia(message)
      const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
      await fn.sendImageAsSticker(from, imageBase64, {discord: "568919637366931460", author: 'FN', keepScale: true, pack: 'FNBots'})
    } else
    if (mimetype == 'image/gif') {
      const mediaData = await decryptMedia(message)
      const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
      await fn.sendMp4AsSticker(from, videoBase64, {fps: 10, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0, crop: false}, {discord: "568919637366931460", author: 'FN', keepScale: true, pack: 'FNBots'})
    } else
    if (mimetype == 'video/mp4') {
      const mediaData = await decryptMedia(message)
      const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
      await fn.sendMp4AsSticker(from, videoBase64, {fps: 10, startTime: '00:00:00.0', endTime : '00:00:05.0', loop: 0, crop: false}, {discord: "568919637366931460", author: 'FN', keepScale: true, pack: 'FNBots'})
    }
  }
  
  if ((txt == "hi") || (txt == "halo") || (txt == "help") || (txt == "commands") || (txt == "menu") || (txt == "bot") || (txt == "cmd")) {
    let cp = "👋 hello, please send me a video, image, or gif and I'll turn it into a sticker!\n"
    cp += "📦 If you send a picture and then the shape is not a square, then I will change it to contain sticker!\n"
    cp += "🤡 if you send a video or a gif, then i will turn it into a animated sticker!\n"
    cp += "☕️ Buy me a coffee with ```donate``` to support this bot\n"
    cp += "PS. follow @wa.bot on instagram, if this bot gets banned, new number will be posted there :)"
    fn.reply(from, cp, id, true)
  } else if (txt == "donate") {
    let tx = 'OVO: 081286118629\n'
    tx += 'DANA: 081286118629\n'
    tx += 'GOPAY: 081286118629\n'
    tx += 'PULSA: 087780778896'
    fn.reply(message.from, tx, message.id, true)
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
}
create(fnOpt)
  .then((fn) => fnBots(fn))
  .catch(e => console.log('[ERROR]', e))
