const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('<ProtectedEmail') && !content.includes('import ProtectedEmail')) {
    const importStatement = `import ProtectedEmail from '@/components/ProtectedEmail';\n`;
    
    // insert after "use client" if it exists, otherwise at top
    if (content.includes('"use client";') || content.includes("'use client';")) {
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"use client";') || lines[i].includes("'use client';")) {
          lines.splice(i + 1, 0, importStatement);
          fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
          console.log(`Added import to ${filePath}`);
          return;
        }
      }
    } else {
      content = importStatement + content;
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Added import to ${filePath}`);
    }
  }
}

const files = [
  'src/components/Footer.tsx',
  'src/app/contact/page.tsx',
  'src/app/privacy-policy/page.tsx',
  'src/app/refund-policy/page.tsx',
  'src/app/corporate-gifting/page.tsx',
  'src/app/shipping-policy/page.tsx',
  'src/app/shipping-returns/page.tsx',
  'src/app/terms-of-service/page.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) processFile(f);
});
