import React from 'react';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import NewsletterForm from './NewsletterForm';
import dbConnect from '@/lib/db';
import Navigation from '@/models/Navigation';

export default async function Footer() {
  await dbConnect();
  
  let footerMenu1 = await Navigation.findOne({ menuId: 'footer-menu-1' }).lean();
  let footerMenu2 = await Navigation.findOne({ menuId: 'footer-menu-2' }).lean();
  
  const menu1Links = footerMenu1?.links || [
    { label: 'Shipping & Returns', url: '/shipping-policy' },
    { label: 'Care Guide', url: '/faq' },
    { label: 'Trade Program', url: '/contact' }
  ];

  const menu2Links = footerMenu2?.links || [
    { label: 'Sustainability', url: '/about' },
    { label: 'Privacy Policy', url: '/privacy-policy' },
    { label: 'Terms of Service', url: '/terms-of-service' }
  ];

  return (
    <footer className="bg-bone-gray dark:bg-primary-container w-full pt-stack-xl pb-stack-md mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        <div className="space-y-6">
          <span className="font-display-lg text-headline-md font-bold text-heritage-navy dark:text-porcelain-white tracking-tight uppercase">{BRAND.name}</span>
          <p className="font-body-md text-on-surface-variant dark:text-on-primary-container/80 max-w-xs">Elevating the everyday through artisanal craft and timeless luxury.</p>
        </div>

        <div>
          <h4 className="font-label-caps text-label-caps uppercase text-heritage-navy dark:text-porcelain-white mb-6">{footerMenu1?.name || 'Support'}</h4>
          <ul className="space-y-3 font-body-md text-on-surface-variant dark:text-on-primary-container/80">
            {menu1Links.map((link: any, idx: number) => (
              <li key={idx}><Link href={link.url} className="hover:text-champagne-gold transition-all duration-200">{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-label-caps text-label-caps uppercase text-heritage-navy dark:text-porcelain-white mb-6">{footerMenu2?.name || 'Company'}</h4>
          <ul className="space-y-3 font-body-md text-on-surface-variant dark:text-on-primary-container/80">
            {menu2Links.map((link: any, idx: number) => (
              <li key={idx}><Link href={link.url} className="hover:text-champagne-gold transition-all duration-200">{link.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-label-caps text-label-caps uppercase text-heritage-navy dark:text-porcelain-white mb-6">Newsletter</h4>
          <p className="font-body-md text-on-surface-variant dark:text-on-primary-container/80 mb-4">Join our list for exclusive artisanal drops.</p>
          <NewsletterForm />
        </div>

      </div>

      <div className="mt-stack-xl pt-stack-md border-t border-heritage-navy/10 dark:border-porcelain-white/10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body-md text-[14px] text-on-surface-variant dark:text-on-primary-container/60">© {new Date().getFullYear()} {BRAND.name}. All rights reserved. Handcrafted Excellence.</p>
        <div className="flex gap-6">
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-heritage-navy transition-colors">brand_family</span>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-heritage-navy transition-colors">share</span>
          <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-heritage-navy transition-colors">public</span>
        </div>
      </div>
    </footer>
  );
}
