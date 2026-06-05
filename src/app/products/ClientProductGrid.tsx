"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { label: 'All',             value: 'all' },
  { label: 'Dinner Sets',     value: 'dinner-set' },
  { label: 'Plates',          value: 'plates' },
  { label: 'Serveware',       value: 'serveware' },
  { label: 'Tea & Coffee',    value: 'tea-set' },
  { label: 'Cutlery',         value: 'cutlery' },
  { label: 'Drinkware',       value: 'drinkware' },
  { label: 'Gifting',         value: 'gifting' },
];

const SORT_OPTIONS = [
  { label: 'Featured',        value: 'featured' },
  { label: 'Price: Low–High', value: 'price_asc' },
  { label: 'Price: High–Low', value: 'price_desc' },
];

function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`;
}

export default function ClientProductGrid({ products }: { products: any[] }) {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get('category');
  const queryMaxPrice = searchParams.get('maxPrice');
  const querySearch = searchParams.get('search');

  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy]       = useState('featured');

  useEffect(() => {
    if (queryCategory) {
      // Find if category matches
      const exists = CATEGORIES.some(c => c.value === queryCategory);
      if (exists) setActiveCategory(queryCategory);
    }
  }, [queryCategory]);

  // Filter
  const filtered = products.filter(p => {
    let match = true;
    
    if (activeCategory !== 'all') {
      match = match && (p.category === activeCategory || p.tag === activeCategory);
    }

    if (queryMaxPrice) {
      const max = parseInt(queryMaxPrice, 10);
      if (!isNaN(max)) {
        const pPrice = p.salePrice || p.price;
        match = match && (pPrice <= max);
      }
    }

    if (querySearch) {
      const s = querySearch.toLowerCase();
      const hasMatch = p.name.toLowerCase().includes(s) || (p.description ? p.description.toLowerCase().includes(s) : false);
      match = match && hasMatch;
    }

    return match;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc')  return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    return 0;
  });

  return (
    <>
      {/* ── FILTERS ROW ── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-widest transition-all duration-200 border ${
                activeCategory === cat.value
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                  : 'bg-transparent text-[var(--color-text-muted)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="border border-[var(--color-border)] bg-transparent text-[var(--color-primary)] text-xs font-sans uppercase tracking-widest px-4 py-2 focus:outline-none focus:border-[var(--color-primary)] transition-colors cursor-pointer"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* ── EMPTY STATE ── */}
      {sorted.length === 0 && (
        <div className="text-center py-20 border border-dashed border-[var(--color-border)]">
          <p className="text-[var(--color-text-muted)] font-sans text-sm mb-4">
            No pieces found in this category.
          </p>
          <button
            onClick={() => setActiveCategory('all')}
            className="bg-[var(--color-primary)] text-white px-8 py-3 text-xs uppercase tracking-widest"
          >
            View All Collections
          </button>
        </div>
      )}

      {/* ── PRODUCT GRID ── */}
      {sorted.length > 0 && (
        <>
          <p className="text-xs text-[var(--color-text-muted)] font-sans mb-6 tracking-wide">
            {sorted.length} {sorted.length === 1 ? 'piece' : 'pieces'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
            {sorted.map(product => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group flex flex-col relative cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] bg-[var(--color-accent-light)] overflow-hidden mb-4">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-[var(--color-text-muted)] font-sans tracking-widest uppercase">
                        Image Soon
                      </span>
                    </div>
                  )}

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-white text-[var(--color-primary)] text-[10px] font-sans uppercase tracking-widest px-2 py-1 shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  {/* Quick Add overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <button className="w-full bg-white/90 backdrop-blur-sm text-black py-3 text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Details */}
                <h3 className="text-sm font-serif text-[var(--color-primary)] mb-1 group-hover:underline underline-offset-2 transition-all leading-snug h-10 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-[var(--color-primary)] font-medium font-sans">
                  {formatPrice(product.price)}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
