"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    setLoaded(true);
  }, []);

  const tabs = ['All', 'Dinnerware', 'Tea Sets', 'Gifting'];

  const products = [
    { id: 1, name: 'Royal Gold Rim Dinner Set', price: '₹14,500', category: 'Dinnerware', img: '/images/dinnerware.png' },
    { id: 2, name: 'Classic White Plates', price: '₹8,200', category: 'Dinnerware', img: '/images/dinnerware.png' },
    { id: 3, name: 'Vintage Floral Teapot', price: '₹5,600', category: 'Tea Sets', img: '/images/teaset.png' },
    { id: 4, name: 'Afternoon Tea Cups (Set of 2)', price: '₹3,200', category: 'Tea Sets', img: '/images/teaset.png' },
  ];

  const filteredProducts = activeTab === 'All' ? products : products.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero.png" 
            alt="Handcrafted Porcelain Dinnerware"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        <div className={`relative z-20 text-center px-4 max-w-4xl transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-white text-5xl md:text-7xl font-serif font-light mb-6 tracking-wide drop-shadow-md">
            Poetry in Porcelain, Handcrafted for Modern Tables.
          </h1>
          <p className="text-ivory text-lg md:text-xl font-sans mb-10 max-w-2xl mx-auto font-light drop-shadow-sm">
            Discover timeless, double-fired kitchenware intricately molded by master artisans across India, bridging the gap between ancient craftsmanship and contemporary hosting.
          </p>
          <Link href="/collections" className="inline-block bg-white text-gray-900 px-10 py-4 uppercase tracking-widest font-medium text-sm hover:scale-105 transition-transform duration-300 shadow-xl">
            Explore Collection ✦
          </Link>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="bg-black text-white py-3 border-y border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-16">
          <span className="text-xs font-sans tracking-widest uppercase">Free Shipping on orders above ₹999</span>
          <span className="hidden md:inline text-gold">✦</span>
          <span className="text-xs font-sans tracking-widest uppercase">Use code SIPHORA10 for 10% off</span>
        </div>
      </section>

      {/* Tabbed Collection Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4">Curated Collections</h2>
          <p className="text-text-muted font-sans max-w-lg mx-auto">Elevate your dining experience with our signature handcrafted pieces.</p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center gap-8 border-b border-gray-200 mb-12 overflow-x-auto whitespace-nowrap pb-1">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                activeTab === tab 
                  ? 'text-gold border-b-2 border-gold' 
                  : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group cursor-pointer">
              <div className="aspect-square bg-neutral-100 rounded-sm overflow-hidden mb-4 relative shadow-sm hover:shadow-md transition-shadow">
                <Image 
                  src={product.img} 
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay actions */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <button className="w-full bg-white/90 backdrop-blur-sm text-black py-3 text-xs uppercase tracking-widest font-medium hover:bg-black hover:text-white transition-colors">
                    Quick Add
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-serif text-neutral-900 mb-1 group-hover:text-gold transition-colors">{product.name}</h3>
              <p className="text-sm text-neutral-500 font-sans">{product.price}</p>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link href="/collections/all" className="inline-block border-b border-black uppercase text-xs tracking-widest pb-1 hover:text-gold hover:border-gold transition-colors">
            View Complete Catalog
          </Link>
        </div>
      </section>
    </div>
  );
}
