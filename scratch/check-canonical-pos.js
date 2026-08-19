const https = require('https');

const url = 'https://siphorahq.in/products/siphorahq-emerald-regent-fine-porcelain-mug-with-gold-handle';

function checkWithUserAgent(ua) {
  return new Promise((resolve) => {
    const options = {
      headers: {
        'User-Agent': ua
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const canonicalRegex = /<link[^>]*rel="canonical"[^>]*>/gi;
        let match = canonicalRegex.exec(data);
        if (match) {
          const precedingHtml = data.substring(0, match.index);
          const headOpenIndex = precedingHtml.lastIndexOf('<head>');
          const headCloseIndex = precedingHtml.lastIndexOf('</head>');
          
          resolve({
            status: res.statusCode,
            found: true,
            index: match.index,
            headClose: headCloseIndex,
            insideHead: headOpenIndex > headCloseIndex
          });
        } else {
          resolve({ status: res.statusCode, found: false });
        }
      });
    }).on('error', (err) => {
      resolve({ status: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  const uas = {
    'No User-Agent': '',
    'Googlebot': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Chrome Browser': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  };

  for (const [name, ua] of Object.entries(uas)) {
    console.log(`\nTesting with: ${name}`);
    const res = await checkWithUserAgent(ua);
    console.log(`- Status: ${res.status}`);
    if (res.found) {
      console.log(`- Canonical Index: ${res.index} (Head close: ${res.headClose})`);
      console.log(`- Verdict: ${res.insideHead ? 'INSIDE HEAD' : 'OUTSIDE HEAD'}`);
    } else {
      console.log(`- Canonical link not found!`);
    }
  }
}

run();
