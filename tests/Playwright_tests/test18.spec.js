const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  await page.locator('#privacyModal').click();
  await page.getByRole('link', { name: '' }).click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();