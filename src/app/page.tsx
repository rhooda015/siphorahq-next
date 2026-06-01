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
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* 1. Hero Section */}
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
          <p className="text-[#F5F0E8] text-lg md:text-xl font-sans mb-10 max-w-2xl mx-auto font-light drop-shadow-sm">
            Discover timeless, double-fired kitchenware intricately molded by master artisans across India, bridging the gap between ancient craftsmanship and contemporary hosting.
          </p>
          <Link href="/products" className="inline-block bg-white text-gray-900 px-10 py-4 uppercase tracking-widest font-medium text-sm hover:scale-105 transition-transform duration-300 shadow-xl">
            Explore Collection ✦
          </Link>
        </div>
      </section>

      {/* 2. Featured Collections Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4 text-gray-900">Featured Collections</h2>
          <p className="text-gray-600 font-sans max-w-lg mx-auto">Explore our most beloved categories designed to elevate your everyday rituals.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Dinnerware", image: "/images/dinnerware.png", link: "/products" },
            { title: "Serveware", image: "/images/serveware.png", link: "/products" },
            { title: "Tea Sets", image: "/images/teaset.png", link: "/products" },
            { title: "Luxury Gifting", image: "/images/gifting.png", link: "/gifting" }
          ].map((item, idx) => (
            <Link href={item.link} key={idx} className="group relative aspect-[4/5] overflow-hidden rounded-sm block">
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-serif mb-2 tracking-wide translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                <span className="text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-b border-white w-max pb-1">Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Category Slider/Tabs */}
      <section className="py-24 max-w-7xl mx-auto px-4 bg-white border-y border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4 text-gray-900">Curated Edit</h2>
          <p className="text-gray-600 font-sans max-w-lg mx-auto">Discover our signature handcrafted pieces for your home.</p>
        </div>
        
        <div className="flex justify-center gap-8 border-b border-gray-200 mb-12 overflow-x-auto whitespace-nowrap pb-1">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${
                activeTab === tab 
                  ? 'text-[#C9A84C] border-b-2 border-[#C9A84C]' 
                  : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
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
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <button className="w-full bg-white/90 backdrop-blur-sm text-black py-3 text-xs uppercase tracking-widest font-medium hover:bg-black hover:text-white transition-colors">
                    Quick Add
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-serif text-neutral-900 mb-1 group-hover:text-[#C9A84C] transition-colors">{product.name}</h3>
              <p className="text-sm text-neutral-500 font-sans">{product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Lifestyle Editorial Banner (Craftsmanship) */}
      <section className="py-24 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
            <Image 
              src="/images/craftsmanship.png" 
              alt="Artisan crafting porcelain"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 md:pr-12">
            <h4 className="text-[#C9A84C] uppercase tracking-widest text-sm font-semibold mb-4">Our Heritage</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">Masterfully Crafted in India</h2>
            <p className="text-gray-600 font-sans text-lg mb-8 leading-relaxed font-light">
              Every Siporahq piece tells a story of patience and precision. Our artisans spend weeks molding, firing, and hand-painting each plate and teapot, ensuring that no two pieces are exactly alike. We use ethically sourced clay and a unique double-firing process that guarantees heirloom durability without compromising delicate elegance.
            </p>
            <Link href="/about" className="inline-block border border-gray-900 text-gray-900 px-8 py-3 uppercase tracking-widest text-xs font-medium hover:bg-gray-900 hover:text-white transition-colors">
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Instagram Social Feed (Studio Moments) */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h4 className="text-[#C9A84C] uppercase tracking-widest text-sm font-semibold mb-2">#SiporaAtHome</h4>
          <h2 className="text-4xl font-serif text-gray-900 mb-12">Studio Moments</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-square overflow-hidden group">
              <Image src="/images/lifestyle_1.png" alt="Lifestyle 1" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-2xl">✦</span>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden group">
              <Image src="/images/lifestyle_2.png" alt="Lifestyle 2" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-2xl">✦</span>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden group">
              <Image src="/images/lifestyle_3.png" alt="Lifestyle 3" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-2xl">✦</span>
              </div>
            </div>
            <div className="relative aspect-square overflow-hidden group">
              <Image src="/images/lifestyle_4.png" alt="Lifestyle 4" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-2xl">✦</span>
              </div>
            </div>
          </div>
          
          <div className="mt-10">
            <a href="https://instagram.com/siporahq" target="_blank" rel="noopener noreferrer" className="inline-block border-b border-gray-400 text-gray-600 uppercase text-xs tracking-widest pb-1 hover:text-[#C9A84C] hover:border-[#C9A84C] transition-colors">
              Follow Us on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
