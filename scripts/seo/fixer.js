const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function runFixes(auditData) {
  console.log("🛠️ Starting auto-fix phase...");
  const fixesApplied = [];

  // Fix 1: Canonical domain consistency across workspace
  try {
    const srcDir = path.join(__dirname, '../../src');
    const files = getFilesRecursively(srcDir, ['.tsx', '.ts', '.js']);
    let canonicalFixesCount = 0;

    for (const file of files) {
      let content = fs.readFileSync(file, 'utf8');
      if (content.includes('www.siphorahq.in')) {
        content = content.replace(/www\.siphorahq\.in/g, 'siphorahq.in');
        fs.writeFileSync(file, content, 'utf8');
        canonicalFixesCount++;
      }
    }

    if (canonicalFixesCount > 0) {
      fixesApplied.push({
        status: 'success',
        file: 'Various source files',
        desc: `Replaced www.siphorahq.in with canonical non-www domain in ${canonicalFixesCount} files.`,
        impact: 'Maintains canonical ranking integrity and prevents duplicate indexing paths.'
      });
    }
  } catch (e) {
    console.error("🔴 Failed to run canonical consistency fixes:", e.message);
  }

  // Fix 2: Add missing alt text in JSX images (ProductEditor / Table views)
  try {
    const editorPath = path.join(__dirname, '../../src/components/admin/ProductEditor.tsx');
    if (fs.existsSync(editorPath)) {
      let content = fs.readFileSync(editorPath, 'utf8');
      if (content.includes('alt=""')) {
        content = content.replace(/alt=""/g, 'alt="Siphorahq product preview image"');
        fs.writeFileSync(editorPath, content, 'utf8');
        fixesApplied.push({
          status: 'success',
          file: 'src/components/admin/ProductEditor.tsx',
          desc: 'Replaced blank alt="" attributes with descriptive preview descriptions.',
          impact: 'Improves accessibility validation compliance scores.'
        });
      }
    }

    const tableViewPath = path.join(__dirname, '../../src/components/admin/views/ProductsTableView.tsx');
    if (fs.existsSync(tableViewPath)) {
      let content = fs.readFileSync(tableViewPath, 'utf8');
      if (content.includes('alt=""')) {
        content = content.replace(/alt=""/g, 'alt="Siphorahq catalog item thumbnail"');
        fs.writeFileSync(tableViewPath, content, 'utf8');
        fixesApplied.push({
          status: 'success',
          file: 'src/components/admin/views/ProductsTableView.tsx',
          desc: 'Replaced blank alt="" attributes in table view images with descriptive alt text.',
          impact: 'Improves basic HTML tag markup scores.'
        });
      }
    }
  } catch (e) {
    console.error("🔴 Failed to run alt text auto-fixes:", e.message);
  }

  // Verify build compilation after fixes
  if (fixesApplied.length > 0) {
    console.log("🔨 Verifying Next.js build compilation after fixes...");
    try {
      execSync('npm run build', { cwd: path.join(__dirname, '../..'), stdio: 'ignore' });
      console.log("✅ Build verification succeeded. All fixes are safe.");
    } catch (err) {
      console.error("🔴 Build compilation failed after auto-fixes. Rolling back changes...");
      // Revert fixes in case of compilation issues
      try {
        execSync('git checkout -- src/', { cwd: path.join(__dirname, '../..'), stdio: 'ignore' });
      } catch (revertErr) {}
      throw new Error(`Auto-fix build verification failed. Rolled back workspace changes: ${err.message}`);
    }
  } else {
    console.log("ℹ️ No auto-fixes were required.");
  }

  return fixesApplied;
}

function getFilesRecursively(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(file, extensions));
    } else {
      if (extensions.includes(path.extname(file))) {
        results.push(file);
      }
    }
  });
  return results;
}

module.exports = { runFixes };
