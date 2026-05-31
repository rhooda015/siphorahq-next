import React from 'react';
import Link from 'next/link';
import { BRAND } from '@/config/brand';

export default function Footer() {
  return (
    <footer className="bg-bg-dark text-ivory py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="text-3xl font-serif font-semibold text-white">
            {BRAND.name}
          </Link>
          <p className="text-sm text-neutral-400 font-sans leading-relaxed">
            Premium handcrafted luxury Indian fashion, redefining occasion wear with elegance and heritage craftsmanship.
          </p>
        </div>

        {/* Shop */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans font-medium uppercase tracking-widest text-sm text-white mb-2">Shop</h4>
          <Link href="/collections/women" className="text-neutral-400 hover:text-gold transition-colors text-sm">Women</Link>
          <Link href="/collections/men" className="text-neutral-400 hover:text-gold transition-colors text-sm">Men</Link>
          <Link href="/collections/accessories" className="text-neutral-400 hover:text-gold transition-colors text-sm">Accessories</Link>
          <Link href="/collections/sale" className="text-neutral-400 hover:text-gold transition-colors text-sm">Sale</Link>
        </div>

        {/* Help */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans font-medium uppercase tracking-widest text-sm text-white mb-2">Help</h4>
          <Link href="/care-guide" className="text-neutral-400 hover:text-gold transition-colors text-sm">Care Guide</Link>
          <Link href="/shipping" className="text-neutral-400 hover:text-gold transition-colors text-sm">Shipping & Returns</Link>
          <Link href="/faq" className="text-neutral-400 hover:text-gold transition-colors text-sm">FAQ</Link>
          <Link href="/contact" className="text-neutral-400 hover:text-gold transition-colors text-sm">Contact Us</Link>
        </div>

        {/* Connect & Newsletter */}
        <div className="flex flex-col gap-4">
          <h4 className="font-sans font-medium uppercase tracking-widest text-sm text-white mb-2">Join the Circle</h4>
          <p className="text-sm text-neutral-400">Subscribe for early access to new collections and exclusive editorial content.</p>
          <div className="flex mt-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent border-b border-neutral-600 focus:border-gold py-2 px-1 text-sm w-full outline-none text-white font-sans"
            />
            <button className="border-b border-neutral-600 text-gold uppercase text-xs tracking-widest font-medium ml-4 hover:border-gold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Trust Badges */}
        <div className="flex gap-6 text-xs text-neutral-400 font-sans tracking-wide uppercase">
          <span>SSL Secure</span>
          <span className="hidden md:inline">•</span>
          <span>Free Returns</span>
          <span className="hidden md:inline">•</span>
          <span>100% Authentic</span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-neutral-500 font-sans">
          &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
        </div>

        {/* Payment Icons */}
        <div className="flex gap-4 items-center">
          <span className="text-xs text-neutral-500 font-medium">VISA</span>
          <span className="text-xs text-neutral-500 font-medium">MC</span>
          <span className="text-xs text-neutral-500 font-medium">UPI</span>
          <span className="text-xs text-neutral-500 font-medium">COD</span>
        </div>
      </div>
    </footer>
  );
}
