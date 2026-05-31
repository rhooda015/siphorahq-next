"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div 
      className={`md:hidden fixed bottom-0 w-full h-[60px] bg-white border-t border-border flex items-center justify-around z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <Link href="/" className={`flex flex-col items-center justify-center w-full h-full ${pathname === '/' ? 'text-gold' : 'text-text-muted hover:text-text'}`}>
        <Home className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-sans font-medium">Home</span>
      </Link>
      
      <button className={`flex flex-col items-center justify-center w-full h-full text-text-muted hover:text-text`}>
        <Search className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-sans font-medium">Search</span>
      </button>

      <Link href="/wishlist" className={`flex flex-col items-center justify-center w-full h-full ${pathname === '/wishlist' ? 'text-gold' : 'text-text-muted hover:text-text'}`}>
        <Heart className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-sans font-medium">Wishlist</span>
      </Link>

      <Link href="/cart" className={`relative flex flex-col items-center justify-center w-full h-full ${pathname === '/cart' ? 'text-gold' : 'text-text-muted hover:text-text'}`}>
        <div className="relative">
          <ShoppingBag className="w-5 h-5 mb-1" />
          <span className="absolute -top-1 -right-2 bg-gold text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-sans">
            2
          </span>
        </div>
        <span className="text-[10px] font-sans font-medium">Cart</span>
      </Link>

      <Link href="/account" className={`flex flex-col items-center justify-center w-full h-full ${pathname === '/account' ? 'text-gold' : 'text-text-muted hover:text-text'}`}>
        <User className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-sans font-medium">Profile</span>
      </Link>
    </div>
  );
}
