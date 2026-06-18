const fs = require('fs');

function replaceOrderTracking() {
  const filePath = './src/components/account/OrderTracking.tsx';
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/<span\s+className="material-symbols-outlined"\s+aria-hidden="true"\s*>\s*check_circle\s*<\/span>/g, '<CheckCircle2 className="w-5 h-5" aria-hidden="true" />');

  content = content.replace(/<span\s+className="material-symbols-outlined text-burnished-gold text-4xl mb-6"\s+aria-hidden="true"\s*>\s*package_2\s*<\/span>/g, '<Package className="w-10 h-10 text-burnished-gold mb-6" aria-hidden="true" />');

  content = content.replace(/<span\s+className="material-symbols-outlined text-ink-charcoal dark:text-surface-cream text-4xl mb-6"\s+aria-hidden="true"\s*>\s*receipt_long\s*<\/span>/g, '<Receipt className="w-10 h-10 text-ink-charcoal dark:text-surface-cream mb-6" aria-hidden="true" />');

  if (!content.includes('import { CheckCircle2')) {
    content = `import { CheckCircle2, Package, Receipt } from 'lucide-react';\n` + content;
  }
  
  fs.writeFileSync(filePath, content);
}

replaceOrderTracking();
