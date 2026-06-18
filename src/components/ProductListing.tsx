"use client";
import { X, SlidersHorizontal, Gift } from 'lucide-react';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  name: string;
  slug: string;
  price: string; // it's already "₹999" format
  category: string;
  badge: string;
  image: string;
};

export default function ProductListing({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const categories = ['All', 'Cups & Mugs', 'Tea Sets', 'Dinnerware', 'Serveware', 'Gift Sets', 'Limited Edition'];
  const sortOptions = ['Featured', 'Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Best Selling'];

  // Filter
  const filtered = products.filter(p => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[^\d]/g, ''), 10);
    const priceB = parseInt(b.price.replace(/[^\d]/g, ''), 10);
    
    if (sortBy === 'Price: Low to High') return priceA - priceB;
    if (sortBy === 'Price: High to Low') return priceB - priceA;
    // Featured, Newest, Best Selling can just use default order or some random logic for now
    return 0;
  });

  return (
    <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-10 md:py-20 flex flex-col md:flex-row gap-8 md:gap-12">
      
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-32">
          <h2 className="font-headline-md text-xl mb-6">Filters</h2>
          
          <div className="mb-8">
            <h3 className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-on-surface-variant mb-4">Category</h3>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setActiveCategory(cat)}
                    className={`font-body-md text-sm transition-colors ${activeCategory === cat ? 'text-ink-charcoal font-semibold' : 'text-on-surface-variant hover:text-ink-charcoal'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-on-surface-variant mb-4">Material</h3>
            <div className="flex flex-wrap gap-2">
              {['Fine Porcelain', 'Bone China', 'Ceramic', 'Gold Rim'].map(mat => (
                <span key={mat} className="px-3 py-1 border border-muted-sand rounded-full text-xs font-body-md text-on-surface-variant cursor-pointer hover:border-ink-charcoal transition-colors">
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ── MOBILE DRAWER ── */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-[100] bg-surface-cream/95 backdrop-blur-md p-6 flex flex-col md:hidden">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline-md text-2xl">Filters</h2>
            <button onClick={() => setIsMobileDrawerOpen(false)} className="text-ink-charcoal">
              <X className=" w-5 h-5 inline-block" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="mb-8">
              <h3 className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-on-surface-variant mb-4">Category</h3>
              <ul className="space-y-4">
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => { setActiveCategory(cat); setIsMobileDrawerOpen(false); }}
                      className={`font-body-md text-lg ${activeCategory === cat ? 'text-ink-charcoal font-semibold' : 'text-on-surface-variant'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-muted-sand">
          <p className="font-body-md text-on-surface-variant text-sm">Showing {sorted.length} pieces</p>
          
          <div className="flex gap-4 items-center">
            <button 
              className="md:hidden flex items-center gap-2 font-label-caps text-[11px] uppercase tracking-[0.18em]"
              onClick={() => setIsMobileDrawerOpen(true)}
            >
              <SlidersHorizontal className=" w-5 h-5 inline-block" /> Filters
            </button>
            <div className="hidden md:flex items-center gap-3">
              <span className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-on-surface-variant">Sort:</span>
              <select 
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-transparent font-body-md text-sm text-ink-charcoal border-none outline-none cursor-pointer"
              >
                {sortOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* ── PRODUCT GRID ── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 gap-y-12 md:gap-8 md:gap-y-16">
          {sorted.map(product => (
            <Link href={`/products/${product.slug}`} key={product.slug} className="group flex flex-col h-full">
              <div className="relative aspect-[4/5] bg-[#faf7f2] mb-6 overflow-hidden border border-[#f0ebe1] rounded-sm">
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-surface-cream text-ink-charcoal font-label-caps text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 shadow-sm">
                    {product.badge}
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="w-full h-full object-contain p-4 bg-[#faf7f2] transition-transform duration-500 group-hover:scale-[1.03]"
                  priority={false}
                />
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden md:block">
                  <button className="w-full bg-ink-charcoal text-surface-cream font-label-caps text-[11px] uppercase tracking-[0.18em] py-3 hover:bg-burnished-gold transition-colors">
                    View Product
                  </button>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <p className="font-label-caps text-[10px] uppercase tracking-[0.18em] text-burnished-gold mb-2">{product.category}</p>
                <h3 className="font-headline-md text-base sm:text-lg text-ink-charcoal mb-2 leading-snug line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3 mt-auto">
                  <div className="flex text-burnished-gold text-[12px]">
                    ★★★★★
                  </div>
                  <span className="font-body-md text-[11px] text-on-surface-variant">(12)</span>
                </div>
                <div className="flex justify-between items-center border-t border-muted-sand/50 pt-3">
                  <span className="font-body-md font-semibold text-ink-charcoal">{product.price}</span>
                  <span className="font-body-md text-[11px] text-on-surface-variant flex items-center gap-1">
                    <Gift className=" w-5 h-5 inline-block" /> Gift Box
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
