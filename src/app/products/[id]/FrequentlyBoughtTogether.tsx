"use client";

import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { useCart } from '@/store/useCart';

export default function FrequentlyBoughtTogether({ mainProduct, relatedProduct }: { mainProduct: any, relatedProduct: any }) {
  const { addItem } = useCart();
  
  const handleAddBundle = () => {
    addItem(mainProduct, 1, false);
    addItem(relatedProduct, 1, false);
  };

  if (!relatedProduct) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 border-t border-[var(--color-border)] bg-[var(--color-accent-light)]">
      <h2 className="text-2xl md:text-3xl font-serif italic text-[var(--color-primary)] text-center mb-10">Frequently Bought Together</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Main Product */}
        <div className="w-32 aspect-square relative bg-white border border-[var(--color-border)] p-2">
          <Image src={mainProduct.image || '/images/dinnerware.webp'} fill className="object-contain" alt={mainProduct.name} />
        </div>
        <Plus className="w-6 h-6 text-[var(--color-text-muted)]" />
        {/* Recommended Product */}
        <div className="w-32 aspect-square relative bg-white border border-[var(--color-border)] p-2">
          <Image src={relatedProduct.image || '/images/serveware.webp'} fill className="object-contain" alt={relatedProduct.name} />
        </div>
        
        {/* Bundle Action */}
        <div className="md:ml-12 mt-6 md:mt-0 flex flex-col items-center md:items-start">
          <div className="text-[var(--color-primary)] text-xl font-sans font-medium mb-1">
            Total price: ₹{((mainProduct.salePrice || mainProduct.price) + (relatedProduct.salePrice || relatedProduct.price)).toLocaleString('en-IN')}
          </div>
          <div className="text-sm font-sans text-[var(--color-text-muted)] mb-4">
            Add <strong>{relatedProduct.name}</strong> for ₹{(relatedProduct.salePrice || relatedProduct.price).toLocaleString('en-IN')}
          </div>
          <button 
            onClick={handleAddBundle}
            className="bg-[var(--color-primary)] text-white px-8 py-3 uppercase tracking-widest text-xs font-medium hover:bg-[var(--color-secondary)] transition-colors"
          >
            Add Both to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
