import React from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, ArrowLeft } from 'lucide-react';
import { BRAND } from '@/config/brand';

export default async function AccountTabPage({ params }: { params: Promise<{ tab: string }> }) {
  const resolvedParams = await params;
  const tabName = resolvedParams.tab.replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <div className="border-b-[0.5px] border-[#1a1612]/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <button className="text-[#1a1612] hover:text-[#8b6914] transition-colors">
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>
          
          <Link href="/" className="text-3xl font-serif tracking-[0.2em] uppercase text-[#1a1612] hover:text-[#8b6914] transition-colors">
            {BRAND.name}
          </Link>
          
          <div className="flex items-center gap-6">
            <span className="hidden md:block font-sans text-xs tracking-[0.1em] uppercase text-[#1a1612]">
              Welcome, Priya
            </span>
            <Link href="/account" className="text-[#1a1612] hover:text-[#8b6914] transition-colors">
              <User className="w-5 h-5 stroke-[1.5]" />
            </Link>
            <div className="relative text-[#1a1612] hover:text-[#8b6914] transition-colors cursor-pointer">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              <span className="absolute -top-1 -right-2 bg-[#8b6914] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-sans">
                2
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-serif text-[#1a1612] mb-6 capitalize">{tabName}</h1>
        <p className="text-[#1a1612]/60 font-sans text-sm tracking-wide mb-12">
          This section is currently being updated to match our new luxury aesthetic. Please check back later.
        </p>
        <Link href="/account" className="inline-flex items-center gap-2 border-[0.5px] border-[#1a1612] px-8 py-4 text-xs font-sans uppercase tracking-[0.15em] text-[#1a1612] hover:bg-[#1a1612] hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
