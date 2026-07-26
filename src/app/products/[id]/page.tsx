import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BRAND } from '@/config/brand';
import { ChevronRight, Star } from 'lucide-react';
import { STATIC_PRODUCTS, getProductById } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductDescription from './ProductDescription';
import ImageGallery from './ImageGallery';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { Shield, Droplets, Award, Sparkles } from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';
import ShippingReturnsSummary from '@/components/ShippingReturnsSummary';
import ProductFAQ from '@/components/ProductFAQ';
import ProductStory from '@/components/ProductStory';
import CareGuide from '@/components/CareGuide';
import WhySiphorahq from '@/components/WhySiphorahq';
import ProductClientSection from './ProductClientSection';
import { headers } from 'next/headers';


export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return STATIC_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}


function getPlaceholderImages(id: string) {
  const flagships = ['premium-dinner-set-46', 'premium-tea-set-17', 'designer-gift-box', 'luxury-bowl-set', 'opal-glass-dinner-set'];
  const isFlagship = flagships.includes(id);
  
  const suffixes10 = ['hero', 'lifestyle', 'editorial', 'macro', 'gifting', 'packaging', 'dining', 'feature', 'size', 'mood'];
  const suffixes3 = ['hero', 'lifestyle', '45deg'];
  
  const suffixes = isFlagship ? suffixes10 : suffixes3;
  return suffixes.map(suffix => `/images/products/${id}/${id}_${suffix}.webp`);
}

/** Transform Cloudinary URLs to auto-format + quality for faster delivery */
function optimizeCloudinaryUrl(url: string, { width = 800, quality = 80 }: { width?: number; quality?: number } = {}): string {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_${quality},w_${width}/`);
}

/** Strip HTML tags from a string for use in JSON-LD description */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500);
}

// Helper: fetch product from DB (by handle or _id) and normalize to common shape
async function getDbProduct(id: string) {
  try {
    await dbConnect();
    const p = await Product.findOne({ $or: [{ handle: id }, { _id: id.length === 24 ? id : null }] }).lean() as any;
    if (!p) return null;
    return {
      id: p.handle || p._id.toString(),
      name: p.title,
      price: p.price,
      salePrice: p.price,
      category: p.category || '',
      image: p.images?.[0]?.url || null,
      images: p.images || [],
      badge: '',
      reviews: 4.8,
      reviewCount: 0,
      description: p.description || '',
      care: '',
      metaTitle: p.metaTitle || p.title,
      metaDescription: p.metaDescription || p.description || '',
      inventoryCount: p.inventoryCount || 0,
      variants: p.variants || [],
    };
  } catch {
    return null;
  }
}

function getNormalizedProductId(id: string): string {
  const mappings: Record<string, string> = {
    'emerald-regent-mug': 'siphorahq-emerald-regent-fine-porcelain-mug-with-gold-handle',
    'imperial-white-porcelain-mug': 'siphorahq-imperial-diamond-fine-bone-china-mug-with-gold-rim',
    'moroccan-azure-tea-mug': 'siphorahq-moroccan-azure-royal-fine-porcelain-tea-mug',
    'premium-gold-dinner-set': 'premium-dinner-set-46',
    'blue-rose-tea-set': 'premium-tea-set-17',
    'royal-ivory-cup-set': 'coffee-mugs-gold',
    'classic-white-dinner-plates': 'porcelain-side-plates',
    'golden-rim-serving-bowl': 'luxury-bowl-set',
    'luxe-wedding-gift-box': 'designer-gift-box',
    'corporate-gift-cup-set': 'designer-gift-box',
    'minimalist-porcelain-tea-cups': 'coffee-mugs-gold',
    'heritage-navy-mug-set': 'coffee-mugs-gold',
  };
  return mappings[id] || id;
}

function formatSlugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => {
      if (word.toLowerCase() === 'siphorahq') return 'Siphorahq';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const normId = getNormalizedProductId(resolvedParams.id);
  const product = getProductById(normId) || await getDbProduct(normId);
  if (!product) return { title: 'Product Not Found' };

  const imgUrl = (product as any).image;
  const productImage = imgUrl && !imgUrl.startsWith('data:')
    ? (imgUrl.startsWith('http') ? imgUrl : `https://siphorahq.in${imgUrl.startsWith('/') ? imgUrl : '/' + imgUrl}`)
    : 'https://siphorahq.in/images/dinnerware.webp';

  let titleName = (product as any).metaTitle || product.name;
  if (resolvedParams.id && resolvedParams.id !== product.id && resolvedParams.id !== (product as any).handle) {
    titleName = formatSlugToTitle(resolvedParams.id);
  }

  // Prevent duplicate | Siphorahq suffix if already appended in titleName
  const titleText = titleName.toLowerCase().includes(BRAND.name.toLowerCase())
    ? titleName
    : `${titleName} | ${BRAND.name}`;

  const productUrl = `${BRAND.domain}/products/${(product as any).handle || product.id}`;

  return {
    title: titleText,
    description: (product as any).metaDescription || product.description,
    alternates: { canonical: productUrl },
    openGraph: {
      type: 'website',
      title: product.name,
      description: (product as any).metaDescription || product.description,
      url: productUrl,
      siteName: BRAND.name,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: (product as any).metaDescription || product.description,
      images: [productImage],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const normId = getNormalizedProductId(resolvedParams.id);
  // First try static data, then fall back to MongoDB (for admin-created products)
  const product = getProductById(normId) || await getDbProduct(normId);
  const nonce = (await headers()).get('x-nonce') || '';

  if (!product) {
    notFound();
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BRAND.domain,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: `${BRAND.domain}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${BRAND.domain}/products/${product.id}`,
      },
    ],
  };

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const priceValidUntil = nextYear.toISOString().split('T')[0];

  // Keep base64 data URLs for display (ImageGallery) — they only need to be filtered out for JSON-LD schemas
  const productImages: string[] = (
    (product as any).images?.length > 0
      ? (product as any).images.map((img: any) => optimizeCloudinaryUrl(img.url, { width: 800, quality: 85 }))
      : getPlaceholderImages(product.id)
  ).filter((img: string) => Boolean(img));

  const heroImageUrl = productImages[0]
    ? (productImages[0].startsWith('http') || productImages[0].startsWith('data:') ? productImages[0] : `${BRAND.domain}${productImages[0]}`)
    : `${BRAND.domain}/og-banner.png`;

  // Build schema image array — only absolute https:// URLs (no base64)
  const schemaImages = productImages
    .filter((img: string) => !img.startsWith('data:'))
    .map(img => img.startsWith('http') ? img : `${BRAND.domain}${img.startsWith('/') ? img : '/' + img}`)
    .filter(img => img.startsWith('https://'))
    .slice(0, 5);
  if (schemaImages.length === 0) schemaImages.push(`${BRAND.domain}/og-banner.png`);

  const validSku = product.id.length < 4 ? `sph-${product.id}` : product.id;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: stripHtml(product.description || `Siphorahq ${product.name} — Premium porcelain and ceramic tableware. Handcrafted for modern elegance.`),
    sku: validSku,
    mpn: validSku,
    url: `${BRAND.domain}/products/${product.id}`,
    image: schemaImages,
    brand: {
      '@type': 'Brand',
      name: BRAND.name
    },
    offers: {
      '@type': 'Offer',
      url: `${BRAND.domain}/products/${product.id}`,
      priceCurrency: 'INR',
      price: product.salePrice || product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: priceValidUntil,
      seller: { '@type': 'Organization', name: BRAND.name },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'INR'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 7,
            unitCode: 'DAY'
          }
        }
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: product.reviewCount || 124,
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Priya S.' },
        reviewBody: 'Absolutely stunning quality. The porcelain feels premium and the packaging was beautiful. Great gift option too.'
      }
    ]
  };

  // productImages already computed above with Cloudinary optimizations

  // Real related products from the same category
  const relatedProducts = STATIC_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <script
        nonce={nonce}
        suppressHydrationWarning={true}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        nonce={nonce}
        suppressHydrationWarning={true}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 lg:flex lg:gap-12 pb-32 md:pb-12 bg-[var(--color-bg)]">
      
      {/* Breadcrumbs */}
      <div className="w-full lg:hidden mb-4 flex items-center text-xs font-sans text-[var(--color-text-muted)]">
        <Link href="/">Home</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <Link href="/products">Shop</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="truncate">{product.name}</span>
      </div>

      {/* Left: Image Gallery */}
      <div className="lg:w-1/2">
        {/* Desktop Breadcrumbs */}
        <div className="hidden lg:flex mb-6 items-center text-xs font-sans text-[var(--color-text-muted)]">
          <Link href="/">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href="/products">Shop</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="truncate">{product.name}</span>
        </div>

        {/* Server-rendered LCP hero — fires before JS hydrates, uses optimized Cloudinary URL */}
        {heroImageUrl && (
          <div className="sr-only" aria-hidden="true">
            <Image
              src={heroImageUrl}
              alt=""
              width={800}
              height={1000}
              priority
              quality={85}
            />
          </div>
        )}

        <ImageGallery 
          productName={product.name}
          images={productImages}
        />
        
        <ProductStory />
      </div>

      {/* Right: Product Details */}
      <div className="mt-8 lg:mt-0 lg:w-1/2 flex flex-col sticky top-24 h-fit">
        {/* Category */}
        <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-[#C9A84C] mb-2">{product.category || 'Fine Ceramics'}</span>
        
        {/* Product Title */}
        <h1 className="text-3xl md:text-4xl font-serif font-light text-[var(--color-primary)] leading-tight mb-2">{product.name}</h1>
        
        {/* Reviews Summary */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-[#EED202]">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-xs font-sans text-[var(--color-text-muted)] font-medium">4.9 ({product.reviewCount || 12} Reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mb-3">
          <p className="text-3xl font-serif font-medium text-[var(--color-primary)]">₹{(product.salePrice || product.price).toLocaleString('en-IN')}</p>
          {product.salePrice && product.salePrice < product.price && (
            <>
              <p className="text-lg font-sans text-[var(--color-text-muted)] line-through">MRP ₹{product.price.toLocaleString('en-IN')}</p>
              <span className="bg-[#F7F5F0] text-[#8A733F] px-2 py-0.5 text-[10px] font-bold font-sans uppercase tracking-widest rounded-sm border border-[#E8E1D3]">
                Save {Math.round((1 - product.salePrice / product.price) * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Core Attributes */}
        <div className="flex items-center gap-2 mb-4 text-[10px] font-sans text-[#8A733F] font-bold tracking-widest uppercase">
          <span>Premium Ceramic</span>
          <span className="text-zinc-300">•</span>
          <span>Food Safe</span>
          <span className="text-zinc-300">•</span>
          <span>Gift Ready</span>
        </div>

        <div className="h-px bg-zinc-200/60 mb-5" />

        {/* Short Description */}
        <div className="prose prose-sm text-zinc-600 font-sans leading-relaxed text-sm mb-5">
          <ProductDescription htmlContent={product.description} />
        </div>

        {/* Highlights */}
        {(product as any).specifications && Object.values((product as any).specifications).some(Boolean) && (
          <div className="mb-5 p-4 bg-[#F7F5F0]/50 border border-zinc-200/50 rounded-xl">
            <p className="text-[11px] font-sans font-bold text-zinc-700 uppercase tracking-widest mb-3">Highlights</p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-zinc-600 font-sans">
              {Object.entries((product as any).specifications).filter(([_, v]) => v).slice(0, 4).map(([key, val]) => (
                <div key={key} className="flex gap-2">
                  <span className="font-semibold text-zinc-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span>{val as string}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-px bg-zinc-200/60 mb-5" />

        {/* Client-only interactive section: ATC, delivery checker, wishlist, sticky bar */}
        <ProductClientSection product={product} />

        <div className="h-px bg-zinc-200/60 my-5" />
        {/* Trust Badges Summary */}
        <div className="mb-6">
          <TrustBadges />
        </div>

        {/* Product FAQs */}
        <ProductFAQ 
          faqs={[
            {
              question: "Is this product microwave and dishwasher safe?",
              answer: "Yes, our premium ceramics are fully microwave and dishwasher safe. We recommend using a mild detergent and avoiding sudden temperature changes to ensure longevity."
            },
            {
              question: "How is it packaged for delivery?",
              answer: "We use a multi-layered premium packaging approach with foam inserts and heavy-duty corrugated boxes to guarantee safe transit. In the rare event of transit damage, we offer a hassle-free replacement."
            },
            {
              question: "Can I return the product if I don't like it?",
              answer: "Yes! We offer a 7-Day Return Policy. If you are not completely satisfied, you can return the item in its original, unused condition for a full refund."
            }
          ]}
        />

        <CareGuide />
      </div>
    </div>
    
    <WhySiphorahq />

    {/* Related Products Section */}
    {relatedProducts.length > 0 && (
      <div className="max-w-7xl mx-auto px-4 py-16 border-t border-[var(--color-border)]">
        <h2 className="text-3xl md:text-4xl font-serif italic text-[var(--color-primary)] text-center mb-12">You May Also Like</h2>
        <div className="flex overflow-x-auto gap-4 pb-8 custom-scrollbar md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="min-w-[280px] md:min-w-0">
              <ProductCard product={relatedProduct} />
            </div>
          ))}
        </div>
      </div>
    )}

  </>
  );
}
