"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, MessageCircle, Store } from 'lucide-react';
import { useCart } from '@/store/useCart';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const WHATSAPP_NUMBER = "919540027978";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Siphorahq%2C%20I%20need%20help%20choosing%20a%20premium%20gift.`;
  const { items, openDrawer } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-porcelain-white/95 backdrop-blur-md border-t border-bone-gray md:hidden pb-safe">
      <div className="flex items-stretch h-16">
        
        {/* Home */}
        <Link
          href="/"
          className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors text-heritage-navy hover:bg-champagne-gold/10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Home
          </span>
        </Link>

        {/* Shop Now */}
        <Link
          href="/products"
          className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors text-heritage-navy bg-champagne-gold/10"
        >
          <Store className="w-5 h-5 text-champagne-gold" strokeWidth={1.5} />
          <span className="text-[10px] font-bold uppercase tracking-widest text-champagne-gold">
            Shop Now
          </span>
        </Link>

        {/* Cart */}
        <button
          onClick={() => openDrawer()}
          className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors text-heritage-navy relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            <span className={`absolute -top-2 -right-2 bg-champagne-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${mounted && items.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              {mounted ? items.length : 0}
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Cart
          </span>
        </button>

      </div>
    </nav>
  );
}
