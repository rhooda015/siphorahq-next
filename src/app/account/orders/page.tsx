import React from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 font-serif">
      <Link href="/account" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors mb-8 inline-block">← Back to Account</Link>
      <h1 className="text-3xl tracking-wide mb-2">My Orders</h1>
      <p className="text-sm text-gray-500 font-sans mb-8">Track, return, or view your past luxury purchases.</p>
      <div className="border-[0.5px] border-gray-200 py-12 text-center font-sans text-sm text-gray-400 bg-gray-50/50">
        You haven't placed any orders yet.
      </div>
    </div>
  );
}
