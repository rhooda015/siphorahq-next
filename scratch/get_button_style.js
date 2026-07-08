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
    const button = document.querySelector('.quick-add button');
    if (!button) return { error: 'No button found!' };

    const style = window.getComputedStyle(button);
    const parentStyle = window.getComputedStyle(button.parentElement);

    return {
      html: button.outerHTML,
      color: style.color,
      backgroundColor: style.backgroundColor,
      parentDisplay: parentStyle.display,
      parentOpacity: parentStyle.opacity,
      parentTransform: parentStyle.transform
    };
  });

  console.log('Button HTML:', result.html);
  console.log('Button computed text color:', result.color);
  console.log('Button computed bg color:', result.backgroundColor);
  console.log('Parent display:', result.parentDisplay);
  console.log('Parent opacity:', result.parentOpacity);
  console.log('Parent transform:', result.parentTransform);

  await browser.close();
}

check().catch(console.error);
