const { chromium } = require('playwright');
const lighthouse = require('lighthouse');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to the page you want to test
  await page.goto('https://mywebclass.org');

  // Run the Lighthouse audit on the page
  const { lhr } = await lighthouse(page.url(), {
    port: new URL(browser.wsEndpoint()).port,
    output: 'json',
    logLevel: 'info',
  });

  // Get the performance, accessibility, and other scores from the Lighthouse report
  const performanceScore = lhr.categories.performance.score;
  const accessibilityScore = lhr.categories.accessibility.score;
  const otherScores = lhr.categories.other.score;

  // Assert that the page meets certain requirements (in this example, a score of at least 0.9 for performance and accessibility, and at least 0.8 for other)
  expect(performanceScore).toBeGreaterThanOrEqual(0.9);
  expect(accessibilityScore).toBeGreaterThanOrEqual(0.9);
  expect(otherScores).toBeGreaterThanOrEqual(0.8);

  await browser.close();
})();
