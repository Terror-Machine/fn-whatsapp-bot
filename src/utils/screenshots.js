const { chromium, devices } = require('playwright');

async function screenshotWeb(targetUrl, options = {}) {
  if (!targetUrl) {
    return null;
  }
  const {
    device,
    fullPage = false,
    type = 'png',
    delay = 0,
    quality
  } = options;
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    let contextOptions = {};
    if (device && devices[device]) {
      contextOptions = { ...devices[device] };
    } else {
      contextOptions = {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        viewport: { width: 1280, height: 720 }
      };
    }
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 60000 });
    if (delay > 0) {
      await page.waitForTimeout(delay);
    }
    const buffer = await page.screenshot({
      path: undefined,
      type: type,
      quality: type === 'png' ? quality : undefined,
      fullPage: fullPage
    });
    return buffer;
  } catch (error) {
    console.error("Error:", error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
module.exports = {
  screenshotWeb
};