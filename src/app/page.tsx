"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const products = [
    { id: 1, name: 'White & Gold Dinner Set - 36 Pieces', price: 'Rs. 14,500.00', img: '/images/dinnerware.png' },
    { id: 2, name: 'Elegant Serving Platter', price: 'Rs. 4,500.00', img: '/images/serveware.png' },
    { id: 3, name: 'Vintage Teapot & Cups', price: 'Rs. 5,600.00', img: '/images/teaset.png' },
    { id: 4, name: 'Premium Cutlery Set', price: 'Rs. 12,000.00', img: '/images/serveware.png' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Top Announcement Bar */}
      <div className="bg-[var(--color-primary)] text-white text-center py-2 text-sm tracking-wide">
        Free Shipping on Orders Over Rs. 999
      </div>

      {/* Hero Banner Image */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center bg-[var(--color-accent-light)]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero.png" 
            alt="Eat Together Stay Together"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>
        <div className={`relative z-20 text-center px-4 max-w-3xl p-10 bg-white/90 backdrop-blur-sm rounded-sm transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-[var(--color-primary)] text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Eat Together, Stay Together.
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg font-sans mb-8">
            Premium crockery, elegant tableware, and stylish home decor items for every occasion.
          </p>
          <Link href="/products" className="btn-primary inline-block">
            Shop Collection
          </Link>
        </div>
      </section>

      {/* Circular Categories List */}
      <section className="py-12 px-4 max-w-7xl mx-auto border-b border-[var(--color-border)]">
        <div className="flex justify-start md:justify-center overflow-x-auto gap-8 pb-4 hide-scrollbar">
          {[
            { name: "Dinnerware", img: "/images/dinnerware.png" },
            { name: "Tea Sets", img: "/images/teaset.png" },
            { name: "Serveware", img: "/images/serveware.png" },
            { name: "Cutlery", img: "/images/dinnerware.png" },
            { name: "Gifting", img: "/images/gifting.png" },
          ].map((cat, idx) => (
            <Link href="/products" key={idx} className="flex flex-col items-center group min-w-[100px]">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 relative bg-[var(--color-accent-light)] border-2 border-transparent group-hover:border-[var(--color-primary)] transition-all">
                <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-[13px] text-[var(--color-primary)] font-sans text-center group-hover:font-medium transition-all">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Rich Text / Brand Story */}
      <section className="py-20 px-4 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-serif text-[var(--color-primary)] mb-6">Affordable Luxury for Your Home</h2>
        <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
          Discover our handcrafted porcelain and premium tableware collections designed to elevate your dining experience. Whether it's a family dinner or a festive celebration, Swasha Home Decor brings warmth and elegance to your table.
        </p>
      </section>

      {/* Featured Collection Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-serif text-[var(--color-primary)]">Featured Products</h2>
          <Link href="/products" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] underline underline-offset-4 text-sm font-sans transition-colors">
            View all
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group cursor-pointer flex flex-col">
              <div className="aspect-square bg-[var(--color-accent-light)] rounded-sm overflow-hidden mb-4 relative">
                <Image 
                  src={product.img} 
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-[15px] font-sans text-[var(--color-primary)] mb-2 group-hover:underline underline-offset-4">{product.name}</h3>
              <p className="text-[15px] text-[var(--color-text-muted)] font-sans">{product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Multi-column / Image with text (Gifting & Decor) */}
      <section className="py-16 bg-[var(--color-accent-light)]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 relative aspect-square rounded-sm overflow-hidden">
            <Image 
              src="/images/gifting.png" 
              alt="Gifting Collection"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 md:pr-12">
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-primary)] mb-6 leading-tight">Perfect For Gifting</h2>
            <p className="text-[var(--color-text-muted)] font-sans text-lg mb-8 leading-relaxed">
              Find the perfect present for housewarmings, weddings, and special occasions. Our beautifully packaged sets are sure to delight.
            </p>
            <Link href="/gifting" className="btn-secondary inline-block">
              Explore Gifts
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 border-t border-[var(--color-border)] text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">Subscribe to our emails</h2>
        <p className="text-[var(--color-text-muted)] font-sans mb-8">
          Be the first to know about new collections and exclusive offers.
        </p>
        <form className="flex flex-col sm:flex-row gap-0 justify-center" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full sm:flex-1 bg-transparent border border-[var(--color-border)] text-[var(--color-primary)] px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors rounded-none"
            required
          />
          <button 
            type="submit" 
            className="bg-[var(--color-primary)] text-white px-6 py-3 uppercase tracking-wide text-sm font-sans hover:bg-[var(--color-secondary)] transition-colors"
          >
            ➔
          </button>
        </form>
      </section>
    </div>
  );
}
