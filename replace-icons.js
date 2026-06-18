const fs = require('fs');
const path = require('path');

const iconMap = {
  'add': 'Plus',
  'redeem': 'Gift',
  'diamond': 'Gem',
  'verified_user': 'ShieldCheck',
  'replay': 'RefreshCw',
  'local_shipping': 'Truck',
  'workspace_premium': 'Award',
  'headset_mic': 'HeadphonesIcon',
  'shopping_bag': 'ShoppingBag',
  'star': 'Star',
  'local_fire_department': 'Flame',
  'eco': 'Leaf',
  'expand_more': 'ChevronDown',
  'support_agent': 'Headset',
  'share': 'Share2',
  'photo_camera': 'Camera',
  'mail': 'Mail',
  'call': 'Phone',
  'lock': 'Lock',
  'search': 'Search',
  'person': 'User',
  'favorite': 'Heart',
  'close': 'X',
  'tune': 'SlidersHorizontal',
  'arrow_right_alt': 'ArrowRight',
  'arrow_forward': 'ArrowRight',
  'check_circle': 'CheckCircle2',
  'info': 'Info',
  'warning': 'AlertTriangle',
  'error': 'XCircle',
  'menu': 'Menu'
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Find all material-symbols-outlined spans
  const regex = /<span[^>]*className=["'][^"']*material-symbols-outlined[^"']*["'][^>]*>([\w_]+)<\/span>/g;
  
  const iconsUsed = new Set();
  
  content = content.replace(regex, (match, iconName) => {
    // try to match the exact icon name
    const mapped = iconMap[iconName] || iconMap[iconName.toLowerCase()];
    if (mapped) {
      iconsUsed.add(mapped);
      // Extract classnames to preserve them if needed, but for simplicity, let's just replace with the Lucide component
      // We will add className="w-5 h-5 inline-block" as default
      
      // Extract original classes
      const classMatch = match.match(/className=["']([^"']+)["']/);
      let classes = classMatch ? classMatch[1] : '';
      classes = classes.replace(/material-symbols-outlined/g, '').replace(/text-\[\d+px\]/g, '').replace(/!text-sm/g, '').trim();
      
      return `<${mapped} className="${classes} w-5 h-5 inline-block" />`;
    }
    return match; // fallback
  });

  // Handle dynamic ones like {item.icon} -> we can't easily replace those with static imports, but let's see if there are any.
  // We'll leave them as is, or we'll need to change the data source.
  
  if (iconsUsed.size > 0 && content !== originalContent) {
    // Add imports
    const importStatement = `import { ${Array.from(iconsUsed).join(', ')} } from 'lucide-react';\n`;
    
    // Find the last import
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLastImport = content.indexOf('\\n', lastImportIndex);
      content = importStatement + content;
    } else {
      content = importStatement + content;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath} with ${Array.from(iconsUsed).join(', ')}`);
  }
}

processDirectory('./src');
