import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Building2 } from 'lucide-react';
import { BRAND } from '@/config/brand';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
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
    <li><Link href="/shipping-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Shipping Policy</Link></li>
    <li><Link href="/refund-policy" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Returns & Refunds</Link></li>
    <li><Link href="/privacy" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Privacy Policy</Link></li>
    <li><Link href="/terms" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors text-sm md:text-base py-1 block">Terms & Conditions</Link></li>
  </ul>
</div>

          {/* Column 4: Contact & Newsletter */}
          <div className="col-span-1">
            <h2 className="text-[var(--color-primary)] text-[15px] font-sans tracking-widest uppercase mb-6">Contact Us</h2>
            <ul className="space-y-4 mb-8 text-sm md:text-base text-[var(--color-text-muted)]">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 stroke-[1.5]" />
                <a href="mailto:concierge@siphorahq.in" className="hover:text-[var(--color-primary)] transition-colors">concierge@siphorahq.in</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 stroke-[1.5]" />
                <a href="tel:+919540027978" className="hover:text-[var(--color-primary)] transition-colors">+91 9540027978</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 stroke-[1.5]" />
                <span>Siphorahq Luxury Pvt. Ltd.<br/>671, Ballabgarh, Faridabad<br/>Haryana-121004</span>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="w-5 h-5 flex-shrink-0 mt-0.5 stroke-[1.5]" />
                <span>GSTIN: 06APTPH1635N1ZG</span>
              </li>
            </ul>

            <h2 className="text-[var(--color-primary)] text-[15px] font-sans tracking-widest uppercase mb-6 mt-12">Stay Connected</h2>
            <p className="text-[var(--color-text-muted)] text-sm mb-4 leading-relaxed">Subscribe to receive exclusive offers, early access to new collections, and styling inspiration.</p>
            {/* Newsletter Form */}
            <NewsletterForm />
            
            {/* Social Icons Placeholder */}
            <div className="mt-8 flex gap-4">
              <a href="https://instagram.com/siphorahq" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] opacity-80 hover:opacity-100 hover:-translate-y-1 transform transition-all duration-300">
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
          <div className="flex gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
             <svg viewBox="0 0 50 16" className="h-4 w-auto"><path fill="#1434CB" d="M21.93 1.05h3.42L23.1 15.5H19.7zm16.92 14.45h3.36l2.12-14.45h-3.36zm-7.6-14.28c-1.63-.44-3.5-.72-5.18-.72-5.46 0-9.29 2.83-9.33 6.91-.04 3 2.68 4.67 4.75 5.67 2.12 1.02 2.84 1.68 2.84 2.6-.02 1.4-1.7 2.05-3.26 2.05-2.07 0-3.32-.3-4.73-.93l-.66-.31L9 16c1.3.6 3.65 1.1 5.95 1.1 5.75 0 9.53-2.77 9.57-7.07.03-2.4-1.38-4.22-4.52-5.68-1.9-.94-3.07-1.57-3.07-2.54.02-.9.1-1.77 2.92-1.77 1.54 0 2.6.28 3.52.66l.4.18zM10.87 1.05L8.43 11l-.3-1.46C7.23 6.2 5.34 3.75 3 2.5L2.52 2.3l2.67 13.2h3.45L14.42 1.05z"/><path fill="#F5A623" d="M3 2.5v.02C1 3.2 0 4.68 0 7.82l.06-.32C.46 5.56 1.83 2.5 3 2.5z"/></svg>
             <svg viewBox="0 0 32 20" className="h-5 w-auto"><circle cx="10" cy="10" r="10" fill="#EB001B"/><circle cx="22" cy="10" r="10" fill="#F79E1B"/><path fill="#FF5F00" d="M16 10c0-3.3 1.9-6.2 4.7-7.9-2.8-1.7-6.6-1.7-9.4 0C14.1 3.8 16 6.7 16 10z"/></svg>
             <svg viewBox="0 0 24 24" className="h-6 w-auto" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
          </div>
        </div>

      </div>
    </footer>
  );
}
