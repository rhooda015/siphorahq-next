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
            <Link href={`/products?category=${cat.cat}`} key={idx} className="flex flex-col items-center group min-w-[100px] md:min-w-[140px]">
              <div className="w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden mb-3 relative bg-[var(--color-accent-light)] border-2 border-transparent group-hover:border-[var(--color-primary)] transition-all">
                <Image src={cat.img} alt={cat.name} fill sizes="(max-width: 768px) 90px, 120px" priority={idx < 4} className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-[12px] md:text-[14px] text-[var(--color-primary)] font-serif text-center group-hover:font-bold transition-all max-w-[100px] leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Siphorahq Trust Signals */}
      <section className="bg-[var(--color-accent-light)] py-12 mb-20 border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading title="Why Siphorahq" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <svg className="w-10 h-10 text-[var(--color-primary)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
              <h3 className="font-serif text-[var(--color-primary)] text-lg mb-2">Handcrafted Porcelain</h3>
              <p className="font-sans text-xs text-[var(--color-text-muted)]">Artisan-crafted for timeless elegance.</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-10 h-10 text-[var(--color-primary)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              <h3 className="font-serif text-[var(--color-primary)] text-lg mb-2">Premium Packaging</h3>
              <p className="font-sans text-xs text-[var(--color-text-muted)]">Luxury unboxing experience guaranteed.</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-10 h-10 text-[var(--color-primary)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 className="font-serif text-[var(--color-primary)] text-lg mb-2">Fast Pan India Shipping</h3>
              <p className="font-sans text-xs text-[var(--color-text-muted)]">Securely delivered to your doorstep.</p>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-10 h-10 text-[var(--color-primary)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"></path></svg>
              <h3 className="font-serif text-[var(--color-primary)] text-lg mb-2">Secure Payments</h3>
              <p className="font-sans text-xs text-[var(--color-text-muted)]">100% safe and encrypted checkout.</p>
            </div>
          </div>
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

      {/* Brand Story */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row items-center bg-white border border-[var(--color-border)]">
          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-primary)] mb-6">Our Story</h2>
            <p className="text-[var(--color-text-muted)] font-sans leading-relaxed mb-6">
              Siphorahq was created to bring timeless elegance to modern homes. We believe that every meal is a meaningful moment, and the tableware you use should reflect the beauty of those shared experiences. 
            </p>
            <p className="text-[var(--color-text-muted)] font-sans leading-relaxed mb-8">
              From our handcrafted porcelain to our meticulous detailing, every piece is designed to be cherished for generations, elevating your everyday dining into a luxury experience.
            </p>
            <Link href="/about" className="inline-block border border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-3 text-sm font-sans tracking-widest uppercase hover:bg-[var(--color-primary)] hover:text-white transition-colors self-start mx-auto md:mx-0">
              Discover More
            </Link>
          </div>
          <div className="w-full md:w-1/2 relative min-h-[400px]">
            <Image src="/images/hero.webp" alt="Siphorahq Story" fill className="object-cover" />
          </div>
        </div>
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
            { title: "Under ₹999", img: "/images/gifting.webp", maxPrice: 999 },
            { title: "Under ₹2000", img: "/images/serveware.webp", maxPrice: 2000 },
            { title: "Under ₹5000", img: "/images/dinnerware.webp", maxPrice: 5000 },
            { title: "Under ₹10000", img: "/images/teaset.webp", maxPrice: 10000 },
          ].map((item, idx) => (
            <Link href={`/products?maxPrice=${item.maxPrice}`} key={idx} className="group flex flex-col relative aspect-[4/5] bg-[var(--color-accent-light)] overflow-hidden">
              <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
              {/* Overlay with Text */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent flex flex-col items-center justify-start pt-8">
                <span className="text-[var(--color-gold-light)] font-serif italic text-sm mb-1 drop-shadow-md">Gifts</span>
                <span className="text-white font-sans font-bold tracking-widest uppercase text-xl border-b-2 border-white pb-1 drop-shadow-md">{item.title}</span>
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
            { title: "Cups and Kettle Set", img: "/images/teaset.webp", cat: "tea-set" },
            { title: "Dinner Set of 6", img: "/images/dinnerware_var2.webp", cat: "dinner-set" },
            { title: "Dinner Set Serve For 8", img: "/images/dinnerware.webp", cat: "dinner-set" },
            { title: "Cutlery", img: "/images/cat_plates.webp", cat: "cutlery" },
            { title: "Drinkware", img: "/images/cat_mugs.webp", cat: "mugs" },
            { title: "Platter", img: "/images/serveware_var2.webp", cat: "serveware" },
          ].map((item, idx) => (
            <Link href={`/products?category=${item.cat}`} key={idx} className="group">
              <div className="aspect-square rounded-full md:rounded-none overflow-hidden relative mb-2 bg-[var(--color-accent-light)]">
                <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 33vw, 16vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-[11px] md:text-sm font-sans text-[var(--color-primary)]">{item.title}</p>
            </Link>
          ))}
        </div>
        <ViewAllButton href="/products" />
      </section>

      {/* Social Proof / Reviews */}
      <section className="bg-[#F9F8F6] py-16 mb-20 border-y border-[var(--color-border)] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center gap-1 mb-4 text-[#EED202]">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-primary)] mb-4">4.8/5 Stars — Trusted by 2,500+ Homes</h2>
          <p className="text-[var(--color-text-muted)] font-serif italic text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
            "The quality of the porcelain is absolutely breathtaking. It completely transformed our dinner parties. Siphorahq truly understands luxury."
          </p>
          <p className="mt-6 text-sm font-sans tracking-widest uppercase text-[var(--color-primary)]">— Anjali M., Verified Buyer</p>
        </div>
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

      {/* Corporate Gifting Banner */}
      <section className="relative w-full py-24 mb-12 bg-[var(--color-primary)] flex items-center justify-center border-y-8 border-[var(--color-accent-light)]">
        <div className="absolute inset-0 z-0">
          <Image src="/images/gifting.webp" alt="Corporate Gifting" fill sizes="100vw" className="object-cover object-center opacity-40 mix-blend-overlay" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-[var(--color-gold-light)] font-sans tracking-[0.2em] uppercase text-sm mb-4">Elevate Your Gifting</h2>
          <h3 className="text-white text-4xl md:text-6xl font-serif mb-8 drop-shadow-md">Luxury Corporate Gifting</h3>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 text-white font-serif italic text-lg md:text-xl">
            <span>For Hotels</span> <span className="text-[var(--color-gold-light)]">•</span>
            <span>For Weddings</span> <span className="text-[var(--color-gold-light)]">•</span>
            <span>For Clients</span> <span className="text-[var(--color-gold-light)]">•</span>
            <span>For Employees</span>
          </div>

          <Link href="/gifting" className="inline-block bg-white text-[var(--color-primary)] px-10 py-4 text-sm font-sans tracking-widest uppercase hover:bg-[var(--color-gold-light)] transition-colors shadow-xl">
            Explore Gifting Menu
          </Link>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="max-w-4xl mx-auto px-4 pb-12 text-center">
        <h1 className="text-xl font-serif text-[var(--color-primary)] mb-4">Luxury Porcelain Tableware in India</h1>
        <p className="text-xs md:text-sm text-[var(--color-text-muted)] font-sans leading-relaxed text-justify md:text-center">
          Siphorahq is India's premier destination for luxury porcelain tableware, premium dinner sets, and aesthetic home decor. We specialize in curating exquisite, handcrafted pieces that bring timeless elegance to your dining experience. Whether you are hosting a formal dinner party, looking for the perfect wedding gift, or upgrading your everyday serveware, our exclusive collections are designed to impress. Explore our wide range of premium dinnerware, luxury tea cup sets, elegant platters, and sophisticated serving bowls. With our commitment to unparalleled quality, secure packaging, and fast Pan-India shipping, Siphorahq ensures that luxury is delivered safely to your doorstep. Transform your dining space into a masterpiece with Siphorahq—where poetry meets porcelain.
        </p>
      </section>

    </div>
  );
}
