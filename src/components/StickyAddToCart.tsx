'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { BRAND } from '@/config/brand';

interface StickyAddToCartProps {
  product: {
    name: string;
    price: number;
    salePrice?: number;
    image: string;
  };
  targetId: string;
  quantity: number;
  setQuantity: (qty: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export default function StickyAddToCart({ 
  product, 
  targetId,
  quantity,
  setQuantity,
  onAddToCart,
  onBuyNow
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the target (main buy box) is out of view ABOVE the viewport
        const rect = entry.boundingClientRect;
        if (!entry.isIntersecting && rect.top < 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0 }
    );

    observer.observe(targetElement);

    return () => {
      observer.disconnect();
    };
  }, [targetId]);

  const displayPrice = product.salePrice || product.price;

  return (
    <div 
      className={`
        fixed bottom-0 left-0 right-0 z-50 md:hidden
        bg-white/80 backdrop-blur-md border-t border-surface-cream/20
        transform transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        pb-[env(safe-area-inset-bottom)]
      `}
      style={{
        boxShadow: '0 -4px 20px rgba(0,0,0,0.05)'
      }}
    >
      <div className="px-4 py-3 flex flex-col gap-3">
        {/* Product Info Row */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex-shrink-0 bg-surface-cream rounded overflow-hidden">
            <Image
              src={product.image?.startsWith('http') ? product.image : `${BRAND.domain}${product.image}`}
              alt={product.name}
              fill
              className="object-contain p-1"
              sizes="48px"
            />
          </div>
          <div className="flex-grow min-w-0">
            <h4 className="font-headline-md text-sm text-ink-charcoal truncate pr-2">{product.name}</h4>
            <div className="font-price-md text-sm text-ink-charcoal">₹{displayPrice.toLocaleString('en-IN')}</div>
          </div>
          <div className="flex-shrink-0 flex items-center border border-muted-sand rounded">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-ink-charcoal transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center font-body-md text-sm text-ink-charcoal">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-ink-charcoal transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        {/* Actions Row */}
        <div className="flex gap-2">
          <button 
            onClick={onAddToCart}
            className="flex-1 py-2.5 border border-ink-charcoal text-ink-charcoal font-label-caps text-[10px] uppercase tracking-widest hover:bg-ink-charcoal hover:text-white transition-colors flex justify-center items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add
          </button>
          <button 
            onClick={onBuyNow}
            className="flex-[2] py-2.5 bg-ink-charcoal text-white font-label-caps text-[10px] uppercase tracking-widest hover:bg-burnished-gold transition-colors"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
