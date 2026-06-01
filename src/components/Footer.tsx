import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-[#F5F0E8] py-16 px-6 md:px-12 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="font-serif text-3xl font-bold tracking-widest uppercase mb-6 block text-white">
            SIPORAHQ
          </Link>
          <p className="text-sm text-gray-400 font-light mb-6 leading-relaxed">
            Handcrafted porcelain and luxury home essentials, designed to elevate your everyday rituals.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/siporahq" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C9A84C] transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              @siporahq
            </a>
          </div>
        </div>

        {/* Shop Column */}
        <div>
          <h4 className="text-white text-xs uppercase tracking-widest font-semibold mb-6">Shop</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            <li><Link href="/collections" className="hover:text-[#C9A84C] transition-colors">All Collections</Link></li>
            <li><Link href="/collections/dinnerware" className="hover:text-[#C9A84C] transition-colors">Dinnerware</Link></li>
            <li><Link href="/collections/tea-sets" className="hover:text-[#C9A84C] transition-colors">Tea Sets</Link></li>
            <li><Link href="/gifting" className="hover:text-[#C9A84C] transition-colors">Luxury Gifting</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="text-white text-xs uppercase tracking-widest font-semibold mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            <li><Link href="/contact" className="hover:text-[#C9A84C] transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-[#C9A84C] transition-colors">FAQ</Link></li>
            <li><Link href="/shipping-returns" className="hover:text-[#C9A84C] transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/track-order" className="hover:text-[#C9A84C] transition-colors">Track Order</Link></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="text-white text-xs uppercase tracking-widest font-semibold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-gray-400 font-light">
            <li><Link href="/privacy-policy" className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-[#C9A84C] transition-colors">Terms of Service</Link></li>
            <li><Link href="/refund-policy" className="hover:text-[#C9A84C] transition-colors">Refund Policy</Link></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 font-light flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Siporahq. All rights reserved.</p>
        <div className="flex gap-4">
          <span>Secure Checkout</span>
          <span className="text-[#C9A84C]">✦</span>
          <span>Pan-India Delivery</span>
        </div>
      </div>
    </footer>
  );
}
