const https = require('https');

const url = 'https://siphorahq.in/products/siphorahq-emerald-regent-fine-porcelain-mug-with-gold-handle';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const titleRegex = /<title[^>]*>([\s\S]*?)<\/title>/gi;
    let match;
    while ((match = titleRegex.exec(data)) !== null) {
      console.log(`\nFound title tag at index ${match.index}:`);
      const start = Math.max(0, match.index - 500);
      const end = Math.min(data.length, match.index + match[0].length + 500);
      console.log("Context around title tag:\n", data.substring(start, end));
    }
  });
}).on('error', (err) => {
  console.error("Error:", err.message);
});
