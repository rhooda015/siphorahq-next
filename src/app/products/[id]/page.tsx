import React from 'react';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import { ChevronRight, Star, Minus, Plus } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = {
    id: params.id,
    name: 'Ivory Silk Blend Festive Kurta Set',
    price: 12500,
    salePrice: 9500,
    reviews: 4.8,
    reviewCount: 124,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:flex lg:gap-12 pb-32 md:pb-12">
      
      {/* Breadcrumbs */}
      <div className="w-full lg:hidden mb-4 flex items-center text-xs font-sans text-text-muted">
        <Link href="/">Home</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <Link href="/collections/women">Women</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="truncate">{product.name}</span>
      </div>

      {/* Left: Image Gallery */}
      <div className="lg:w-1/2">
        {/* Desktop Breadcrumbs */}
        <div className="hidden lg:flex mb-6 items-center text-xs font-sans text-text-muted">
          <Link href="/">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href="/collections/women">Women</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4].map((img) => (
            <div key={img} className="aspect-[3/4] bg-ivory rounded-sm overflow-hidden relative cursor-zoom-in">
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-text-muted uppercase tracking-widest text-center px-4">
                Product View {img}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Product Details */}
      <div className="mt-8 lg:mt-0 lg:w-1/2 flex flex-col sticky top-24 h-fit">
        <span className="text-xs font-sans font-medium uppercase tracking-widest text-gold mb-2">{BRAND.name} Exclusive</span>
        <h1 className="text-3xl md:text-4xl font-serif font-light text-text leading-tight">{product.name}</h1>
        
        {/* Reviews Summary */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex text-gold">
            {[1,2,3,4,5].map((star) => (
              <Star key={star} className={`w-4 h-4 ${star === 5 ? 'fill-transparent' : 'fill-current'}`} />
            ))}
          </div>
          <span className="text-sm font-sans text-text-muted">({product.reviewCount} Reviews)</span>
        </div>

        {/* Price */}
        <div className="mt-6 flex items-center gap-4 border-b border-border pb-6">
          <p className="text-2xl font-sans font-medium text-text">₹{product.salePrice.toLocaleString('en-IN')}</p>
          <p className="text-lg font-sans text-text-muted line-through">₹{product.price.toLocaleString('en-IN')}</p>
          <span className="bg-red-50 text-red-700 px-2 py-1 text-xs font-medium font-sans uppercase tracking-widest rounded-sm">
            Save 24%
          </span>
        </div>

        {/* Color Swatches */}
        <div className="mt-8">
          <h3 className="text-sm font-sans font-medium text-text uppercase tracking-widest mb-3">Color: Ivory</h3>
          <div className="flex gap-3">
            <button className="w-8 h-8 rounded-full bg-[#F5F0E8] border-2 border-gold ring-2 ring-transparent ring-offset-2"></button>
            <button className="w-8 h-8 rounded-full bg-[#2D5016] border border-border hover:border-text"></button>
            <button className="w-8 h-8 rounded-full bg-[#6B1F2A] border border-border hover:border-text"></button>
          </div>
        </div>

        {/* Size Selector */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-sans font-medium text-text uppercase tracking-widest">Size</h3>
            <button className="text-xs font-sans text-text-muted underline hover:text-text">Size Guide</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button key={size} className={`py-3 text-sm font-sans font-medium border ${size === 'M' ? 'border-text bg-text text-white' : 'border-border text-text hover:border-text'} transition-colors`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Checker */}
        <div className="mt-8 bg-ivory p-4 border border-border flex flex-col gap-2">
          <label className="text-sm font-sans font-medium text-text">Check Delivery & COD</label>
          <div className="flex">
            <input type="text" placeholder="Enter Pincode" className="flex-1 bg-white border border-border px-3 py-2 text-sm font-sans outline-none focus:border-gold" />
            <button className="bg-text text-white px-4 text-xs uppercase tracking-widest font-medium hover:bg-gold transition-colors">Check</button>
          </div>
        </div>

        {/* Fixed Mobile Add to Cart & Desktop Button */}
        <div className="fixed md:relative bottom-[60px] md:bottom-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 border-t border-border md:border-none z-30 mt-8 flex gap-4 shadow-lg md:shadow-none">
          <div className="hidden md:flex border border-border items-center">
            <button className="px-4 text-text-muted hover:text-text"><Minus className="w-4 h-4" /></button>
            <span className="w-8 text-center font-sans text-sm">1</span>
            <button className="px-4 text-text-muted hover:text-text"><Plus className="w-4 h-4" /></button>
          </div>
          <Link href="/checkout/cart" className="flex-1">
            <button className="w-full btn-primary h-full">Add to Cart</button>
          </Link>
        </div>
        <div className="mt-4 hidden md:block">
          <Link href="/checkout/cart">
            <button className="w-full btn-secondary">Buy It Now</button>
          </Link>
        </div>

        {/* Accordions */}
        <div className="mt-12 border-t border-border">
          <details className="group border-b border-border py-4 cursor-pointer" open>
            <summary className="flex justify-between items-center font-serif text-lg font-medium outline-none">
              Product Details
              <span className="transition group-open:rotate-180">
                <ChevronRight className="w-5 h-5 transform rotate-90" />
              </span>
            </summary>
            <div className="mt-4 text-sm font-sans text-text-muted leading-relaxed">
              Crafted from a luxurious silk blend, this festive kurta set features intricate gold zari embroidery along the neckline and cuffs. Paired with comfortable matching straight pants, it effortlessly blends heritage craftsmanship with modern silhouettes.
            </div>
          </details>
          <details className="group border-b border-border py-4 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-lg font-medium outline-none">
              Fabric & Care
              <span className="transition group-open:rotate-180">
                <ChevronRight className="w-5 h-5 transform rotate-90" />
              </span>
            </summary>
            <div className="mt-4 text-sm font-sans text-text-muted leading-relaxed">
              Dry clean only. Store in a breathable cotton garment bag away from direct sunlight to preserve the zari work.
            </div>
          </details>
          <details className="group border-b border-border py-4 cursor-pointer">
            <summary className="flex justify-between items-center font-serif text-lg font-medium outline-none">
              Shipping & Returns
              <span className="transition group-open:rotate-180">
                <ChevronRight className="w-5 h-5 transform rotate-90" />
              </span>
            </summary>
            <div className="mt-4 text-sm font-sans text-text-muted leading-relaxed">
              Free shipping on all orders above ₹1999. Enjoy hassle-free 15-day returns.
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
