import { Truck, Headset, ShieldCheck, RefreshCw } from 'lucide-react';
import React from 'react';
import ProductListing from '@/components/ProductListing';
import { BRAND } from '@/config/brand';
import Link from 'next/link';
import { Metadata } from 'next';
import { productsMetadata } from '@/lib/metadata';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { unstable_cache } from 'next/cache';

const getCachedDbProducts = unstable_cache(
  async () => {
    await dbConnect();
    const dbProducts = await Product.find({ status: 'Live' }).sort({ createdAt: -1 }).lean();
    return dbProducts.map((p: any) => ({
      id: p.handle || p._id.toString(),
      name: p.title,
      slug: p.handle || p._id.toString(),
      price: p.price,
      category: p.category || 'Tableware',
      image: p.images?.[0]?.url || '/images/dinnerware.webp'
    }));
  },
  ['shop-db-products'],
  { revalidate: 60 }
);

export async function generateMetadata(props: { searchParams: Promise<{ category?: string; q?: string; search?: string }> }): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const category = searchParams.category;
  const q = searchParams.q || searchParams.search;
  
  let title = productsMetadata.title as string;
  let description = productsMetadata.description as string;
  
  if (category) {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');
    title = `Premium ${formattedCategory} | ${BRAND.name}`;
    description = `Browse our exclusive collection of luxury handcrafted ${formattedCategory} for modern Indian homes. Free shipping above ₹999.`;
  } else if (q) {
    title = `Search Results for "${q}" | ${BRAND.name}`;
    description = `Find luxury porcelain and ceramic tableware matching "${q}" at Siphorahq. Shop premium cups, dinnerware & more.`;
  }
  
  return {
    title,
    description,
    alternates: {
      canonical: `${BRAND.domain}/products${category ? `?category=${category}` : q ? `?q=${q}` : ''}`,
    },
    openGraph: {
      title,
      description,
      url: `${BRAND.domain}/products`,
      siteName: BRAND.name,
      images: [{ url: `${BRAND.domain}/og-banner.png` }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BRAND.domain}/og-banner.png`],
    },
  };
}

const PRODUCTS = [
  {
    name: "Emerald Regent Mug",
    slug: "emerald-regent-mug",
    price: "₹999",
    category: "Cups & Mugs",
    badge: "Best Seller",
    image: "/images/products/emerald-regent-mug.webp"
  },
  {
    name: "Imperial White Porcelain Mug",
    slug: "imperial-white-porcelain-mug",
    price: "₹799",
    category: "Cups & Mugs",
    badge: "New Arrival",
    image: "/images/products/imperial-white-mug.webp"
  },
  {
    name: "Moroccan Azure Tea Mug",
    slug: "moroccan-azure-tea-mug",
    price: "₹599",
    category: "Cups & Mugs",
    badge: "Popular",
    image: "/images/products/moroccan-azure-tea-mug.webp"
  },
  {
    name: "Premium Gold Dinner Set",
    slug: "premium-gold-dinner-set",
    price: "₹25,500",
    category: "Dinnerware",
    badge: "Limited Edition",
    image: "/images/products/premium-gold-dinner-set.webp"
  },
  {
    name: "Blue Rose Tea Set",
    slug: "blue-rose-tea-set",
    price: "₹4,999",
    category: "Tea Sets",
    badge: "Gift Ready",
    image: "/images/products/blue-rose-tea-set.webp"
  },
  {
    name: "Royal Ivory Cup Set",
    slug: "royal-ivory-cup-set",
    price: "₹1,499",
    category: "Cups & Mugs",
    badge: "Gift Ready",
    image: "/images/products/royal-ivory-cup-set.webp"
  },
  {
    name: "Classic White Dinner Plates",
    slug: "classic-white-dinner-plates",
    price: "₹2,999",
    category: "Dinnerware",
    badge: "Essential",
    image: "/images/products/classic-white-dinner-plates.webp"
  },
  {
    name: "Golden Rim Serving Bowl",
    slug: "golden-rim-serving-bowl",
    price: "₹1,899",
    category: "Serveware",
    badge: "New Arrival",
    image: "/images/products/golden-rim-serving-bowl.webp"
  },
  {
    name: "Luxe Wedding Gift Box",
    slug: "luxe-wedding-gift-box",
    price: "₹3,999",
    category: "Gift Sets",
    badge: "Wedding Pick",
    image: "/images/products/luxe-wedding-gift-box.webp"
  },
  {
    name: "Corporate Gift Cup Set",
    slug: "corporate-gift-cup-set",
    price: "₹2,499",
    category: "Gift Sets",
    badge: "Bulk Order",
    image: "/images/products/corporate-gift-cup-set.webp"
  },
  {
    name: "Minimalist Porcelain Tea Cups",
    slug: "minimalist-porcelain-tea-cups",
    price: "₹1,299",
    category: "Tea Sets",
    badge: "New Arrival",
    image: "/images/products/minimalist-tea-cups.webp"
  },
  {
    name: "Heritage Navy Mug Set",
    slug: "heritage-navy-mug-set",
    price: "₹1,999",
    category: "Cups & Mugs",
    badge: "Premium Pick",
    image: "/images/products/heritage-navy-mug-set.webp"
  }
];

export default async function ShopAllPage() {
  const dbProducts = await getCachedDbProducts();
  const allProducts = [...dbProducts, ...PRODUCTS];
  
  // JSON-LD Schemas
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Shop All Porcelain | Siphorahq',
    description: (productsMetadata.description as string) || '',
    url: `${BRAND.domain}/products`
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
        name: 'Shop All',
        item: `${BRAND.domain}/products`
      }
    ]
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: allProducts.map((p, idx) => {
      const imgPath = p.image || '/images/dinnerware.webp';
      const absImage = imgPath.startsWith('http') ? imgPath : `${BRAND.domain}${imgPath.startsWith('/') ? imgPath : '/' + imgPath}`;
      return {
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Product',
          name: p.name,
          url: `${BRAND.domain}/products/${p.slug}`,
          image: absImage,
          brand: { '@type': 'Brand', name: 'Siphorahq' }
        }
      };
    })
  };

  return (
    <div className="min-h-screen bg-surface-cream text-ink-charcoal font-body-md overflow-x-hidden">
      {/* Schemas */}
      <script suppressHydrationWarning={true} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <script suppressHydrationWarning={true} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }} />
      <script suppressHydrationWarning={true} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* ── HEADER BREADCRUMB & TITLE ── */}
      <div className="bg-[#111] text-surface-cream pt-24 pb-16 px-5 md:px-margin-desktop text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('/images/homepage/artisanal_left.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="relative z-10">
          <nav className="flex justify-center items-center gap-2 font-label-caps text-[10px] uppercase tracking-widest text-surface-cream/60 mb-6">
            <Link href="/" className="hover:text-burnished-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-burnished-gold">Shop All</span>
          </nav>
          <h1 className="font-headline-lg text-4xl md:text-5xl italic tracking-tighter mb-4">Shop All Porcelain</h1>
          <p className="font-body-md text-surface-cream/80 max-w-xl mx-auto">
            Explore premium porcelain cups, tea sets, dinnerware, and gift-ready tableware crafted for elegant Indian homes.
          </p>
        </div>
      </div>

      {/* ── TRUST STRIP ── */}
      <div className="bg-burnished-gold text-ink-charcoal py-3 border-y border-black/10">
        <div className="max-w-container-max mx-auto px-5 flex justify-between items-center overflow-hidden">
          <div className="flex animate-marquee md:animate-none md:justify-center md:w-full gap-8 md:gap-16 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Truck className=" w-5 h-5 inline-block" />
              <span className="font-label-caps text-[10px] uppercase tracking-widest">Free Shipping Pan India Above ₹999</span>
            </div>
            <div className="flex items-center gap-2">
              <Headset className=" w-5 h-5 inline-block" />
              <span className="font-label-caps text-[10px] uppercase tracking-widest">WhatsApp Concierge: +91 9540027978</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className=" w-5 h-5 inline-block" />
              <span className="font-label-caps text-[10px] uppercase tracking-widest">Lead-free & Food Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className=" w-5 h-5 inline-block" />
              <span className="font-label-caps text-[10px] uppercase tracking-widest">Damage Replacement Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCT LISTING (Client Component) ── */}
      <ProductListing products={allProducts} />
      
    </div>
  );
}
