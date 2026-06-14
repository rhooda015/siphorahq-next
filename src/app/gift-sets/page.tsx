import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import ProductListing from '@/components/ProductListing';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata = {
  title: 'Luxury Gift Sets | Premium Porcelain Gifting | Siphorahq',
  description: 'Shop Siphorahq’s luxury porcelain gift sets. Discover elegantly packaged dining and tea sets perfect for weddings, anniversaries, and corporate gifting.',
  openGraph: {
    title: 'Luxury Gift Sets | Premium Porcelain Gifting | Siphorahq',
    description: 'Shop Siphorahq’s luxury porcelain gift sets. Discover elegantly packaged dining and tea sets perfect for weddings, anniversaries, and corporate gifting.',
  }
};

async function getGiftSets() {
  await dbConnect();
  // Fetch products that are in the "gifting" collection or have a gift tag
  const products = await Product.find({ 
    status: 'active',
    $or: [
      { collectionName: { $regex: /gift/i } },
      { category: { $regex: /gift/i } },
      { tags: { $in: ['gift', 'gifting'] } }
    ]
  }).limit(12).lean();
  
  // Fallback if no specific tags
  if (products.length === 0) {
    const fallback = await Product.find({ status: 'active' }).limit(8).lean();
    return JSON.parse(JSON.stringify(fallback));
  }
  return JSON.parse(JSON.stringify(products));
}

export default async function GiftSetsPage() {
  const products = await getGiftSets();

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Luxury Gift Sets',
    description: metadata.description,
    url: `${BRAND.domain}/gift-sets`
  };

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BRAND.domain },
      { '@type': 'ListItem', position: 2, name: 'Gift Sets', item: `${BRAND.domain}/gift-sets` }
    ]
  };

  return (
    <div className="bg-surface-cream text-ink-charcoal font-body-md overflow-x-hidden min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }} />

      {/* ── HERO BANNER ── */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/gifting_siporahq_8k_1780322633512.webp"
          alt="Luxury Gift Sets"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-ink-charcoal/30" />
        
        <div className="relative z-10 text-center px-5 flex flex-col items-center mt-12">
          <p className="font-label-caps text-[12px] uppercase tracking-[0.2em] text-surface-cream mb-6 drop-shadow-sm">
            The Art of Gifting
          </p>
          <h1 className="font-headline-lg text-4xl md:text-6xl text-surface-cream italic tracking-tighter mb-6 drop-shadow-sm">
            Gifts That Will Be Treasured
          </h1>
          <p className="font-body-md text-surface-cream/90 text-lg max-w-xl mx-auto drop-shadow-sm">
            Celebrate life’s most precious moments with elegantly packaged, premium porcelain tableware.
          </p>
        </div>
      </section>

      {/* ── OCCASIONS ── */}
      <section className="py-24 px-5 max-w-container-max mx-auto text-center">
        <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-4">Curated For Every Moment</p>
        <h2 className="font-headline-md text-3xl md:text-4xl italic text-ink-charcoal mb-16">Perfect For</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { title: 'Weddings', img: '/images/our-story/porcelain-table-setting.webp' },
            { title: 'Anniversaries', img: '/images/media__1780323514271.webp' },
            { title: 'Housewarmings', img: '/images/dinnerware_var2.webp' },
            { title: 'Corporate', img: '/images/craftsmanship.webp' }
          ].map((occasion, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden cursor-pointer">
              <Image
                src={occasion.img}
                alt={occasion.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink-charcoal/40 group-hover:bg-ink-charcoal/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h3 className="font-headline-md text-xl md:text-2xl text-surface-cream italic drop-shadow-sm">{occasion.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GIFTING GRID ── */}
      <section className="py-16 md:py-24 px-5 bg-[#F8F5F1]">
        <div className="max-w-container-max mx-auto">
          <ProductListing products={products} />
        </div>
      </section>

      {/* ── PREMIUM PACKAGING ── */}
      <section className="py-24 px-5">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-[4/3] lg:aspect-square">
            <Image
              src="/images/gifting_siporahq_8k_1780322633512.webp"
              alt="Premium Gift Packaging"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center max-w-lg">
            <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-6">
              The Unboxing Experience
            </p>
            <h2 className="font-headline-lg text-4xl md:text-5xl italic text-ink-charcoal tracking-tighter mb-8 leading-tight">
              Premium Signature Packaging
            </h2>
            <div className="space-y-6 font-body-md text-on-surface-variant text-lg leading-relaxed">
              <p>
                A gift should feel special from the moment it is received. Every Siphorahq gift set is carefully secured in our signature luxury packaging.
              </p>
              <p>
                We ensure that each piece arrives perfectly intact and beautifully presented, making the unboxing experience just as memorable as the porcelain inside.
              </p>
            </div>
          </div>
        </div>
      </section>

      <NewsletterForm />
    </div>
  );
}
