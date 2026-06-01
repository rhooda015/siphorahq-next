import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BRAND } from '@/config/brand';
import { ChevronRight, Star, Minus, Plus } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = {
    id: params.id,
    name: 'Siphorahq 46-Piece Dinner Set | Aesthetic Gold Pattern',
    price: 35000,
    salePrice: 25500,
    reviews: 4.8,
    reviewCount: 124,
  };

  return (
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
            <Image src="/images/dinnerware.png" fill className="object-cover" alt="Product" />
          </div>
          <div className="aspect-[4/5] bg-[var(--color-accent-light)] rounded-none overflow-hidden relative cursor-zoom-in hidden md:block">
            <Image src="/images/dinnerware_var1.png" fill className="object-cover" alt="Product View 2" />
          </div>
          <div className="aspect-[4/5] bg-[var(--color-accent-light)] rounded-none overflow-hidden relative cursor-zoom-in hidden md:block">
            <Image src="/images/dinnerware_var2.png" fill className="object-cover" alt="Product View 3" />
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
              <Star key={star} className={`w-4 h-4 ${star === 5 ? 'fill-transparent' : 'fill-current'}`} />
            ))}
          </div>
          <span className="text-sm font-sans text-[var(--color-text-muted)]">({product.reviewCount} Reviews)</span>
        </div>

        {/* Price */}
        <div className="mt-6 flex items-center gap-4 border-b border-[var(--color-border)] pb-6">
          <p className="text-2xl font-sans font-medium text-[var(--color-primary)]">₹{product.salePrice.toLocaleString('en-IN')}</p>
          <p className="text-lg font-sans text-[var(--color-text-muted)] line-through">₹{product.price.toLocaleString('en-IN')}</p>
          <span className="bg-red-50 text-red-700 px-2 py-1 text-[10px] font-medium font-sans uppercase tracking-widest rounded-sm border border-red-200">
            Save 27%
          </span>
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
        <div className="mt-8 bg-[var(--color-accent-light)] p-4 border border-[var(--color-border)] flex flex-col gap-2">
          <label className="text-sm font-sans font-medium text-[var(--color-primary)]">Check Delivery & COD</label>
          <div className="flex">
            <input type="text" placeholder="Enter Pincode" className="flex-1 bg-white border border-[var(--color-border)] px-3 py-2 text-sm font-sans outline-none focus:border-[#C9A84C]" />
            <button className="bg-[var(--color-primary)] text-white px-4 text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-secondary)] transition-colors">Check</button>
          </div>
        </div>

        {/* Fixed Mobile Add to Cart & Desktop Button */}
        <div className="fixed md:relative bottom-[60px] md:bottom-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 border-t border-[var(--color-border)] md:border-none z-30 mt-8 flex gap-4 shadow-lg md:shadow-none">
          <div className="hidden md:flex border border-[var(--color-border)] items-center">
            <button className="px-4 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"><Minus className="w-4 h-4" /></button>
            <span className="w-8 text-center font-sans text-sm">1</span>
            <button className="px-4 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"><Plus className="w-4 h-4" /></button>
          </div>
          <Link href="/checkout/cart" className="flex-1">
            <button className="w-full bg-[var(--color-primary)] text-white uppercase tracking-widest text-xs py-4 hover:bg-[var(--color-secondary)] transition-colors h-full">Add to Cart</button>
          </Link>
        </div>
        <div className="mt-4 hidden md:block">
          <Link href="/checkout/cart">
            <button className="w-full bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] uppercase tracking-widest text-xs py-4 hover:bg-[var(--color-accent-light)] transition-colors">Buy It Now</button>
          </Link>
        </div>

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
              Crafted from the finest bone china porcelain, this 46-piece dinner set features a timeless baroque gold pattern. It perfectly balances aesthetic appeal with exceptional durability, making it ideal for both everyday dining and festive occasions. 
              <br/><br/>
              <strong>Set Includes:</strong> 6 Full Plates, 6 Quarter Plates, 6 Soup Bowls, 6 Veg Bowls, 6 Spoons, 1 Rice Platter, 2 Serving Bowls with Lids.
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
              Hand wash recommended. Do not use abrasive scrubbers. Due to the real gold accents, this set is <strong>not</strong> microwave safe.
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
  );
}
