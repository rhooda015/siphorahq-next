"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] bg-bg-dark overflow-hidden flex items-center justify-center">
        {/* Placeholder for Hero Image */}
        <div className="absolute inset-0 bg-neutral-900">
          <div className="absolute inset-0 bg-black/40 z-10" />
          {/* Subtle noise grain for luxury texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>

        <div className={`relative z-20 text-center px-4 transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-white text-5xl md:text-7xl font-serif font-light mb-6 tracking-wide">
            Poetry in Fabric
          </h1>
          <p className="text-ivory text-lg font-sans mb-10 max-w-lg mx-auto font-light">
            Discover our new festive edit of handcrafted silk sarees and occasion wear.
          </p>
          <Link href="/collections/women" className="inline-block border border-white text-white px-10 py-4 uppercase tracking-widest font-medium text-sm hover:bg-white hover:text-black transition-colors duration-300">
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="bg-ivory border-y border-gold-light py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span className="text-sm font-sans tracking-wider uppercase">Free Shipping over ₹1999</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-gold-light"></div>
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
            </svg>
            <span className="text-sm font-sans tracking-wider uppercase">Easy 15-day Returns</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-gold-light"></div>
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-sans tracking-wider uppercase">100% Authentic</span>
          </div>
        </div>
      </section>

      {/* Featured Collection Mock */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif mb-2">New Arrivals</h2>
            <p className="text-text-muted font-sans">The latest additions to our luxury ethnic wear collection.</p>
          </div>
          <Link href="/collections/new" className="hidden md:inline-block border-b border-black uppercase text-xs tracking-widest pb-1 hover:text-gold hover:border-gold transition-colors">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4].map((i) => (
            <Link href={`/products/${i}`} key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-neutral-100 rounded-sm overflow-hidden mb-4 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-xs text-neutral-400 font-medium tracking-widest uppercase transition-transform duration-700 group-hover:scale-105">
                  Product Image {i}
                </div>
                {/* Hover overlay actions */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <button className="w-full bg-white text-black py-3 text-xs uppercase tracking-widest font-medium hover:bg-black hover:text-white transition-colors">
                    Quick Add
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-serif text-neutral-900 mb-1 group-hover:text-gold transition-colors">Ivory Silk Kurta Set</h3>
              <p className="text-sm text-neutral-500 font-sans">₹12,500</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-24 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Siphorahq on Instagram</h2>
          <p className="text-neutral-500 font-sans mb-10 max-w-lg mx-auto">
            Follow us <a href="https://www.instagram.com/siphorahq" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline font-medium">@siphorahq</a> for styling inspiration and behind the scenes.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <a 
                key={i} 
                href="https://www.instagram.com/siphorahq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative aspect-square bg-neutral-100 overflow-hidden block"
              >
                <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-400 font-sans uppercase tracking-widest group-hover:scale-105 transition-transform duration-700">
                  Instagram Post {i}
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mt-12">
            <a 
              href="https://www.instagram.com/siphorahq" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block border border-black text-black px-8 py-3 uppercase tracking-widest font-medium text-xs hover:bg-black hover:text-white transition-colors duration-300"
            >
              Follow @siphorahq
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
