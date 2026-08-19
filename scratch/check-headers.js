const https = require('https');

const url = 'https://siphorahq.in/products/siphorahq-emerald-regent-fine-porcelain-mug-with-gold-handle';

https.get(url, (res) => {
  console.log("Status:", res.statusCode);
  console.log("Headers:", res.headers);
}).on('error', (err) => {
  console.error("Error:", err.message);
});
