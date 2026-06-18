"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Order {
  _id: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: string;
  items?: any[];
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
        <div className="space-y-12">
          {orders.map((order, idx) => (
             <div key={order._id || idx} className="border-[0.5px] border-zinc-200 rounded-none bg-white overflow-hidden">
               {/* Header Panel inside Card */}
               <div className="bg-zinc-50 border-b-[0.5px] border-zinc-200 p-4 md:px-6 md:py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
                 <div className="flex flex-wrap gap-8 md:gap-16">
                   <div>
                     <p className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Order Placed</p>
                     <p className="font-sans text-xs text-zinc-900">
                       {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                     </p>
                   </div>
                   <div>
                     <p className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Total Price</p>
                     <p className="font-sans text-xs text-zinc-900">₹{order.amount?.toLocaleString('en-IN')}</p>
                   </div>
                   <div>
                     <p className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Order #</p>
                     <p className="font-sans text-xs text-zinc-900">{order.orderId}</p>
                   </div>
                 </div>
                 <div className="text-right w-full md:w-auto">
                   <Link href={`/account/orders/${order.orderId}`} className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 hover:text-black transition-colors">
                     View Invoice
                   </Link>
                 </div>
               </div>

               {/* Body Rows inside Card */}
               <div className="p-4 md:p-6 space-y-6">
                 {order.items && order.items.length > 0 ? (
                   order.items.map((item: any, i: number) => (
                     <div key={i} className={`flex flex-col md:flex-row gap-6 md:gap-8 ${i !== 0 ? 'pt-6 border-t-[0.5px] border-zinc-100' : ''}`}>
                       {/* Product Image */}
                       <div className="w-24 h-32 md:w-28 md:h-36 bg-zinc-50 border-[0.5px] border-zinc-100 flex-shrink-0 flex items-center justify-center overflow-hidden relative">
                         {(item.image || item.img || item.imageURL) ? (
                           <Image src={item.image || item.img || item.imageURL} alt={item.name || 'Product Image'} fill className="object-cover mix-blend-multiply" sizes="(max-width: 768px) 96px, 112px" />
                         ) : (
                           <span className="font-sans text-[10px] text-zinc-400 tracking-widest uppercase text-center px-2">No Image</span>
                         )}
                       </div>
                       
                       {/* Titles and Details */}
                       <div className="flex-1 flex flex-col justify-center">
                         <h3 className="font-serif text-lg md:text-xl text-zinc-900 mb-3 leading-snug">{item.name || 'Premium Configuration'}</h3>
                         <div className="space-y-1.5">
                           <p className="font-sans text-xs text-zinc-500 flex items-center gap-2">
                             <span className="uppercase tracking-widest text-[10px]">Qty:</span> 
                             <span className="text-zinc-900">{item.quantity || 1}</span>
                           </p>
                           {item.variant && (
                             <p className="font-sans text-xs text-zinc-500 flex items-center gap-2">
                               <span className="uppercase tracking-widest text-[10px]">Variant:</span> 
                               <span className="text-zinc-900">{item.variant}</span>
                             </p>
                           )}
                           {(item.price || item.price > 0) && (
                             <p className="font-sans text-sm text-zinc-900 mt-2">
                               ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                             </p>
                           )}
                         </div>
                       </div>
                       
                       {/* Status / Actions Tracker */}
                       <div className="md:w-56 flex flex-col items-start md:items-end justify-center gap-4">
                         <span className="inline-block border-[0.5px] border-zinc-200 px-4 py-2 text-[10px] uppercase tracking-widest text-zinc-600 bg-zinc-50/50 whitespace-nowrap">
                           {order.status.replace(/_/g, ' ')}
                         </span>
                         <Link href="/contact" className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 hover:text-black transition-colors underline underline-offset-4">
                           Need Help?
                         </Link>
                       </div>
                     </div>
                   ))
                 ) : (
                   <div className="py-8 text-center border-[0.5px] border-zinc-100 bg-zinc-50/30">
                     <p className="font-sans text-xs uppercase tracking-widest text-zinc-400">Order configuration details unavailable</p>
                   </div>
                 )}
               </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
