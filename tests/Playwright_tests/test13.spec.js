const { chromium } = require('playwright');

describe('Error Check', () => {
  let browser;

  beforeAll(async () => {
    // Launch the browser and navigate to the page you want to test
    browser = await chromium.launch();
  });

  afterAll(async () => {
    // Close the browser after the test is complete
    await browser.close();
  });

  it('should check for errors on the page', async () => {
    const page = await browser.newPage();
    await page.goto('https://mywebpage.org');

    // Check if there are any JavaScript errors on the page
    const jsErrors = await page.evaluate(() => {
      return window.jsErrors.map(error => error.message);
    });
    expect(jsErrors).toEqual([]);

    // Check if there are any network errors on the page
    const networkErrors = await page.evaluate(() => {
      return window.networkErrors.map(error => error.url);
    });
    expect(networkErrors).toEqual([]);
  });
});
