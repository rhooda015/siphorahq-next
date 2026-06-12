import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { STATIC_PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Homepage from '@/models/Homepage';

export const revalidate = 60; // Use ISR

export default async function HomePage() {
  await dbConnect();
  
  // Fetch live products from DB
  const dbProducts = await Product.find({ status: 'Live' }).sort({ createdAt: -1 }).lean();
  let homepage = await Homepage.findOne({ version: 'draft' }).lean();
  
  const mappedProducts = dbProducts.map((p: any) => ({
    id: p.handle || p._id.toString(),
    name: p.title,
    price: p.price,
    salePrice: p.price, 
    category: p.category,
    image: p.images?.[0]?.url || '/images/dinnerware.webp',
  }));

  const allProducts = mappedProducts.length > 0 ? mappedProducts : STATIC_PRODUCTS;
  const productsNew = [...mappedProducts, ...STATIC_PRODUCTS].slice(0, 4);

  return (
    <main className="min-h-screen bg-porcelain-white dark:bg-tertiary-container selection:bg-champagne-gold/30">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-heritage-navy/20 dark:bg-tertiary-container/40 z-10"></div>
        <Image 
          src="/images/hero_luxury_editorial.png" 
          alt="Artisanal porcelain dining setup" 
          fill 
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 animate-[slowZoom_20s_ease-in-out_infinite_alternate]" 
        />
        <div className="relative z-20 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-porcelain-white mb-stack-sm drop-shadow-sm opacity-90 animate-fade-up" style={{ animationDelay: '0.2s' }}>The Artisanal Collection</span>
          <h1 className="font-display-lg text-display-lg font-bold text-porcelain-white mb-stack-md drop-shadow-md leading-tight animate-fade-up" style={{ animationDelay: '0.4s' }}>Poetry in <br/> Porcelain</h1>
          <p className="font-body-lg text-body-lg text-porcelain-white/90 mb-stack-lg max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.6s' }}>Elevating everyday dining into a luxury ritual. Handcrafted perfection for your sanctuary.</p>
          <Link href="/products" className="bg-porcelain-white text-heritage-navy px-10 py-4 font-label-caps text-label-caps uppercase tracking-widest hover:bg-champagne-gold hover:text-porcelain-white transition-all duration-500 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Trust Grid / Why Us */}
      <section className="bg-bone-gray dark:bg-primary-container py-stack-xl border-b border-heritage-navy/10 dark:border-porcelain-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
          <div className="flex flex-col items-center group">
            <span className="material-symbols-outlined text-3xl mb-4 text-heritage-navy dark:text-champagne-gold group-hover:-translate-y-1 transition-transform duration-300">verified</span>
            <h3 className="font-display-sm text-headline-sm font-semibold text-heritage-navy dark:text-porcelain-white mb-2">Artisanal Crafted</h3>
            <p className="font-body-sm text-on-surface-variant dark:text-on-primary-container/80 max-w-[200px]">Hand-finished by master ceramists.</p>
          </div>
          <div className="flex flex-col items-center group">
            <span className="material-symbols-outlined text-3xl mb-4 text-heritage-navy dark:text-champagne-gold group-hover:-translate-y-1 transition-transform duration-300">local_shipping</span>
            <h3 className="font-display-sm text-headline-sm font-semibold text-heritage-navy dark:text-porcelain-white mb-2">Complimentary Shipping</h3>
            <p className="font-body-sm text-on-surface-variant dark:text-on-primary-container/80 max-w-[200px]">On all orders over ₹999.</p>
          </div>
          <div className="flex flex-col items-center group">
            <span className="material-symbols-outlined text-3xl mb-4 text-heritage-navy dark:text-champagne-gold group-hover:-translate-y-1 transition-transform duration-300">redeem</span>
            <h3 className="font-display-sm text-headline-sm font-semibold text-heritage-navy dark:text-porcelain-white mb-2">Luxury Gifting</h3>
            <p className="font-body-sm text-on-surface-variant dark:text-on-primary-container/80 max-w-[200px]">Bespoke packaging and notes.</p>
          </div>
          <div className="flex flex-col items-center group">
            <span className="material-symbols-outlined text-3xl mb-4 text-heritage-navy dark:text-champagne-gold group-hover:-translate-y-1 transition-transform duration-300">shield</span>
            <h3 className="font-display-sm text-headline-sm font-semibold text-heritage-navy dark:text-porcelain-white mb-2">Lifetime Promise</h3>
            <p className="font-body-sm text-on-surface-variant dark:text-on-primary-container/80 max-w-[200px]">Quality that spans generations.</p>
          </div>
        </div>
      </section>

      {/* Curated Collections Grid */}
      <section className="py-stack-2xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-stack-xl">
          <div>
            <h2 className="font-display-lg text-display-md font-bold text-heritage-navy dark:text-porcelain-white mb-2">Curated Collections</h2>
            <p className="font-body-md text-on-surface-variant dark:text-on-primary-container/80">Discover pieces tailored for every ritual.</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-heritage-navy dark:text-porcelain-white hover:text-champagne-gold transition-colors">
            View All <span className="material-symbols-outlined text-sm">east</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter min-h-[600px]">
          {/* Large Feature */}
          <Link href="/products?category=dinnerware" className="md:col-span-8 group relative overflow-hidden bg-bone-gray cursor-pointer">
            <Image src="/images/dinnerware_luxury.png" alt="Dining Sets" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-heritage-navy/60 to-transparent"></div>
            <div className="absolute bottom-stack-md left-stack-md z-10">
              <h3 className="font-display-md text-headline-lg font-bold text-porcelain-white mb-1">The Dinnerware</h3>
              <p className="font-body-sm text-porcelain-white/80">Complete sets for the modern table.</p>
            </div>
          </Link>
          <div className="md:col-span-4 flex flex-col gap-gutter">
            {/* Small Feature 1 */}
            <Link href="/products?category=serveware" className="flex-1 group relative overflow-hidden bg-bone-gray cursor-pointer min-h-[300px]">
              <Image src="/images/serveware_luxury.png" alt="Serveware" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-heritage-navy/60 to-transparent"></div>
              <div className="absolute bottom-stack-md left-stack-md z-10">
                <h3 className="font-display-sm text-headline-md font-bold text-porcelain-white mb-1">Serveware</h3>
                <p className="font-body-sm text-porcelain-white/80">Artful presentation.</p>
              </div>
            </Link>
            {/* Small Feature 2 */}
            <Link href="/products?category=tea-set" className="flex-1 group relative overflow-hidden bg-bone-gray cursor-pointer min-h-[300px]">
              <Image src="/images/teaset_luxury.png" alt="Tea Sets" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-heritage-navy/60 to-transparent"></div>
              <div className="absolute bottom-stack-md left-stack-md z-10">
                <h3 className="font-display-sm text-headline-md font-bold text-porcelain-white mb-1">The Tea Ritual</h3>
                <p className="font-body-sm text-porcelain-white/80">Morning sanctuary.</p>
              </div>
            </Link>
          </div>
        </div>
        <Link href="/products" className="w-full mt-stack-md flex md:hidden justify-center items-center gap-2 font-label-caps text-label-caps uppercase tracking-widest text-heritage-navy dark:text-porcelain-white hover:text-champagne-gold transition-colors py-4 border border-heritage-navy/20 dark:border-porcelain-white/20">
          View All Collections
        </Link>
      </section>

      {/* New Arrivals */}
      <section className="py-stack-xl bg-bone-gray dark:bg-primary-container">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-stack-xl">
            <h2 className="font-display-lg text-display-sm font-bold text-heritage-navy dark:text-porcelain-white mb-3">New Arrivals</h2>
            <p className="font-body-md text-on-surface-variant dark:text-on-primary-container/80">The latest additions to our artisanal library.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-gutter gap-y-stack-lg">
            {productsNew.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      {/* Editorial / Brand Story */}
      <section className="py-stack-2xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-xl items-center">
          <div className="order-2 md:order-1 relative aspect-[4/5] md:aspect-square overflow-hidden">
            <Image src="/images/gifting_luxury_updated.png" alt="Artisan at work" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2 flex flex-col justify-center md:pl-stack-lg text-center md:text-left">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-champagne-gold mb-4 block">The Process</span>
            <h2 className="font-display-lg text-display-md font-bold text-heritage-navy dark:text-porcelain-white mb-6 leading-tight">Crafted with Intention,<br/> Fired to Perfection.</h2>
            <p className="font-body-lg text-on-surface-variant dark:text-on-primary-container/80 mb-stack-md leading-relaxed">
              Every piece in our collection is born from the earth and refined by human hands. We partner with multi-generational kilns to ensure the alchemy of clay, glaze, and fire produces tableware that is both delicate to the eye and resilient for daily life.
            </p>
            <Link href="/about" className="self-center md:self-start border-b border-heritage-navy dark:border-porcelain-white pb-1 font-label-caps text-label-caps uppercase tracking-widest text-heritage-navy dark:text-porcelain-white hover:text-champagne-gold hover:border-champagne-gold transition-colors">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
