"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { BRAND } from '@/config/brand';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-12 md:pt-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif text-3xl text-[var(--color-primary)] uppercase tracking-widest mb-8 text-center">
          What are you looking for?
        </h1>
        <form onSubmit={handleSearch} className="relative w-full">
          <input 
            type="text" 
            placeholder="Search products, collections, styles..." 
            className="w-full border-b border-[var(--color-primary)] text-xl md:text-2xl font-serif py-4 px-2 focus:outline-none focus:border-[var(--color-secondary)] bg-transparent text-[var(--color-primary)] transition-colors"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" className="absolute right-2 top-4 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
            <Search className="w-8 h-8" />
          </button>
        </form>
        
        {/* Quick Links */}
        <div className="mt-12 text-center">
          <p className="font-sans text-xs tracking-[2px] text-[var(--color-text-muted)] uppercase mb-6">Popular Searches</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Dinner Set', 'Tea Cups', 'Serveware', 'Gifting', 'Premium'].map(term => (
              <button 
                key={term}
                onClick={() => {
                  setQuery(term);
                  router.push(`/products?search=${encodeURIComponent(term)}`);
                }}
                className="border border-[var(--color-border)] px-4 py-2 font-sans text-xs tracking-widest uppercase hover:bg-[var(--color-primary)] hover:text-white transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
