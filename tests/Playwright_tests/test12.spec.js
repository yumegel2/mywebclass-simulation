const { chromium } = require('playwright');

describe('Contact Us Information Check', () => {
  let browser;

  beforeAll(async () => {
    // Launch the browser and navigate to the page you want to test
    browser = await chromium.launch();
  });

  afterAll(async () => {
    // Close the browser after the test is complete
    await browser.close();
  });

  it('should check if "Contact Us" information is missing', async () => {
    const page = await browser.newPage();
    await page.goto('https://localhost:3000');

    // Check if the "Contact Us" information is missing
    const contactUsElements = await page.$$('div:has-text("Contact Us")');
    expect(contactUsElements.length).toEqual(0);
  });
});
