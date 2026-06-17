"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND } from '@/config/brand';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-ink-charcoal text-surface-cream pt-24 pb-12 px-5 md:px-margin-desktop border-t border-burnished-gold/20">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div>
          <h3 className="font-headline-lg text-3xl italic mb-6">{BRAND.name}</h3>
          <p className="font-body-md text-surface-cream/70 max-w-sm mb-8">
            Elevating everyday rituals with luxury porcelain, crafted for the modern home.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full border border-surface-cream/20 flex items-center justify-center hover:bg-burnished-gold hover:border-burnished-gold transition-colors" href="#">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-surface-cream/20 flex items-center justify-center hover:bg-burnished-gold hover:border-burnished-gold transition-colors" href="#">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-label-caps text-[12px] uppercase tracking-widest text-burnished-gold mb-6">Shop</h4>
          <ul className="space-y-4 font-body-md text-surface-cream/80">
            <li><Link className="hover:text-white transition-colors" href="/collections/dinnerware">Dinnerware Sets</Link></li>
            <li><Link className="hover:text-white transition-colors" href="/products">Mugs &amp; Cups</Link></li>
            <li><Link className="hover:text-white transition-colors" href="/collections/gifting">Luxury Gifting</Link></li>
            <li><Link className="hover:text-white transition-colors" href="/products">New Arrivals</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-label-caps text-[12px] uppercase tracking-widest text-burnished-gold mb-6">Support</h4>
          <ul className="space-y-4 font-body-md text-surface-cream/80">
            <li><Link className="hover:text-white transition-colors" href="/faq">Care Instructions</Link></li>
            <li><Link className="hover:text-white transition-colors" href="/shipping-policy">Shipping &amp; Returns</Link></li>
            <li><Link className="hover:text-white transition-colors" href="/contact">Track Order</Link></li>
            <li><Link className="hover:text-white transition-colors" href="/faq">FAQ</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-label-caps text-[12px] uppercase tracking-widest text-burnished-gold mb-6">Contact Us</h4>
          <ul className="space-y-4 font-body-md text-surface-cream/80 mb-8">
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-burnished-gold text-[18px]">mail</span> 
              <a className="hover:text-white transition-colors" href="mailto:concierge@siphorahq.in">concierge@siphorahq.in</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-burnished-gold text-[18px]">call</span> 
              <a className="hover:text-white transition-colors" href="tel:+919540027978">+91 95400 27978</a>
            </li>
          </ul>
          <p className="font-label-caps text-[10px] uppercase tracking-widest text-surface-cream/50 mb-4">Secure Payments</p>
          <div className="flex gap-2">
            <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
            <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">MC</div>
            <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">AMEX</div>
            <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">UPI</div>
          </div>
        </div>
      </div>
      
      <div className="max-w-container-max mx-auto border-t border-surface-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start text-surface-cream/50 text-sm">
          <p className="font-body-md mb-1">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="font-body-md text-[10px] uppercase tracking-wider">GSTIN: 06APTPH1635N1ZG</p>
        </div>
        <div className="flex gap-6 font-body-md text-surface-cream/50 text-sm">
          <Link className="hover:text-white transition-colors" href="/privacy-policy">Privacy Policy</Link>
          <Link className="hover:text-white transition-colors" href="/terms-of-service">Terms</Link>
          <Link className="hover:text-white transition-colors" href="/sitemap.xml">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
