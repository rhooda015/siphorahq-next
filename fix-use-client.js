const fs = require('fs');
['src/components/Header.tsx', 'src/components/MobileBottomNav.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('"use client";')) {
    content = content.replace(/"use client";\n?/g, '');
    content = '"use client";\n' + content;
    fs.writeFileSync(file, content);
    console.log('Fixed use client in', file);
  }
});
