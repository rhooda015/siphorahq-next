"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import { BRAND } from '@/config/brand';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-bg shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-text" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex-1 md:flex-none text-center md:text-left">
            <Link href="/" className="text-3xl font-serif tracking-wide text-text font-semibold">
              {BRAND.name}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center h-full">
            <div className="group h-full py-2 cursor-pointer relative">
              <span className="nav-link">Women</span>
              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-0 w-[600px] bg-bg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex p-8 gap-8 border-t border-border">
                <div className="flex flex-col gap-3">
                  <h4 className="font-serif text-lg mb-2">Categories</h4>
                  <Link href="/collections/women-kurtas" className="text-sm text-text-muted hover:text-gold">Kurtas</Link>
                  <Link href="/collections/women-sarees" className="text-sm text-text-muted hover:text-gold">Sarees</Link>
                  <Link href="/collections/women-coords" className="text-sm text-text-muted hover:text-gold">Co-ords</Link>
                  <Link href="/collections/women-dresses" className="text-sm text-text-muted hover:text-gold">Dresses</Link>
                </div>
                <div className="flex-1 relative bg-ivory aspect-square p-6 flex flex-col justify-end">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <h4 className="relative z-10 font-serif text-2xl text-white mb-2">Festive Edit</h4>
                  <button className="relative z-10 btn-primary w-fit px-4 py-2 text-xs">Shop Now</button>
                </div>
              </div>
            </div>
            <Link href="/collections/men" className="nav-link">Men</Link>
            <Link href="/collections/accessories" className="nav-link">Accessories</Link>
            <Link href="/collections/new" className="nav-link">New Arrivals</Link>
            <Link href="/collections/sale" className="nav-link text-burgundy">Sale</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5 text-text">
            <button aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}>
              <Search className="w-5 h-5 hover:text-gold transition-colors" />
            </button>
            <Link href="/wishlist" className="hidden md:block" aria-label="Wishlist">
              <Heart className="w-5 h-5 hover:text-gold transition-colors" />
            </Link>
            <Link href="/cart" className="relative" aria-label="Cart">
              <ShoppingBag className="w-5 h-5 hover:text-gold transition-colors" />
              <span className="absolute -top-1 -right-2 bg-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-sans">
                2
              </span>
            </Link>
            <Link href="/account" className="hidden md:block" aria-label="Profile">
              <User className="w-5 h-5 hover:text-gold transition-colors" />
            </Link>
          </div>
        </div>

        {/* Desktop Search Dropdown */}
        {searchOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md p-6 border-t border-border z-50">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by style, fabric, occasion..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border-b border-text text-xl font-serif py-3 px-2 focus:outline-none focus:border-gold bg-transparent"
                  autoFocus
                />
                <Search className="absolute right-2 top-3 w-6 h-6 text-text-muted" />
              </div>
              {!searchQuery && (
                <div className="mt-8 flex gap-12">
                  <div>
                    <h4 className="text-sm font-sans uppercase tracking-widest text-text-muted mb-4">Trending Searches</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-ivory rounded-full text-sm">Silk Saree</span>
                      <span className="px-3 py-1 bg-ivory rounded-full text-sm">Festive Kurtas</span>
                      <span className="px-3 py-1 bg-ivory rounded-full text-sm">Wedding Lehengas</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed top-0 left-0 w-[80%] max-w-sm h-full bg-bg shadow-2xl p-6 flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-serif font-semibold">{BRAND.name}</span>
              <button onClick={() => setMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="flex flex-col gap-6 flex-1 overflow-y-auto">
              {/* Simplified Accordion Mock */}
              <div className="flex flex-col gap-4">
                <span className="text-lg font-serif border-b border-border pb-2">Women</span>
                <Link href="/collections/women-kurtas" className="text-text-muted pl-4">Kurtas</Link>
                <Link href="/collections/women-sarees" className="text-text-muted pl-4">Sarees</Link>
              </div>
              <Link href="/collections/men" className="text-lg font-serif border-b border-border pb-2">Men</Link>
              <Link href="/collections/accessories" className="text-lg font-serif border-b border-border pb-2">Accessories</Link>
              <Link href="/collections/sale" className="text-lg font-serif text-burgundy border-b border-border pb-2">Sale</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
