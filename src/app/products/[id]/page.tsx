import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BRAND } from '@/config/brand';
import { ChevronRight, Star, Minus, Plus } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductClientActions from './ProductClientActions';

export async function generateStaticParams() {
  return STATIC_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = getProductById(params.id);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | ${BRAND.name}`,
    description: product.description,
    alternates: { canonical: `https://siphorahq.in/products/${product.id}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image || ''],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
    }
  };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `https://siphorahq.in${product.image}`,
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
      itemCondition: 'https://schema.org/NewCondition'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-[4/5] bg-[var(--color-accent-light)] rounded-none overflow-hidden relative cursor-zoom-in md:col-span-2">
            <Image src={product.image || '/images/dinnerware.png'} fill className="object-cover" alt="Product" />
          </div>
          <div className="aspect-[4/5] bg-[var(--color-accent-light)] rounded-none overflow-hidden relative cursor-zoom-in hidden md:block">
            <Image src={product.image || '/images/dinnerware.png'} fill className="object-cover" alt="Product View 2" />
          </div>
          <div className="aspect-[4/5] bg-[var(--color-accent-light)] rounded-none overflow-hidden relative cursor-zoom-in hidden md:block">
            <Image src={product.image || '/images/dinnerware.png'} fill className="object-cover" alt="Product View 3" />
          </div>
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="mt-8 lg:mt-0 lg:w-1/2 flex flex-col sticky top-24 h-fit">
        <span className="text-xs font-sans font-medium uppercase tracking-widest text-[#C9A84C] mb-2">{BRAND.name} Exclusive</span>
        <h1 className="text-3xl md:text-4xl font-serif font-light text-[var(--color-primary)] leading-tight">{product.name}</h1>
        
        {/* Reviews Summary */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex text-[#EED202]">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className={`w-4 h-4 ${star === 5 && product.reviews < 5 ? 'fill-transparent' : 'fill-current'}`} />
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

        {/* Color Swatches */}
        <div className="mt-8">
          <h3 className="text-sm font-sans font-medium text-[var(--color-primary)] uppercase tracking-widest mb-3">Color: White & Gold</h3>
          <div className="flex gap-3">
            <button className="w-8 h-8 rounded-full bg-white border-2 border-[#C9A84C] ring-2 ring-transparent ring-offset-2"></button>
            <button className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[var(--color-border)] hover:border-[var(--color-primary)]"></button>
            <button className="w-8 h-8 rounded-full bg-[#F5F0E8] border border-[var(--color-border)] hover:border-[var(--color-primary)]"></button>
          </div>
        </div>

        {/* Delivery Checker */}
        <div className="mt-8 bg-[var(--color-accent-light)] p-4 border border-[var(--color-border)] flex flex-col gap-2 mb-6">
          <label className="text-sm font-sans font-medium text-[var(--color-primary)]">Check Delivery & COD</label>
          <div className="flex">
            <input type="text" placeholder="Enter Pincode" className="flex-1 bg-white border border-[var(--color-border)] px-3 py-2 text-sm font-sans outline-none focus:border-[#C9A84C]" />
            <button className="bg-[var(--color-primary)] text-white px-4 text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-secondary)] transition-colors">Check</button>
          </div>
        </div>

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
            <div className="mt-4 text-sm font-sans text-[var(--color-text-muted)] leading-relaxed">
              {product.description || 'Crafted from the finest bone china porcelain, perfectly balancing aesthetic appeal with exceptional durability, making it ideal for both everyday dining and festive occasions.'}
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
    <div className="max-w-7xl mx-auto px-4 py-16 border-t border-[var(--color-border)] bg-[var(--color-accent-light)]">
      <h2 className="text-2xl md:text-3xl font-serif italic text-[var(--color-primary)] text-center mb-10">Frequently Bought Together</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Main Product */}
        <div className="w-32 aspect-square relative bg-white border border-[var(--color-border)] p-2">
          <Image src={product.image || '/images/dinnerware.png'} fill className="object-contain" alt={product.name} />
        </div>
        <Plus className="w-6 h-6 text-[var(--color-text-muted)]" />
        {/* Recommended Product */}
        <div className="w-32 aspect-square relative bg-white border border-[var(--color-border)] p-2">
          <Image src="/images/serveware.png" fill className="object-contain" alt="Serving Bowl Set" />
        </div>
        
        {/* Bundle Action */}
        <div className="md:ml-12 mt-6 md:mt-0 flex flex-col items-center md:items-start">
          <div className="text-[var(--color-primary)] text-xl font-sans font-medium mb-1">
            Total price: ₹{(product.salePrice || product.price) + 2200}
          </div>
          <div className="text-sm font-sans text-[var(--color-text-muted)] mb-4">
            Add <strong>Serving Bowl Set</strong> for ₹2,200
          </div>
          <Link href="/checkout/cart">
            <button className="bg-[var(--color-primary)] text-white px-8 py-3 uppercase tracking-widest text-xs font-medium hover:bg-[var(--color-secondary)] transition-colors">
              Add Both to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>

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
