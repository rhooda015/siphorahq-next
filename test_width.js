const puppeteer = require('puppeteer');

async function checkWidths() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set viewport to mobile width (e.g., 375px)
  await page.setViewport({ width: 375, height: 812, isMobile: true });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Evaluate DOM elements
  const overflowingElements = await page.evaluate(() => {
    const viewportWidth = 375;
    const elements = document.querySelectorAll('*');
    const results = [];
    
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      
      // We only care about visible elements that exceed the viewport width
      if (rect.width > viewportWidth && style.display !== 'none' && style.visibility !== 'hidden') {
        // Find a selector or path for the element
        let path = el.tagName.toLowerCase();
        if (el.id) {
          path += `#${el.id}`;
        } else if (el.className) {
          path += `.${el.className.trim().split(/\s+/).join('.')}`;
        }
        
        results.push({
          element: path.slice(0, 100), // truncate path if too long
          width: rect.width,
          left: rect.left,
          right: rect.right
        });
      }
    });
    
    return results;
  });

  console.log('\n--- Overflowing Elements Check (Viewport Width: 375px) ---');
  if (overflowingElements.length === 0) {
    console.log('No elements are overflowing!');
  } else {
    console.log(`Found ${overflowingElements.length} elements wider than 375px:`);
    // Sort by width descending and show top 10
    overflowingElements
      .sort((a, b) => b.width - a.width)
      .slice(0, 15)
      .forEach(item => {
        console.log(`- Width: ${Math.round(item.width)}px | Element: ${item.element}`);
      });
  }

  await browser.close();
}

checkWidths().catch(console.error);
