"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND } from '@/config/brand';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const pathname = usePathname();
  const isCheckout = pathname.startsWith('/checkout') && pathname !== '/checkout/cart';

  if (isCheckout) {
    return (
      <footer className="bg-white border-t border-[var(--color-border)] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-text-muted)] font-sans">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[var(--color-text-muted)] font-sans">
            <Link href="/refund-policy" className="hover:text-[var(--color-primary)]">Refund Policy</Link>
            <Link href="/privacy-policy" className="hover:text-[var(--color-primary)]">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-[var(--color-primary)]">Terms of Service</Link>
          </div>
        </div>
      </footer>
    );
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[var(--color-accent-light)] border-t border-[var(--color-border)] font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        
        {/* Top Footer: Grid (Links & Newsletter) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Column 1: Shop */}
          <div className="col-span-1">
            <h2 className="text-[var(--color-primary)] text-[15px] font-sans tracking-widest uppercase mb-6">Shop</h2>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">All Products</Link></li>
              <li><Link href="/products?category=dinner-set" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Collections</Link></li>
              <li><Link href="/products?category=new" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">New Arrivals</Link></li>
              <li><Link href="/products?category=best-sellers" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Best Sellers</Link></li>
              <li><Link href="/gifting" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Corporate Gifting</Link></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="col-span-1">
            <h2 className="text-[var(--color-primary)] text-[15px] font-sans tracking-widest uppercase mb-6">Company</h2>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Our Story</Link></li>
              <li><Link href="/contact" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Contact</Link></li>
              <li><Link href="/journal" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Journal</Link></li>
              <li><Link href="/faq" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="col-span-1">
            <h2 className="text-[var(--color-primary)] text-[15px] font-sans tracking-widest uppercase mb-6">Customer Care</h2>
            <ul className="space-y-4">
              <li><Link href="/shipping-returns" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Returns & Refunds</Link></li>
              <li><Link href="/privacy-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 4: Why Siphorahq (Trust Signals) & Newsletter */}
          <div className="col-span-1">
            <h2 className="text-[var(--color-primary)] text-[15px] font-sans tracking-widest uppercase mb-6">Why Siphorahq</h2>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-[var(--color-text-muted)] text-sm md:text-base py-1">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Fast & Secure Shipping
              </li>
              <li className="flex items-center gap-3 text-[var(--color-text-muted)] text-sm md:text-base py-1">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
                Handcrafted Porcelain
              </li>
              <li className="flex items-center gap-3 text-[var(--color-text-muted)] text-sm md:text-base py-1">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"></path></svg>
                Secure Payments
              </li>
              <li className="flex items-center gap-3 text-[var(--color-text-muted)] text-sm md:text-base py-1">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                Premium Packaging
              </li>
            </ul>

            <h2 className="text-[var(--color-primary)] text-[15px] font-sans tracking-widest uppercase mb-6 mt-12">Stay Connected</h2>
            <p className="text-[var(--color-text-muted)] text-sm mb-4 leading-relaxed">Subscribe to receive exclusive offers, early access to new collections, and styling inspiration.</p>
            {subscribed ? (
              <div className="text-green-700 bg-green-50 border border-green-200 p-3 text-sm font-medium tracking-wide">
                Thank you for subscribing!
              </div>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full bg-transparent border-b border-[var(--color-border)] text-[var(--color-primary)] px-0 py-2 focus:outline-none focus:border-[var(--color-primary)] transition-colors rounded-none placeholder:text-gray-400"
                    required
                  />
                  <button 
                    type="submit" 
                    className="absolute right-0 top-0 bottom-0 text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors font-sans tracking-widest text-xs uppercase"
                    aria-label="Subscribe"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
            
            {/* Social Icons Placeholder */}
            <div className="mt-8 flex gap-4">
              <a href="https://instagram.com/siporahq" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:opacity-75 transition-opacity">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
        
      </div>

        {/* Bottom Footer */}
        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--color-text-muted)]">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <p>&copy; {new Date().getFullYear()}, {BRAND.name}.</p>
            <span className="hidden md:inline">•</span>
            <p className="font-serif italic text-[var(--color-primary)]">Poetry in Porcelain</p>
          </div>
          <div className="flex gap-2">
            {/* Fake Payment Icons */}
            <div className="w-10 h-6 bg-white border border-[var(--color-border)] rounded-sm flex items-center justify-center text-[10px]">VISA</div>
            <div className="w-10 h-6 bg-white border border-[var(--color-border)] rounded-sm flex items-center justify-center text-[10px]">MC</div>
            <div className="w-10 h-6 bg-white border border-[var(--color-border)] rounded-sm flex items-center justify-center text-[10px]">AMEX</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
