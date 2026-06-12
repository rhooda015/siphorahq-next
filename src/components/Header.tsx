"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BRAND } from '@/config/brand';
import { useCart } from '@/store/useCart';
import { useSession } from 'next-auth/react';
import { X, Menu } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isCheckout = pathname.startsWith('/checkout');
  const { items, openDrawer } = useCart();
  const { data: session } = useSession();
  
  const [desktopNav, setDesktopNav] = useState<any[]>([]);
  const [mobileNav, setMobileNav] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    Promise.all([
      fetch('/api/admin/navigation?menuId=main-menu').then(r => r.json()),
      fetch('/api/admin/navigation?menuId=mobile-menu').then(r => r.json())
    ]).then(([main, mobile]) => {
      if (main.links && main.links.length > 0) {
        setDesktopNav(main.links);
      } else {
        setDesktopNav([
          { label: 'Shop', url: '/products' },
          { label: 'Collections', url: '/products' },
          { label: 'Our Story', url: '/our-story' }
        ]);
      }
      
      if (mobile.links && mobile.links.length > 0) {
        setMobileNav(mobile.links);
      } else {
        setMobileNav([
          { label: 'Shop', url: '/products' },
          { label: 'Collections', url: '/products' },
          { label: 'Our Story', url: '/our-story' }
        ]);
      }
    }).catch(e => console.error(e));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname === '/login' || pathname.startsWith('/account') || pathname.startsWith('/admin')) {
    return null;
  }

  if (isCheckout && pathname !== '/checkout/cart') {
    return (
      <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-porcelain-white border-b border-bone-gray py-4">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex justify-between items-center">
          <Link href="/checkout/cart" className="text-sm font-body-md text-on-surface-variant hover:text-heritage-navy">
            Return to Cart
          </Link>
          <Link href="/" className="font-display-lg text-headline-lg font-bold text-heritage-navy tracking-tight uppercase">
            {BRAND.name}
          </Link>
          <div className="flex items-center gap-2 text-heritage-navy">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Secure</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 bg-porcelain-white/85 dark:bg-obsidian/85 backdrop-blur-md transition-all duration-300 ${isScrolled ? 'border-b border-bone-gray dark:border-on-surface-variant/20 shadow-sm dark:shadow-none' : 'border-b border-transparent'}`}>
        <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          
          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden">
            <button 
              className="p-2 text-heritage-navy hover:text-champagne-gold transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6 stroke-[1.5]" />
            </button>
          </div>

          <Link href="/" className="font-display-lg text-headline-lg font-bold text-heritage-navy dark:text-porcelain-white tracking-tight uppercase">
            {BRAND.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {desktopNav.map((item) => (
              <Link 
                key={item.label}
                href={item.url} 
                className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant dark:text-on-primary-container/70 pb-1 hover:text-champagne-gold transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button 
              className="material-symbols-outlined cursor-pointer transition-opacity active:opacity-70 hover:text-champagne-gold hidden md:block"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              search
            </button>
            <Link href={session ? "/account" : "/login"} className="material-symbols-outlined cursor-pointer transition-opacity active:opacity-70 hover:text-champagne-gold hidden md:block">
              person
            </Link>
            <button className="material-symbols-outlined cursor-pointer transition-opacity active:opacity-70 hover:text-champagne-gold hidden md:block">
              favorite
            </button>
            <button onClick={openDrawer} className="relative cursor-pointer transition-opacity active:opacity-70 group">
              <span className="material-symbols-outlined text-heritage-navy dark:text-porcelain-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                shopping_bag
              </span>
              <span className={`absolute -top-1 -right-1 bg-champagne-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${mounted && items.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                {mounted ? items.length : 0}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Search Dropdown */}
      {isSearchOpen && (
        <div className="fixed top-20 left-0 w-full bg-porcelain-white shadow-md p-6 border-b border-bone-gray z-[60] pointer-events-auto transition-all">
          <div className="max-w-3xl mx-auto relative">
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search by style, category, occasion..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-b border-heritage-navy text-xl font-display-lg py-3 px-2 focus:outline-none focus:border-champagne-gold bg-transparent text-heritage-navy placeholder:text-on-surface-variant/50"
                autoFocus
              />
              <button type="submit" className="absolute right-2 top-3 text-on-surface-variant hover:text-heritage-navy transition-colors">
                <span className="material-symbols-outlined text-[24px]">search</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[100] bg-porcelain-white flex flex-col md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-bone-gray h-20">
          <span className="font-display-lg text-headline-md tracking-tight text-heritage-navy uppercase">{BRAND.name}</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-4 text-heritage-navy" aria-label="Close menu">
            <X className="h-8 w-8" />
          </button>
        </div>
        <div className="flex flex-col p-6 space-y-6 overflow-y-auto">
          {mobileNav.map((item) => (
            <Link 
              key={item.label}
              href={item.url} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="font-display-lg text-headline-md text-heritage-navy border-b border-bone-gray pb-4"
            >
              {item.label}
            </Link>
          ))}
          <Link href={session ? "/account" : "/login"} onClick={() => setIsMobileMenuOpen(false)} className="font-display-lg text-headline-md text-heritage-navy pt-4">
            {session ? session.user?.name || "My Account" : "Sign In"}
          </Link>
        </div>
      </div>
    </>
  );
}
