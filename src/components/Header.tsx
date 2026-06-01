import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="fixed top-0 w-full z-50">
      {/* Top Announcement Bar */}
      <div className="bg-[#111111] text-white py-2 px-4 text-center text-xs tracking-widest uppercase flex items-center justify-center font-sans">
        <span>Free Shipping on orders above ₹999 — Use code SIPHORA10 for 10% off your first order</span>
      </div>
      
      {/* Navigation Header */}
      <header className="w-full bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-gray-200 h-20 px-6 md:px-12 flex flex-col justify-center">
        <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto">
          {/* Left Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest uppercase text-gray-900">
            <Link href="/products" className="hover:text-[#C9A84C] transition-colors">Collections</Link>
            <Link href="/gifting" className="hover:text-[#C9A84C] transition-colors">Gifting</Link>
          </nav>
          
          {/* Center Logo */}
          <Link href="/" className="font-serif text-3xl font-bold tracking-widest uppercase flex-1 text-center md:flex-none">
            SIPORAHQ
          </Link>
          
          {/* Right Links & Icons */}
          <div className="flex items-center gap-8 justify-end">
            <Link href="/about" className="hidden md:block text-xs font-medium tracking-widest uppercase text-gray-900 hover:text-[#C9A84C] transition-colors">Our Story</Link>
            
            <div className="flex items-center gap-6">
              {/* Search Icon */}
              <button aria-label="Search" className="text-gray-900 hover:text-[#C9A84C] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
              
              {/* Bag Icon */}
              <button aria-label="Shopping Bag" className="text-gray-900 hover:text-[#C9A84C] transition-colors relative">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span className="absolute -top-1 -right-2 bg-[#C9A84C] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-bold">0</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
