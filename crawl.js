const fs = require('fs');

async function crawl() {
  try {
    console.log("Crawling http://localhost:3000...");
    const res = await fetch('http://localhost:3000');
    const html = await res.text();
    
    // Extract Links
    const links = [...new Set([...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]))];
    const internalLinks = links.filter(l => l.startsWith('/') && !l.startsWith('//'));
    
    let brokenLinks = [];
    for (const link of internalLinks) {
      if (link.startsWith('/_next')) continue; // Skip static assets for this check
      const checkRes = await fetch(`http://localhost:3000${link}`);
      if (!checkRes.ok) {
        brokenLinks.push(link);
      }
    }
    
    // Extract Images
    const imgs = [...new Set([...html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/gi)].map(m => m[1]))];
    const altsMatch = [...html.matchAll(/<img[^>]+alt="([^"]*)"[^>]*>/gi)];
    const missingAltCount = imgs.length - altsMatch.filter(m => m[1].trim() !== "").length;

    let brokenImages = [];
    for (const img of imgs) {
      let checkUrl = img;
      if (img.startsWith('/')) checkUrl = `http://localhost:3000${img}`;
      if (checkUrl.startsWith('http')) {
        try {
          const imgRes = await fetch(checkUrl, { method: 'HEAD' });
          if (!imgRes.ok) brokenImages.push(img);
        } catch(e) {
           brokenImages.push(img);
        }
      }
    }
    
    // Metadata
    const title = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const desc = html.match(/name="description"[^>]+content="([^"]+)"/i) || html.match(/content="([^"]+)"[^>]+name="description"/i);
    const ogImage = html.match(/property="og:image"[^>]+content="([^"]+)"/i) || html.match(/content="([^"]+)"[^>]+property="og:image"/i);
    const jsonLd = html.match(/type="application\/ld\+json"/i);
    
    // Crawlability
    const robots = await fetch('http://localhost:3000/robots.txt').then(r => r.status);
    const sitemap = await fetch('http://localhost:3000/sitemap.xml').then(r => r.status);

    const report = {
      brokenLinksReport: {
        totalInternalLinksChecked: internalLinks.length,
        brokenLinks: brokenLinks
      },
      missingImagesReport: {
        totalImages: imgs.length,
        brokenImages: brokenImages,
        imagesMissingAltText: Math.max(0, missingAltCount)
      },
      missingMetadataReport: {
        hasTitle: !!title,
        hasDescription: !!desc,
        hasOgImage: !!ogImage,
        hasJsonLd: !!jsonLd
      },
      crawlabilityReport: {
        robotsTxtExists: robots === 200,
        sitemapXmlExists: sitemap === 200
      }
    };

    fs.writeFileSync('crawl-report.json', JSON.stringify(report, null, 2));
    console.log("Crawl complete.");

  } catch (e) {
    console.error("Crawl error:", e);
  }
}

crawl();
