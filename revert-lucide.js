const fs = require('fs');
const files = [
  'src/app/page.tsx',
  'src/components/Header.tsx',
  'src/components/MobileBottomNav.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find all lines that import from lucide-react/dist/...
  const importLines = content.match(/import\s+[A-Za-z0-9]+\s+from\s+['"]lucide-react\/dist\/esm\/icons\/[^'"]+['"];?/g) || [];
  
  if (importLines.length > 0) {
    const icons = [];
    importLines.forEach(line => {
      const match = line.match(/import\s+([A-Za-z0-9]+)\s+from/);
      if (match) icons.push(match[1]);
      content = content.replace(line + '\n', '');
      content = content.replace(line, '');
    });
    
    // Convert HeadphonesIcon back to HeadphonesIcon
    const fixedIcons = icons.map(i => i === 'HeadphonesIcon' ? 'HeadphonesIcon' : i);
    
    const newImport = `import { ${fixedIcons.join(', ')} } from 'lucide-react';\n`;
    content = newImport + content;
    fs.writeFileSync(file, content);
    console.log('Reverted', file);
  }
});
