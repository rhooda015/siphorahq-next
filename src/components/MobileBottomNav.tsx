"use client";
import { ShoppingBag, Store, User } from 'lucide-react';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/store/useCart';
import { useSession } from 'next-auth/react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { items, openDrawer } = useCart();
  const { data: session } = useSession();
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
          className={`flex-1 flex flex-col items-center justify-center p-2 gap-1 transition-colors ${pathname === '/' ? 'text-champagne-gold bg-champagne-gold/10' : 'text-heritage-navy hover:bg-champagne-gold/5'}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Home
          </span>
        </Link>

        {/* Shop */}
        <Link
          href="/products"
          className={`flex-1 flex flex-col items-center justify-center p-2 gap-1 transition-colors ${pathname?.startsWith('/products') || pathname?.startsWith('/collections') ? 'text-champagne-gold bg-champagne-gold/10' : 'text-heritage-navy hover:bg-champagne-gold/5'}`}
        >
          <Store className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Shop
          </span>
        </Link>

        {/* Profile */}
        <Link
          href={session ? "/account" : "/login"}
          className={`flex-1 flex flex-col items-center justify-center p-2 gap-1 transition-colors ${pathname?.startsWith('/account') || pathname === '/login' ? 'text-champagne-gold bg-champagne-gold/10' : 'text-heritage-navy hover:bg-champagne-gold/5'}`}
        >
          <User className="w-5 h-5" strokeWidth={1.5} />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Profile
          </span>
        </Link>

        {/* Cart */}
        <button
          onClick={() => openDrawer()}
          className="flex-1 flex flex-col items-center justify-center p-2 gap-1 transition-colors text-heritage-navy relative hover:bg-champagne-gold/5"
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
