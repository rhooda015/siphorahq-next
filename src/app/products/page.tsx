"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StoreProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  // ASYNC LOADER REPAIR: Resolve infinite 'Loading collection...' UI freeze
  useEffect(() => {
    fetch('https://siporahq-backend.onrender.com/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Backend pipeline failure or 500 state');
        return res.json();
      })
      .then((data) => {
        // If data is somehow null, default to empty array
        setProducts(data || []); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Siphora Data Stream Error:", err);
        // Fallback to clear infinite loading loop state instantly
        setProducts([]); 
        setErrorState(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-light text-neutral-900 tracking-wide uppercase">The Signature Collection</h1>
        <p className="mt-4 text-neutral-500">Premium handcrafted porcelain for the modern aesthetic.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin mb-4"></div>
          <p className="text-sm font-medium text-neutral-500 tracking-widest uppercase">Loading collection...</p>
        </div>
      ) : errorState ? (
        <div className="bg-red-50 text-red-800 p-8 rounded-sm border border-red-100 text-center">
          <svg className="w-8 h-8 mx-auto mb-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-lg font-semibold mb-2">Data Stream Interrupted</h2>
          <p className="text-sm">We are unable to load the product catalog at this moment. Our engineering team has been notified. Please try again later.</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-neutral-200 rounded-sm">
          <p className="text-neutral-500">No products currently available in the collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group cursor-pointer">
              <div className="aspect-square bg-neutral-100 rounded-sm overflow-hidden mb-4 relative">
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-neutral-400 font-medium tracking-widest uppercase">Product Media</span>
                </div>
              </div>
              <h3 className="text-sm font-medium text-neutral-900 mb-1">{product.name}</h3>
              <p className="text-sm text-neutral-500">${parseFloat(product.price).toFixed(2)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
