const { chromium } = require('playwright');

describe('Browser update check', () => {
  let browser;

  beforeAll(async () => {
    // Launch the browser and navigate to the Google Chrome download page
    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.com/chrome/');
  });

  afterAll(async () => {
    // Close the browser after the test is complete
    await browser.close();
  });

  it('should detect if browser is up-to-date', async () => {
    // Click the "Check for update" button
    const page = await browser.newPage();
    await page.goto('chrome://settings/help');
    const checkForUpdateButton = await page.$('button:has-text("Check for update")');
    await checkForUpdateButton.click();

    // Wait for the "Update check complete" message to appear
    await page.waitForSelector('div:has-text("Update check complete")');

    // Check if the "Update check complete" message contains the text "up to date"
    const updateCheckMessage = await page.textContent('div:has-text("Update check complete")');
    expect(updateCheckMessage).toContain('up to date');
  });
});
