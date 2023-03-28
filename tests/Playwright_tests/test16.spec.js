const { chromium } = require('playwright');

describe('Privacy Statement Check', () => {
  let browser;

  beforeAll(async () => {
    // Launch the browser and navigate to the page you want to test
    browser = await chromium.launch();
  });

  afterAll(async () => {
    // Close the browser after the test is complete
    await browser.close();
  });

  it('should check if privacy statement was closed without selection', async () => {
    const page = await browser.newPage();
    await page.goto('https://mywebpage.org');

    // Click on the privacy statement button to show the statement
    const privacyButton = await page.$('#privacy-button');
    await privacyButton.click();

    // Wait for the privacy statement to appear
    await page.waitForSelector('#privacy-statement');

    // Close the privacy statement without making a selection
    const closeButton = await page.$('#close-button');
    await closeButton.click();

    // Check if the privacy statement is closed
    const privacyStatement = await page.$('#privacy-statement');
    expect(privacyStatement).toBeNull();
  });
});
