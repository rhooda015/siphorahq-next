const fs = require('fs');
const glob = require('fs').readdirSync; // not recursive, let's just hardcode the files
const files = [
  'src/app/page.tsx',
  'src/components/Header.tsx',
  'src/components/MobileBottomNav.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const lucideRegex = /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]lucide-react['"];?/g;
  let changed = false;
  
  content = content.replace(lucideRegex, (match, iconsStr) => {
    changed = true;
    const icons = iconsStr.split(',').map(i => i.trim()).filter(Boolean);
    return icons.map(icon => {
      // lucide-react direct import path converts PascalCase to kebab-case
      const kebab = icon.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      return `import ${icon} from 'lucide-react/dist/esm/icons/${kebab}';`;
    }).join('\n');
  });

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Fixed imports in', file);
  }
});
