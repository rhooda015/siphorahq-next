import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BRAND } from '@/config/brand';
import { ChevronRight, Star, Minus, Plus } from 'lucide-react';
import { STATIC_PRODUCTS, getProductById } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import ProductClientActions from './ProductClientActions';
import ProductDescription from './ProductDescription';
import RecentlyViewed from './RecentlyViewed';
import ImageGallery from './ImageGallery';
import DeliveryChecker from './DeliveryChecker';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { Shield, Droplets, Award, Sparkles } from 'lucide-react';
import StickyAddToCart from '@/components/StickyAddToCart';
import TrustBadges from '@/components/TrustBadges';
import ShippingReturnsSummary from '@/components/ShippingReturnsSummary';
import ProductFAQ from '@/components/ProductFAQ';
import ProductStory from '@/components/ProductStory';
import CareGuide from '@/components/CareGuide';
import WhySiphorahq from '@/components/WhySiphorahq';

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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id) || await getDbProduct(resolvedParams.id);
  if (!product) return { title: 'Product Not Found' };

  const productImage = (product as any).image?.startsWith('http')
    ? (product as any).image
    : `https://siphorahq.in${(product as any).image || '/images/dinnerware.webp'}`;

  return {
    title: `${(product as any).metaTitle || product.name} | ${BRAND.name}`,
    description: (product as any).metaDescription || product.description,
    alternates: { canonical: `${BRAND.domain}/products/${product.id}` },
    openGraph: {
      type: 'website',
      title: product.name,
      description: (product as any).metaDescription || product.description,
      url: `${BRAND.domain}/products/${product.id}`,
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
  // First try static data, then fall back to MongoDB (for admin-created products)
  const product = getProductById(resolvedParams.id) || await getDbProduct(resolvedParams.id);

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
        name: 'Collections',
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.id,
    url: `${BRAND.domain}/products/${product.id}`,
    image: product.image?.startsWith('http') || product.image?.startsWith('data:') 
      ? product.image 
      : `${BRAND.domain}${product.image}`,
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
      seller: { '@type': 'Organization', name: BRAND.name }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: product.reviewCount || 124
    }
  };

  const imagesToPass = (product as any).images?.length > 0 
    ? (product as any).images.map((img: any) => img.url)
    : [product.image];

  // Real related products from the same category
  const relatedProducts = STATIC_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 lg:flex lg:gap-12 pb-32 md:pb-12 bg-[var(--color-bg)]">
      
      {/* Breadcrumbs */}
      <div className="w-full lg:hidden mb-4 flex items-center text-xs font-sans text-[var(--color-text-muted)]">
        <Link href="/">Home</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <Link href="/products">Collections</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="truncate">{product.name}</span>
      </div>

      {/* Left: Image Gallery */}
      <div className="lg:w-1/2">
        {/* Desktop Breadcrumbs */}
        <div className="hidden lg:flex mb-6 items-center text-xs font-sans text-[var(--color-text-muted)]">
          <Link href="/">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href="/products">Collections</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="truncate">{product.name}</span>
        </div>

        <ImageGallery 
          productName={product.name}
          images={(
            (product as any).images?.length > 0
              ? (product as any).images.map((img: any) => img.url)
              : getPlaceholderImages(product.id)
          )} 
        />
        
        <ProductStory />
      </div>

      {/* Right: Product Details */}
      <div className="mt-8 lg:mt-0 lg:w-1/2 flex flex-col sticky top-24 h-fit">
        <span className="text-xs font-sans font-medium uppercase tracking-widest text-[#C9A84C] mb-2">{BRAND.name} Exclusive</span>
        <h1 className="text-3xl md:text-4xl font-serif font-light text-[var(--color-primary)] leading-tight">{product.name}</h1>
        
        {/* Luxury Badges */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#F7F5F0] border border-[#E8E1D3] text-[10px] uppercase tracking-widest font-bold text-[#8A733F]">
            <Award className="w-3 h-3" /> Best Seller
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#F7F5F0] border border-[#E8E1D3] text-[10px] uppercase tracking-widest font-bold text-[#8A733F]">
            <Sparkles className="w-3 h-3" /> Limited Edition
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#F7F5F0] border border-[#E8E1D3] text-[10px] uppercase tracking-widest font-bold text-[#8A733F]">
            <Droplets className="w-3 h-3" /> Premium Quality
          </span>
        </div>
        
        {/* Reviews Summary */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex text-[#EED202]">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className={`w-4 h-4 ${star === 5 && (product as any).reviews != null && (product as any).reviews < 5 ? 'fill-transparent' : 'fill-current'}`} />
            ))}
          </div>
          <span className="text-sm font-sans text-[var(--color-text-muted)]">({product.reviewCount || 10} Reviews)</span>
        </div>

        {/* Price */}
        <div className="mt-6 border-b border-[var(--color-border)] pb-6">
          <div className="flex items-end gap-3 mb-2">
            <p className="text-3xl font-serif font-medium text-[var(--color-primary)]">₹{(product.salePrice || product.price).toLocaleString('en-IN')}</p>
            {product.salePrice && product.salePrice < product.price && (
              <>
                <p className="text-lg font-sans text-[var(--color-text-muted)] line-through mb-1">MRP ₹{product.price.toLocaleString('en-IN')}</p>
                <span className="bg-[#F7F5F0] text-[#8A733F] px-2 py-1 text-[10px] font-bold font-sans uppercase tracking-widest rounded-sm border border-[#E8E1D3] mb-1.5">
                  Save ₹{(product.price - product.salePrice).toLocaleString('en-IN')} ({Math.round((1 - product.salePrice / product.price) * 100)}%)
                </span>
              </>
            )}
          </div>
          <p className="text-xs font-sans text-[var(--color-text-muted)]">Price inclusive of all taxes. Free standard shipping on prepaid orders.</p>
        </div>


        {/* Delivery Checker */}
        <DeliveryChecker />

        {/* Dynamic Client Actions (ATC, Buy Now, Trust Badges, Stock) */}
        <ProductClientActions product={product} />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Shipping & Returns Summary */}
        <ShippingReturnsSummary />

        {/* Accordions */}
        <div className="mt-8 border-t border-[var(--color-border)]">
          <details className="group border-b border-[var(--color-border)] py-4 cursor-pointer" open>
            <summary className="flex justify-between items-center font-serif text-lg font-medium outline-none text-[var(--color-primary)]">
              About This Collection
              <span className="transition group-open:rotate-180 text-[var(--color-primary)]">
                <ChevronRight className="w-5 h-5 transform rotate-90" />
              </span>
            </summary>
            <ProductDescription 
              htmlContent={product.description}
            />
          </details>
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

    {/* Recently Viewed */}
    <RecentlyViewed currentProductId={product.id} />
  </>
  );
}
