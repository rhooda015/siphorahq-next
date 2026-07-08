const puppeteer = require('puppeteer');

async function check() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set viewport to desktop (1200px to see if there is horizontal gap/overflow)
  await page.setViewport({ width: 1200, height: 800 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  const result = await page.evaluate(() => {
    // Find the Artisanal Collections section
    const heading = document.evaluate("//h2[contains(text(), 'The Artisanal Collections')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!heading) return { error: 'Heading not found' };
    
    const section = heading.closest('section');
    const grid = section.querySelector('.grid');
    const leftCol = grid.children[0];
    const rightCol = grid.children[1];
    
    const gridRect = grid.getBoundingClientRect();
    const leftRect = leftCol.getBoundingClientRect();
    const rightRect = rightCol.getBoundingClientRect();
    
    return {
      gridWidth: gridRect.width,
      gridLeft: gridRect.left,
      gridRight: gridRect.right,
      leftColWidth: leftRect.width,
      leftColHeight: leftRect.height,
      rightColWidth: rightRect.width,
      rightColHeight: rightRect.height,
      rightColChildren: Array.from(rightCol.children).map(c => ({
        tag: c.tagName,
        width: c.getBoundingClientRect().width,
        height: c.getBoundingClientRect().height
      }))
    };
  });

  console.log('Grid Width:', result.gridWidth);
  console.log('Left Column Width:', result.leftColWidth, 'Height:', result.leftColHeight);
  console.log('Right Column Width:', result.rightColWidth, 'Height:', result.rightColHeight);
  console.log('Right Column Children:', result.rightColChildren);

  await browser.close();
}

check().catch(console.error);
