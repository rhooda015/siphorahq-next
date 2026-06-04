import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BRAND } from '@/config/brand';

export const metadata = {
  title: `Default Purchase Settings | Account | ${BRAND.name}`
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#fdfbf9] py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/account" className="inline-flex items-center gap-2 text-[#1a1612]/60 hover:text-[#8b6914] transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-sans text-xs uppercase tracking-[0.15em]">Back to Account</span>
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-serif text-[#1a1612] mb-4">Default Purchase Settings</h1>
        <p className="text-[#1a1612]/60 font-sans text-sm uppercase tracking-[0.1em] mb-12">Manage your {BRAND.name} experience</p>
        
        <div className="bg-white border-[0.5px] border-[#1a1612]/20 p-8 md:p-12">
          <p className="font-sans text-sm text-[#1a1612]/70 leading-loose text-center py-12">
            This section is currently being updated to bring you a more personalized luxury experience. Please check back later.
          </p>
        </div>
      </div>
    </div>
  );
}
