const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
  });

  const requestErrors = [];
  page.on('requestfailed', request => {
    requestErrors.push(`${request.url()} failed: ${request.failure() ? request.failure().errorText : 'unknown'}`);
  });

  page.on('pageerror', err => {
    consoleMessages.push(`[error] ${err.toString()}`);
  });

  console.log('Navigating to http://localhost:3000...');
  try {
    await page.goto('http://localhost:3000', {
      waitUntil: 'networkidle2',
      timeout: 10000
    });
  } catch (err) {
    console.error('Navigation failed:', err.message);
  }

  // Wait a bit for async scripts or Clarity to load
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('\n--- Console Logs & CSP Violations ---');
  if (consoleMessages.length === 0) {
    console.log('No console logs recorded.');
  } else {
    consoleMessages.forEach(msg => console.log(msg));
  }

  console.log('\n--- Request Failures ---');
  if (requestErrors.length === 0) {
    console.log('No failed requests.');
  } else {
    requestErrors.forEach(err => console.log(err));
  }

  // Check headers to verify CSP is set correctly
  const response = await page.goto('http://localhost:3000');
  const headers = response.headers();
  console.log('\n--- Response CSP Header ---');
  console.log(headers['content-security-policy']);

  await browser.close();
}

run();
