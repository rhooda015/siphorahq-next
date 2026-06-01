const fs = require('fs');

function extract(file) {
  if (!fs.existsSync(file)) return null;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const categories = data.categories;
  const audits = data.audits;
  return {
    performance: Math.round(categories.performance?.score * 100),
    accessibility: Math.round(categories.accessibility?.score * 100),
    bestPractices: Math.round(categories['best-practices']?.score * 100),
    seo: Math.round(categories.seo?.score * 100),
    lcp: audits['largest-contentful-paint']?.displayValue,
    cls: audits['cumulative-layout-shift']?.displayValue,
    tbt: audits['total-blocking-time']?.displayValue,
    fid: audits['max-potential-fid']?.displayValue,
  };
}

console.log("Mobile:", JSON.stringify(extract('./lh-mobile.json')));
console.log("Desktop:", JSON.stringify(extract('./lh-desktop.json')));
