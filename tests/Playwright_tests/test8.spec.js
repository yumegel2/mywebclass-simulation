const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  const page1Promise = page.waitForEvent('popup');
  await page.locator('#privacyModal').getByRole('link', { name: 'Privacy Policy' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Agree', exact: true }).click();
  await page1.close();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();