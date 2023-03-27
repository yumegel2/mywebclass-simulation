const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the page you want to test
  await page.goto('https://example.com');

  // Click the home button
  const homeButton = await page.$('#home-button');
  if (homeButton) {
    await homeButton.click();
  } else {
    // If the home button is not found, fail the test
    throw new Error('Home button not found');
  }

  // Wait for the page to load
  await page.waitForNavigation();

  // Get the URL of the current page
  const currentUrl = await page.url();

  // Assert that the URL matches the expected home page URL
  expect(currentUrl).toBe('https://example.com/home');

  await browser.close();
})();
