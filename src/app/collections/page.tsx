import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import NewsletterForm from '@/components/NewsletterForm';
import { headers } from 'next/headers';

export const metadata = {
  title: 'Luxury Porcelain Collections | Siphorahq',
  description: 'Discover curated premium porcelain collections crafted for elegant dining and luxury gifting.',
  openGraph: {
    title: 'Luxury Porcelain Collections | Siphorahq',
    description: 'Discover curated premium porcelain collections crafted for elegant dining and luxury gifting.',
  }
};

export default async function CollectionsPage() {
  const nonce = (await headers()).get('x-nonce') || '';

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Luxury Porcelain Collections',
    description: metadata.description,
    url: `${BRAND.domain}/collections`
  };

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BRAND.domain },
      { '@type': 'ListItem', position: 2, name: 'Collections', item: `${BRAND.domain}/collections` }
    ]
  };

  return (
    <div className="bg-surface-cream text-ink-charcoal font-body-md overflow-x-hidden min-h-screen">
      <script nonce={nonce} suppressHydrationWarning={true} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script nonce={nonce} suppressHydrationWarning={true} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }} />

      {/* ── HERO BANNER ── */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/our-story/porcelain-table-setting.webp"
          alt="Luxury Porcelain Collections"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-ink-charcoal/20" />
        
        <div className="relative z-10 text-center px-5 flex flex-col items-center mt-12">
          <h1 className="font-headline-lg text-4xl md:text-6xl text-surface-cream italic tracking-tighter mb-4 drop-shadow-sm">
            Curated Collections
          </h1>
          <p className="font-body-md text-surface-cream/90 text-lg max-w-lg mx-auto drop-shadow-sm">
            Explore premium porcelain crafted for elegant dining and luxury gifting.
          </p>
        </div>
      </section>

      {/* ── FEATURED COLLECTIONS ── */}
      <section className="py-24 px-5 max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-4">Discover</p>
          <h2 className="font-headline-md text-3xl md:text-4xl italic text-ink-charcoal">Featured Collections</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Curated Dining */}
          <Link href="/collections/dinnerware" className="group block relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/dinnerware_var2.webp"
              alt="Curated Dining"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-charcoal/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-surface-cream">
              <h3 className="font-headline-md text-2xl md:text-3xl italic mb-3">Curated Dining</h3>
              <p className="font-body-md text-surface-cream/80 mb-6">Complete dinner sets for the modern table.</p>
              <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] border-b border-surface-cream pb-1 group-hover:text-burnished-gold group-hover:border-burnished-gold transition-colors">
                Shop Dining
              </span>
            </div>
          </Link>

          {/* Tea & Coffee */}
          <Link href="/collections/tea-coffee" className="group block relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/media__1780323514271.webp"
              alt="Tea & Coffee Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-charcoal/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-surface-cream">
              <h3 className="font-headline-md text-2xl md:text-3xl italic mb-3">Tea & Coffee</h3>
              <p className="font-body-md text-surface-cream/80 mb-6">Elegant cups, mugs, and complete tea sets.</p>
              <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] border-b border-surface-cream pb-1 group-hover:text-burnished-gold group-hover:border-burnished-gold transition-colors">
                Shop Tea & Coffee
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── LUXURY GIFTING ── */}
      <section className="py-24 px-5 bg-ink-charcoal text-surface-cream">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col justify-center max-w-lg">
            <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-6">
              The Perfect Present
            </p>
            <h2 className="font-headline-lg text-4xl md:text-5xl italic tracking-tighter mb-8 leading-tight">
              Luxury Gifting
            </h2>
            <p className="font-body-md text-surface-cream/80 text-lg leading-relaxed mb-10">
              Discover beautifully packaged premium porcelain gifts for weddings, anniversaries, corporate events, and housewarmings.
            </p>
            <div>
              <Link 
                href="/gift-sets"
                className="inline-block bg-surface-cream text-ink-charcoal font-label-caps text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-white transition-colors duration-300"
              >
                Explore Gift Sets
              </Link>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square">
            <Image
              src="/images/gifting_siporahq_8k_1780322633512.webp"
              alt="Luxury Gifting"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── SEASONAL PICKS ── */}
      <section className="py-24 px-5 max-w-container-max mx-auto text-center">
        <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-4">Trending</p>
        <h2 className="font-headline-md text-3xl md:text-4xl italic text-ink-charcoal mb-12">Seasonal Picks</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {['New Arrivals', 'Best Sellers', 'Serveware'].map((category, idx) => (
            <Link key={idx} href={idx === 0 ? '/new-arrivals' : idx === 1 ? '/best-sellers' : '/collections/serveware'} className="group block relative aspect-square overflow-hidden bg-muted-sand/20">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <h3 className="font-headline-md text-xl md:text-2xl text-ink-charcoal group-hover:text-burnished-gold transition-colors">{category}</h3>
              </div>
            </Link>
          ))}
        </div>
        
        <Link 
          href="/products"
          className="inline-block border border-ink-charcoal text-ink-charcoal font-label-caps text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-ink-charcoal hover:text-surface-cream transition-colors duration-300"
        >
          View All Products
        </Link>
      </section>

      <NewsletterForm />
    </div>
  );
}
