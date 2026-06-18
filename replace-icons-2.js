const fs = require('fs');
const path = require('path');

function replaceAccountDashboard() {
  const filePath = './src/components/account/AccountDashboard.tsx';
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Link replacements
  content = content.replace(/className="material-symbols-outlined hover:text-burnished-gold transition-colors hidden sm:inline-flex"\s*>\s*search\s*<\/Link>/g, 
  'className="hover:text-burnished-gold transition-colors hidden sm:inline-flex"><Search className="w-5 h-5" /></Link>');

  content = content.replace(/className="material-symbols-outlined border-b-2 border-burnished-gold pb-0.5"\s*>\s*person\s*<\/Link>/g, 
  'className="border-b-2 border-burnished-gold pb-0.5"><User className="w-5 h-5" /></Link>');

  content = content.replace(/className="material-symbols-outlined hover:text-burnished-gold transition-colors hidden sm:inline-flex"\s*>\s*favorite\s*<\/Link>/g, 
  'className="hover:text-burnished-gold transition-colors hidden sm:inline-flex"><Heart className="w-5 h-5" /></Link>');

  content = content.replace(/className="material-symbols-outlined hover:text-burnished-gold transition-colors"\s*>\s*shopping_bag\s*<\/Link>/g, 
  'className="hover:text-burnished-gold transition-colors"><ShoppingBag className="w-5 h-5" /></Link>');

  // Spans
  content = content.replace(/<span\s+className="material-symbols-outlined text-burnished-gold"\s*>\s*stars\s*<\/span>/g, '<Star className="w-5 h-5 text-burnished-gold" />');
  
  content = content.replace(/<span\s+className="material-symbols-outlined"\s+style={{[^}]*}}\s+aria-hidden="true"\s*>\s*local_shipping\s*<\/span>/g, '<Truck className="w-5 h-5" aria-hidden="true" />');

  content = content.replace(/<span\s+className="material-symbols-outlined text-burnished-gold"\s*>\s*workspace_premium\s*<\/span>/g, '<Award className="w-5 h-5 text-burnished-gold" />');

  content = content.replace(/<span\s+className="material-symbols-outlined"\s+style={{[^}]*}}\s+aria-hidden="true"\s*>\s*card_giftcard\s*<\/span>/g, '<Gift className="w-5 h-5" aria-hidden="true" />');
  
  content = content.replace(/<span\s+className="material-symbols-outlined text-outline group-hover:text-ink-charcoal dark:group-hover:text-surface-cream transition-colors shrink-0 ml-4"\s*>\s*chevron_right\s*<\/span>/g, '<ChevronRight className="w-5 h-5 text-outline group-hover:text-ink-charcoal dark:group-hover:text-surface-cream transition-colors shrink-0 ml-4" />');

  content = content.replace(/<span\s+className="material-symbols-outlined text-burnished-gold"\s*>\s*diamond\s*<\/span>/g, '<Gem className="w-5 h-5 text-burnished-gold" />');
  
  content = content.replace(/<a[^>]*className="material-symbols-outlined hover:text-burnished-gold transition-colors"[^>]*>\s*([a-zA-Z_]+)\s*<\/a>/g, (match, icon) => {
    let lucide = icon;
    if (icon === 'camera_alt') lucide = 'Camera';
    if (icon === 'share') lucide = 'Share2';
    // The social icons might be custom strings, actually they were probably replaced earlier? 
    // Wait, the icons in the footer part of AccountDashboard are 'camera_alt', 'share', 'mail', 'phone'
    return match.replace(/className="material-symbols-outlined/, 'className="').replace(/>\s*[a-zA-Z_]+\s*<\/a>/, `><${lucide} className="w-5 h-5" /></a>`);
  });

  content = content.replace(/<span\s+className="material-symbols-outlined"\s+style={{[^}]*}}\s+aria-hidden="true"\s*>\s*arrow_forward\s*<\/span>/g, '<ArrowRight className="w-5 h-5" aria-hidden="true" />');

  // Add imports
  if (!content.includes('import { Search')) {
    content = `import { Search, User, Heart, ShoppingBag, Star, Truck, Award, Gift, ChevronRight, Gem, Camera, Share2, Mail, Phone, ArrowRight } from 'lucide-react';\n` + content;
  }
  
  fs.writeFileSync(filePath, content);
}

replaceAccountDashboard();
