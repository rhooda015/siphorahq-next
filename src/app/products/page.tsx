"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ── LOCAL FALLBACK CATALOG ─────────────────────────────────────────────────
// Used when backend is unavailable. Replace with real API data when ready.
const FALLBACK_PRODUCTS = [
  {
    id: 'celadon-zen-cup',
    name: 'Celadon Zen Cup',
    price: 2800,
    category: 'cups',
    tag: '',
    image: '/images/teaset.webp',
    badge: 'Bestseller',
  },
  {
    id: 'imperial-heritage-tea-set',
    name: 'Imperial Heritage Tea Set',
    price: 8500,
    category: 'cups',
    tag: 'gifts',
    image: '/images/teaset.webp',
    badge: 'New',
  },
  {
    id: 'royal-dinner-set-6',
    name: 'Royal Dinner Set — 6 Pieces',
    price: 14500,
    category: 'dinner',
    tag: 'gifts',
    image: '/images/dinnerware.webp',
    badge: '',
  },
  {
    id: 'artisan-platter-gold-rim',
    name: 'Artisan Platter — Gold Rim',
    price: 5200,
    category: 'platters',
    tag: '',
    image: '/images/cat_plates.webp',
    badge: '',
  },
  {
    id: 'handthrown-coffee-mug',
    name: 'Hand-thrown Coffee Mug',
    price: 1800,
    category: 'mugs',
    tag: '',
    image: '/images/cat_mugs.webp',
    badge: 'Popular',
  },
  {
    id: 'luxury-bowl-set',
    name: 'Luxury Bowl Set — Set of 4',
    price: 6400,
    category: 'platters',
    tag: 'gifts',
    image: '/images/serveware.webp',
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

export default function ProductsPage() {
  const [products, setProducts]   = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading]     = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy]       = useState('featured');

  // Try live backend — fall back to local catalog silently
  useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(res => { if (!res.ok) throw new Error('unavailable'); return res.json(); })
      .then(data => { if (Array.isArray(data) && data.length > 0) setProducts(data); })
      .catch(() => { /* silently use fallback */ })
      .finally(() => setLoading(false));
  }, []);

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
    <div className="min-h-screen bg-[#FDFBF7]">

      {/* ── PAGE HEADER ── */}
      <section className="bg-[#F5F0E8] border-b border-[#E8E0D5] py-14 text-center">
        <p className="section-label">The Collection</p>
        <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-3">
          All Collections
        </h1>
        <p className="text-[#6B6560] font-sans text-sm max-w-md mx-auto">
          Handcrafted porcelain for quiet rituals — made by master artisans across India.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">

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

        {/* ── LOADING ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="spinner mb-4" />
            <p className="text-xs font-sans uppercase tracking-widest text-[#6B6560]">
              Curating collection...
            </p>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && sorted.length === 0 && (
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
        {!loading && sorted.length > 0 && (
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
                    {(() => {
                      const src = (product.images?.[0]?.url) || product.image || product.img || '';
                      return src ? (
                        <img
                          src={src}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-[#6B6560] font-sans tracking-widest uppercase">
                            Image Soon
                          </span>
                        </div>
                      );
                    })()}

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
      </div>
    </div>
  );
}
