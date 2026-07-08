const fs = require('fs');
const path = require('path');

const COMPETITORS = [
  { name: 'Nestasia', url: 'https://www.nestasia.in' },
  { name: 'Ellementry', url: 'https://www.ellementry.com' },
  { name: 'Elvy', url: 'https://www.elvy.com' }
];

async function runCompetitorCrawl(historyDir) {
  console.log("🕵️ Starting live competitor audit...");
  const gapReport = [];

  for (const comp of COMPETITORS) {
    console.log(`🌐 Crawling competitor homepage: ${comp.url}`);
    try {
      const res = await fetch(comp.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5'
        },
        signal: AbortSignal.timeout(10000) // 10s timeout
      });

      if (!res.ok) {
        gapReport.push({
          name: comp.name,
          url: comp.url,
          status: `FAILED (HTTP ${res.status})`,
          title: 'Unreachable',
          h1: 'Unreachable',
          schemas: [],
          contentLength: 0,
          notes: `Failed to crawl due to HTTP status ${res.status}. Competitor may be blocking bot traffic.`
        });
        continue;
      }

      const html = await res.text();
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : 'Missing Title';

      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'Missing H1';

      // Schema extraction
      const schemas = [];
      const schemaRegex = /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
      let match;
      while ((match = schemaRegex.exec(html)) !== null && schemas.length < 5) {
        try {
          const parsed = JSON.parse(match[1].trim());
          if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
            schemas.push(...parsed['@graph'].map(s => s['@type']));
          } else {
            schemas.push(parsed['@type']);
          }
        } catch(e) {}
      }

      gapReport.push({
        name: comp.name,
        url: comp.url,
        status: 'SUCCESS',
        title,
        h1: h1Text,
        schemas: [...new Set(schemas.filter(Boolean))],
        contentLength: html.length,
        notes: `Successfully crawled. Title uses length of ${title.length} characters.`
      });

    } catch (e) {
      gapReport.push({
        name: comp.name,
        url: comp.url,
        status: `ERROR (${e.name === 'TimeoutError' ? 'Timeout' : e.message})`,
        title: 'Unreachable',
        h1: 'Unreachable',
        schemas: [],
        contentLength: 0,
        notes: `Crawl aborted: ${e.message}. Host might have DDoS protection or be offline.`
      });
    }
  }

  return gapReport;
}

module.exports = { runCompetitorCrawl };
