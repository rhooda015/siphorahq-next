const fs = require('fs');
const path = require('path');

const LOCAL_URL = 'http://localhost:3000';

async function runCrawler(historyDir) {
  console.log("🕸️ Starting site crawl from local server...");
  const crawledUrls = new Map();
  const urlsToCrawl = new Set([LOCAL_URL]);

  // Fetch sitemap.xml first to populate initial discoverable URLs
  let sitemapUrls = new Set();
  let sitemapXmlExists = false;
  try {
    const sitemapRes = await fetch(`${LOCAL_URL}/sitemap.xml`);
    if (sitemapRes.ok) {
      sitemapXmlExists = true;
      const sitemapXml = await sitemapRes.text();
      const matches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
      for (const loc of matches) {
        // Map canonical domain to local host url for crawling
        const localPath = loc.replace('https://siphorahq.in', '');
        const targetLocalUrl = `${LOCAL_URL}${localPath === '/' ? '' : localPath}`;
        sitemapUrls.add(targetLocalUrl);
        urlsToCrawl.add(targetLocalUrl);
      }
      console.log(`📡 Sitemap parsed successfully. Found ${sitemapUrls.size} URLs.`);
    } else {
      console.warn("⚠️ Sitemap.xml not found or returned error status.");
    }
  } catch (e) {
    console.warn("⚠️ Failed to load sitemap.xml for crawler:", e.message);
  }

  let robotsTxtExists = false;
  try {
    const robotsRes = await fetch(`${LOCAL_URL}/robots.txt`);
    if (robotsRes.ok) {
      robotsTxtExists = true;
    }
  } catch (e) {}

  // Recursive Crawling
  while (urlsToCrawl.size > 0) {
    const currentUrl = urlsToCrawl.values().next().value;
    urlsToCrawl.delete(currentUrl);

    if (crawledUrls.has(currentUrl)) continue;

    console.log(`🔍 Crawling: ${currentUrl}`);
    try {
      const startTime = Date.now();
      const res = await fetch(currentUrl, { redirect: 'manual' });
      const loadTime = Date.now() - startTime;

      if (res.status >= 300 && res.status < 400) {
        // Redirect detected
        const redirectLocation = res.headers.get('location') || '';
        crawledUrls.set(currentUrl, {
          status: res.status,
          redirectLocation,
          loadTime,
          isRedirect: true
        });
        continue;
      }

      if (!res.ok) {
        crawledUrls.set(currentUrl, {
          status: res.status,
          loadTime,
          isError: true
        });
        continue;
      }

      const html = await res.text();
      crawledUrls.set(currentUrl, {
        status: res.status,
        loadTime,
        htmlLength: html.length,
        ...auditPageHtml(html, currentUrl)
      });

      // Discover new internal links
      const links = extractInternalLinks(html, currentUrl);
      for (const link of links) {
        if (!crawledUrls.has(link)) {
          urlsToCrawl.add(link);
        }
      }

    } catch (e) {
      crawledUrls.set(currentUrl, {
        status: 'FAILED',
        error: e.message,
        isError: true
      });
    }
  }

  // Compile final results
  const results = {
    pagesCrawled: crawledUrls.size,
    pages: {},
    issues: [],
    robotsTxtExists,
    sitemapXmlExists
  };

  const linkGraph = {}; // page -> links from it
  const inboundLinks = {}; // page -> list of pages linking to it

  // Initialize inbound link trackers
  for (const url of crawledUrls.keys()) {
    inboundLinks[url] = [];
    linkGraph[url] = [];
  }

  for (const [url, pageData] of crawledUrls.entries()) {
    results.pages[url] = pageData;
    
    if (pageData.links) {
      linkGraph[url] = pageData.links;
      for (const linkedUrl of pageData.links) {
        if (inboundLinks[linkedUrl] && !inboundLinks[linkedUrl].includes(url)) {
          inboundLinks[linkedUrl].push(url);
        }
      }
    }

    // Indexability audits
    if (pageData.isRedirect) {
      // Checked
    } else if (pageData.isError) {
      results.issues.push({
        url,
        level: 'critical',
        type: 'http_error',
        desc: `Page returned error HTTP ${pageData.status}`,
        impact: `Crawlers cannot access this URL. Prevents indexing.`
      });
    } else {
      // Metadata issues
      if (!pageData.title) {
        results.issues.push({
          url,
          level: 'high',
          type: 'missing_title',
          desc: 'Missing HTML <title> tag',
          impact: 'Google will auto-generate titles, resulting in lower CTR.'
        });
      }
      if (!pageData.description) {
        results.issues.push({
          url,
          level: 'medium',
          type: 'missing_description',
          desc: 'Missing HTML meta description',
          impact: 'Search snippets will show fallback text.'
        });
      }
      if (pageData.robots && pageData.robots.includes('noindex')) {
        results.issues.push({
          url,
          level: 'high',
          type: 'noindex_active',
          desc: 'Page has meta name="robots" content="noindex" tag',
          impact: 'Prevents page indexing on search engines.'
        });
      }
      if (!pageData.canonical) {
        results.issues.push({
          url,
          level: 'medium',
          type: 'missing_canonical',
          desc: 'Missing canonical URL link tag',
          impact: 'Exposes the site to duplicate content issues.'
        });
      } else if (!pageData.canonical.startsWith('https://siphorahq.in')) {
        results.issues.push({
          url,
          level: 'high',
          type: 'canonical_domain_mismatch',
          desc: `Canonical URL domain mismatch: got "${pageData.canonical}"`,
          impact: 'Triggers redirect loops or splits indexing authority.'
        });
      }
      if (pageData.h1Count === 0) {
        results.issues.push({
          url,
          level: 'medium',
          type: 'missing_h1',
          desc: 'Missing H1 heading tag',
          impact: 'Weakens topical keyword signals for the page.'
        });
      } else if (pageData.h1Count > 1) {
        results.issues.push({
          url,
          level: 'low',
          type: 'multiple_h1',
          desc: `Multiple H1 tags found (${pageData.h1Count})`,
          impact: 'May dilute primary semantic topic context.'
        });
      }

      // Schema issues
      if (pageData.schemas) {
        for (const schema of pageData.schemas) {
          const type = schema['@type'];
          if (type === 'Product') {
            if (!schema.offers || !schema.offers.price) {
              results.issues.push({
                url,
                level: 'high',
                type: 'schema_product_missing_price',
                desc: 'Product schema missing valid price details',
                impact: 'Ineligible for price drop rich snippets.'
              });
            }
            if (!schema.brand) {
              results.issues.push({
                url,
                level: 'medium',
                type: 'schema_product_missing_brand',
                desc: 'Product schema missing brand details',
                impact: 'Triggers Google Merchant listing warnings.'
              });
            }
          }
        }
      }
    }
  }

  // Detect duplicate titles & descriptions
  const titlesSeen = new Map();
  const descSeen = new Map();
  for (const [url, pageData] of crawledUrls.entries()) {
    if (pageData.title) {
      if (titlesSeen.has(pageData.title)) {
        results.issues.push({
          url,
          level: 'medium',
          type: 'duplicate_title',
          desc: `Duplicate title tag: "${pageData.title}" (Matches: ${titlesSeen.get(pageData.title)})`,
          impact: 'Drives keyword self-cannibalization.'
        });
      } else {
        titlesSeen.set(pageData.title, url);
      }
    }
    if (pageData.description) {
      if (descSeen.has(pageData.description)) {
        results.issues.push({
          url,
          level: 'low',
          type: 'duplicate_description',
          desc: `Duplicate meta description tag (Matches: ${descSeen.get(pageData.description)})`,
          impact: 'Reduces search snippet differentiation.'
        });
      } else {
        descSeen.set(pageData.description, url);
      }
    }
  }

  // Orphan page checks (found in sitemap, but has 0 inbound internal links)
  for (const sUrl of sitemapUrls) {
    if (crawledUrls.has(sUrl) && sUrl !== LOCAL_URL) {
      const inLinks = inboundLinks[sUrl] || [];
      if (inLinks.length === 0) {
        results.issues.push({
          url: sUrl,
          level: 'high',
          type: 'orphan_page',
          desc: 'Orphan page (listed in sitemap but has 0 inbound internal links)',
          impact: 'Very difficult for search bots and users to discover naturally.'
        });
      }
    }
  }

  return results;
}

function extractInternalLinks(html, currentUrl) {
  const links = new Set();
  const regex = /href="([^"]+)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const rawLink = match[1];
    if (
      rawLink.startsWith('/') &&
      !rawLink.startsWith('//') &&
      !rawLink.startsWith('/_next') &&
      !rawLink.includes('.')
    ) {
      links.add(`${LOCAL_URL}${rawLink === '/' ? '' : rawLink}`);
    } else if (rawLink.startsWith(LOCAL_URL)) {
      links.add(rawLink.split('#')[0]); // ignore hash anchors
    }
  }
  return [...links];
}

function auditPageHtml(html, pageUrl) {
  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Meta description
  const descMatch = html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i) ||
                    html.match(/<meta[^>]+content="([^"]+)"[^>]+name="description"/i);
  const description = descMatch ? descMatch[1].trim() : '';

  // Canonical
  const canonicalMatch = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) ||
                         html.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  // Robots
  const robotsMatch = html.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/i);
  const robots = robotsMatch ? robotsMatch[1].trim() : '';

  // Heading counts
  const h1Match = html.match(/<h1[^>]*>/gi) || [];
  const h2Match = html.match(/<h2[^>]*>/gi) || [];

  // Schema jsonld
  const schemas = [];
  const schemaRegex = /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = schemaRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1].trim());
      if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
        schemas.push(...parsed['@graph']);
      } else {
        schemas.push(parsed);
      }
    } catch (e) {
      // Skip invalid JSON schema blocks
    }
  }

  // Image auditing
  const images = [];
  const imgRegex = /<img([^>]+)>/gi;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    const attributes = imgMatch[1];
    
    // Extract src
    const srcMatch = attributes.match(/src="([^"]+)"/i);
    const src = srcMatch ? srcMatch[1] : '';

    if (!src) continue;

    // Extract alt
    const altMatch = attributes.match(/alt="([^"]*)"/i);
    const hasAlt = !!altMatch;
    const altText = altMatch ? altMatch[1].trim() : '';

    // Width/Height
    const widthMatch = attributes.match(/width="([^"]+)"/i);
    const heightMatch = attributes.match(/height="([^"]+)"/i);

    // Priority checks
    const hasPriority = attributes.includes('priority') || attributes.includes('fetchpriority');

    images.push({
      src,
      hasAlt,
      altText,
      hasDimensions: !!(widthMatch && heightMatch),
      hasPriority,
      isWebPOrAvif: src.endsWith('.webp') || src.endsWith('.avif')
    });
  }

  return {
    title,
    description,
    canonical,
    robots,
    h1Count: h1Match.length,
    h2Count: h2Match.length,
    schemas,
    images,
    links: extractInternalLinks(html, pageUrl)
  };
}

module.exports = { runCrawler };
