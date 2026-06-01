import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface CheckoutProgressProps {
  currentStep: 'cart' | 'address' | 'payment' | 'confirmation';
}

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <div className="flex items-center text-xs font-sans text-[var(--color-text-muted)] mb-8 justify-center">
      <Link href="/checkout/cart" className="hover:text-[var(--color-text)] transition-colors">Cart</Link>
      <ChevronRight className="w-3 h-3 mx-2" />
      
      {currentStep === 'cart' ? (
        <>
          <span className="opacity-50">Shipping</span>
          <ChevronRight className="w-3 h-3 mx-2 opacity-50" />
          <span className="opacity-50">Payment</span>
        </>
      ) : currentStep === 'address' ? (
        <>
          <span className="font-medium text-[var(--color-text)]">Shipping</span>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="opacity-50">Payment</span>
        </>
      ) : currentStep === 'payment' ? (
        <>
          <Link href="/checkout/address" className="hover:text-[var(--color-text)] transition-colors">Shipping</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="font-medium text-[var(--color-text)]">Payment</span>
        </>
      ) : (
        <>
          <span className="hover:text-[var(--color-text)] transition-colors">Shipping</span>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="hover:text-[var(--color-text)] transition-colors">Payment</span>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="font-medium text-[var(--color-text)]">Confirmation</span>
        </>
      )}
    </div>
  );
}
