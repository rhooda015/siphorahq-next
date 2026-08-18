const https = require('https');

const urls = [
  'https://siphorahq.in/privacy',
  'https://siphorahq.in/returns',
  'https://www.siphorahq.in/products',
  'https://siphorahq.in/terms'
];

function getHeaders(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({
        statusCode: res.statusCode,
        headers: res.headers
      });
    }).on('error', (err) => {
      resolve({ statusCode: 'ERROR', error: err.message });
    });
  });
}

async function run() {
  for (const url of urls) {
    console.log("\n==================================");
    console.log("Checking URL:", url);
    const step1 = await getHeaders(url);
    console.log("Step 1 Status:", step1.statusCode);
    console.log("Step 1 Location Header:", step1.headers ? step1.headers.location : 'NONE');
    
    if (step1.headers && step1.headers.location) {
      let targetUrl = step1.headers.location;
      if (!targetUrl.startsWith('http')) {
        if (url.includes('www.siphorahq.in')) {
          targetUrl = 'https://www.siphorahq.in' + targetUrl;
        } else {
          targetUrl = 'https://siphorahq.in' + targetUrl;
        }
      }
      console.log("Following redirect to:", targetUrl);
      const step2 = await getHeaders(targetUrl);
      console.log("Step 2 Status:", step2.statusCode);
      
      if (step2.headers && step2.headers.location) {
        let targetUrl2 = step2.headers.location;
        if (!targetUrl2.startsWith('http')) {
          targetUrl2 = 'https://siphorahq.in' + targetUrl2;
        }
        console.log("Following secondary redirect to:", targetUrl2);
        const step3 = await getHeaders(targetUrl2);
        console.log("Step 3 Status:", step3.statusCode);
      }
    }
  }
}

run();
