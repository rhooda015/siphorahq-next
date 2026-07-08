const puppeteer = require('puppeteer');

async function check() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  const result = await page.evaluate(() => {
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    const bodyScrollWidth = document.body.scrollWidth;

    // Function to check if an element is actually visible and causing overflow
    const findOverflowingElements = () => {
      const elements = document.querySelectorAll('*');
      const overflowing = [];
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        
        // Element's layout box width is larger than viewport
        if (rect.width > 375 && style.display !== 'none' && style.visibility !== 'hidden') {
          // Check if any ancestor has overflow-x: hidden or overflow: hidden
          let parent = el.parentElement;
          let isClipped = false;
          while (parent) {
            const pStyle = window.getComputedStyle(parent);
            if (pStyle.overflowX === 'hidden' || pStyle.overflow === 'hidden') {
              // But if the parent itself is wider than viewport and not clipped, it might be the cause
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

  console.log('Document scrollWidth:', result.scrollWidth);
  console.log('Document clientWidth:', result.clientWidth);
  console.log('Body scrollWidth:', result.bodyScrollWidth);
  console.log('\nActual Unclipped Overflowing Elements:');
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
