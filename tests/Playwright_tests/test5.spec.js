const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Agree', exact: true }).click();
  await page.getByRole('link', { name: 'MyWebClass.org' }).click();
  await page.getByRole('link', { name: 'Recent Articles' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('heading', { name: 'About Us' }).click();
  await page.getByRole('heading', { name: 'About Us' }).click();
  await page.getByRole('link', { name: 'Our Story' }).click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();