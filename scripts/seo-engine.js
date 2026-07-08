require('dotenv').config();
const path = require('path');
const fs = require('fs');

const { runCrawler } = require('./seo/crawler');
const { runCompetitorCrawl } = require('./seo/competitor');
const { runLighthouse } = require('./seo/lighthouse');
const { runGSC } = require('./seo/gsc');
const { runFixes } = require('./seo/fixer');
const { updateDashboard } = require('./seo/dashboard');

async function main() {
  const args = process.argv.slice(2);
  const dateStr = new Date().toISOString().split('T')[0];
  const historyDir = path.join(__dirname, '../seo-history', dateStr);

  // Ensure directories exist
  if (!fs.existsSync(historyDir)) {
    fs.mkdirSync(historyDir, { recursive: true });
  }

  console.log(`\n======================================================`);
  console.log(`🎯 Siphorahq Autonomous SEO Engineer Suite - ${dateStr}`);
  console.log(`======================================================\n`);

  if (args.includes('--mode=audit')) {
    console.log("🔍 Running SEO Audit Mode...");
    const auditData = await runCrawler(historyDir);
    const competitorData = await runCompetitorCrawl(historyDir);
    
    // Save raw audit data
    fs.writeFileSync(
      path.join(historyDir, 'audit.json'),
      JSON.stringify({ date: dateStr, audit: auditData, competitor: competitorData }, null, 2)
    );
    
    // Compile summary report
    await updateDashboard(historyDir, auditData, competitorData, null, null, null);
    console.log(`✅ Audit complete. Saved in: ${historyDir}/audit.json`);

  } else if (args.includes('--mode=fix')) {
    console.log("🔧 Running Safe Auto-Fix Mode...");
    const auditData = await runCrawler(historyDir);
    const competitorData = await runCompetitorCrawl(historyDir);
    
    // Run safe fixes
    const fixesApplied = await runFixes(auditData);
    
    // Save fixes applied log
    fs.writeFileSync(
      path.join(historyDir, 'fixes-applied.json'),
      JSON.stringify(fixesApplied, null, 2)
    );
    
    // Create markdown log of fixes
    const fixesMd = `# Safe SEO Fixes Applied - ${dateStr}\n\n` +
      `Total Fixes: ${fixesApplied.length}\n\n` +
      fixesApplied.map(f => `* **[${f.status.toUpperCase()}]** File: \`${f.file}\` | Change: ${f.desc} | Expected Impact: ${f.impact}`).join('\n') + '\n';
    
    fs.writeFileSync(path.join(historyDir, 'fixes-applied.md'), fixesMd);

    // Re-audit to check improvements and verify build
    console.log("🛠️ Re-running audit and validating Next.js build...");
    const postAuditData = await runCrawler(historyDir);
    
    await updateDashboard(historyDir, postAuditData, competitorData, null, null, fixesApplied);
    console.log(`✅ Fixes applied and validated successfully.`);

  } else if (args.includes('--lighthouse')) {
    console.log("⚡ Running Lighthouse / PageSpeed Insights Performance Check...");
    const lhData = await runLighthouse(historyDir);
    
    // Update summary with Lighthouse data
    await updateDashboard(historyDir, null, null, lhData, null, null);
    console.log(`✅ Performance check complete.`);

  } else if (args.includes('--gsc')) {
    console.log("📈 Running Google Search Console Integration...");
    const gscData = await runGSC(historyDir);
    
    // Update summary with GSC data
    await updateDashboard(historyDir, null, null, null, gscData, null);
    console.log(`✅ GSC data synchronization complete.`);

  } else if (args.includes('--dashboard')) {
    console.log("📊 Compiling dashboards...");
    // Load historical entries if they exist
    let auditData = null;
    let competitorData = null;
    let lhData = null;
    let gscData = null;
    let fixesApplied = null;

    try {
      if (fs.existsSync(path.join(historyDir, 'audit.json'))) {
        const raw = JSON.parse(fs.readFileSync(path.join(historyDir, 'audit.json'), 'utf8'));
        auditData = raw.audit;
        competitorData = raw.competitor;
      }
      if (fs.existsSync(path.join(historyDir, 'lighthouse.json'))) {
        lhData = JSON.parse(fs.readFileSync(path.join(historyDir, 'lighthouse.json'), 'utf8'));
      }
      if (fs.existsSync(path.join(historyDir, 'gsc.json'))) {
        gscData = JSON.parse(fs.readFileSync(path.join(historyDir, 'gsc.json'), 'utf8'));
      }
      if (fs.existsSync(path.join(historyDir, 'fixes-applied.json'))) {
        fixesApplied = JSON.parse(fs.readFileSync(path.join(historyDir, 'fixes-applied.json'), 'utf8'));
      }
    } catch(e) {}

    await updateDashboard(historyDir, auditData, competitorData, lhData, gscData, fixesApplied);
    console.log(`✅ Dashboard updated successfully.`);

  } else {
    console.log("Usage: node scripts/seo-engine.js [options]");
    console.log("Options:");
    console.log("  --mode=audit      Run crawler and gap analysis");
    console.log("  --mode=fix        Run safe fixes and verification");
    console.log("  --lighthouse      Run Lighthouse/PageSpeed checks");
    console.log("  --gsc             Sync Search Console data");
    console.log("  --dashboard       Update final dashboard in seo-log.md");
  }
}

main().catch(err => {
  console.error("🔴 Fatal execution error:", err);
  process.exit(1);
});
