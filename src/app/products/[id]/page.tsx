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
import FrequentlyBoughtTogether from './FrequentlyBoughtTogether';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { Shield, Droplets, Award, Sparkles } from 'lucide-react';

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
              : getPlaceholderImages(product.id)
          )} 
        />
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
            <Droplets className="w-3 h-3" /> Handcrafted
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
              About This Collection
              <span className="transition group-open:rotate-180 text-[var(--color-primary)]">
                <ChevronRight className="w-5 h-5 transform rotate-90" />
              </span>
            </summary>
            <ProductDescription 
              htmlContent={product.description || 'Crafted from the finest bone china porcelain, perfectly balancing aesthetic appeal with exceptional durability, making it ideal for both everyday dining and festive occasions.'}
            />
          </details>
          <details className="group border-b border-[var(--color-border)] py-4 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-lg font-medium outline-none text-[var(--color-primary)]">
              Specifications
              <span className="transition group-open:rotate-180 text-[var(--color-primary)]">
                <ChevronRight className="w-5 h-5 transform rotate-90" />
              </span>
            </summary>
            <div className="mt-4 text-sm font-sans text-[var(--color-text-muted)] leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li>Material: Premium Bone China / Fine Porcelain</li>
                <li>Finish: Hand-glazed with 24k Gold accents</li>
                <li>Durability: Chip-resistant and scratch-proof</li>
                <li>Origin: Exclusively crafted for {BRAND.name}</li>
              </ul>
            </div>
          </details>
          <details className="group border-b border-[var(--color-border)] py-4 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-lg font-medium outline-none text-[var(--color-primary)]">
              What's Included
              <span className="transition group-open:rotate-180 text-[var(--color-primary)]">
                <ChevronRight className="w-5 h-5 transform rotate-90" />
              </span>
            </summary>
            <div className="mt-4 text-sm font-sans text-[var(--color-text-muted)] leading-relaxed">
              Carefully packaged in our signature luxury gift box to ensure safe transit and an unforgettable unboxing experience.
            </div>
          </details>
          <details className="group border-b border-[var(--color-border)] py-4 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-lg font-medium outline-none text-[var(--color-primary)]">
              Care Instructions
              <span className="transition group-open:rotate-180 text-[var(--color-primary)]">
                <ChevronRight className="w-5 h-5 transform rotate-90" />
              </span>
            </summary>
            <div className="mt-4 text-sm font-sans text-[var(--color-text-muted)] leading-relaxed">
              {product.care || 'Hand wash recommended with mild detergent. Not safe for microwave due to gold detailing. Do not use abrasive scrubbers.'}
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
              Free secure shipping on all orders above ₹{BRAND.freeShippingThreshold}. Delivered in 3-5 business days. Enjoy hassle-free 7-day returns for any transit damage.
            </div>
          </details>
          <details className="group border-b border-[var(--color-border)] py-4 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-lg font-medium outline-none text-[var(--color-primary)]">
              FAQs
              <span className="transition group-open:rotate-180 text-[var(--color-primary)]">
                <ChevronRight className="w-5 h-5 transform rotate-90" />
              </span>
            </summary>
            <div className="mt-4 text-sm font-sans text-[var(--color-text-muted)] leading-relaxed space-y-4">
              <div>
                <p className="font-semibold text-[var(--color-primary)]">Is this safe for hot beverages?</p>
                <p>Yes, our premium porcelain is designed to retain heat without cracking.</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-primary)]">Does it come in gift packaging?</p>
                <p>You can add our premium gift packaging during checkout for an elevated gifting experience.</p>
              </div>
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
      <div className="flex overflow-x-auto gap-4 pb-8 custom-scrollbar md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
        {STATIC_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map((relatedProduct) => (
          <div key={relatedProduct.id} className="min-w-[280px] md:min-w-0">
            <ProductCard product={relatedProduct} />
          </div>
        ))}
      </div>
    </div>

    {/* Customer Reviews Section */}
    <div className="bg-[#f8f5ef] py-20 mt-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif italic text-[var(--color-primary)] mb-8">Customer Reviews</h2>
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="text-6xl font-serif text-[var(--color-primary)]">4.8</div>
          <div className="text-left">
            <div className="flex text-[#C9A84C] mb-1">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <p className="text-sm font-sans text-[var(--color-text-muted)]">Based on {product.reviewCount || 124} reviews</p>
          </div>
        </div>
        
        <div className="bg-white p-8 md:p-12 text-left rounded-sm border border-[var(--color-border)] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex text-[#C9A84C] mb-2">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="font-sans font-bold text-[var(--color-primary)]">Absolutely Stunning!</p>
            </div>
            <span className="text-xs font-sans text-[var(--color-text-muted)]">2 weeks ago</span>
          </div>
          <p className="font-sans text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">
            "I ordered this for a dinner party, and I was blown away by the quality. It feels extremely premium, and the gold detailing is exquisite. Highly recommend!"
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F7F5F0] rounded-full flex items-center justify-center font-serif text-[var(--color-primary)] text-sm">S</div>
            <div>
              <p className="text-xs font-sans font-bold text-[var(--color-primary)]">Simran K.</p>
              <p className="text-[10px] font-sans text-[var(--color-text-muted)] uppercase tracking-widest flex items-center gap-1">
                <Shield className="w-3 h-3 text-green-600" /> Verified Buyer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Recently Viewed */}
    <RecentlyViewed currentProductId={product.id} />
  </>
  );
}
