import { Gem, ShieldCheck, Gift, RefreshCw, Truck } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import NewArrivalsClient from './NewArrivalsClient';
import NewsletterForm from '@/components/NewsletterForm';
import { headers } from 'next/headers';

export const metadata = {
  title: 'New Arrivals | Premium Porcelain Cups, Tea Sets & Dinnerware | Siphorahq',
  description: 'Discover the latest Siphorahq porcelain launches, including premium cups, mugs, tea sets, dinnerware, serveware, and luxury gift-ready tableware for Indian homes.',
  openGraph: {
    title: 'New Arrivals | Premium Porcelain | Siphorahq',
    description: 'Discover the latest Siphorahq porcelain launches, including premium cups, mugs, tea sets, dinnerware, serveware, and luxury gift-ready tableware.',
  }
};

const PRODUCTS = [
  {
    name: "Imperial White Porcelain Mug",
    slug: "imperial-white-porcelain-mug",
    category: "Cups & Mugs",
    price: "₹799",
    badge: "New Arrival",
    rating: "4.8",
    image: "/images/products/imperial-white-mug.webp"
  },
  {
    name: "Minimalist Porcelain Tea Cups",
    slug: "minimalist-porcelain-tea-cups",
    category: "Tea Sets",
    price: "₹1,299",
    badge: "Just Launched",
    rating: "4.7",
    image: "/images/products/minimalist-tea-cups.webp"
  },
  {
    name: "Golden Rim Serving Bowl",
    slug: "golden-rim-serving-bowl",
    category: "Serveware",
    price: "₹1,899",
    badge: "New Season",
    rating: "4.6",
    image: "/images/products/golden-rim-serving-bowl.webp"
  },
  {
    name: "Blue Rose Tea Set",
    slug: "blue-rose-tea-set",
    category: "Tea Sets",
    price: "₹4,999",
    badge: "Gift Ready",
    rating: "4.9",
    image: "/images/products/blue-rose-tea-set.webp"
  },
  {
    name: "Royal Ivory Cup Set",
    slug: "royal-ivory-cup-set",
    category: "Cups & Mugs",
    price: "₹1,499",
    badge: "Premium Pick",
    rating: "4.7",
    image: "/images/products/royal-ivory-cup-set.webp"
  },
  {
    name: "Heritage Navy Mug Set",
    slug: "heritage-navy-mug-set",
    category: "Cups & Mugs",
    price: "₹1,999",
    badge: "New Arrival",
    rating: "4.8",
    image: "/images/products/heritage-navy-mug-set.webp"
  }
];

export default async function NewArrivalsPage() {
  const nonce = (await headers()).get('x-nonce') || '';
  
  // JSON-LD Schemas
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'New Porcelain Arrivals for Elegant Homes',
    description: metadata.description,
    url: `${BRAND.domain}/new-arrivals`
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
        name: 'New Arrivals',
        item: `${BRAND.domain}/new-arrivals`
      }
    ]
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: PRODUCTS.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        url: `${BRAND.domain}/products/${p.slug}`,
        image: `${BRAND.domain}${p.image}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: p.price.replace(/[^0-9]/g, ''),
          availability: 'https://schema.org/InStock'
        }
      }
    }))
  };

  return (
    <div className="min-h-screen bg-surface-cream text-ink-charcoal font-body-md overflow-x-hidden">
      {/* Schemas */}
      <script nonce={nonce} suppressHydrationWarning={true} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <script nonce={nonce} suppressHydrationWarning={true} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }} />
      <script nonce={nonce} suppressHydrationWarning={true} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* ── CINEMATIC HERO ── */}
      <section className="relative h-[75vh] lg:min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/new-arrivals/new-arrivals-hero.webp"
          alt="New Porcelain Arrivals"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-ink-charcoal/40" />
        
        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto flex flex-col items-center">
          <p className="font-label-caps text-[12px] uppercase tracking-[0.2em] text-burnished-gold mb-6">
            New Season Launch
          </p>
          <h1 className="font-headline-lg text-5xl md:text-7xl text-surface-cream italic tracking-tighter mb-6 leading-tight">
            Luxury Porcelain Crafted for Elegant Homes
          </h1>
          <p className="font-body-md text-surface-cream/90 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Discover premium porcelain mugs, tea sets, dinnerware and gift-ready collections for modern Indian homes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="#new-arrivals"
              className="bg-surface-cream text-ink-charcoal font-label-caps text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-white hover:scale-105 transition-all duration-300"
            >
              Shop New Arrivals
            </Link>
            <Link 
              href="/collections/gifting"
              className="bg-transparent text-surface-cream border border-surface-cream/30 font-label-caps text-[12px] uppercase tracking-widest px-8 py-4 hover:border-surface-cream transition-colors duration-300"
            >
              Explore Gift Sets
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="bg-ink-charcoal text-surface-cream py-4 border-y border-burnished-gold/20">
        <div className="max-w-container-max mx-auto px-5 flex justify-between items-center overflow-hidden">
          <div className="flex animate-marquee md:animate-none md:justify-center md:w-full gap-8 md:gap-16 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Gem className="text-burnished-gold w-5 h-5 inline-block" />
              <span className="font-label-caps text-[11px] uppercase tracking-widest">Premium Porcelain</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-burnished-gold w-5 h-5 inline-block" />
              <span className="font-label-caps text-[11px] uppercase tracking-widest">Lead Free & Food Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="text-burnished-gold w-5 h-5 inline-block" />
              <span className="font-label-caps text-[11px] uppercase tracking-widest">Gift Ready Packaging</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="text-burnished-gold w-5 h-5 inline-block" />
              <span className="font-label-caps text-[11px] uppercase tracking-widest">Damage Replacement</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="text-burnished-gold w-5 h-5 inline-block" />
              <span className="font-label-caps text-[11px] uppercase tracking-widest">Free Shipping Above ₹999</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── NEW ARRIVALS GRID (CLIENT) ── */}
      <NewArrivalsClient products={PRODUCTS} />

      {/* ── ATELIER / STUDIO CRAFTSMANSHIP ── */}
      <section className="py-24 bg-[#F8F5F1] relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-5 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[3/4] relative w-[80%] z-10">
              <Image
                src="/images/new-arrivals/studio-craftsmanship.webp"
                alt="Inside the Siphorahq Studio"
                fill
                sizes="(max-width: 1024px) 80vw, 40vw"
                className="object-cover shadow-2xl"
              />
            </div>
            <div className="aspect-square relative w-[50%] absolute -bottom-12 -right-4 z-20 shadow-xl border-4 border-surface-cream">
              <Image
                src="/images/new-arrivals/porcelain-detail.webp"
                alt="Porcelain Detail"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="flex flex-col justify-center max-w-lg lg:ml-auto">
            <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-6">
              Crafted with Intention
            </p>
            <h2 className="font-headline-lg text-4xl md:text-5xl italic text-ink-charcoal tracking-tighter mb-8 leading-tight">
              Inside the Siphorahq Studio
            </h2>
            <div className="space-y-6 font-body-md text-on-surface-variant text-lg leading-relaxed mb-10">
              <p>
                Every new Siphorahq piece begins with a simple idea: to make everyday dining feel more refined, memorable, and beautiful.
              </p>
              <p>
                Our latest arrivals bring together premium porcelain, lead-free glazes, elegant silhouettes, and gift-ready packaging for modern Indian homes.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-10">
              {['Lead-free glaze', 'Premium porcelain body', 'Hand-inspected finish', 'Gift-ready packaging', 'Damage replacement support'].map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-burnished-gold flex-shrink-0" />
                  <span className="font-label-caps text-[10px] uppercase tracking-widest text-ink-charcoal">{highlight}</span>
                </div>
              ))}
            </div>
            
            <div>
              <Link 
                href="/our-story"
                className="inline-block bg-transparent text-ink-charcoal border border-ink-charcoal font-label-caps text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-ink-charcoal hover:text-surface-cream transition-colors duration-300"
              >
                Discover Our Craft
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <NewsletterForm />
    </div>
  );
}
