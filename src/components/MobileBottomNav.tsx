"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/store/useCart';
import { Home, Grid, Search, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';

const NAV_ITEMS = [
  { label: 'Home',        href: '/',        icon: Home },
  { label: 'Collections', href: '/products', icon: Grid },
  { label: 'Search',      href: '/search', icon: Search },
  { label: 'Cart',        href: '/checkout/cart', icon: ShoppingCart },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { openDrawer } = useCart();
  const { data: session } = useSession();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8E0D5] md:hidden">
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          if (item.label === 'Cart') {
            const firstName = session?.user?.name ? session.user.name.split(' ')[0] : null;
            const cartLabel = firstName ? `${firstName}'s Cart` : 'Cart';
            return (
              <button
                key={item.label}
                onClick={openDrawer}
                className="flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-300 text-[#6B6560] hover:text-[#1a1612] max-w-[25vw] px-1 group relative pt-1"
                aria-label="Open Cart"
              >
                <Icon className="w-6 h-6 flex-shrink-0 group-hover:-translate-y-0.5 transition-transform" strokeWidth={1.5} />
                <span className="text-[10px] font-sans uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                  {cartLabel}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-300 relative pt-1 group ${
                isActive
                  ? 'text-[#8b6914]'
                  : 'text-[#6B6560] hover:text-[#1a1612]'
              }`}
              aria-label={item.label}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#8b6914] rounded-b-md" />
              )}
              <Icon className={`w-6 h-6 group-hover:-translate-y-0.5 transition-transform ${isActive ? 'stroke-[2]' : 'stroke-[1.5]'}`} />
              <span className="text-[10px] font-sans uppercase tracking-widest">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
