const { chromium } = require('playwright');

/*
 *
 * Menggunakan Playwright untuk membuka URL Instagram dan menyadap (intercept) 
 * permintaan jaringan untuk menemukan doc_id, app_id, dan asbd_id.
 * @param {string} targetUrl - URL lengkap dari Post atau Reel Instagram.
 * @returns {Promise<object>} Sebuah objek berisi ID yang ditemukan.
 * 
*/

async function instagramGetIds(targetUrl) {
  if (!targetUrl) {
    throw new Error("URL target tidak diberikan.");
  }
  console.log(`Memulai browser untuk membuka: ${targetUrl}`);
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();
    const foundData = {
      docIds: new Set(),
      appIds: new Set(),
      asbdIds: new Set()
    };
    page.on('request', request => {
      const url = request.url();
      const headers = request.headers();
      if (url.includes('/graphql/query')) {
        const urlObj = new URL(url);
        const doc_id = urlObj.searchParams.get('doc_id');
        if (doc_id) {
          foundData.docIds.add(doc_id);
        }
      }
      if (headers['x-ig-app-id']) {
        foundData.appIds.add(headers['x-ig-app-id']);
      }
      if (headers['x-asbd-id']) {
        foundData.asbdIds.add(headers['x-asbd-id']);
      }
    });
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 60000 });
    console.log("Halaman selesai dimuat, data telah ditangkap.");
    return {
      success: true,
      doc_ids: [...foundData.docIds],
      app_ids: [...foundData.appIds],
      asbd_ids: [...foundData.asbdIds]
    };
  } catch (error) {
    console.error("Terjadi kesalahan saat proses Playwright:", error);
    throw new Error(`Gagal mengambil data dari URL: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
      console.log("Browser telah ditutup.");
    }
  }
}
module.exports = {
  instagramGetIds
};