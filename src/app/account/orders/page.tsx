"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Order {
  _id: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchOrders = async () => {
        try {
          const res = await fetch('/api/orders');
          if (res.ok) {
            const data = await res.json();
            setOrders(data);
          } else {
            console.error('Failed to fetch orders, status:', res.status);
          }
        } catch (error) {
          console.error("Failed to fetch orders", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [status]);

  if (status === 'loading' || (status === 'authenticated' && loading)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 min-h-[50vh] flex flex-col items-center justify-center font-serif">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1a1612]"></div>
         <p className="mt-8 text-[10px] font-sans uppercase tracking-[0.2em] text-[#1a1612]/60">Loading Orders...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 font-serif bg-white">
      <Link href="/account" className="text-xs uppercase tracking-widest text-[#1a1612]/60 hover:text-[#1a1612] transition-colors mb-12 inline-block">← Back to Account</Link>
      <h1 className="text-4xl tracking-wide text-[#1a1612] mb-4">My Orders</h1>
      <p className="text-sm text-[#1a1612]/60 font-sans mb-12 uppercase tracking-[0.1em]">Track, return, or view your past luxury purchases.</p>
      
      {orders.length === 0 ? (
        <div className="border-[0.5px] border-[#1a1612]/20 py-32 px-4 text-center bg-gray-50/30 flex flex-col items-center justify-center">
          <h2 className="text-lg md:text-xl font-serif text-[#1a1612] tracking-widest uppercase mb-4">You have no order history yet</h2>
          <p className="font-sans text-[11px] text-[#1a1612]/60 tracking-widest uppercase mb-12 max-w-md mx-auto leading-loose">
            Explore our curated collections of handcrafted pieces for your timeless gatherings.
          </p>
          <Link href="/products" className="bg-[#1a1612] text-white px-10 py-4 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-[#8b6914] transition-colors duration-300 rounded-[2px]">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
             <div key={order._id || idx} className="border-[0.5px] border-[#1a1612]/20 p-8 flex flex-col md:flex-row justify-between md:items-center hover:border-[#8b6914] transition-colors duration-300">
               <div>
                 <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#1a1612]/60 mb-2">Order #{order.orderId}</p>
                 <p className="font-sans text-sm font-medium text-[#1a1612]">₹{order.amount?.toLocaleString('en-IN')}</p>
                 {order.createdAt && (
                   <p className="font-sans text-[10px] text-[#1a1612]/40 mt-1 uppercase tracking-wider">
                     {new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                   </p>
                 )}
               </div>
               <div className="mt-6 md:mt-0">
                 <span className="inline-block border-[0.5px] border-[#1a1612]/20 bg-gray-50 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-[#1a1612]">
                   {order.status.replace(/_/g, ' ')}
                 </span>
               </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
