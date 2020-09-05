const { create, decryptMedia } = require('@open-wa/wa-automate')
const { NotificationLanguage } = require('@open-wa/wa-automate/dist/api/model')
const confObj = {
    authTimeout: 0,
    autoRefresh: true,
    blockCrashLogs: true,
    cacheEnabled: false,
    disableSpins: true,
    executablePath:'/usr/bin/google-chrome-stable',
    hostNotificationLang: NotificationLanguage.IDID,
    headless: true,
    killProcessOnBrowserClose: true,
    qrRefreshS: 20,
    qrTimeout: 0,
    safeMode: true,
    useChrome: true
}
const runSession = async() => {
    create('fnbots', confObj)
        .then((client) => {
            client.onStateChanged((state) => {
                if (state === 'CONFLICT') client.forceRefocus()
            })
            client.onMessage((message) => {
                msgHandler(client, message)
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
runSession()