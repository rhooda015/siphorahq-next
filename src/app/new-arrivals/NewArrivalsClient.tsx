"use client";
import { Gift } from 'lucide-react';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  name: string;
  slug: string;
  category: string;
  price: string;
  badge: string;
  rating: string;
  image: string;
};

export default function NewArrivalsClient({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Cups & Mugs', 'Tea Sets', 'Dinnerware', 'Serveware', 'Gift Sets'];

  const filtered = products.filter(p => {
    if (activeTab === 'All') return true;
    return p.category === activeTab;
  });

  return (
    <section id="new-arrivals" className="py-24 px-5 md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-4xl md:text-5xl italic tracking-tighter text-ink-charcoal mb-4">Just Launched</h2>
        <p className="font-body-md text-on-surface-variant max-w-xl mx-auto">
          Freshly curated porcelain pieces designed for daily rituals, fine dining, and premium gifting.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-label-caps text-[11px] uppercase tracking-widest px-6 py-2 transition-all duration-300 ${
              activeTab === tab
                ? 'bg-ink-charcoal text-surface-cream'
                : 'bg-transparent text-ink-charcoal border border-muted-sand hover:border-ink-charcoal'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {filtered.map(product => (
          <Link href={`/products/${product.slug}`} key={product.slug} className="group flex flex-col h-full">
            <div className="relative aspect-[4/5] bg-[#f5f5f5] mb-6 overflow-hidden">
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-surface-cream text-ink-charcoal font-label-caps text-[10px] uppercase tracking-widest px-3 py-1.5 shadow-sm">
                  {product.badge}
                </span>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <button className="w-full bg-ink-charcoal text-surface-cream font-label-caps text-[11px] uppercase tracking-widest py-3 hover:bg-burnished-gold transition-colors">
                  View Product
                </button>
              </div>
            </div>
            <div className="flex flex-col flex-1 text-center">
              <p className="font-label-caps text-[10px] uppercase tracking-widest text-burnished-gold mb-2">{product.category}</p>
              <h3 className="font-headline-md text-xl text-ink-charcoal mb-2">{product.name}</h3>
              
              <div className="mt-auto">
                <div className="flex justify-center items-center text-burnished-gold text-[12px] mb-2">
                  <span className="mr-1">★</span> {product.rating}
                </div>
                <div className="flex flex-col items-center gap-1 border-t border-muted-sand/50 pt-4 mt-2">
                  <span className="font-body-md font-semibold text-lg text-ink-charcoal mb-1">{product.price}</span>
                  <span className="font-body-md text-[11px] text-on-surface-variant flex items-center justify-center gap-1">
                    <Gift className=" w-5 h-5 inline-block" /> Gift-ready box · Safe delivery
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
