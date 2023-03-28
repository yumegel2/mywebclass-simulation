const { chromium } = require('playwright');

describe('Potential Improvements Check', () => {
  let browser;

  beforeAll(async () => {
    // Launch the browser and navigate to the page you want to test
    browser = await chromium.launch();
  });

  afterAll(async () => {
    // Close the browser after the test is complete
    await browser.close();
  });

  it('should check for potential improvements', async () => {
    const page = await browser.newPage();
    await page.goto('https://mywebpage.org');

    // Check if the page contains any images that could be optimized
    const largeImageElements = await page.$$('img');
    const largeImages = [];

    for (const img of largeImageElements) {
      const imgSrc = await img.getAttribute('src');
      const imgSize = await img.evaluate((el) => ({
        width: el.width,
        height: el.height
      }));
      if (imgSize.width > 1000 || imgSize.height > 1000) {
        largeImages.push({ src: imgSrc, size: imgSize });
      }
    }
    expect(largeImages.length).toBe(0);

    // Check if the page contains any unused CSS or JS files
    const pagePerformance = await page.evaluate(() => JSON.stringify(window.performance.getEntriesByType("resource")));
    const cssFiles = pagePerformance.filter((resource) => resource.initiatorType === "css");
    const jsFiles = pagePerformance.filter((resource) => resource.initiatorType === "script");

    const unusedCssFiles = [];
    for (const cssFile of cssFiles) {
      const cssFileSelector = `link[href="${cssFile.name}"]`;
      const isUsed = await page.$(cssFileSelector);
      if (!isUsed) {
        unusedCssFiles.push(cssFile.name);
      }
    }
    expect(unusedCssFiles.length).toBe(0);

    const unusedJsFiles = [];
    for (const jsFile of jsFiles) {
      const jsFileSelector = `script[src="${jsFile.name}"]`;
      const isUsed = await page.$(jsFileSelector);
      if (!isUsed) {
        unusedJsFiles.push(jsFile.name);
      }
    }
    expect(unusedJsFiles.length).toBe(0);
  });
});
