import { Share2, Camera, Mail, Phone, MapPin } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import ProtectedEmail from '@/components/ProtectedEmail';
import { BRAND } from '@/config/brand';

export default function Footer() {

  return (
    <footer className="bg-ink-charcoal text-surface-cream pt-24 pb-12 px-5 md:px-margin-desktop border-t border-burnished-gold/20">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div>
          <h3 className="font-headline-lg text-3xl italic mb-6">{BRAND.name}</h3>
          <p className="font-body-md text-surface-cream/70 max-w-sm mb-8">
            Elevating everyday rituals with luxury porcelain, crafted for the modern home.
          </p>
          <div className="flex gap-4">
            <a className="w-11 h-11 rounded-full border border-surface-cream/20 flex items-center justify-center hover:bg-burnished-gold hover:border-burnished-gold transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold focus:ring-offset-2 focus:ring-offset-ink-charcoal" href="#" aria-label="Share on Pinterest">
              <Share2 className=" w-5 h-5 inline-block" aria-hidden="true" />
            </a>
            <a className="w-11 h-11 rounded-full border border-surface-cream/20 flex items-center justify-center hover:bg-burnished-gold hover:border-burnished-gold transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold focus:ring-offset-2 focus:ring-offset-ink-charcoal" href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
              <Camera className=" w-5 h-5 inline-block" aria-hidden="true" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-label-caps text-[12px] uppercase tracking-widest text-burnished-gold mb-6">Shop</h4>
          <ul className="space-y-4 font-body-md text-surface-cream/80">
            <li><Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold rounded-sm px-1 -ml-1" href="/collections/dinnerware">Dinnerware Sets</Link></li>
            <li><Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold rounded-sm px-1 -ml-1" href="/products">Mugs &amp; Cups</Link></li>
            <li><Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold rounded-sm px-1 -ml-1" href="/collections/gifting">Luxury Gifting</Link></li>
            <li><Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold rounded-sm px-1 -ml-1" href="/products">New Arrivals</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-label-caps text-[12px] uppercase tracking-widest text-burnished-gold mb-6">Support</h4>
          <ul className="space-y-4 font-body-md text-surface-cream/80">
            <li><Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold rounded-sm px-1 -ml-1" href="/about">About Us</Link></li>
            <li><Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold rounded-sm px-1 -ml-1" href="/faq">Care Instructions</Link></li>
            <li><Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold rounded-sm px-1 -ml-1" href="/shipping-policy">Shipping &amp; Returns</Link></li>
            <li><Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold rounded-sm px-1 -ml-1" href="/contact">Track Order</Link></li>
            <li><Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold rounded-sm px-1 -ml-1" href="/faq">FAQ</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-label-caps text-[12px] uppercase tracking-widest text-burnished-gold mb-6">Contact Us</h4>
          <ul className="space-y-4 font-body-md text-surface-cream/80 mb-8">
            <li className="flex items-center gap-3">
              <Mail className="text-burnished-gold w-5 h-5 inline-block" /> 
              <ProtectedEmail email="concierge@siphorahq.in" className="hover:text-white transition-colors" />
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-burnished-gold w-5 h-5 inline-block" /> 
              <a className="hover:text-white transition-colors" href="tel:+919540027978">+91 95400 27978</a>
            </li>
            <li className="flex items-start gap-3 mt-4">
              <MapPin className="text-burnished-gold w-5 h-5 inline-block shrink-0 mt-0.5" /> 
              <a
                href="https://maps.google.com/?q=671+Dayalpur+Ballabgarh+Faridabad+Haryana+121004"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-burnished-gold not-italic text-sm text-surface-cream/80 leading-relaxed"
              >
                671, Dayalpur, Ballabgarh,<br />
                Faridabad, Haryana (121004)
              </a>
            </li>
          </ul>
          <p className="font-label-caps text-[10px] uppercase tracking-widest text-surface-cream/50 mb-4">Secure Payments</p>
          <div className="flex gap-2">
            {/* VISA */}
            <div className="w-12 h-8 bg-[#1A1F71] rounded flex items-center justify-center shadow-sm overflow-hidden border border-[#1A1F71]" title="Visa">
              <svg viewBox="0 0 24 24" className="w-9 h-5 text-white" fill="currentColor">
                <path d="M15.48 14.288l1.41-8.508h-2.261l-1.41 8.508zM22.562 6.082l-2.072 8.21h2.008l1.246-8.21zM9.544 6.082L7.332 11.96 6.388 7.07c-.126-.644-.616-1.022-1.222-1.022H1.674v.392c.798.174 1.706.518 2.254.882.378.252.49.462.616.966l2.058 7.918H8.73l3.122-8.216zM15.352 9.07c-.49-.252-.924-.42-1.47-.42-1.554 0-2.646.826-2.646 2.002 0 .874.776 1.358 1.372 1.652.608.294.812.482.812.748 0 .406-.49.594-.938.594-.974 0-1.54-.252-1.996-.462l-.28-.134-.3.14-.15.092.35 2.196c.6.28 1.708.518 2.856.532 2.604 0 4.29-1.288 4.29-3.276.014-1.092-.658-1.932-2.1-2.628z" />
              </svg>
            </div>
            {/* Mastercard */}
            <div className="w-12 h-8 bg-[#111] rounded flex items-center justify-center shadow-sm overflow-hidden border border-white/10 relative" title="Mastercard">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-[#EB001B]"></div>
                <div className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-80"></div>
              </div>
            </div>
            {/* AMEX */}
            <div className="w-12 h-8 bg-[#007bc1] rounded flex items-center justify-center shadow-sm overflow-hidden border border-[#007bc1]" title="American Express">
              <span className="text-[10px] font-black tracking-widest text-white font-sans">AMEX</span>
            </div>
            {/* UPI */}
            <div className="w-12 h-8 bg-white rounded flex flex-col items-center justify-center shadow-sm overflow-hidden border border-white/10" title="UPI">
              <span className="text-[9px] font-black italic tracking-tighter text-[#0f54a4] leading-none">
                U<span className="text-[#3c8b3f]">P</span>I
              </span>
              <div className="h-[1.5px] w-6 bg-gradient-to-r from-[#0f54a4] to-[#3c8b3f] mt-0.5"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-container-max mx-auto border-t border-surface-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start text-surface-cream/50 text-sm">
          <p className="font-body-md mb-1">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="font-body-md text-[10px] uppercase tracking-wider">GSTIN: 06APTPH1635N1ZG</p>
        </div>
        <div className="flex gap-6 font-body-md text-surface-cream/50 text-sm">
          <Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold rounded-sm px-1" href="/privacy-policy">Privacy Policy</Link>
          <Link className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold rounded-sm px-1" href="/terms-of-service">Terms</Link>
          <a className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-burnished-gold rounded-sm px-1" href="/sitemap.xml" target="_blank" rel="noopener noreferrer">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
