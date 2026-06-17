"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { STATIC_PRODUCTS } from '@/data/products';

export default function RecentlyViewed({ currentProductId }: { currentProductId: string }) {
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  useEffect(() => {
    // Read from localStorage
    const stored = localStorage.getItem('siphorahq_recently_viewed');
    let viewedIds: string[] = stored ? JSON.parse(stored) : [];
    
    // Add current product to history
    viewedIds = viewedIds.filter(id => id !== currentProductId);
    viewedIds.unshift(currentProductId);
    
    // Keep only last 10
    viewedIds = viewedIds.slice(0, 10);
    localStorage.setItem('siphorahq_recently_viewed', JSON.stringify(viewedIds));

    // Get product details for display (exclude current)
    const displayIds = viewedIds.filter(id => id !== currentProductId).slice(0, 4);
    if (displayIds.length > 0) {
      // Find in STATIC_PRODUCTS (or in a real app, fetch from API if not static)
      const products = displayIds.map(id => STATIC_PRODUCTS.find(p => p.id === id)).filter(Boolean);
      setRecentProducts(products);
    }
  }, [currentProductId]);

  if (recentProducts.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 border-t border-[var(--color-border)]">
      <h2 className="text-3xl md:text-4xl font-serif italic text-[var(--color-primary)] text-center mb-12">Recently Viewed</h2>
      <div className="flex overflow-x-auto gap-4 pb-8 custom-scrollbar md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
        {recentProducts.map((product) => (
          <div key={product.id} className="min-w-[280px] md:min-w-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
