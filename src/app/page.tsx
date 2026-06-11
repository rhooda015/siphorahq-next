import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { STATIC_PRODUCTS } from '@/data/products';
import HeroCarousel from '@/components/HeroCarousel';
import CategoryScroll from '@/components/CategoryScroll';
import ProductCard from '@/components/ProductCard';
import RevealOnScroll from '@/components/RevealOnScroll';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Homepage from '@/models/Homepage';
export const revalidate = 0; // Disable caching to always show live products

// --- Reusable Components for exact Swasha UI ---

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] text-center mb-16 tracking-wide">
    {title}
  </h2>
);

const ViewAllButton = ({ href }: { href: string }) => (
  <div className="flex justify-center mt-12">
    <Link href={href} className="border-[0.5px] border-[var(--color-primary)] text-[var(--color-primary)] px-10 py-4 text-[11px] font-sans tracking-[0.2em] uppercase hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-500">
      View all
    </Link>
  </div>
);

// --- Main Page Component ---

export default async function HomePage() {
  await dbConnect();
  
  // Fetch live products from DB
  const dbProducts = await Product.find({ status: 'Live' }).sort({ createdAt: -1 }).lean();
  
  // Fetch homepage layout
  let homepage = await Homepage.findOne({ version: 'draft' }).lean();
  
  const mappedProducts = dbProducts.map((p: any) => ({
    id: p.handle || p._id.toString(),
    name: p.title,
    price: p.price,
    salePrice: p.price, 
    category: p.category,
    image: p.images?.[0]?.url || '/images/teaset.webp',
  }));

  // Centralized Data Source
  const allProducts = mappedProducts.length > 0 ? mappedProducts : STATIC_PRODUCTS;

  // Derived collections for the homepage sections
  // Ensure "New Arrivals" uses the latest mapped products
  const productsNew = [...mappedProducts, ...STATIC_PRODUCTS].slice(0, 4);
  
  // Ensure "Dinner Sets" and "Serveware" do NOT repeat "New Arrivals" if we don't have enough DB data
  const dinnerSetProducts = mappedProducts.filter((p: any) => p.category?.toLowerCase().includes('dinner'));
  const productsServeFor6 = dinnerSetProducts.length >= 4 
    ? dinnerSetProducts.slice(0, 4) 
    : [...dinnerSetProducts, ...STATIC_PRODUCTS.filter((p: any) => p.category?.toLowerCase().includes('dinner'))].slice(0, 4);

  const bowlsProducts = mappedProducts.filter((p: any) => p.category?.toLowerCase().includes('serveware') || p.category?.toLowerCase().includes('bowl') || p.category?.toLowerCase().includes('plates'));
  const productsBowls = bowlsProducts.length >= 4 
    ? bowlsProducts.slice(0, 4) 
    : [...bowlsProducts, ...STATIC_PRODUCTS.filter((p: any) => p.category?.toLowerCase().includes('serveware') || p.category?.toLowerCase().includes('bowl') || p.category?.toLowerCase().includes('plates'))].slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-20">
      
      {/* Top Announcement Bar */}
      <div className="bg-[var(--color-primary)] text-white text-center py-2 text-sm tracking-wide">
        Free Shipping on Orders Over ₹999
      </div>

      {homepage?.sections && homepage.sections.length > 0 ? (
        homepage.sections.map((section: any) => {
          if (section.type === 'hero') {
            return (
              <HeroCarousel 
                key={section.id}
                slides={section.props.image ? [section.props.image] : ['/images/hero.webp', '/images/serveware.webp', '/images/gifting.webp']}
                title={section.props.title}
                buttonText={section.props.buttonText}
                buttonLink={section.props.buttonLink}
              />
            );
          }
          
          if (section.type === 'featured_collection') {
            const collectionProducts = allProducts.filter((p: any) => 
              p.category?.toLowerCase() === section.props.collectionId?.toLowerCase()
            ).slice(0, section.props.limit || 4);
            
            const displayProducts = collectionProducts.length > 0 ? collectionProducts : allProducts.slice(0, 4);
            
            return (
              <section key={section.id} className="max-w-7xl mx-auto px-4 my-20">
                <SectionHeading title={section.props.title || 'Featured Collection'} />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
                  {displayProducts.map((product: any) => <ProductCard key={product.id} product={product} />)}
                </div>
                {section.props.buttonText && (
                  <ViewAllButton href={`/products?category=${section.props.collectionId}`} />
                )}
              </section>
            );
          }

          if (section.type === 'text_block') {
            return (
              <section key={section.id} className="max-w-4xl mx-auto px-4 my-20 text-center">
                <h2 className="text-3xl md:text-5xl font-serif text-[var(--color-primary)] mb-6 tracking-wide">
                  {section.props.title}
                </h2>
                <p className="text-[var(--color-text-muted)] font-sans text-sm md:text-base leading-relaxed">
                  {section.props.content}
                </p>
              </section>
            );
          }

          return null;
        })
      ) : (
        <>
          <HeroCarousel 
            slides={['/images/hero.webp', '/images/serveware.webp', '/images/gifting.webp']}
            title="Luxury Porcelain & Fine Dining"
            buttonText="Shop Now"
            buttonLink="/products"
          />

      <RevealOnScroll>
        <CategoryScroll />
      </RevealOnScroll>

      {/* Why Siphorahq Trust Signals */}
      <RevealOnScroll>
        <section className="bg-[#FAF9F7] py-8 mb-16 border-y-[0.5px] border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading title="The Siphorahq Promise" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center mt-16">
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 text-[var(--color-secondary)] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5 13l4 4L19 7"></path></svg>
                <h3 className="font-serif text-[var(--color-primary)] text-xl mb-3 tracking-wide">Handcrafted Porcelain</h3>
                <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] leading-loose">Artisan-crafted for timeless elegance.</p>
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 text-[var(--color-secondary)] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                <h3 className="font-serif text-[var(--color-primary)] text-xl mb-3 tracking-wide">Premium Packaging</h3>
                <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] leading-loose">Luxury unboxing experience guaranteed.</p>
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 text-[var(--color-secondary)] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="font-serif text-[var(--color-primary)] text-xl mb-3 tracking-wide">Pan India Shipping</h3>
                <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] leading-loose">Securely delivered to your doorstep.</p>
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 text-[var(--color-secondary)] mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"></path></svg>
                <h3 className="font-serif text-[var(--color-primary)] text-xl mb-3 tracking-wide">Secure Payments</h3>
                <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-[var(--color-text-muted)] leading-loose">100% safe and encrypted checkout.</p>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Product Row 1: New Arrivals */}
      <RevealOnScroll>
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <SectionHeading title="New In Siphorahq" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {productsNew.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      </RevealOnScroll>

      {/* Product Row 2: Dinner Sets */}
      <RevealOnScroll>
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <SectionHeading title="Dinner Sets" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {productsServeFor6.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <ViewAllButton href="/products?category=dinner-set" />
        </section>
      </RevealOnScroll>

      {/* Image Collage 1 — clean 5-column grid */}
      <RevealOnScroll>
        <section className="max-w-5xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-2 row-span-1 aspect-[3/2] relative bg-gray-100 overflow-hidden group">
              <Image src="/images/teaset.webp" fill sizes="40vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Tea Ritual" />
            </div>
            <div className="col-span-1 aspect-square relative bg-gray-200 overflow-hidden group">
              <Image src="/images/cat_mugs.webp" fill sizes="20vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Luxury Mugs" />
            </div>
            <div className="col-span-1 aspect-square relative bg-gray-300 overflow-hidden group">
              <Image src="/images/cat_plates.webp" fill sizes="20vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Dinnerware" />
            </div>
            <div className="col-span-1 aspect-square relative bg-gray-100 overflow-hidden group">
              <Image src="/images/prod1.webp" fill sizes="20vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Serveware" />
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Product Row 3: Serveware */}
      <RevealOnScroll>
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <SectionHeading title="Serveware" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {productsBowls.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <ViewAllButton href="/products?category=serveware" />
        </section>
      </RevealOnScroll>

      {/* Brand Story */}
      <RevealOnScroll>
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <div className="flex flex-col md:flex-row items-stretch bg-white border-[0.5px] border-[#EAE3D8] shadow-sm">
            <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-center text-center md:text-left relative">
              <div className="absolute top-8 left-8 text-8xl font-serif text-[var(--color-primary)] opacity-5">S</div>
              <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-primary)] mb-6 tracking-wide relative z-10">Our Story</h2>
              <p className="text-[#666] font-sans text-[13px] md:text-[15px] leading-[1.8] mb-5 relative z-10">
                <span className="font-serif italic text-2xl text-[var(--color-primary)] mr-2">S</span>iphorahq was created to bring timeless elegance to modern homes. We believe that every meal is a meaningful moment, and the tableware you use should reflect the beauty of those shared experiences. 
              </p>
              <p className="text-[#666] font-sans text-[13px] md:text-[15px] leading-[1.8] mb-10 relative z-10">
                From our handcrafted porcelain to our meticulous detailing, every piece is designed to be cherished for generations, elevating your everyday dining into a luxury experience.
              </p>
              <Link href="/about" className="inline-block border border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-3 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-500 self-start mx-auto md:mx-0 relative z-10">
                Discover More
              </Link>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[400px]">
              <Image src="/images/lifestyle_2.webp" alt="Siphorahq Story" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Image Collage 2 */}
      <RevealOnScroll>
        <section className="max-w-3xl mx-auto px-4 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="aspect-square relative bg-gray-100 overflow-hidden group"><Image src="/images/cat_opalglass.webp" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Opal Glass" /></div>
            <div className="aspect-square relative bg-gray-200 overflow-hidden group"><Image src="/images/serveware_var1.webp" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Serveware" /></div>
            <div className="aspect-square relative bg-gray-300 overflow-hidden group"><Image src="/images/dinnerware_var1.webp" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Dinner Set" /></div>
            <div className="aspect-square relative bg-gray-200 overflow-hidden group"><Image src="/images/lifestyle_1.webp" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Hero Dinnerware" /></div>
            <div className="aspect-square relative bg-gray-100 overflow-hidden group"><Image src="/images/prod2.webp" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Luxury Box" /></div>
            <div className="aspect-square relative bg-gray-200 overflow-hidden group"><Image src="/images/gifting_siporahq.webp" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" alt="Gift Ribbon" /></div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Shop Gifts by Price */}
      <RevealOnScroll>
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <SectionHeading title="Shop Gifts by Price" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Under ₹999", img: "/images/gifting_siporahq_8k_1780322633512.webp", maxPrice: 999 },
              { title: "Under ₹2000", img: "/images/serveware_var2.webp", maxPrice: 2000 },
              { title: "Under ₹5000", img: "/images/dinnerware.webp", maxPrice: 5000 },
              { title: "Under ₹10000", img: "/images/lifestyle_4.webp", maxPrice: 10000 },
            ].map((item, idx) => (
              <Link href={`/products?maxPrice=${item.maxPrice}`} key={idx} className="group flex flex-col relative aspect-[4/5] bg-[var(--color-accent-light)] overflow-hidden">
                <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                {/* Overlay with Text */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent flex flex-col items-center justify-start pt-8 transition-opacity duration-500 group-hover:opacity-90">
                  <span className="text-[#EAE3D8] font-serif italic text-sm mb-1 drop-shadow-md">Gifts</span>
                  <span className="text-white font-sans font-bold tracking-widest uppercase text-xl border-b-2 border-white pb-1 drop-shadow-md">{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      {/* Collections Row */}
      <RevealOnScroll>
        <section className="max-w-5xl mx-auto px-4 mb-16">
          <SectionHeading title="Collections" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            {[
              { title: "Cups & Mugs", img: "/images/media__1780320817923.webp", cat: "drinkware" },
              { title: "Tea Collection", img: "/images/media__1780326304876.webp", cat: "tea-set" },
              { title: "Platters", img: "/images/cat_snacks.webp", cat: "serveware" },
              { title: "Luxury Gifts", img: "/images/media__1780320363873.webp", cat: "gifting" },
              { title: "Serveware", img: "/images/media__1780322522325.webp", cat: "serveware" },
              { title: "Dinnerware", img: "/images/dinnerware_var2.webp", cat: "dinner-set" },
              { title: "Opal Glass", img: "/images/media__1780320382791.webp", cat: "dinner-set" },
            ].map((item, idx) => (
              <Link href={`/products?category=${item.cat}`} key={idx} className="group">
                <div className="aspect-[3/4] rounded-sm overflow-hidden relative mb-3 bg-[#F9F8F6] border border-[#EAE3D8] transition-all duration-500 group-hover:shadow-md">
                  <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 50vw, 15vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                </div>
                <p className="text-[11px] font-sans tracking-widest uppercase text-[var(--color-primary)] transition-colors duration-300 group-hover:text-[#D4AF37]">{item.title}</p>
              </Link>
            ))}
          </div>
          <ViewAllButton href="/products" />
        </section>
      </RevealOnScroll>

      {/* Social Proof / Reviews */}
      <RevealOnScroll>
        <section className="bg-[#FAF9F7] py-12 mb-16 border-y border-[#EAE3D8] text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center gap-1 mb-4 text-[#D4AF37]">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-4">4.8/5 Stars — Trusted by 2,500+ Homes</h2>
            <p className="text-[#666] font-serif italic text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
              "The quality of the porcelain is absolutely breathtaking. It completely transformed our dinner parties. Siphorahq truly understands luxury."
            </p>
            <p className="mt-6 text-xs font-sans tracking-widest uppercase text-[var(--color-primary)]">— Anjali M., Verified Buyer</p>
          </div>
        </section>
      </RevealOnScroll>

      {/* Featured Showcase Banner */}
      <RevealOnScroll>
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="flex flex-col md:flex-row bg-[#FAF9F7] border border-[#EAE3D8] min-h-[350px]">
            {/* Image Side */}
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden group">
              <Image src="/images/gifting_siporahq.webp" alt="Featured Set" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out" />
            </div>
            {/* Content Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl font-serif text-[var(--color-primary)] mb-3 leading-tight">
                Siphorahq Blue Rose Tea Set of 17 Pcs - Premium Vintage Porcelain
              </h2>
              <p className="text-[#666] font-sans text-sm leading-[1.8] mb-6">
                Add timeless charm to your tea moments with our <strong>17-Piece Tea Set</strong>, designed in an elegant <strong>vintage porcelain style</strong>. This complete set includes cups, saucers, a kettle, milk pot, sugar pot—perfect for home use, tea parties, or gifting.
              </p>
              <Link href="/products" className="bg-[var(--color-primary)] text-white px-8 py-3 text-xs font-sans tracking-widest uppercase hover:bg-[#1a2520] transition-colors self-start shadow-sm">
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Corporate Gifting Banner */}
      <RevealOnScroll>
        <section className="relative w-full py-24 mb-16 bg-[var(--color-primary)] flex items-center justify-center border-y-[12px] border-[#EAE3D8] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/images/gifting_siporahq_8k_1780322633512.webp" alt="Corporate Gifting" fill sizes="100vw" className="object-cover object-center opacity-30 mix-blend-overlay scale-105" />
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h2 className="text-[#D4AF37] font-sans tracking-[0.3em] uppercase text-xs mb-6">Elevate Your Gifting</h2>
            <h3 className="text-white text-4xl md:text-6xl font-serif mb-8 drop-shadow-lg tracking-wide">Luxury Corporate Gifting</h3>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10 text-white/90 font-serif italic text-xl">
              <span className="tracking-wide">For Hotels</span> <span className="text-[#D4AF37] opacity-50">•</span>
              <span className="tracking-wide">For Weddings</span> <span className="text-[#D4AF37] opacity-50">•</span>
              <span className="tracking-wide">For Clients</span> <span className="text-[#D4AF37] opacity-50">•</span>
              <span className="tracking-wide">For Employees</span>
            </div>

            <Link href="/gifting" className="inline-block bg-transparent border border-white text-white px-10 py-4 text-[11px] font-sans tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-500">
              Explore Gifting Menu
            </Link>
          </div>
        </section>
      </RevealOnScroll>

      {/* SEO Content Block */}
      <RevealOnScroll>
        <section className="bg-[#FAF9F7] border-t border-[#EAE3D8] py-12 text-center px-4 mt-16">
          <h1 className="text-xl font-serif text-[var(--color-primary)] mb-4">Premium Porcelain Dinnerware & Tea Sets India | SiphoraHQ</h1>
          <p className="text-[#666] font-sans text-xs max-w-3xl mx-auto leading-relaxed">
            Siphorahq is India's premier destination for luxury porcelain tableware, premium dinner sets, and aesthetic home decor. We specialize in curating exquisite, handcrafted pieces that bring timeless elegance to your dining experience. Whether you are hosting a formal dinner party, looking for the perfect wedding gift, or upgrading your everyday serveware, our exclusive collections are designed to impress. Explore our wide range of premium dinnerware, luxury tea cup sets, elegant platters, and sophisticated serving bowls. With our commitment to unparalleled quality, secure packaging, and fast Pan-India shipping, Siphorahq ensures that luxury is delivered safely to your doorstep. Transform your dining space into a masterpiece with Siphorahq—where poetry meets porcelain.
          </p>
        </section>
      </RevealOnScroll>

        </>
      )}
    </div>
  );
}
