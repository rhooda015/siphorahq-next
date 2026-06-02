const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // Intercept requests to see Razorpay errors
  page.on('response', response => {
    if (response.url().includes('razorpay.com')) {
      console.log('RZP Response:', response.url(), response.status());
    }
  });

  await page.goto('http://localhost:3000/products/premium-dinner-set-46', { waitUntil: 'networkidle2' });
  
  // Click Quick Add
  await page.evaluate(() => {
    document.querySelector('button.w-full.btn-primary').click();
  });
  await page.waitForTimeout(1000);

  // Go to cart
  await page.goto('http://localhost:3000/checkout/address', { waitUntil: 'networkidle2' });
  
  // Fill address
  await page.type('input[name="email"]', 'test@example.com');
  await page.type('input[name="firstName"]', 'John');
  await page.type('input[name="lastName"]', 'Doe');
  await page.type('input[name="phone"]', '9999999999');
  await page.type('input[name="pincode"]', '110001');
  await page.type('input[name="addressLine1"]', '123 Test St');
  await page.waitForTimeout(2000);
  
  // Click Continue to Payment
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Continue to Payment'));
    if(btn) btn.click();
  });
  await page.waitForTimeout(2000);

  // Wait for payment page
  await page.waitForSelector('input[value="razorpay"]');
  
  // Click Pay
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Complete Purchase') || b.textContent.includes('Loading'));
    if(btn) btn.click();
  });

  await page.waitForTimeout(5000);
  console.log("Test finished");
  await browser.close();
})();
