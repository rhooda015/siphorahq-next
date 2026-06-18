import React from 'react';
import { ShieldCheck, Gem, Gift, CheckCircle2, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata = {
  title: 'Our Story | Premium Porcelain Tableware for Elegant Indian Homes | Siphorahq',
  description: 'Discover Siphorahq’s story — premium porcelain tableware, elegant dining pieces, and gift-ready collections crafted for modern Indian homes.',
  openGraph: {
    title: 'Our Story | Premium Porcelain Tableware | Siphorahq',
    description: 'Discover Siphorahq’s story — premium porcelain tableware, elegant dining pieces, and gift-ready collections crafted for modern Indian homes.',
  }
};

export default function OurStoryPage() {
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Our Story',
    description: metadata.description,
    url: `${BRAND.domain}/our-story`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Siphorahq',
      url: BRAND.domain,
      logo: `${BRAND.domain}/icon.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9540027978',
        contactType: 'customer service',
        email: 'concierge [at] siphorahq.in',
        areaServed: 'IN'
      }
    }
  };

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BRAND.domain
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Our Story',
        item: `${BRAND.domain}/our-story`
      }
    ]
  };

  return (
    <div className="bg-surface-cream text-ink-charcoal font-body-md overflow-x-hidden min-h-screen">
      {/* Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }} />

      {/* ── HERO SECTION ── */}
      <section className="relative w-full h-[70vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/our-story/hero-porcelain-craft.webp"
          alt="Siphorahq Porcelain Craft"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-ink-charcoal/30" />
        
        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto flex flex-col items-center mt-12 lg:mt-24">
          <p className="font-label-caps text-[12px] uppercase tracking-[0.2em] text-surface-cream mb-6 drop-shadow-sm">
            Our Story
          </p>
          <h1 className="font-headline-lg text-4xl md:text-6xl text-surface-cream italic tracking-tighter mb-6 leading-tight drop-shadow-sm">
            Crafting Everyday Dining into Something Beautiful
          </h1>
          <p className="font-body-md text-surface-cream/95 text-lg max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-sm">
            Siphorahq was created to bring premium porcelain, timeless tableware, and elegant gifting into modern Indian homes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/collections"
              className="bg-surface-cream text-ink-charcoal font-label-caps text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-white hover:scale-105 transition-all duration-300"
            >
              Explore Collections
            </Link>
            <Link 
              href="/best-sellers"
              className="bg-transparent text-surface-cream border border-surface-cream font-label-caps text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-surface-cream/10 transition-colors duration-300"
            >
              Shop Best Sellers
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRAND PHILOSOPHY ── */}
      <section className="py-24 px-5 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative aspect-[4/5] lg:aspect-square">
            <Image
              src="/images/our-story/porcelain-table-setting.webp"
              alt="Porcelain Table Setting"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center max-w-lg">
            <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-6">
              Why Siphorahq Exists
            </p>
            <h2 className="font-headline-lg text-4xl md:text-5xl italic text-ink-charcoal tracking-tighter mb-8 leading-tight">
              Porcelain for Moments That Matter
            </h2>
            <div className="space-y-6 font-body-md text-on-surface-variant text-lg leading-relaxed">
              <p>
                We believe dining is more than a daily routine. It is a ritual of connection, celebration, and care.
              </p>
              <p>
                Siphorahq curates premium porcelain tableware designed to make every table feel refined, warm, and memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CRAFTSMANSHIP ── */}
      <section className="py-24 px-5 bg-[#F8F5F1]">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="flex flex-col justify-center max-w-lg lg:ml-auto">
            <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-6">
              Crafted with Intention
            </p>
            <h2 className="font-headline-lg text-4xl md:text-5xl italic text-ink-charcoal tracking-tighter mb-8 leading-tight">
              Premium Finish, Thoughtful Details
            </h2>
            <div className="space-y-6 font-body-md text-on-surface-variant text-lg leading-relaxed">
              <p>
                Every piece is selected for its elegant silhouette, refined glaze, balanced weight, and timeless appeal.
              </p>
              <p>
                Our focus is on porcelain that looks premium, feels durable, and elevates both everyday meals and special occasions.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] lg:aspect-[3/4]">
            <Image
              src="/images/our-story/craftsmanship-detail.webp"
              alt="Porcelain Craftsmanship Details"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── QUALITY PROMISE ── */}
      <section className="py-24 px-5 max-w-container-md mx-auto text-center">
        <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-6">
          Siphorahq Promise
        </p>
        <h2 className="font-headline-lg text-4xl md:text-5xl italic text-ink-charcoal tracking-tighter mb-12">
          Beauty, Safety and Everyday Utility
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6">
          {[
            { icon: <ShieldCheck className="w-8 h-8 text-burnished-gold mb-4" />, text: "Lead-free and food-safe finish" },
            { icon: <Gem className="w-8 h-8 text-burnished-gold mb-4" />, text: "Premium porcelain body" },
            { icon: <Gift className="w-8 h-8 text-burnished-gold mb-4" />, text: "Elegant gift-ready packaging" },
            { icon: <CheckCircle2 className="w-8 h-8 text-burnished-gold mb-4" />, text: "Carefully checked before dispatch" },
            { icon: <RefreshCw className="w-8 h-8 text-burnished-gold mb-4" />, text: "Damage replacement support" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {item.icon}
              <p className="font-body-md text-ink-charcoal font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIFESTYLE EXPERIENCE ── */}
      <section className="py-24 px-5 bg-ink-charcoal text-surface-cream text-center">
        <div className="max-w-4xl mx-auto">
          <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-6">
            Luxury Gifting
          </p>
          <h2 className="font-headline-lg text-4xl md:text-5xl italic tracking-tighter mb-8 leading-tight">
            A More Beautiful Table, Every Day
          </h2>
          <div className="space-y-6 font-body-md text-surface-cream/80 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            <p>
              From morning chai to festive dinners, Siphorahq pieces are made to bring quiet luxury into everyday living.
            </p>
            <p>
              Our collections are ideal for home dining, housewarming gifts, wedding gifting, and corporate gifting.
            </p>
          </div>
          <Link 
            href="/products"
            className="inline-block bg-surface-cream text-ink-charcoal font-label-caps text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-white transition-colors duration-300"
          >
            Shop Luxury Porcelain
          </Link>
        </div>
        <div className="mt-20 max-w-container-max mx-auto relative aspect-[21/9] min-h-[400px]">
           <Image
              src="/images/our-story/fine-dining-lifestyle.webp"
              alt="Fine Dining Lifestyle"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink-charcoal/20" />
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section className="py-16 px-5 border-b border-muted-sand/50">
         <div className="max-w-container-max mx-auto text-center">
           <h3 className="font-headline-md text-2xl text-ink-charcoal mb-10">Why Customers Choose Siphorahq</h3>
           <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-on-surface-variant font-body-md">
             {[
               "Premium Porcelain",
               "Food Safe & Lead Free",
               "Gift Ready Packaging",
               "Pan India Delivery",
               "Secure Payments",
               "Damage Replacement Support"
             ].map((trustItem, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-burnished-gold" />
                  {trustItem}
                </div>
             ))}
           </div>
         </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-5 text-center bg-[#F8F5F1]">
        <h2 className="font-headline-lg text-4xl italic text-ink-charcoal tracking-tighter mb-4">
          Bring Timeless Porcelain to Your Table
        </h2>
        <p className="font-body-md text-on-surface-variant mb-10 max-w-md mx-auto">
          Explore curated collections designed for elegant homes and meaningful gifting.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/collections"
            className="bg-ink-charcoal text-surface-cream font-label-caps text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-black transition-colors duration-300"
          >
            Explore Collections
          </Link>
          <Link 
            href="/best-sellers"
            className="bg-transparent text-ink-charcoal border border-ink-charcoal font-label-caps text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-ink-charcoal hover:text-surface-cream transition-colors duration-300"
          >
            Shop Best Sellers
          </Link>
        </div>
      </section>

      <NewsletterForm />
    </div>
  );
}
