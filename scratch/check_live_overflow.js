const puppeteer = require('puppeteer');

async function check() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true });

  console.log('Navigating to https://siphorahq.in...');
  try {
    await page.goto('https://siphorahq.in', { waitUntil: 'networkidle2', timeout: 30000 });
  } catch (e) {
    console.log('Navigation timeout, checking loaded elements anyway...');
  }

  const result = await page.evaluate(() => {
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    const bodyScrollWidth = document.body.scrollWidth;

    const findOverflowingElements = () => {
      const elements = document.querySelectorAll('*');
      const overflowing = [];
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        
        if (rect.width > 375 && style.display !== 'none' && style.visibility !== 'hidden') {
          let parent = el.parentElement;
          let isClipped = false;
          while (parent) {
            const pStyle = window.getComputedStyle(parent);
            if (pStyle.overflowX === 'hidden' || pStyle.overflow === 'hidden') {
              const pRect = parent.getBoundingClientRect();
              if (pRect.width <= 375) {
                isClipped = true;
                break;
              }
            }
            parent = parent.parentElement;
          }
          
          if (!isClipped) {
            overflowing.push({
              tagName: el.tagName,
              id: el.id,
              className: el.className,
              width: rect.width,
              left: rect.left,
              right: rect.right
            });
          }
        }
      });
      return overflowing;
    };

    return {
      scrollWidth,
      clientWidth,
      bodyScrollWidth,
      overflowingElements: findOverflowingElements()
    };
  });

  console.log('Live Document scrollWidth:', result.scrollWidth);
  console.log('Live Document clientWidth:', result.clientWidth);
  console.log('Live Body scrollWidth:', result.bodyScrollWidth);
  console.log('\nLive Actual Unclipped Overflowing Elements:');
  if (result.overflowingElements.length === 0) {
    console.log('None!');
  } else {
    result.overflowingElements.forEach(el => {
      console.log(`- <${el.tagName} id="${el.id}" class="${el.className}"> width=${el.width}px left=${el.left} right=${el.right}`);
    });
  }

  await browser.close();
}

check().catch(console.error);
