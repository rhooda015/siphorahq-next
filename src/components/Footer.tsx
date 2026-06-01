"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--color-accent-light)] border-t border-[var(--color-border)] font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        
        {/* Top Footer: Grid (Links & Newsletter) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 mb-16">
          
          {/* Column 1: About */}
          <div className="col-span-1">
            <h2 className="text-[var(--color-primary)] text-[15px] font-sans tracking-widest uppercase mb-6">About Siporahq</h2>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Our Story</Link></li>
              <li><Link href="/craftsmanship" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Craftsmanship & Quality</Link></li>
              <li><Link href="/sustainability" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Sustainability Commitment</Link></li>
              <li><Link href="/corporate-gifting" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Corporate Gifting</Link></li>
              <li><Link href="/corporate-gifting" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Bulk Orders</Link></li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div className="col-span-1">
            <h2 className="text-[var(--color-primary)] text-[15px] font-sans tracking-widest uppercase mb-6">Customer Care</h2>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Contact Us</Link></li>
              <li><Link href="/faq" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/shipping-returns" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Shipping Information</Link></li>
              <li><Link href="/refund-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Returns & Refunds</Link></li>
              <li><Link href="/track-order" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Column 3: Policies */}
          <div className="col-span-1">
            <h2 className="text-[var(--color-primary)] text-[15px] font-sans tracking-widest uppercase mb-6">Policies</h2>
            <ul className="space-y-4">
              <li><Link href="/privacy-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Terms & Conditions</Link></li>
              <li><Link href="/shipping-returns" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Shipping Policy</Link></li>
              <li><Link href="/refund-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Return Policy</Link></li>
              <li><Link href="/privacy-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Collections */}
          <div className="col-span-1">
            <h2 className="text-[var(--color-primary)] text-[15px] font-sans tracking-widest uppercase mb-6">Collections</h2>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Premium Dinnerware</Link></li>
              <li><Link href="/products" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Tea & Coffee Sets</Link></li>
              <li><Link href="/products" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Serveware & Bowls</Link></li>
              <li><Link href="/gifting" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Luxury Gifting</Link></li>
              <li><Link href="/products" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-[var(--color-primary)] text-[15px] font-sans tracking-widest uppercase mb-6">Stay Connected</h2>
            <p className="text-[var(--color-text-muted)] text-sm mb-4 leading-relaxed">Subscribe to receive exclusive offers, early access to new collections, and styling inspiration.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
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
            <p>&copy; {new Date().getFullYear()}, Siporahq.</p>
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
