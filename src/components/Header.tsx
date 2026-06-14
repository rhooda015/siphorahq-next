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
      setIsScrolled(window.scrollY > 40); // 40px is about the height of the announcement bar
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
          { label: 'Collections', url: '/collections' },
          { label: 'New Arrivals', url: '/products' },
          { label: 'Best Sellers', url: '/products' },
          { label: 'Gift Sets', url: '/collections/gifting' },
          { label: 'Our Story', url: '/our-story' }
        ]);
      }
      
      if (mobile.links && mobile.links.length > 0) {
        setMobileNav(mobile.links);
      } else {
        setMobileNav([
          { label: 'Shop', url: '/products' },
          { label: 'Collections', url: '/collections' },
          { label: 'New Arrivals', url: '/products' },
          { label: 'Best Sellers', url: '/products' },
          { label: 'Gift Sets', url: '/collections/gifting' },
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
      <header className="fixed w-full top-0 z-50 bg-surface-cream border-b border-muted-sand py-4">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex justify-between items-center">
          <Link href="/checkout/cart" className="text-sm font-body-md text-on-surface-variant hover:text-ink-charcoal">
            Return to Cart
          </Link>
          <Link href="/" className="font-headline-lg text-2xl font-bold text-ink-charcoal italic tracking-tighter">
            {BRAND.name}
          </Link>
          <div className="flex items-center gap-2 text-ink-charcoal">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span className="font-label-caps text-label-caps uppercase tracking-widest">Secure</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-50 w-full flex flex-col">
        {/* 1. Announcement Bar */}
        <div className="bg-ink-charcoal text-surface-cream py-3 overflow-hidden border-b border-burnished-gold/20 relative z-50">
          <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">Free Shipping Above ₹999</span>
            <span className="w-1.5 h-1.5 rounded-full bg-burnished-gold"></span>
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">Secure Razorpay Checkout</span>
            <span className="w-1.5 h-1.5 rounded-full bg-burnished-gold"></span>
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">Luxury Gift Packaging Included</span>
            <span className="w-1.5 h-1.5 rounded-full bg-burnished-gold"></span>
            {/* Duplicate for seamless loop */}
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">Free Shipping Above ₹999</span>
            <span className="w-1.5 h-1.5 rounded-full bg-burnished-gold"></span>
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">Secure Razorpay Checkout</span>
            <span className="w-1.5 h-1.5 rounded-full bg-burnished-gold"></span>
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">Luxury Gift Packaging Included</span>
          </div>
        </div>

        {/* 2. Luxury Header */}
        <header className={`transition-all duration-500 bg-surface-cream/95 backdrop-blur-sm border-b ${isScrolled ? 'border-muted-sand shadow-sm' : 'border-transparent'}`}>
          <nav className="flex justify-between items-center px-5 md:px-margin-desktop py-5 w-full max-w-container-max mx-auto">
            <div className="flex items-center gap-12">
              <div className="flex items-center xl:hidden mr-4">
                <button 
                  className="text-ink-charcoal hover:text-burnished-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-6 w-6 stroke-[1.5]" />
                </button>
              </div>

              <Link href="/" className="font-headline-lg text-2xl md:text-3xl tracking-tighter text-ink-charcoal italic whitespace-nowrap">
                {BRAND.name}
              </Link>

              <div className="hidden xl:flex gap-8">
                {desktopNav.map((item, index) => (
                  <Link 
                    key={item.label}
                    href={item.url} 
                    className={`font-label-caps text-[12px] transition-colors ${
                      index === 0 
                      ? 'text-ink-charcoal border-b border-burnished-gold pb-1' 
                      : 'text-on-surface-variant hover:text-ink-charcoal'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <button 
                className="hover:text-burnished-gold transition-colors hidden md:block"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <span className="material-symbols-outlined">search</span>
              </button>
              <Link href={session ? "/account" : "/login"} className="hover:text-burnished-gold transition-colors hidden md:block">
                <span className="material-symbols-outlined">person</span>
              </Link>
              <button className="hover:text-burnished-gold transition-colors relative hidden md:block">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button onClick={openDrawer} className="hover:text-burnished-gold transition-colors relative">
                <span className="material-symbols-outlined">shopping_bag</span>
                <span className={`absolute -top-1 -right-1 bg-burnished-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${mounted && items.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                  {mounted ? items.length : 0}
                </span>
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Desktop Search Dropdown */}
      {isSearchOpen && (
        <div className="fixed top-[130px] left-0 w-full bg-surface-cream shadow-md p-6 border-b border-muted-sand z-[40] pointer-events-auto transition-all">
          <div className="max-w-3xl mx-auto relative">
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search by style, category, occasion..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-b border-ink-charcoal text-xl font-display-lg py-3 px-2 focus:outline-none focus:border-burnished-gold bg-transparent text-ink-charcoal placeholder:text-on-surface-variant/50"
                autoFocus
              />
              <button type="submit" className="absolute right-2 top-3 text-on-surface-variant hover:text-ink-charcoal transition-colors">
                <span className="material-symbols-outlined text-[24px]">search</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[100] bg-surface-cream flex flex-col xl:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-muted-sand h-20">
          <span className="font-headline-lg text-2xl tracking-tighter text-ink-charcoal italic">{BRAND.name}</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-4 text-ink-charcoal" aria-label="Close menu">
            <X className="h-8 w-8" />
          </button>
        </div>
        <div className="flex flex-col p-6 space-y-6 overflow-y-auto">
          {mobileNav.map((item) => (
            <Link 
              key={item.label}
              href={item.url} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="font-headline-md text-2xl text-ink-charcoal border-b border-muted-sand pb-4"
            >
              {item.label}
            </Link>
          ))}
          <Link href={session ? "/account" : "/login"} onClick={() => setIsMobileMenuOpen(false)} className="font-headline-md text-2xl text-ink-charcoal pt-4">
            {session ? session.user?.name || "My Account" : "Sign In"}
          </Link>
        </div>
      </div>
    </>
  );
}
