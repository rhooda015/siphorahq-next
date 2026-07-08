const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../../seo-log.md');

async function updateDashboard(historyDir, auditData, competitorData, lhData, gscData, fixesApplied) {
  const dateStr = new Date().toISOString().split('T')[0];

  // 1. Load existing historical files if not provided (to build full summary)
  if (!auditData && fs.existsSync(path.join(historyDir, 'audit.json'))) {
    const raw = JSON.parse(fs.readFileSync(path.join(historyDir, 'audit.json'), 'utf8'));
    auditData = raw.audit;
    competitorData = raw.competitor;
  }
  if (!lhData && fs.existsSync(path.join(historyDir, 'lighthouse.json'))) {
    lhData = JSON.parse(fs.readFileSync(path.join(historyDir, 'lighthouse.json'), 'utf8'));
  }
  if (!gscData && fs.existsSync(path.join(historyDir, 'gsc.json'))) {
    gscData = JSON.parse(fs.readFileSync(path.join(historyDir, 'gsc.json'), 'utf8'));
  }
  if (!fixesApplied && fs.existsSync(path.join(historyDir, 'fixes-applied.json'))) {
    fixesApplied = JSON.parse(fs.readFileSync(path.join(historyDir, 'fixes-applied.json'), 'utf8'));
  }

  // 2. Score Calculation (Evidence-based & Transparent)
  let scores = {
    technical: { score: 25, max: 25, checks: [] },
    performance: { score: 0, max: 25, checks: [], pending: true },
    indexability: { score: 20, max: 20, checks: [] },
    contentMeta: { score: 15, max: 15, checks: [] },
    schema: { score: 10, max: 10, checks: [] },
    internalLinking: { score: 5, max: 5, checks: [] }
  };

  // Technical SEO
  if (auditData) {
    const robotsTxt = auditData.robotsTxtExists;
    const sitemapXml = auditData.sitemapXmlExists;
    const brokenLinks = auditData.issues.filter(i => i.type === 'http_error');

    if (!robotsTxt) {
      scores.technical.score -= 5;
      scores.technical.checks.push('❌ robots.txt not found/allows crawl (-5)');
    } else {
      scores.technical.checks.push('✅ robots.txt is present and valid (+5)');
    }

    if (!sitemapXml) {
      scores.technical.score -= 5;
      scores.technical.checks.push('❌ sitemap.xml not found/valid (-5)');
    } else {
      scores.technical.checks.push('✅ sitemap.xml is present and configured (+5)');
    }

    if (brokenLinks.length > 0) {
      const deduction = Math.min(15, brokenLinks.length * 5);
      scores.technical.score -= deduction;
      scores.technical.checks.push(`❌ Found ${brokenLinks.length} broken links (-${deduction})`);
    } else {
      scores.technical.checks.push('✅ No broken internal links found (+15)');
    }
  } else {
    scores.technical.checks.push('⚠️ No local crawler audit run.');
  }

  // Performance (Lighthouse)
  if (lhData) {
    scores.performance.pending = false;
    let totalPerf = 0;
    let count = 0;
    for (const [page, data] of Object.entries(lhData)) {
      if (data.desktop && typeof data.desktop.performance === 'number') {
        totalPerf += data.desktop.performance;
        count++;
      }
    }
    if (count > 0) {
      const avgPerf = totalPerf / count;
      scores.performance.score = Math.round((avgPerf / 100) * 25 * 10) / 10;
      scores.performance.checks.push(`✅ Average Lighthouse Performance Score: ${Math.round(avgPerf)}/100 (+${scores.performance.score})`);
    } else {
      scores.performance.checks.push('❌ Lighthouse execution failed on all target pages.');
    }
  } else {
    scores.performance.checks.push('⚠️ Performance checks pending (run `npm run seo:lighthouse`)');
  }

  // Indexability
  if (auditData) {
    const canonicalMismatches = auditData.issues.filter(i => i.type === 'canonical_domain_mismatch');
    const noindexActive = auditData.issues.filter(i => i.type === 'noindex_active');
    const orphans = auditData.issues.filter(i => i.type === 'orphan_page');

    if (canonicalMismatches.length > 0) {
      const deduction = Math.min(10, canonicalMismatches.length * 5);
      scores.indexability.score -= deduction;
      scores.indexability.checks.push(`❌ Found ${canonicalMismatches.length} canonical domain mismatches (-${deduction})`);
    } else {
      scores.indexability.checks.push('✅ Canonical domains configured correctly (+10)');
    }

    if (noindexActive.length > 0) {
      const deduction = Math.min(10, noindexActive.length * 5);
      scores.indexability.score -= deduction;
      scores.indexability.checks.push(`❌ Pages with active noindex tags: ${noindexActive.length} (-${deduction})`);
    } else {
      scores.indexability.checks.push('✅ No pages contain index-blocking noindex directives (+5)');
    }

    if (orphans.length > 0) {
      const deduction = Math.min(10, orphans.length * 5);
      scores.indexability.score -= deduction;
      scores.indexability.checks.push(`❌ Found ${orphans.length} orphan pages (-${deduction})`);
    } else {
      scores.indexability.checks.push('✅ No orphan pages detected (+5)');
    }
  }

  // Content / Meta
  if (auditData) {
    const missingTitle = auditData.issues.filter(i => i.type === 'missing_title');
    const missingDesc = auditData.issues.filter(i => i.type === 'missing_description');
    const duplicateTitle = auditData.issues.filter(i => i.type === 'duplicate_title');
    const missingH1 = auditData.issues.filter(i => i.type === 'missing_h1');

    if (missingTitle.length > 0) {
      const deduction = Math.min(6, missingTitle.length * 3);
      scores.contentMeta.score -= deduction;
      scores.contentMeta.checks.push(`❌ Missing title tags: ${missingTitle.length} (-${deduction})`);
    }
    if (missingDesc.length > 0) {
      const deduction = Math.min(4, missingDesc.length * 2);
      scores.contentMeta.score -= deduction;
      scores.contentMeta.checks.push(`❌ Missing meta descriptions: ${missingDesc.length} (-${deduction})`);
    }
    if (duplicateTitle.length > 0) {
      const deduction = Math.min(4, duplicateTitle.length * 2);
      scores.contentMeta.score -= deduction;
      scores.contentMeta.checks.push(`❌ Duplicate titles: ${duplicateTitle.length} (-${deduction})`);
    }
    if (missingH1.length > 0) {
      const deduction = Math.min(3, missingH1.length * 1);
      scores.contentMeta.score -= deduction;
      scores.contentMeta.checks.push(`❌ Missing H1 tags: ${missingH1.length} (-${deduction})`);
    }

    if (scores.contentMeta.checks.length === 0) {
      scores.contentMeta.checks.push('✅ All pages have unique titles, descriptions, and H1 tags (+15)');
    }
  }

  // Schema
  if (auditData) {
    const schemaIssues = auditData.issues.filter(i => i.type.startsWith('schema_'));
    if (schemaIssues.length > 0) {
      const deduction = Math.min(10, schemaIssues.length * 2);
      scores.schema.score -= deduction;
      scores.schema.checks.push(`❌ Schema warnings / issues detected: ${schemaIssues.length} (-${deduction})`);
    } else {
      scores.schema.checks.push('✅ Structured schema data is valid (+10)');
    }
  }

  // Internal Linking
  if (auditData) {
    const orphans = auditData.issues.filter(i => i.type === 'orphan_page');
    if (orphans.length > 0) {
      scores.internalLinking.score -= 2;
      scores.internalLinking.checks.push(`❌ Orphan pages limit internal link flow (-2)`);
    } else {
      scores.internalLinking.checks.push('✅ Internal link structure is fluid (+5)');
    }
  }

  // Total
  let totalScore = scores.technical.score + scores.indexability.score + scores.contentMeta.score + scores.schema.score + scores.internalLinking.score;
  let maxPossible = 75;
  if (!scores.performance.pending) {
    totalScore += scores.performance.score;
    maxPossible += 25;
  }
  const finalScorePercent = Math.round((totalScore / maxPossible) * 100);

  // 3. Format Dashboard summary
  let dashboardMd = `### 📊 SEO GROWTH DASHBOARD [${dateStr}]
* **Overall SEO Score:** **${finalScorePercent}/100** (Technical & Content)
* **Indexed Pages (Google):** **${gscData && gscData.totals ? gscData.totals.clicks === 0 ? '0 (Not crawled yet)' : 'Indexed' : 'Pending GSC Sync'}**
* **Technical Issue Count:** **${auditData ? auditData.issues.length : 'Pending Audit'}**
* **Lighthouse Performance:** **${lhData && lhData.homepage ? `${lhData.homepage.desktop.performance}/100` : 'Pending Lighthouse Run'}**
* **GSC Impressions (30d):** **${gscData && gscData.totals ? gscData.totals.impressions : 'Not Connected'}**
* **GSC Organic Clicks (30d):** **${gscData && gscData.totals ? gscData.totals.clicks : 'Not Connected'}**
* **GSC Avg. Position (30d):** **${gscData && gscData.totals ? gscData.totals.position : 'Not Connected'}**
* **Auto-Fixes Applied:** **${fixesApplied ? fixesApplied.length : 0}**

---

### 🔍 Keyword Search Position Tracking
* **Status:** ${gscData && gscData.topQueries && gscData.topQueries.length > 0 ? 'Connected to Google Search Console API' : 'Not Connected (No dynamic query rankings)'}
${
  gscData && gscData.topQueries && gscData.topQueries.length > 0
    ? `| Query | Clicks | Impressions | CTR | Position |\n| :--- | :---: | :---: | :---: | :---: |\n` +
      gscData.topQueries.slice(0, 7).map(q => `| ${q.query} | ${q.clicks} | ${q.impressions} | ${q.ctr}% | ${q.position} |`).join('\n')
    : `*No active Search Console query metrics available due to connection status.*`
}

---

### 🕵️ Live Competitor Gap Audit
${
  competitorData && competitorData.length > 0
    ? `| Competitor | Crawl Status | Title Patterns / Findings | Gaps & Notes |\n| :--- | :---: | :--- | :--- |\n` +
      competitorData.map(c => `| ${c.name} | ${c.status} | ${c.title} | ${c.notes} |`).join('\n')
    : `*No competitor audits completed.*`
}

---

### ⚖️ Transparent Scoring & Verification Evidence
* **Technical SEO:** **${scores.technical.score}/${scores.technical.max}**
${scores.technical.checks.map(c => `  - ${c}`).join('\n')}
* **Indexability:** **${scores.indexability.score}/${scores.indexability.max}**
${scores.indexability.checks.map(c => `  - ${c}`).join('\n')}
* **Content & Meta:** **${scores.contentMeta.score}/${scores.contentMeta.max}**
${scores.contentMeta.checks.map(c => `  - ${c}`).join('\n')}
* **Performance:** **${scores.performance.pending ? 'Pending Run' : `${scores.performance.score}/${scores.performance.max}`}**
${scores.performance.checks.map(c => `  - ${c}`).join('\n')}
* **Structured Schema:** **${scores.schema.score}/${scores.schema.max}**
${scores.schema.checks.map(c => `  - ${c}`).join('\n')}
* **Internal Linking Flow:** **${scores.internalLinking.score}/${scores.internalLinking.max}**
${scores.internalLinking.checks.map(c => `  - ${c}`).join('\n')}
`;

  // Write summary to dated history folder
  fs.writeFileSync(path.join(historyDir, 'summary.md'), `# SEO Audit Summary - ${dateStr}\n\n` + dashboardMd);

  // Update central seo-log.md
  let existingContent = '';
  if (fs.existsSync(LOG_FILE)) {
    existingContent = fs.readFileSync(LOG_FILE, 'utf8');
  }

  const headerMarker = '# SEO Audit Log - siphorahq.in\n\nThis file logs the periodic SEO audits of `siphorahq.in`.\n';
  let updatedContent = '';

  const cleanEntryHeader = `## [${dateStr}] SEO Growth Dashboard & Proactive Audit\n`;
  const cleanEntryContent = cleanEntryHeader + '\n' + dashboardMd;

  if (existingContent.startsWith('# SEO Audit Log')) {
    // Strip header and any previous entry for this exact date to prevent duplicates
    let remaining = existingContent.replace(headerMarker, '');
    if (remaining.includes(cleanEntryHeader)) {
      // Find index of next entry divider or file end to replace old entry
      const startIndex = remaining.indexOf(cleanEntryHeader);
      const nextIndex = remaining.indexOf('## [', startIndex + cleanEntryHeader.length);
      if (nextIndex !== -1) {
        remaining = remaining.substring(0, startIndex) + remaining.substring(nextIndex);
      } else {
        remaining = remaining.substring(0, startIndex);
      }
    }
    updatedContent = headerMarker + cleanEntryContent + '\n---\n' + remaining.trim();
  } else {
    updatedContent = headerMarker + cleanEntryContent;
  }

  fs.writeFileSync(LOG_FILE, updatedContent, 'utf8');
  console.log(`✅ Dashboard updated successfully in central log file: ${LOG_FILE}`);
}

module.exports = { updateDashboard };
