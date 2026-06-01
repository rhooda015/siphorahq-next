"use client";

import React, { useState, useEffect } from 'react';
import { useCart } from '@/store/useCart';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function ExitIntentModal() {
  const [show, setShow] = useState(false);
  const { items } = useCart();
  
  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem('exitIntentShown')) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && items.length > 0) {
        setShow(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [items.length]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white p-8 max-w-md w-full relative shadow-2xl">
        <button 
          onClick={() => setShow(false)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-3xl font-serif text-[var(--color-primary)] mb-2">Wait!</h2>
        <p className="text-gray-600 mb-6 font-sans">
          You have {items.length} {items.length === 1 ? 'item' : 'items'} in your cart. Complete your purchase now and get <strong className="text-black">10% OFF</strong> your entire order!
        </p>
        
        <div className="bg-gray-50 border border-dashed border-gray-300 p-4 mb-6 text-center">
          <span className="text-xs uppercase tracking-widest text-gray-500 block mb-1">Use Code</span>
          <span className="text-2xl font-serif text-[var(--color-primary)]">WELCOME10</span>
        </div>
        
        <Link href="/checkout/cart" onClick={() => setShow(false)}>
          <button className="w-full bg-[var(--color-primary)] text-white py-4 uppercase tracking-widest text-xs font-medium hover:bg-[var(--color-secondary)] transition-colors">
            Complete Purchase
          </button>
        </Link>
        <button 
          onClick={() => setShow(false)}
          className="w-full mt-4 text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
        >
          No thanks, I'll pay full price later
        </button>
      </div>
    </div>
  );
}
