const { create, decryptMedia } = require('@open-wa/wa-automate')
const { NotificationLanguage } = require('@open-wa/wa-automate/dist/api/model')
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
  args: [
    '--enable-features=NetworkService',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process',
    '--shm-size=3gb',
  ],
  sessionId: 'fnbots'
}
const runSession = async() => {
  create(confObj, {
    logConsole: true,
    logConsoleErrors: true,
    ignoreHTTPSErrors: true,
    trace: true
  })
    .then((client) => {
      client.onStateChanged((state) => {
        if (state === 'CONFLICT') client.forceRefocus()
      })
      client.onMessage((message) => {
        if (message.body === 'test') {
          client.sendText(message.from, 'tist');
        }
      })
    })
    .catch((err) => new Error(err))
}
runSession()