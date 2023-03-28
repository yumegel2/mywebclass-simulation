const { test, expect } = require('@playwright/test');

test('Page should have a section header for contacting us', async ({ page }) => {
  await page.goto('localhost:3000/privacy.html');
  const header = await page.$eval('h5', h5 => h5.innerText);
  expect(header).toBe('Contact Us');
});