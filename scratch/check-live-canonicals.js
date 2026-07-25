const axios = require('axios');

const urls = [
  'https://siphorahq.in',
  'https://siphorahq.in/products',
  'https://siphorahq.in/best-sellers',
  'https://siphorahq.in/gift-sets',
  'https://siphorahq.in/new-arrivals',
  'https://siphorahq.in/our-story',
  'https://siphorahq.in/craftsmanship',
  'https://siphorahq.in/products/siphorahq-moroccan-azure-royal-fine-porcelain-tea-mug',
  'https://siphorahq.in/products/siphorahq-imperial-diamond-fine-bone-china-mug-with-gold-rim',
  'https://siphorahq.in/products/siphorahq-emerald-regent-fine-porcelain-mug-with-gold-handle'
];

async function check() {
  console.log("=== Live Canonical Verification ===");
  for (const url of urls) {
    try {
      const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Lighthouse)' } });
      const html = res.data;
      const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i) || html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
      
      if (canonicalMatch) {
        // Find exact href
        const hrefMatch = canonicalMatch[0].match(/href=["']([^"']+)["']/i);
        const canonicalUrl = hrefMatch ? hrefMatch[1] : 'unknown';
        console.log(`URL: ${url}`);
        console.log(`  Canonical: ${canonicalMatch[0].trim()}`);
        console.log(`  Extracted: ${canonicalUrl}`);
      } else {
        console.log(`URL: ${url}`);
        console.log(`  ❌ NO CANONICAL TAG FOUND!`);
      }
    } catch (err) {
      console.log(`URL: ${url}`);
      console.log(`  ❌ ERROR: ${err.message}`);
    }
  }
}

check();
