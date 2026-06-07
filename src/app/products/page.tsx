export { productsMetadata as metadata } from '@/lib/metadata';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ClientProductGrid from './ClientProductGrid';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { STATIC_PRODUCTS } from '@/data/products';

export const revalidate = 0;

export default async function ProductsPage() {
  await dbConnect();
  
  const dbProducts = await Product.find({ status: 'Live' }).sort({ createdAt: -1 }).lean();
  
  const mappedProducts = dbProducts.map((p: any) => ({
    id: p.handle || p._id.toString(),
    name: p.title,
    price: p.price,
    salePrice: p.price,
    category: p.category,
    image: p.images?.[0]?.url || '/images/default_product.webp',
  }));

  const displayProducts = mappedProducts.length > 0 ? mappedProducts : STATIC_PRODUCTS;
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* ── PAGE HEADER ── */}
      <section className="bg-[var(--color-accent-light)] border-b border-[var(--color-border)] py-14 text-center px-4 relative">
        {/* Breadcrumbs */}
        <div className="absolute top-4 left-4 md:left-8 flex items-center text-xs font-sans text-[var(--color-text-muted)]">
          <Link href="/">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[var(--color-primary)]">Collections</span>
        </div>
        <p className="text-[12px] font-sans font-medium uppercase tracking-widest text-[var(--color-text-muted)] mb-3">The Collection</p>
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--color-primary)] mb-4">
          All Collections
        </h1>
        <p className="text-[var(--color-text-muted)] font-sans text-sm max-w-md mx-auto leading-relaxed">
          Discover our curated selection of premium porcelain dinnerware, luxury tea sets, and aesthetic home decor.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Suspense fallback={<div className="py-20 text-center font-serif text-[var(--color-primary)]">Loading Collections...</div>}>
          <ClientProductGrid products={displayProducts} />
        </Suspense>
      </div>
    </div>
  );
}
