"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/store/useCart';
import { BRAND } from '@/config/brand';
import { trackBeginCheckout } from '@/lib/analytics';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, cartTotal } = useCart();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  if (!mounted) return null;

  const total = cartTotal();
  const remainingForFreeShipping = Math.max(BRAND.freeShippingThreshold - total, 0);
  const progressToFreeShipping = Math.min((total / BRAND.freeShippingThreshold) * 100, 100);

  const firstName = session?.user?.name ? session.user.name.split(' ')[0] : null;
  const cartTitle = firstName ? `${firstName}'s Cart` : 'Your Cart';

  return (
    <>
      {/* Overlay & Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/50 z-[100]"
              onClick={closeDrawer}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[110] shadow-2xl flex flex-col"
            >
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
          <h2 className="font-serif text-xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            {cartTitle}
          </h2>
          <button onClick={closeDrawer} aria-label="Close cart" className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-[var(--color-text-muted)] space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p className="font-sans">Your cart is currently empty.</p>
              <button onClick={closeDrawer} className="btn-primary mt-4">Continue Shopping</button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Free Shipping Progress */}
              <div className="bg-[var(--color-accent-light)] p-3 border border-[var(--color-border)] rounded-sm">
                <p className="text-xs font-sans font-medium text-[var(--color-primary)] mb-2 text-center">
                  {remainingForFreeShipping > 0 
                    ? `You are ₹${remainingForFreeShipping.toLocaleString('en-IN')} away from Free Shipping!` 
                    : `Congratulations! You've unlocked Free Shipping.`}
                </p>
                <div className="w-full bg-white h-1.5 rounded-full overflow-hidden border border-[var(--color-border)]">
                  <div 
                    className="bg-green-500 h-full transition-all duration-500" 
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items */}
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 pb-5 border-b border-[var(--color-border)] relative group">
                  <div className="w-24 h-28 bg-neutral-50 rounded-sm relative overflow-hidden flex-shrink-0">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" sizes="96px" />
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-[15px] pr-4 leading-tight">{item.name}</h3>
                        <button onClick={() => removeItem(item.cartItemId)} aria-label="Remove item" className="text-[var(--color-text-muted)] hover:text-red-500 transition-colors p-0.5 -mr-1 -mt-0.5">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {item.isGiftWrapped && (
                        <p className="text-[9px] text-[var(--color-primary)] font-medium mt-1 uppercase tracking-widest">+ Gift Wrapped (₹500)</p>
                      )}
                    </div>
                    <div className="flex items-end justify-between mt-2.5">
                      <div className="flex border border-[var(--color-border)] h-7 items-center">
                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} aria-label="Decrease quantity" className="px-2 h-full flex items-center hover:bg-neutral-100 transition-colors"><Minus className="w-3 h-3" /></button>
                        <span className="px-2.5 h-full flex items-center text-xs font-medium border-x border-[var(--color-border)]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} aria-label="Increase quantity" className="px-2 h-full flex items-center hover:bg-neutral-100 transition-colors"><Plus className="w-3 h-3" /></button>
                      </div>
                      <p className="font-sans font-medium text-sm text-[var(--color-primary)]">
                        ₹{((item.salePrice || item.price) * item.quantity + (item.isGiftWrapped ? 500 * item.quantity : 0)).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsell Section */}
              <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                <h4 className="font-serif text-sm text-[var(--color-primary)] mb-4">You May Also Like</h4>
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-neutral-100 relative rounded-sm overflow-hidden flex-shrink-0">
                     <Image src="/images/teaset.webp" alt="Gold Rim Tea Cup" fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h5 className="font-serif text-[13px] leading-tight mb-1">Vintage Gold Rim Tea Cup</h5>
                    <p className="font-sans text-xs text-[var(--color-text-muted)] mb-2">₹1,200</p>
                    <button className="text-[10px] font-sans font-medium uppercase tracking-widest text-[var(--color-primary)] border border-[var(--color-primary)] py-1.5 px-4 self-start hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-[var(--color-border)] bg-white">
            <div className="flex justify-between items-center mb-4 font-serif text-lg">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-center text-[var(--color-text-muted)] mb-4">
              Shipping & taxes calculated at checkout.
            </p>
            <Link href="/checkout/cart" onClick={closeDrawer} className="w-full">
              <button 
                onClick={() => trackBeginCheckout(total, items)}
                className="w-full bg-[var(--color-primary)] text-white uppercase tracking-widest text-xs py-3.5 hover:bg-[var(--color-secondary)] transition-colors font-medium"
              >
                Checkout Now
              </button>
            </Link>
          </div>
        )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
