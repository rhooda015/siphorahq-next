"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useWishlist } from '@/store/useWishlist';
import { STATIC_PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const { items, setItems } = useWishlist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'authenticated') {
      fetch('/api/user/wishlist')
        .then(res => res.json())
        .then(data => {
          if (data.wishlist) {
            setItems(data.wishlist);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false); // Guest uses local persisted items instantly
    }
  }, [status, setItems]);

  const wishedProducts = STATIC_PRODUCTS.filter(p => items.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 font-serif">
      <Link href="/account" className="text-xs uppercase tracking-widest text-[#1a1612]/60 hover:text-[#8b6914] transition-colors mb-8 inline-block font-sans">
        ← Back to Account
      </Link>
      <h1 className="text-3xl md:text-4xl text-[#1a1612] tracking-wide mb-2">My Wishlist</h1>
      <p className="text-[#1a1612]/60 font-sans text-xs uppercase tracking-widest mb-12">MANAGE YOUR CURATED LUXURY COLLECTION</p>
      
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map(i => <div key={i} className="aspect-[4/5] bg-neutral-100"></div>)}
        </div>
      ) : wishedProducts.length === 0 ? (
        <div className="border-[0.5px] border-zinc-200 py-24 text-center font-sans text-sm text-[#1a1612]/60 bg-[#fdfbf9]">
          <p className="uppercase tracking-widest text-[#1a1612]/70 mb-6">YOUR WISHLIST IS CURRENTLY EMPTY</p>
          <Link href="/products" className="inline-block bg-[#1a1612] text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[#8b6914] transition-colors duration-300">
            Discover Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {wishedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
