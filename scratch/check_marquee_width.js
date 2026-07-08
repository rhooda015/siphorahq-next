const puppeteer = require('puppeteer');

async function check() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  const result = await page.evaluate(() => {
    const parent = document.querySelector('.animate-marquee').parentElement;
    const parentRect = parent.getBoundingClientRect();
    const childRect = document.querySelector('.animate-marquee').getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    return {
      parentWidth: parentRect.width,
      childWidth: childRect.width,
      bodyWidth: bodyRect.width
    };
  });

  console.log('Announcement Bar Parent Width:', result.parentWidth);
  console.log('Announcement Bar Child Width:', result.childWidth);
  console.log('Body Width:', result.bodyWidth);

  await browser.close();
}

check().catch(console.error);
