"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BRAND } from '@/config/brand';
import { useCart } from '@/store/useCart';
import { useSession } from 'next-auth/react';
import { X, Menu, ChevronRight } from 'lucide-react';

const NAVIGATION_LINKS = [
  { label: 'Shop', url: '/products' },
  { label: 'Collections', url: '/collections', hasMegaMenu: true },
  { label: 'New Arrivals', url: '/new-arrivals' },
  { label: 'Best Sellers', url: '/best-sellers' },
  { label: 'Gift Sets', url: '/gift-sets' },
  { label: 'Our Story', url: '/our-story' },
  { label: 'Contact', url: '/contact' }
];

const MEGA_MENU_ITEMS = [
  { title: "Dining Collection", url: "/collections/dinnerware" },
  { title: "Tea & Coffee Collection", url: "/collections/tea-coffee" },
  { title: "Serveware", url: "/collections/serveware" },
  { title: "Luxury Gift Sets", url: "/gift-sets" },
  { title: "Fine Porcelain Cups", url: "/products?category=cups" },
  { title: "Premium Mugs", url: "/products?category=mugs" }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const isCheckout = pathname.startsWith('/checkout');
  const { items, openDrawer } = useCart();
  const { data: session } = useSession();

  if (pathname?.startsWith('/admin')) return null;

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
      <div className="sticky top-0 z-50 w-full flex flex-col group/header">
        {/* 1. Announcement Bar */}
        <div className="bg-ink-charcoal text-surface-cream py-3 overflow-hidden border-b border-burnished-gold/20 relative z-50">
          <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">Free Shipping Pan India Above ₹999</span>
            <span className="w-1.5 h-1.5 rounded-full bg-burnished-gold"></span>
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">Secure Razorpay Checkout</span>
            <span className="w-1.5 h-1.5 rounded-full bg-burnished-gold"></span>
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">Luxury Gift Packaging Included</span>
            <span className="w-1.5 h-1.5 rounded-full bg-burnished-gold"></span>
            {/* Duplicate for seamless loop */}
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">Free Shipping Pan India Above ₹999</span>
            <span className="w-1.5 h-1.5 rounded-full bg-burnished-gold"></span>
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">Secure Razorpay Checkout</span>
            <span className="w-1.5 h-1.5 rounded-full bg-burnished-gold"></span>
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em]">Luxury Gift Packaging Included</span>
          </div>
        </div>

        {/* 2. Luxury Header */}
        <header className={`transition-all duration-500 bg-surface-cream/95 backdrop-blur-md border-b ${isScrolled ? 'border-muted-sand shadow-sm' : 'border-transparent'} relative z-50 h-16 flex items-center`}>
          <nav className="flex justify-between items-center px-4 md:px-margin-desktop w-full max-w-container-max mx-auto relative">
            <div className="flex items-center gap-4 md:gap-12">
              <div className="flex items-center xl:hidden">
                <button 
                  className="text-ink-charcoal hover:text-burnished-gold transition-colors p-1 -ml-1"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-6 w-6 stroke-[1.5]" />
                </button>
              </div>

              <Link href="/" className="font-headline-lg text-2xl md:text-3xl tracking-tighter text-ink-charcoal italic whitespace-nowrap absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 xl:static xl:translate-x-0 xl:translate-y-0">
                {BRAND.name}
              </Link>

              <div className="hidden xl:flex gap-8">
                {NAVIGATION_LINKS.map((item) => (
                  <div 
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.hasMegaMenu && setHoveredMenu(item.label)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <Link 
                      href={item.url} 
                      className={`font-label-caps text-[12px] uppercase tracking-widest relative pb-2 transition-colors ${
                        pathname === item.url || (pathname.startsWith('/products') && item.label === 'Shop')
                        ? 'text-ink-charcoal' 
                        : 'text-on-surface-variant hover:text-ink-charcoal'
                      } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-burnished-gold after:transition-transform after:duration-300 after:origin-left ${
                        pathname === item.url || (pathname.startsWith('/products') && item.label === 'Shop') ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                      }`}
                    >
                      {item.label}
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {item.hasMegaMenu && hoveredMenu === item.label && (
                      <div className="absolute top-full left-0 pt-6 w-64 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="bg-surface-cream shadow-xl border border-muted-sand p-6 flex flex-col gap-4">
                          <p className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-burnished-gold mb-2">Explore Collections</p>
                          {MEGA_MENU_ITEMS.map((megaItem) => (
                            <Link 
                              key={megaItem.title} 
                              href={megaItem.url}
                              className="font-body-md text-sm text-on-surface-variant hover:text-ink-charcoal transition-colors hover:translate-x-1 transform duration-300"
                            >
                              {megaItem.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <button 
                className="hover:text-burnished-gold transition-colors hidden md:block"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Toggle search"
              >
                <span className="material-symbols-outlined">search</span>
              </button>
              <Link href={session ? "/account" : "/login"} className="hover:text-burnished-gold transition-colors hidden md:block" aria-label="Account">
                <span className="material-symbols-outlined">person</span>
              </Link>
              <button onClick={() => router.push('/account/wishlist')} className="hover:text-burnished-gold transition-colors relative hidden md:block" aria-label="View wishlist">
                <span className="material-symbols-outlined">favorite</span>
              </button>
              <button onClick={openDrawer} className="hover:text-burnished-gold transition-colors relative" aria-label="Open cart">
                <span className="material-symbols-outlined">shopping_bag</span>
                <span className={`absolute -top-1 -right-1 bg-burnished-gold text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${mounted && items.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                  {mounted ? items.length : 0}
                </span>
              </button>
            </div>
          </nav>
        </header>

        {/* Global Hover Overlay for Mega Menu */}
        {hoveredMenu && (
          <div className="fixed inset-0 top-[110px] bg-ink-charcoal/20 backdrop-blur-sm z-40 pointer-events-none transition-opacity duration-300" />
        )}
      </div>

      {/* Desktop Search Dropdown */}
      {isSearchOpen && (
        <div className="fixed top-[110px] left-0 w-full bg-surface-cream shadow-md p-6 border-b border-muted-sand z-[60] pointer-events-auto transition-all">
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
              <button type="submit" className="absolute right-2 top-3 text-on-surface-variant hover:text-ink-charcoal transition-colors" aria-label="Submit search">
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
          {NAVIGATION_LINKS.map((item) => (
            <div key={item.label}>
              <Link 
                href={item.url} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="flex items-center justify-between font-headline-md text-2xl text-ink-charcoal hover:text-burnished-gold transition-colors border-b border-muted-sand pb-4"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-6 h-6 text-on-surface-variant opacity-50" />
              </Link>
              {item.hasMegaMenu && (
                <div className="flex flex-col gap-3 pt-4 pl-4 border-l border-burnished-gold/30 mt-4">
                  {MEGA_MENU_ITEMS.map((mega) => (
                    <Link 
                      key={mega.title}
                      href={mega.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-body-md text-on-surface-variant text-lg"
                    >
                      {mega.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link href={session ? "/account" : "/login"} onClick={() => setIsMobileMenuOpen(false)} className="font-headline-md text-2xl text-ink-charcoal pt-4 border-t border-muted-sand block">
            {session ? "My Account" : "Sign In"}
          </Link>
        </div>
      </div>
    </>
  );
}
