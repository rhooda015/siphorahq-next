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
    console.log('Navigation timeout, checking elements anyway...');
  }

  const result = await page.evaluate(() => {
    // Check if ProductCard components exist on the page
    const cards = document.querySelectorAll('.product-card');
    const quickAddButtons = document.querySelectorAll('.quick-add button');
    
    // Check grid layout in "Most Loved by Modern Homes" section
    const bestSellersHeading = document.evaluate("//h2[contains(text(), 'Most Loved')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    let gridColsClass = '';
    if (bestSellersHeading) {
      const section = bestSellersHeading.closest('section');
      const grid = section.querySelector('.grid');
      if (grid) {
        gridColsClass = grid.className;
      }
    }

    return {
      cardsCount: cards.length,
      quickAddButtonsCount: quickAddButtons.length,
      gridColsClass,
      bodyHtml: document.body.innerHTML.slice(0, 1000)
    };
  });

  console.log('Cards count on live site:', result.cardsCount);
  console.log('Quick Add buttons count on live site:', result.quickAddButtonsCount);
  console.log('Grid cols class on live site:', result.gridColsClass);

  await browser.close();
}

check().catch(console.error);
