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
import DeliveryChecker from './DeliveryChecker';
import FrequentlyBoughtTogether from './FrequentlyBoughtTogether';
import ImageGallery from './ImageGallery';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return STATIC_PRODUCTS.map((product) => ({
    id: product.id,
  }));
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

  return {
    title: `${(product as any).metaTitle || product.name} | ${BRAND.name}`,
    description: (product as any).metaDescription || product.description,
    alternates: { canonical: `https://siphorahq.in/products/${product.id}` },
    openGraph: {
      title: product.name,
      description: product.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
    }
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
        item: 'https://siphorahq.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Collections',
        item: 'https://siphorahq.in/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://siphorahq.in/products/${product.id}`,
      },
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image?.startsWith('http') || product.image?.startsWith('data:') 
      ? product.image 
      : `https://siphorahq.in${product.image}`,
    brand: {
      '@type': 'Brand',
      name: BRAND.name
    },
    offers: {
      '@type': 'Offer',
      url: `https://siphorahq.in/products/${product.id}`,
      priceCurrency: 'INR',
      price: product.salePrice || product.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      priceValidUntil: '2026-12-31',
      seller: { '@type': 'Organization', name: 'SiphoraHQ' }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: product.reviewCount || 124
    }
  };

  const relatedProductForBundle = STATIC_PRODUCTS.find(p => p.id !== product.id && p.category !== product.category) || STATIC_PRODUCTS[0];

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
              : [product.image || '/images/dinnerware.webp', '/images/serveware.webp', '/images/gifting.webp']
          )} 
        />
      </div>

      {/* Right: Product Details */}
      <div className="mt-8 lg:mt-0 lg:w-1/2 flex flex-col sticky top-24 h-fit">
        <span className="text-xs font-sans font-medium uppercase tracking-widest text-[#C9A84C] mb-2">{BRAND.name} Exclusive</span>
        <h1 className="text-3xl md:text-4xl font-serif font-light text-[var(--color-primary)] leading-tight">{product.name}</h1>
        
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
        <div className="mt-6 flex items-center gap-4 border-b border-[var(--color-border)] pb-6">
          <p className="text-2xl font-sans font-medium text-[var(--color-primary)]">₹{(product.salePrice || product.price).toLocaleString('en-IN')}</p>
          {product.salePrice && product.salePrice < product.price && (
            <>
              <p className="text-lg font-sans text-[var(--color-text-muted)] line-through">₹{product.price.toLocaleString('en-IN')}</p>
              <span className="bg-red-50 text-red-700 px-2 py-1 text-[10px] font-medium font-sans uppercase tracking-widest rounded-sm border border-red-200">
                Save {Math.round((1 - product.salePrice / product.price) * 100)}%
              </span>
            </>
          )}
        </div>


        {/* Delivery Checker */}
        <DeliveryChecker />

        {/* Dynamic Client Actions (ATC, Buy Now, Trust Badges, Stock) */}
        <ProductClientActions product={product} />

        {/* Accordions */}
        <div className="mt-12 border-t border-[var(--color-border)]">
          <details className="group border-b border-[var(--color-border)] py-4 cursor-pointer" open>
            <summary className="flex justify-between items-center font-serif text-lg font-medium outline-none text-[var(--color-primary)]">
              Product Details
              <span className="transition group-open:rotate-180 text-[var(--color-primary)]">
                <ChevronRight className="w-5 h-5 transform rotate-90" />
              </span>
            </summary>
            <div 
              className="mt-4 text-sm font-sans text-[var(--color-text-muted)] leading-relaxed prose prose-sm max-w-none prose-p:mb-3 prose-h3:font-semibold prose-h3:text-[var(--color-primary)] prose-h3:mt-4 prose-ul:list-disc prose-ul:pl-5 prose-li:mb-1"
              dangerouslySetInnerHTML={{ 
                __html: product.description || 'Crafted from the finest bone china porcelain, perfectly balancing aesthetic appeal with exceptional durability, making it ideal for both everyday dining and festive occasions.'
              }}
            />
          </details>
          <details className="group border-b border-[var(--color-border)] py-4 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-lg font-medium outline-none text-[var(--color-primary)]">
              Care Instructions
              <span className="transition group-open:rotate-180 text-[var(--color-primary)]">
                <ChevronRight className="w-5 h-5 transform rotate-90" />
              </span>
            </summary>
            <div className="mt-4 text-sm font-sans text-[var(--color-text-muted)] leading-relaxed">
              {product.care || 'Hand wash recommended. Do not use abrasive scrubbers.'}
            </div>
          </details>
          <details className="group border-b border-[var(--color-border)] py-4 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-lg font-medium outline-none text-[var(--color-primary)]">
              Shipping & Returns
              <span className="transition group-open:rotate-180 text-[var(--color-primary)]">
                <ChevronRight className="w-5 h-5 transform rotate-90" />
              </span>
            </summary>
            <div className="mt-4 text-sm font-sans text-[var(--color-text-muted)] leading-relaxed">
              Free secure shipping on all orders above ₹{BRAND.freeShippingThreshold}. Enjoy hassle-free 7-day returns for any transit damage.
            </div>
          </details>
        </div>
      </div>
    </div>
    
    {/* Frequently Bought Together */}
    <FrequentlyBoughtTogether mainProduct={product} relatedProduct={relatedProductForBundle} />

    {/* Related Products Section */}
    <div className="max-w-7xl mx-auto px-4 py-16 border-t border-[var(--color-border)]">
      <h2 className="text-3xl md:text-4xl font-serif italic text-[var(--color-primary)] text-center mb-12">You May Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
        {STATIC_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map((relatedProduct) => (
          <ProductCard key={relatedProduct.id} product={relatedProduct} />
        ))}
      </div>
    </div>
    </>
  );
}
