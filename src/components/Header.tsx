"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, User, X, Search, Menu, Lock, Truck, ShieldCheck, Phone } from 'lucide-react';
import { BRAND } from '@/config/brand';
import { useCart } from '@/store/useCart';
import { useSession } from 'next-auth/react';



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
          { label: 'Collections', url: '/products' },
          { label: 'Our Story', url: '/our-story' },
          { label: 'Contact', url: '/contact' }
        ]);
      }
      
      if (mobile.links && mobile.links.length > 0) {
        setMobileNav(mobile.links);
      } else {
        setMobileNav([
          { label: 'All Collections', url: '/products' },
          { label: 'Our Story', url: '/our-story' },
          { label: 'Contact', url: '/contact' }
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
      <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-[var(--color-bg)] border-b border-[var(--color-border)] py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link href="/checkout/cart" className="text-sm font-sans text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
            Return to Cart
          </Link>
          <Link href="/" className="font-serif text-2xl tracking-widest text-[var(--color-primary)] uppercase">
            {BRAND.name}
          </Link>
          <div className="flex items-center gap-2 text-[var(--color-primary)]">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-sans font-medium uppercase tracking-widest">Secure</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Global Trust Bar */}
      <div className="bg-[var(--color-primary)] text-white text-xs font-sans py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-12 items-center tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Truck className="w-3 h-3" />
            <span>Free Shipping Over ₹{BRAND.freeShippingThreshold.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            <span>100% Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3" />
            <span>Premium Support</span>
          </div>
        </div>
      </div>
      {/* Mobile Trust Bar (Single Item) */}
      <div className="bg-[var(--color-primary)] text-white text-[10px] font-sans py-1.5 md:hidden text-center tracking-widest uppercase">
        Free Shipping Over ₹{BRAND.freeShippingThreshold.toLocaleString('en-IN')}
      </div>

      <header className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[var(--color-bg)] ${isScrolled ? 'border-b border-[var(--color-border)] shadow-sm' : 'border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
        
        {/* Top Header Area: Icons & Logo */}
        <div className="flex justify-between items-center h-20">
          
          {/* Left: Mobile Menu & Search */}
          <div className="flex items-center flex-1 relative z-50 pointer-events-auto">
            <button 
              className="md:hidden p-2 text-[var(--color-primary)] hover:bg-[#fdfbf9] rounded-full relative z-50 cursor-pointer pointer-events-auto transition-all"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6 stroke-[1.5]" />
            </button>
            <button 
              className="hidden md:block p-2 text-[var(--color-primary)] hover:bg-[#fdfbf9] rounded-full hover:text-[var(--color-secondary)] transition-all relative z-50 cursor-pointer pointer-events-auto"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex-shrink-0 flex justify-center text-center relative z-50 pointer-events-auto">
            <Link href="/" className="font-serif text-3xl tracking-widest text-[var(--color-primary)] uppercase relative z-50">
              {BRAND.name}
            </Link>
          </div>

          {/* Right: Account & Cart */}
          <div className="flex items-center justify-end flex-1 gap-2 relative z-50 pointer-events-auto">
            <Link href={session ? "/account" : "/login"} className="block p-2 text-[var(--color-primary)] hover:bg-[#fdfbf9] rounded-full hover:text-[var(--color-secondary)] transition-all relative z-50 cursor-pointer">
              <User className="h-5 w-5 stroke-[1.5]" />
            </Link>
            <button onClick={openDrawer} className="p-2 text-[var(--color-primary)] hover:bg-[#fdfbf9] rounded-full hover:text-[var(--color-secondary)] transition-all relative z-50 cursor-pointer">
              <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
              <span className={`absolute top-0 right-0 bg-[var(--color-primary)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${mounted && items.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                {mounted ? items.length : 0}
              </span>
            </button>
          </div>

        </div>

        {/* Bottom Header Area: Navigation (Desktop Only) */}
        <nav className="hidden md:flex justify-center items-center pb-4 space-x-8 relative z-50 pointer-events-auto">
          {desktopNav.map((item) => (
            <Link 
              key={item.label}
              href={item.url} 
              className="text-[var(--color-text-muted)] hover:underline underline-offset-8 decoration-2 decoration-[var(--color-primary)] transition-all font-sans text-sm tracking-wide relative z-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Search Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-[var(--color-bg)] shadow-md p-6 border-t border-[var(--color-border)] z-[60] pointer-events-auto">
            <div className="max-w-3xl mx-auto">
              <form className="relative" onSubmit={handleSearch}>
                <input 
                  type="text" 
                  placeholder="Search by style, category, occasion..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-b border-[var(--color-primary)] text-xl font-serif py-3 px-2 focus:outline-none focus:border-[var(--color-secondary)] bg-transparent text-[var(--color-primary)]"
                  autoFocus
                />
                <button type="submit" className="absolute right-2 top-3 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  <Search className="w-6 h-6" />
                </button>
              </form>
            </div>
          </div>
        )}

      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 z-[100] bg-white flex flex-col md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-[var(--color-border)] min-h-[80px]">
          <span className="font-serif text-2xl tracking-widest text-[var(--color-primary)] uppercase">{BRAND.name}</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-4 text-[var(--color-primary)]" aria-label="Close menu">
            <X className="h-8 w-8" />
          </button>
        </div>
        <div className="flex flex-col p-6 space-y-6 overflow-y-auto">
          {mobileNav.map((item) => (
            <Link 
              key={item.label}
              href={item.url} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-xl font-serif text-[var(--color-primary)] border-b border-[var(--color-border)] pb-4"
            >
              {item.label}
            </Link>
          ))}
          <Link href={session ? "/account" : "/login"} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif text-[var(--color-primary)] pt-4">
            {session ? session.user?.name || "My Account" : "Sign In"}
          </Link>
        </div>
      </div>
    </header>
    </>
  );
}
