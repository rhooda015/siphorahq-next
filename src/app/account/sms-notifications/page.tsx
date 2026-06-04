import React from 'react';
import Link from 'next/link';
import { BRAND } from '@/config/brand';

export const metadata = {
  title: `SMS Notifications | Account | ${BRAND.name}`
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#fdfbf9] py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/account" className="inline-block text-[#1a1612]/60 hover:text-[#8b6914] transition-colors mb-10 font-sans text-[10px] uppercase tracking-widest">
          ← BACK TO ACCOUNT
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-serif text-[#1a1612] mb-4">SMS Notifications</h1>
        <p className="text-[#1a1612]/60 font-sans text-xs uppercase tracking-widest mb-12">MANAGE YOUR SIPHORAHQ EXPERIENCE</p>
        
        <div className="bg-white border-[0.5px] border-[#1a1612]/20 p-8 md:p-12">
          <p className="font-sans text-sm text-[#1a1612]/70 leading-loose text-center py-12">
            This section is currently being curated to bring you a more personalized luxury experience. Our digital concierge services will have your bespoke portal ready shortly. Please check back later.
          </p>
        </div>
      </div>
    </div>
  );
}
