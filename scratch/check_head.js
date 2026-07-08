const puppeteer = require('puppeteer');

async function check() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  const headHtml = await page.evaluate(() => {
    return document.head.innerHTML;
  });

  console.log('--- Head Elements ---');
  console.log(headHtml);

  await browser.close();
}

check().catch(console.error);
