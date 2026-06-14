import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import ProductListing from '@/components/ProductListing';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export const metadata = {
  title: 'Best Sellers | Most Loved Porcelain Collection | Siphorahq',
  description: 'Shop Siphorahq’s best-selling luxury porcelain. Discover the most loved dinnerware, tea sets, and gifting collections.',
  openGraph: {
    title: 'Best Sellers | Most Loved Porcelain Collection | Siphorahq',
    description: 'Shop Siphorahq’s best-selling luxury porcelain. Discover the most loved dinnerware, tea sets, and gifting collections.',
  }
};

async function getBestSellers() {
  await dbConnect();
  // Fetch products and sort by totalSales or just return a curated list. 
  // For now, we will return some top products as a mock or just all products if totalSales isn't tracked yet.
  const products = await Product.find({ status: 'active' }).limit(12).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function BestSellersPage() {
  const products = await getBestSellers();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Sellers',
    description: metadata.description,
    url: `${BRAND.domain}/best-sellers`
  };

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BRAND.domain },
      { '@type': 'ListItem', position: 2, name: 'Best Sellers', item: `${BRAND.domain}/best-sellers` }
    ]
  };

  return (
    <div className="bg-surface-cream text-ink-charcoal font-body-md overflow-x-hidden min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }} />

      {/* ── HERO BANNER ── */}
      <section className="bg-[#F8F5F1] py-20 md:py-32 px-5 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-6">
            Customer Favorites
          </p>
          <h1 className="font-headline-lg text-4xl md:text-6xl text-ink-charcoal italic tracking-tighter mb-6">
            Most Loved by Modern Homes
          </h1>
          <p className="font-body-md text-on-surface-variant text-lg max-w-xl mx-auto">
            Discover the iconic pieces that our community adores. From morning rituals to festive dinners, these are our best sellers.
          </p>
        </div>
      </section>

      {/* ── BEST SELLERS GRID ── */}
      <section className="py-16 md:py-24 px-5 max-w-container-max mx-auto">
        <ProductListing products={products} />
      </section>

      {/* ── WHY THEY LOVE IT ── */}
      <section className="py-24 px-5 bg-ink-charcoal text-surface-cream text-center">
         <div className="max-w-container-max mx-auto">
           <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-6">
             The Siphorahq Difference
           </p>
           <h2 className="font-headline-lg text-3xl md:text-5xl italic tracking-tighter mb-16">
             Why Our Bestsellers Sell Out
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-4xl mx-auto">
             <div>
               <span className="material-symbols-outlined text-4xl text-burnished-gold mb-4">diamond</span>
               <h3 className="font-headline-md text-xl mb-3">Premium Quality</h3>
               <p className="text-surface-cream/70 text-sm">Crafted from high-grade, chip-resistant porcelain.</p>
             </div>
             <div>
               <span className="material-symbols-outlined text-4xl text-burnished-gold mb-4">verified_user</span>
               <h3 className="font-headline-md text-xl mb-3">Food Safe</h3>
               <p className="text-surface-cream/70 text-sm">100% lead-free and non-toxic glazes for daily use.</p>
             </div>
             <div>
               <span className="material-symbols-outlined text-4xl text-burnished-gold mb-4">redeem</span>
               <h3 className="font-headline-md text-xl mb-3">Gift Ready</h3>
               <p className="text-surface-cream/70 text-sm">Arrives in elegant packaging, perfect for gifting.</p>
             </div>
           </div>
         </div>
      </section>
    </div>
  );
}
