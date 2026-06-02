import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { STATIC_PRODUCTS } from '@/data/products';
import HeroCarousel from '@/components/HeroCarousel';
import ProductCard from '@/components/ProductCard';

// --- Reusable Components for exact Swasha UI ---

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="text-3xl md:text-4xl font-serif italic text-[var(--color-primary)] text-center mb-8">
    {title}
  </h2>
);

const ViewAllButton = ({ href }: { href: string }) => (
  <div className="flex justify-center mt-8">
    <Link href={href} className="bg-[var(--color-primary)] text-white px-8 py-3 text-sm font-sans tracking-widest uppercase hover:bg-[var(--color-secondary)] transition-colors">
      View all
    </Link>
  </div>
);

// --- Main Page Component ---

export default function HomePage() {
  // Centralized Data Source
  const productsNew = STATIC_PRODUCTS.slice(0, 4);
  const productsServeFor6 = STATIC_PRODUCTS.filter(p => p.category === 'dinner-set').slice(0, 4);
  const productsBowls = STATIC_PRODUCTS.filter(p => p.category === 'serveware').slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-20">
      
      {/* Top Announcement Bar */}
      <div className="bg-[var(--color-primary)] text-white text-center py-2 text-sm tracking-wide">
        Free Shipping on Orders Over Rs. 999
      </div>

      <HeroCarousel />

      {/* Circular Categories List */}
      <section className="py-12 px-4 max-w-7xl mx-auto border-b border-[var(--color-border)] mb-16">
        <div className="flex justify-start md:justify-center overflow-x-auto gap-4 md:gap-10 pb-4 hide-scrollbar">
          {[
            { name: "Dinner Set", img: "/images/dinnerware_var1.webp", cat: "dinner-set" },
            { name: "Platter", img: "/images/serveware_var1.webp", cat: "serveware" },
            { name: "Plates", img: "/images/cat_plates.webp", cat: "plates" },
            { name: "Snacks Set", img: "/images/cat_snacks.webp", cat: "serveware" },
            { name: "Coffee Mug Set", img: "/images/cat_mugs.webp", cat: "mugs" },
            { name: "Tea Cup Set", img: "/images/teaset.webp", cat: "tea-set" },
            { name: "Cake Stands", img: "/images/cat_cakestand.webp", cat: "serveware" },
            { name: "Opal Glass", img: "/images/cat_opalglass.webp", cat: "dinner-set" },
          ].map((cat, idx) => (
            <Link href={`/products?category=${cat.cat}`} key={idx} className="flex flex-col items-center group min-w-[90px]">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 relative bg-[var(--color-accent-light)] border-2 border-transparent group-hover:border-[var(--color-primary)] transition-all">
                <Image src={cat.img} alt={cat.name} fill sizes="(max-width: 768px) 96px, 96px" className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-[12px] md:text-[13px] text-[var(--color-primary)] font-serif text-center group-hover:font-bold transition-all max-w-[80px] leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Product Row 1: New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <SectionHeading title="New In Siphorahq" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {productsNew.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* Product Row 2: Serve for 6 */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <SectionHeading title="Serve for 6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {productsServeFor6.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        <ViewAllButton href="/products" />
      </section>

      {/* Image Collage 1 */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {/* Aesthetic grid matching Swasha's mosaic */}
          <div className="col-span-2 aspect-square relative bg-gray-100"><Image src="/images/hero.webp" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" alt="Collage 1" /></div>
          <div className="col-span-1 aspect-square relative bg-gray-200"><Image src="/images/teaset.webp" fill sizes="(max-width: 768px) 50vw, 16vw" className="object-cover" alt="Collage 2" /></div>
          <div className="col-span-1 aspect-square relative bg-gray-300"><Image src="/images/dinnerware.webp" fill sizes="(max-width: 768px) 50vw, 16vw" className="object-cover" alt="Collage 3" /></div>
          <div className="col-span-1 aspect-square relative bg-gray-100"><Image src="/images/serveware.webp" fill sizes="(max-width: 768px) 50vw, 16vw" className="object-cover" alt="Collage 4" /></div>
          <div className="col-span-1 aspect-square relative bg-gray-200"><Image src="/images/gifting.webp" fill sizes="(max-width: 768px) 50vw, 16vw" className="object-cover" alt="Collage 5" /></div>
        </div>
      </section>

      {/* Product Row 3: Serving Bowl */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <SectionHeading title="Serving Bowl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {productsBowls.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        <ViewAllButton href="/products" />
      </section>

      {/* Image Collage 2 */}
      <section className="max-w-3xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div className="aspect-square relative bg-gray-100"><Image src="/images/gifting.webp" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" alt="Collage 6" /></div>
          <div className="aspect-square relative bg-gray-200"><Image src="/images/serveware.webp" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" alt="Collage 7" /></div>
          <div className="aspect-square relative bg-gray-300"><Image src="/images/teaset.webp" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" alt="Collage 8" /></div>
          <div className="aspect-square relative bg-gray-200"><Image src="/images/dinnerware.webp" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" alt="Collage 9" /></div>
          <div className="aspect-square relative bg-gray-100"><Image src="/images/hero.webp" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" alt="Collage 10" /></div>
          <div className="aspect-square relative bg-gray-200"><Image src="/images/teaset.webp" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" alt="Collage 11" /></div>
        </div>
      </section>

      {/* Shop Gifts by Price */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <SectionHeading title="Shop Gifts by Price" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Under ₹999", img: "/images/gifting.webp" },
            { title: "Under ₹2000", img: "/images/serveware.webp" },
            { title: "Under ₹5000", img: "/images/dinnerware.webp" },
            { title: "Under ₹10000", img: "/images/teaset.webp" },
          ].map((item, idx) => (
            <Link href="/products" key={idx} className="group flex flex-col relative aspect-[4/5] bg-[var(--color-accent-light)] overflow-hidden">
              <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              {/* Overlay with Text */}
              <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-start pt-8">
                <span className="text-[var(--color-gold-light)] font-serif italic text-sm mb-1">Gifts</span>
                <span className="text-white font-sans font-bold tracking-widest uppercase text-xl border-b-2 border-white pb-1">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Collections Row */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <SectionHeading title="Collections" />
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
          {[
            { title: "Cups and Kettle Set", img: "/images/teaset.webp" },
            { title: "Dinner Set of 6", img: "/images/dinnerware_var2.webp" },
            { title: "Dinner Set Serve For 8", img: "/images/dinnerware.webp" },
            { title: "Cutlery", img: "/images/cat_plates.webp" },
            { title: "Drinkware", img: "/images/cat_mugs.webp" },
            { title: "Platter", img: "/images/serveware_var2.webp" },
          ].map((item, idx) => (
            <Link href="/products" key={idx} className="group">
              <div className="aspect-square rounded-full md:rounded-none overflow-hidden relative mb-2 bg-[var(--color-accent-light)]">
                <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 33vw, 16vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-[11px] md:text-sm font-sans text-[var(--color-primary)]">{item.title}</p>
            </Link>
          ))}
        </div>
        <ViewAllButton href="/products" />
      </section>

      {/* Featured Showcase Banner (Like the Blue Vintage Tea Set in Swasha) */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row bg-[var(--color-accent-light)] min-h-[400px]">
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
            <Image src="/images/teaset.webp" alt="Featured Set" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          {/* Content Side */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-[#F8F9FA]">
            <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-primary)] mb-4 leading-tight">
              Siphorahq Blue Rose Tea Set of 17 Pcs - Premium Vintage Porcelain Tea Set For Home & Gifting
            </h2>
            <p className="text-[var(--color-text-muted)] font-sans text-sm md:text-base leading-relaxed mb-8">
              Add timeless charm to your tea moments with our <strong>17-Piece Tea Set</strong>, designed in an elegant <strong>vintage porcelain style</strong>. This complete set includes cups, saucers, a kettle, milk pot, sugar pot—perfect for home use, tea parties, or gifting.
            </p>
            <Link href="/products" className="bg-[var(--color-primary)] text-white px-8 py-3 text-sm font-sans tracking-widest uppercase hover:bg-[var(--color-secondary)] transition-colors self-start">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Wide Banner */}
      <section className="relative w-full h-[30vh] md:h-[40vh] mb-20 bg-[var(--color-primary)] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero.webp" alt="Wide Banner" fill sizes="100vw" className="object-cover object-center opacity-70" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-white text-3xl md:text-5xl font-serif mb-4">Bringing Beauty and Sophistication to Every Corner.</h2>
          <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 mt-4 text-white text-sm tracking-widest uppercase border border-white/30">
            Premium Crockery Collections
          </div>
        </div>
      </section>

    </div>
  );
}
