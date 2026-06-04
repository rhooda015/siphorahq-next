"use client";

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useCart } from '@/store/useCart';

export default function CartSync() {
  const { status } = useSession();
  const { items, setItems, clearCart } = useCart();
  const prevStatus = useRef(status);
  const isInitialSyncDone = useRef(false);

  // 1. Handle Authentication Status Transitions
  useEffect(() => {
    // Detect login (transition to authenticated)
    if (status === 'authenticated' && prevStatus.current !== 'authenticated') {
      fetch('/api/user/cart')
        .then((res) => res.json())
        .then((data) => {
          if (data.cart) {
            setItems(data.cart);
            isInitialSyncDone.current = true;
          }
        })
        .catch(console.error);
    } 
    // Detect logout (transition to unauthenticated from authenticated)
    else if (status === 'unauthenticated' && prevStatus.current === 'authenticated') {
      clearCart();
      isInitialSyncDone.current = false;
    }

    prevStatus.current = status;
  }, [status, setItems, clearCart]);

  // 2. Synchronize changes back to DB whenever items change
  useEffect(() => {
    // Only sync if user is authenticated and we've already done the initial load
    if (status === 'authenticated' && isInitialSyncDone.current) {
      const debounce = setTimeout(() => {
        fetch('/api/user/cart', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: items }),
        }).catch(console.error);
      }, 500); // 500ms debounce to prevent spamming the backend

      return () => clearTimeout(debounce);
    }
  }, [items, status]);

  return null; // Invisible global listener component
}
