"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export default function FooterWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCheckout = pathname.startsWith('/checkout') && pathname !== '/checkout/cart';

  if (pathname === '/login' || pathname.startsWith('/account')) {
    return null;
  }

  if (isCheckout) {
    // Render a minimal footer for checkout
    return (
      <footer className="bg-white border-t border-[var(--color-border)] py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-text-muted)] font-sans">
            &copy; {new Date().getFullYear()} Siphorahq. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return <>{children}</>;
}
