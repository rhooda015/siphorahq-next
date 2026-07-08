const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PAGES = [
  { name: 'homepage', path: '/' },
  { name: 'products', path: '/products' },
  { name: 'collections', path: '/collections' },
  { name: 'our-story', path: '/our-story' },
  { name: 'contact', path: '/contact' },
  { name: 'product-detail', path: '/products/siphorahq-moroccan-azure-royal-fine-porcelain-tea-mug' }
];

async function runLighthouse(historyDir) {
  const apiKey = process.env.PAGESPEED_API_KEY;
  const lhDir = path.join(historyDir, 'lighthouse');
  if (!fs.existsSync(lhDir)) {
    fs.mkdirSync(lhDir, { recursive: true });
  }

  const results = {};

  if (apiKey) {
    console.log("🔑 PageSpeed Insights API Key detected. Fetching scores from public URLs...");
    for (const page of PAGES) {
      const publicUrl = `https://siphorahq.in${page.path}`;
      console.log(`⚡ Querying PageSpeed Insights for: ${publicUrl}`);
      try {
        const desktopRes = await fetch(
          `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(publicUrl)}&key=${apiKey}&strategy=desktop`
        );
        const mobileRes = await fetch(
          `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(publicUrl)}&key=${apiKey}&strategy=mobile`
        );

        if (!desktopRes.ok || !mobileRes.ok) {
          throw new Error(`PSI API returned status ${desktopRes.status} (desktop) / ${mobileRes.status} (mobile)`);
        }

        const desktopData = await desktopRes.json();
        const mobileData = await mobileRes.json();

        // Save raw JSONs
        fs.writeFileSync(path.join(lhDir, `${page.name}-desktop.json`), JSON.stringify(desktopData, null, 2));
        fs.writeFileSync(path.join(lhDir, `${page.name}-mobile.json`), JSON.stringify(mobileData, null, 2));

        const getMetrics = (data) => {
          const audits = data.lighthouseResult?.audits || {};
          const categories = data.lighthouseResult?.categories || {};
          return {
            performance: Math.round((categories.performance?.score || 0) * 100),
            seo: Math.round((categories.seo?.score || 0) * 100),
            accessibility: Math.round((categories.accessibility?.score || 0) * 100),
            bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
            lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
            cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
            tbt: audits['total-blocking-time']?.displayValue || 'N/A',
            fcp: audits['first-contentful-paint']?.displayValue || 'N/A'
          };
        };

        results[page.name] = {
          desktop: getMetrics(desktopData),
          mobile: getMetrics(mobileData),
          source: 'PageSpeed Insights API'
        };

      } catch (e) {
        console.error(`🔴 PSI API failed for ${page.name}, falling back to local Lighthouse CLI:`, e.message);
        await runLocalLighthouse(page, lhDir, results);
      }
    }
  } else {
    console.log("ℹ️ No PSI API key found. Falling back to local Lighthouse CLI checks...");
    for (const page of PAGES) {
      await runLocalLighthouse(page, lhDir, results);
    }
  }

  // Save compiled Lighthouse metrics log
  fs.writeFileSync(path.join(historyDir, 'lighthouse.json'), JSON.stringify(results, null, 2));
  return results;
}

async function runLocalLighthouse(page, lhDir, results) {
  const localUrl = `http://localhost:3000${page.path}`;
  const outputPath = path.join(lhDir, `${page.name}.json`);
  console.log(`⚡ Running Local Lighthouse for: ${localUrl}`);

  try {
    const cmd = `npx lighthouse ${localUrl} --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox" --quiet`;
    execSync(cmd, { stdio: 'ignore' });

    if (fs.existsSync(outputPath)) {
      const data = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
      const audits = data.audits || {};
      const categories = data.categories || {};

      results[page.name] = {
        desktop: {
          performance: Math.round((categories.performance?.score || 0) * 100),
          seo: Math.round((categories.seo?.score || 0) * 100),
          accessibility: Math.round((categories.accessibility?.score || 0) * 100),
          bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
          lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
          cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
          tbt: audits['total-blocking-time']?.displayValue || 'N/A',
          fcp: audits['first-contentful-paint']?.displayValue || 'N/A'
        },
        source: 'Lighthouse CLI (Local)'
      };
    }
  } catch (e) {
    console.error(`🔴 Local Lighthouse failed for ${page.name}:`, e.message);
    results[page.name] = {
      status: 'FAILED',
      error: e.message,
      source: 'Lighthouse CLI (Local)'
    };
  }
}

module.exports = { runLighthouse };
