const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Agree', exact: true }).click();
  await page.locator('.modal-backdrop').click();
  await page.getByText('The New Era of Learning Transform your teaching and enhance your students\' learn').click();
  await page.getByRole('button', { name: 'Start Here' }).click();
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('Who@where.com?');
  await page.getByRole('button', { name: 'Subscribe' }).click({
    clickCount: 3
  });
  await page.getByRole('link', { name: 'Our Story' }).click();
  await page.getByRole('heading', { name: 'Mission' }).click();
  await page.getByText('Our Story Privacy Policy').click();
  await page.getByText('Navigation Privacy Policy By Karla Izquierdo Last Updated: March 24, 2023 3 min ').click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();