const fs = require('fs');
const path = require('path');

const files = [
  'src/app/account/orders/[id]/page.tsx',
  'src/app/account/page.tsx',
  'src/app/api/orders/route.ts',
  'src/app/api/user/addresses/add/route.ts',
  'src/app/api/user/addresses/route.ts',
  'src/app/api/user/cart/route.ts',
  'src/app/api/user/wishlist/route.ts'
];

files.forEach(file => {
  const filePath = path.join('/Users/mac/Desktop/ai studio', file);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/from\s+['"]@\/app\/api\/auth\/\[\.\.\.nextauth\]\/route['"]/g, "from '@/lib/auth'");
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  } catch (err) {
    console.error(`Error with ${file}:`, err);
  }
});
