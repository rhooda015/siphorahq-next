"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Search, ShoppingCart } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home',        href: '/',        icon: Home },
  { label: 'Collections', href: '/products', icon: Grid },
  { label: 'Search',      href: '/products', icon: Search },
  { label: 'Cart',        href: '/checkout/cart', icon: ShoppingCart },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8E0D5] md:hidden">
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? 'text-[#C9A84C]'
                  : 'text-[#6B6560] hover:text-[#1A1A1A]'
              }`}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
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
