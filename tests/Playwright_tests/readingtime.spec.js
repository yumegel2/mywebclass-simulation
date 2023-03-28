const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the page you want to test
  await page.goto('https://localhost:3000/');

  // Check if the reading time is displayed on the page
  const readingTime = await page.$('#reading-time');
  if (readingTime) {
    // Get the text content of the reading time element
    const readingTimeText = await readingTime.innerText();

    // Check if the text content of the reading time element is a valid time format (e.g. "5 mins read")
    const timeRegex = /^\d+ min(s)? read$/;
    const isTimeValid = timeRegex.test(readingTimeText);

    // Assert that the reading time is correctly displayed on the page
    expect(isTimeValid).toBeTruthy();
  }

  await browser.close();
})();
