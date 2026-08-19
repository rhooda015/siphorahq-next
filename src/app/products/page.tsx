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

const CATEGORY_MAP: Record<string, { title: string; desc: string; canonicalQuery: string }> = {
  drinkware: {
    title: "Fine Porcelain Mugs & Cups",
    desc: "Discover Siphorahq's collection of handcrafted porcelain mugs, tea cups, and gold-finish cups. Fired at 1350°C for exceptional durability and detailed with genuine 24k gold, our mugs and cups elevate your daily morning coffee or evening tea ritual. Lead-free, food-safe, and designed with premium handles and comfortable grips for modern homes.",
    canonicalQuery: "?category=drinkware"
  },
  dinnerware: {
    title: "Modern Porcelain Dinnerware Sets",
    desc: "Shop our collection of luxury porcelain dinner sets, plates, and serving bowls. Crafted to meet the practical demands of modern Indian homes, our dinnerware features chip-resistant vitrified clay bodies, elegant neutral glaze tones, and hand-painted gold borders. Perfect for both festive hosting and daily family meals.",
    canonicalQuery: "?category=dinnerware"
  },
  teaware: {
    title: "Artisanal Porcelain Tea Sets",
    desc: "Brew and serve in elegance with our handcrafted teapots, cups, and saucers. Designed with pouring spouts and gold-painted details, our tea sets provide the perfect vessels for traditional Indian masala chai or premium loose-leaf green tea. Packaged in signature presentation boxes, ready for luxury gifting.",
    canonicalQuery: "?category=tea-set"
  },
  serveware: {
    title: "Handcrafted Porcelain Serveware & Bowls",
    desc: "Explore our collection of wide serving bowls, soup bowls, side plates, and platters. Designed with balanced geometry, deep bases, and food-safe glazes to present your curries, rice, salads, and starters beautifully. Vitrified at 1350°C to guarantee long-term durability and chip-resistance.",
    canonicalQuery: "?category=serveware"
  },
  gifting: {
    title: "Curated Tableware Gift Sets",
    desc: "Find the perfect housewarming, wedding, or corporate present with our pre-packaged dinnerware, tea set, and mug gift sets. Meticulously packed in our signature gold-trimmed presentation boxes using eco-friendly honeycomb paper. Omit pricing details at checkout and include a custom printed message card.",
    canonicalQuery: "?category=gifting"
  }
};

function getNormalizedCategoryKey(cat?: string): string | null {
  if (!cat) return null;
  const lower = cat.toLowerCase();
  if (lower === 'cups' || lower === 'mugs' || lower === 'cups-mugs' || lower === 'drinkware') return 'drinkware';
  if (lower === 'dinnerware' || lower === 'dinner-set') return 'dinnerware';
  if (lower === 'tea-sets' || lower === 'tea-set') return 'teaware';
  if (lower === 'serveware' || lower === 'bowls') return 'serveware';
  if (lower === 'gift-sets' || lower === 'gifting') return 'gifting';
  return null;
}

export async function generateMetadata(props: { searchParams: Promise<{ category?: string; q?: string; search?: string; tag?: string }> }): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const category = searchParams.category;
  const q = searchParams.q || searchParams.search;
  const tag = searchParams.tag;
  
  let title = productsMetadata.title as string;
  let description = productsMetadata.description as string;
  let canonicalQuery = '';
  
  if (tag?.toLowerCase() === 'gifts') {
    title = `Premium Porcelain Gifting & Sets | ${BRAND.name}`;
    description = `Explore Siphorahq's premium porcelain gift sets, designer gift boxes, and fine dining collections. Exquisite presentation, plastic-free packaging, pan-India delivery.`;
    canonicalQuery = '?tag=gifts';
  } else {
    const catKey = getNormalizedCategoryKey(category);
    if (catKey && CATEGORY_MAP[catKey]) {
      const info = CATEGORY_MAP[catKey];
      title = `${info.title} | ${BRAND.name}`;
      description = info.desc;
      canonicalQuery = info.canonicalQuery;
    } else if (q) {
      title = `Search Results for "${q}" | ${BRAND.name}`;
      description = `Find luxury porcelain and ceramic tableware matching "${q}" at Siphorahq. Shop premium cups, dinnerware & more.`;
      canonicalQuery = `?q=${q}`;
    }
  }
  
  return {
    title,
    description,
    alternates: {
      canonical: `${BRAND.domain}/products${canonicalQuery}`,
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
    name: "Siphorahq Emerald Regent Fine Porcelain Mug with Gold Handle",
    slug: "siphorahq-emerald-regent-fine-porcelain-mug-with-gold-handle",
    price: "₹999",
    category: "Cups & Mugs",
    badge: "Best Seller",
    image: "/images/products/emerald-regent-mug.webp"
  },
  {
    name: "Siphorahq Imperial Diamond Fine Bone China Mug with Gold Rim",
    slug: "siphorahq-imperial-diamond-fine-bone-china-mug-with-gold-rim",
    price: "₹799",
    category: "Cups & Mugs",
    badge: "New Arrival",
    image: "/images/products/imperial-white-mug.webp"
  },
  {
    name: "Siphorahq Moroccan Azure Royal Fine Porcelain Tea Mug",
    slug: "siphorahq-moroccan-azure-royal-fine-porcelain-tea-mug",
    price: "₹599",
    category: "Cups & Mugs",
    badge: "Popular",
    image: "/images/products/moroccan-azure-tea-mug.webp"
  },
  {
    name: "Siphorahq 46-Piece Dinner Set | Aesthetic Gold Pattern",
    slug: "premium-dinner-set-46",
    price: "₹25,500",
    category: "Dinnerware",
    badge: "Limited Edition",
    image: "/images/products/premium-gold-dinner-set.webp"
  },
  {
    name: "Siphorahq Blue Rose Tea Set of 17 Pcs",
    slug: "premium-tea-set-17",
    price: "₹8,500",
    category: "Tea Sets",
    badge: "Gift Ready",
    image: "/images/products/blue-rose-tea-set.webp"
  },
  {
    name: "Luxury White & Gold Floral Coffee Mugs",
    slug: "coffee-mugs-gold",
    price: "₹1,800",
    category: "Cups & Mugs",
    badge: "Gift Ready",
    image: "/images/products/royal-ivory-cup-set.webp"
  },
  {
    name: "Luxury Porcelain Dinner Plates (Set of 6)",
    slug: "porcelain-side-plates",
    price: "₹4,500",
    category: "Dinnerware",
    badge: "Essential",
    image: "/images/products/classic-white-dinner-plates.webp"
  },
  {
    name: "Siphorahq Premium Serving Bowl Set of 3",
    slug: "luxury-bowl-set",
    price: "₹2,200",
    category: "Serveware",
    badge: "New Arrival",
    image: "/images/products/golden-rim-serving-bowl.webp"
  },
  {
    name: "Siphorahq Designer Gift Box",
    slug: "designer-gift-box",
    price: "₹5,000",
    category: "Gift Sets",
    badge: "Wedding Pick",
    image: "/images/products/luxe-wedding-gift-box.webp"
  },
  {
    name: "Siphorahq Premium Serving Tray Set of 2",
    slug: "leatherette-serving-tray",
    price: "₹3,600",
    category: "Serveware",
    badge: "New Arrival",
    image: "/images/prod1.webp"
  },
  {
    name: "Beautiful Translucent Opal Glass Dinnerware",
    slug: "opal-glass-dinner-set",
    price: "₹18,000",
    category: "Dinnerware",
    badge: "New Arrival",
    image: "/images/cat_opalglass.webp"
  }
];

function isGiftProduct(p: any): boolean {
  const category = (p.category || '').toLowerCase();
  const slug = (p.slug || p.handle || p.id || '').toLowerCase();
  const title = (p.name || p.title || '').toLowerCase();
  const occasion = (p.specifications?.occasion || '').toLowerCase();
  const idealFor = (p.specifications?.idealFor || '').toLowerCase();
  
  return (
    category.includes('gift') ||
    category.includes('gifting') ||
    slug.includes('gift') ||
    title.includes('gift') ||
    occasion.includes('gift') ||
    idealFor.includes('gift') ||
    p.tag === 'gifts'
  );
}

export default async function ShopAllPage(props: { searchParams: Promise<{ category?: string; q?: string; search?: string; tag?: string }> }) {
  const searchParams = await props.searchParams;
  console.log("DEBUG: searchParams received on server:", searchParams);
  const categoryQuery = searchParams?.category;
  const tagQuery = searchParams?.tag;
  const isGiftingQuery = tagQuery?.toLowerCase() === 'gifts';

  let initialCategory = 'All';
  const catKey = getNormalizedCategoryKey(categoryQuery);
  const catInfo = catKey ? CATEGORY_MAP[catKey] : null;

  if (catKey) {
    if (catKey === 'drinkware') initialCategory = 'Cups & Mugs';
    else if (catKey === 'dinnerware') initialCategory = 'Dinnerware';
    else if (catKey === 'teaware') initialCategory = 'Tea Sets';
    else if (catKey === 'serveware') initialCategory = 'Serveware';
    else if (catKey === 'gifting') initialCategory = 'Gift Sets';
  }

  const dbProducts = await getCachedDbProducts();
  const allProducts = [...dbProducts, ...PRODUCTS];
  
  // Filter products if tag=gifts is set
  const displayedProducts = isGiftingQuery
    ? allProducts.filter(isGiftProduct)
    : allProducts;

  // Custom UI copy for tag=gifts and categories
  const pageTitle = isGiftingQuery 
    ? "Premium Porcelain Gifting" 
    : (catInfo ? catInfo.title : "Shop All Porcelain");
    
  const pageDescription = isGiftingQuery
    ? "Handpicked premium porcelain collections, designer gift boxes, and fine tea sets crafted for timeless celebrations and corporate gifting."
    : (catInfo ? catInfo.desc : "Explore premium porcelain cups, tea sets, dinnerware, and gift-ready tableware crafted for elegant Indian homes.");
    
  const breadcrumbName = isGiftingQuery 
    ? "Gifting" 
    : (catInfo ? catInfo.title : "Shop All");

  // JSON-LD Schemas
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: isGiftingQuery 
      ? 'Premium Porcelain Gifting & Sets | Siphorahq' 
      : (catInfo ? `${catInfo.title} | Siphorahq` : 'Shop All Porcelain | Siphorahq'),
    description: isGiftingQuery 
      ? 'Explore Siphorahq\'s premium porcelain gift sets, designer gift boxes, and fine dining collections.'
      : (catInfo ? catInfo.desc : ((productsMetadata.description as string) || '')),
    url: isGiftingQuery 
      ? `${BRAND.domain}/products?tag=gifts` 
      : (catInfo ? `${BRAND.domain}/products${catInfo.canonicalQuery}` : `${BRAND.domain}/products`)
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
        name: breadcrumbName,
        item: isGiftingQuery 
          ? `${BRAND.domain}/products?tag=gifts` 
          : (catInfo ? `${BRAND.domain}/products${catInfo.canonicalQuery}` : `${BRAND.domain}/products`)
      }
    ]
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: displayedProducts.map((p, idx) => {
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
            <span className="text-burnished-gold">{breadcrumbName}</span>
          </nav>
          <h1 className="font-headline-lg text-4xl md:text-5xl italic tracking-tighter mb-4">{pageTitle}</h1>
          <p className="font-body-md text-surface-cream/80 max-w-xl mx-auto">
            {pageDescription}
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
      <ProductListing products={displayedProducts} initialCategory={isGiftingQuery ? 'Gift Sets' : initialCategory} />
      
    </div>
  );
}
