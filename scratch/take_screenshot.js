const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set to mobile viewport (iPhone 12 dimensions: 390x844)
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  
  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  
  const artifactDir = '/Users/mac/.gemini/antigravity/brain/05b84444-9bf5-47c7-86b2-d1717e651278';
  
  // Take screenshot of the top section (Hero/Announcement)
  const screenshot1Path = path.join(artifactDir, 'screenshot_mobile_top.png');
  await page.screenshot({ path: screenshot1Path });
  console.log(`Saved screenshot 1 to: ${screenshot1Path}`);

  // Scroll to "Most Loved by Modern Homes" section
  await page.evaluate(() => {
    const el = document.evaluate("//h2[contains(text(), 'Most Loved')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (el) {
      el.scrollIntoView({ block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 2000)); // wait for transitions
  
  const screenshot2Path = path.join(artifactDir, 'screenshot_mobile_best_sellers.png');
  await page.screenshot({ path: screenshot2Path });
  console.log(`Saved screenshot 2 to: ${screenshot2Path}`);

  // Scroll to "Inspired Living" section
  await page.evaluate(() => {
    const el = document.evaluate("//h2[contains(text(), 'Inspired Living')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (el) {
      el.scrollIntoView({ block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 2000));
  
  const screenshot3Path = path.join(artifactDir, 'screenshot_mobile_inspired_living.png');
  await page.screenshot({ path: screenshot3Path });
  console.log(`Saved screenshot 3 to: ${screenshot3Path}`);

  await browser.close();
}

run().catch(console.error);
