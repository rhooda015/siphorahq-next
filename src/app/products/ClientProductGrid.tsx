"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FALLBACK_PRODUCTS = [
  {
    id: 'celadon-zen-cup',
    name: 'Celadon Zen Cup',
    price: 2800,
    category: 'cups',
    tag: '',
    image: '/assets/siphorahq/catTeacup.webp',
    badge: 'Bestseller',
  },
  {
    id: 'imperial-heritage-tea-set',
    name: 'Imperial Heritage Tea Set',
    price: 8500,
    category: 'cups',
    tag: 'gifts',
    image: '/assets/siphorahq/cardTeasets.webp',
    badge: 'New',
  },
  {
    id: 'royal-dinner-set-6',
    name: 'Royal Dinner Set — 6 Pieces',
    price: 14500,
    category: 'dinner',
    tag: 'gifts',
    image: '/assets/siphorahq/catDinner.webp',
    badge: '',
  },
  {
    id: 'artisan-platter-gold-rim',
    name: 'Artisan Platter — Gold Rim',
    price: 5200,
    category: 'platters',
    tag: '',
    image: '/assets/siphorahq/catPlatter.webp',
    badge: '',
  },
  {
    id: 'handthrown-coffee-mug',
    name: 'Hand-thrown Coffee Mug',
    price: 1800,
    category: 'mugs',
    tag: '',
    image: '/assets/siphorahq/catMug.webp',
    badge: 'Popular',
  },
  {
    id: 'luxury-bowl-set',
    name: 'Luxury Bowl Set — Set of 4',
    price: 6400,
    category: 'platters',
    tag: 'gifts',
    image: '/assets/siphorahq/catBowls.webp',
    badge: '',
  },
];

const CATEGORIES = [
  { label: 'All',             value: 'all' },
  { label: 'Teacups & Saucers', value: 'cups' },
  { label: 'Dinner Sets',     value: 'dinner' },
  { label: 'Platters & Bowls', value: 'platters' },
  { label: 'Coffee Mugs',     value: 'mugs' },
  { label: 'Gift Hampers',    value: 'gifts' },
];

const SORT_OPTIONS = [
  { label: 'Featured',        value: 'featured' },
  { label: 'Price: Low–High', value: 'price_asc' },
  { label: 'Price: High–Low', value: 'price_desc' },
  { label: 'Newest',          value: 'newest' },
];

function formatPrice(price: number) {
  return `₹${price.toLocaleString('en-IN')}`;
}

export default function ClientProductGrid({ initialProducts }: { initialProducts: any[] | null }) {
  const [products] = useState(() => {
    if (initialProducts && Array.isArray(initialProducts) && initialProducts.length > 0) {
      return initialProducts;
    }
    return FALLBACK_PRODUCTS;
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy]       = useState('featured');

  // Filter
  const filtered = products.filter(p => {
    if (activeCategory === 'all')   return true;
    if (activeCategory === 'gifts') return p.tag === 'gifts';
    return p.category === activeCategory;
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
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-white text-[#1A1A1A] border-[#E8E0D5] hover:border-[#1A1A1A]'
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
          className="border border-[#E8E0D5] bg-white text-[#1A1A1A] text-xs font-sans uppercase tracking-widest px-4 py-2 focus:outline-none focus:border-[#C9A84C] transition-colors cursor-pointer"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* ── EMPTY STATE ── */}
      {sorted.length === 0 && (
        <div className="text-center py-20 border border-dashed border-[#E8E0D5]">
          <p className="text-[#6B6560] font-sans text-sm mb-4">
            No pieces found in this category.
          </p>
          <button
            onClick={() => setActiveCategory('all')}
            className="btn-secondary text-xs px-6 py-2"
          >
            View All Collections
          </button>
        </div>
      )}

      {/* ── PRODUCT GRID ── */}
      {sorted.length > 0 && (
        <>
          <p className="text-xs text-[#6B6560] font-sans mb-6 tracking-wide">
            {sorted.length} {sorted.length === 1 ? 'piece' : 'pieces'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {sorted.map(product => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-square bg-[#F5F0E8] overflow-hidden mb-4">
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
                      <span className="text-xs text-[#6B6560] font-sans tracking-widest uppercase">
                        Image Soon
                      </span>
                    </div>
                  )}

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-[#C9A84C] text-white text-[10px] font-sans uppercase tracking-widest px-2 py-1">
                      {product.badge}
                    </span>
                  )}

                  {/* Quick Add overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <button className="w-full bg-white/90 backdrop-blur-sm text-black py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors">
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Details */}
                <h3 className="text-sm md:text-base font-serif text-[#1A1A1A] mb-1 group-hover:text-[#C9A84C] transition-colors leading-snug">
                  {product.name}
                </h3>
                <p className="text-sm text-[#6B6560] font-sans">
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
