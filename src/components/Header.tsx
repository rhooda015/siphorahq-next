import React from 'react';
import Link from 'next/link';
import { ShoppingBag, User } from 'lucide-react';
import { BRAND } from '@/config/brand';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-bg)] border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Area: Icons & Logo */}
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Mobile Menu & Search */}
          <div className="flex items-center flex-1">
            <button className="md:hidden p-2 text-[var(--color-primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button className="hidden md:block p-2 text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-shrink-0 flex justify-center text-center">
            <Link href="/" className="font-serif text-3xl tracking-widest text-[var(--color-primary)] uppercase">
              {BRAND.name}
            </Link>
          </div>

          {/* Right: Account & Cart */}
          <div className="flex items-center justify-end flex-1 gap-2">
            <Link href="#" className="hidden md:block p-2 text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/checkout/cart" className="p-2 text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-0 right-0 bg-[var(--color-primary)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
          </div>

        </div>

        {/* Bottom Header Area: Navigation (Desktop Only) */}
        <nav className="hidden md:flex justify-center items-center pb-4 space-x-8">
          <Link href="/" className="text-[var(--color-text-muted)] hover:underline underline-offset-8 decoration-2 decoration-[var(--color-primary)] transition-all font-sans text-sm tracking-wide">
            Home
          </Link>
          <Link href="/products" className="text-[var(--color-text-muted)] hover:underline underline-offset-8 decoration-2 decoration-[var(--color-primary)] transition-all font-sans text-sm tracking-wide">
            Shop All
          </Link>
          <Link href="/products" className="text-[var(--color-text-muted)] hover:underline underline-offset-8 decoration-2 decoration-[var(--color-primary)] transition-all font-sans text-sm tracking-wide">
            Premium Dinnerware
          </Link>
          <Link href="/products" className="text-[var(--color-text-muted)] hover:underline underline-offset-8 decoration-2 decoration-[var(--color-primary)] transition-all font-sans text-sm tracking-wide">
            Tea & Coffee Sets
          </Link>
          <Link href="/products" className="text-[var(--color-text-muted)] hover:underline underline-offset-8 decoration-2 decoration-[var(--color-primary)] transition-all font-sans text-sm tracking-wide">
            Serveware & Bowls
          </Link>
          <Link href="/gifting" className="text-[var(--color-text-muted)] hover:underline underline-offset-8 decoration-2 decoration-[var(--color-primary)] transition-all font-sans text-sm tracking-wide">
            Luxury Gifting
          </Link>
        </nav>

      </div>
    </header>
  );
}
