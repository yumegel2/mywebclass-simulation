

const { chromium } = require('playwright');

test('Verify screen changes at 1000px width', async ({ page, browserName }) => {
  await page.goto('http://localhost:3000/');
  const initialViewportSize = page.viewportSize();

  await page.setViewportSize({ width: 1000, height: initialViewportSize.height });
  const isMobileViewport = await page.$eval('.navbar-brand', el => getComputedStyle(el).position === 'absolute');

  expect(isMobileViewport).toBeTruthy();

  await page.setViewportSize(initialViewportSize);
});