'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { status } = useSession();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // For now, we will render the exact HTML the user provided,
  // but wrap it in a React component structure.
  
  // Since we don't have the API fully wired for fetching a single order by ID just yet,
  // we will use the static HTML provided for demonstration, 
  // and we can conditionally render dynamic data if we have it later.

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchOrder = async () => {
        try {
          const res = await fetch(`/api/orders`);
          if (res.ok) {
            const data = await res.json();
            const foundOrder = data.find((o: any) => o.orderId === params.id || o._id === params.id);
            if (foundOrder) {
              setOrder(foundOrder);
            }
          }
        } catch (error) {
          console.error("Failed to fetch order", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    }
  }, [status, params.id]);

  if (status === 'loading' || (status === 'authenticated' && loading)) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 min-h-[50vh] flex flex-col items-center justify-center font-serif">
         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-heritage-navy"></div>
         <p className="mt-8 text-[10px] font-sans uppercase tracking-[0.2em] text-heritage-navy/60">Loading Order Details...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') return null;

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
      {/* Order Header */}
      <section className="mb-element-gap md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-surface-container-highest pb-8">
          <div>
            <nav className="mb-4 flex items-center gap-2 text-slate-gray font-label-md text-label-md">
              <Link className="hover:text-champagne-gold" href="/account/orders">Orders</Link>
              <span className="material-symbols-outlined text-[12px]" data-icon="chevron_right">chevron_right</span>
              <span className="text-heritage-navy">#{order?.orderId || 'SPH-98421'}</span>
            </nav>
            <h1 className="font-headline-lg text-headline-lg text-heritage-navy mb-2">Order Details</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-label-md text-label-md text-slate-gray">
              <span className="flex items-center gap-1"><span className="font-semibold text-heritage-navy">ID:</span> #{order?.orderId || 'SPH-98421'}</span>
              <span className="flex items-center gap-1">
                <span className="font-semibold text-heritage-navy">DATE:</span> 
                {order?.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'October 14, 2023'}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 bg-surface-container text-on-secondary-fixed-variant rounded-full">
                {order?.status ? order.status.replace(/_/g, ' ') : 'Delivered'}
              </span>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-heritage-navy text-porcelain-white font-label-lg text-label-lg px-8 py-4 uppercase tracking-widest hover:opacity-90 transition-all active:scale-95">
            <span className="material-symbols-outlined" data-icon="download">download</span>
            Download Invoice
          </button>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Items Section */}
        <div className="lg:col-span-8 space-y-8">
          <h2 className="font-headline-md text-headline-md text-heritage-navy mb-6">Purchased Items</h2>

          {order && order.items && order.items.length > 0 ? (
            order.items.map((item: any, i: number) => (
              <div key={i} className="group bg-porcelain-white p-6 md:p-8 shadow-[0_10px_40px_rgba(26,42,58,0.04)] flex flex-col md:flex-row gap-8 transition-all hover:translate-y-[-2px]">
                <div className="w-full md:w-48 h-48 bg-bone-white p-4 overflow-hidden">
                  <img alt={item.name} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 mix-blend-multiply" src={item.image || item.img || item.imageURL || "https://lh3.googleusercontent.com/aida/AP1WRLvJilvd4DAGPQIJUmgJCutZJW1wikX5GXdRfA-_nIQ2ZuoAvoR0C6VoIE1fYbODZBS4WetiZQEwzT3xdq6e7Vkr2WJbAqzX6S4dApdJWKn4RM_4BO65E8RKSaYBge501116uNlwxKffJRg1GN67d9tfePiJWwXmStFU1awCmbx9OExGE7BhtCzqtA5UP2plmqHLQv6hnRG8h2kYMZS6jkK8IK4H51ogxM8u7d1P5tUYV1ZrRgZ5D43sD4k"} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-heritage-navy mb-1">{item.name}</h3>
                      <p className="text-slate-gray font-label-md text-label-md uppercase tracking-wide">
                        {item.variant || 'Premium Collection'} • Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <span className="font-headline-md text-headline-md text-heritage-navy">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <button className="border border-champagne-gold text-heritage-navy font-label-md text-label-md px-6 py-2 uppercase tracking-widest hover:bg-bone-white transition-all">Buy Again</button>
                    <Link className="text-slate-gray font-label-md text-label-md uppercase tracking-widest flex items-center gap-2 hover:text-champagne-gold transition-all" href={`/products/${item.product || ''}`}>
                      View Product <span className="material-symbols-outlined text-sm" data-icon="arrow_outward">arrow_outward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Product Card 1 Static */}
              <div className="group bg-porcelain-white p-6 md:p-8 shadow-[0_10px_40px_rgba(26,42,58,0.04)] flex flex-col md:flex-row gap-8 transition-all hover:translate-y-[-2px]">
                <div className="w-full md:w-48 h-48 bg-bone-white p-4 overflow-hidden">
                  <img alt="" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida/AP1WRLvJilvd4DAGPQIJUmgJCutZJW1wikX5GXdRfA-_nIQ2ZuoAvoR0C6VoIE1fYbODZBS4WetiZQEwzT3xdq6e7Vkr2WJbAqzX6S4dApdJWKn4RM_4BO65E8RKSaYBge501116uNlwxKffJRg1GN67d9tfePiJWwXmStFU1awCmbx9OExGE7BhtCzqtA5UP2plmqHLQv6hnRG8h2kYMZS6jkK8IK4H51ogxM8u7d1P5tUYV1ZrRgZ5D43sD4k" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-heritage-navy mb-1">Emerald Regent Fine Porcelain Set</h3>
                      <p className="text-slate-gray font-label-md text-label-md uppercase tracking-wide">12-Piece Collection</p>
                    </div>
                    <span className="font-headline-md text-headline-md text-heritage-navy">₹42,500</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <button className="border border-champagne-gold text-heritage-navy font-label-md text-label-md px-6 py-2 uppercase tracking-widest hover:bg-bone-white transition-all">Buy Again</button>
                    <a className="text-slate-gray font-label-md text-label-md uppercase tracking-widest flex items-center gap-2 hover:text-champagne-gold transition-all" href="#">View Product <span className="material-symbols-outlined text-sm" data-icon="arrow_outward">arrow_outward</span></a>
                  </div>
                </div>
              </div>

              {/* Product Card 2 Static */}
              <div className="group bg-porcelain-white p-6 md:p-8 shadow-[0_10px_40px_rgba(26,42,58,0.04)] flex flex-col md:flex-row gap-8 transition-all hover:translate-y-[-2px]">
                <div className="w-full md:w-48 h-48 bg-bone-white p-4 overflow-hidden">
                  <img alt="" className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida/AP1WRLvd8xQ9cO4ZKkCOCNES1VvvRMWt0XVLROpTudJYXuaUzPcdxuc7_y3JwH1GmTTaHrT9say4zllINg1u4GMt9tB62muRqu5NwoIUB4wT37kEchm6d1vOzuIOfR8_f2jaxoO2b6PDC8GzlSQkKWt0Kme98GnC-SuJOkeycH6haVh4PjnymwtKuNce7dWExxEioM8qJY2aec6ZhEDRsrPUmZuXahP13bdJPECk_IhpIAM70vHgzVH3DcKPWm4" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-heritage-navy mb-1">Blue Rose Tea Set</h3>
                      <p className="text-slate-gray font-label-md text-label-md uppercase tracking-wide">6-Person Royal Collection</p>
                    </div>
                    <span className="font-headline-md text-headline-md text-heritage-navy">₹18,200</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <button className="border border-champagne-gold text-heritage-navy font-label-md text-label-md px-6 py-2 uppercase tracking-widest hover:bg-bone-white transition-all">Buy Again</button>
                    <a className="text-slate-gray font-label-md text-label-md uppercase tracking-widest flex items-center gap-2 hover:text-champagne-gold transition-all" href="#">View Product <span className="material-symbols-outlined text-sm" data-icon="arrow_outward">arrow_outward</span></a>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Shipping Summary Section */}
          <div className="mt-16 pt-16 border-t border-surface-container-highest">
            <h2 className="font-headline-md text-headline-md text-heritage-navy mb-8">Shipping & Logistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="font-label-lg text-label-lg uppercase text-slate-gray mb-4">Delivery Address</p>
                <address className="not-italic text-heritage-navy leading-relaxed font-body-lg text-body-lg">
                  <span className="block font-bold">{order?.shippingAddress?.name || 'Grace Darling'}</span>
                  {order?.shippingAddress?.street || '42 Heritage Enclave'}<br />
                  {order?.shippingAddress?.city || 'Malabar Hill'}<br />
                  {order?.shippingAddress?.state || 'Mumbai'}, {order?.shippingAddress?.country || 'Maharashtra'} {order?.shippingAddress?.zipcode || '400006'}
                </address>
              </div>
              <div>
                <p className="font-label-lg text-label-lg uppercase text-slate-gray mb-4">Delivery Method</p>
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-champagne-gold" data-icon="verified">verified</span>
                  <div>
                    <p className="text-heritage-navy font-bold">White Glove Delivery</p>
                    <p className="text-slate-gray text-body-md">Insured, professional handling by Siphorahq Logistics specialist.</p>
                    <a className="mt-4 inline-block text-heritage-navy font-label-md text-label-md uppercase tracking-widest border-b border-champagne-gold hover:text-champagne-gold transition-all" href="#">Return Policy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Summary Sidebar */}
        <aside className="lg:col-span-4 sticky top-28">
          <div className="bg-bone-white p-8 md:p-10 shadow-[0_10px_40px_rgba(26,42,58,0.04)]">
            <h3 className="font-headline-md text-headline-md text-heritage-navy mb-8">Summary</h3>
            <div className="space-y-4 font-body-md text-body-md text-on-surface">
              <div className="flex justify-between">
                <span className="text-slate-gray">Subtotal</span>
                <span>₹{order?.amount ? (order.amount * 0.82).toLocaleString('en-IN') : '60,700.00'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-gray">GST (18%)</span>
                <span>₹{order?.amount ? (order.amount * 0.18).toLocaleString('en-IN') : '10,926.00'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-gray">Shipping</span>
                <span className="text-champagne-gold">Complimentary</span>
              </div>
              <div className="pt-6 mt-6 border-t border-surface-container-highest flex justify-between items-baseline">
                <span className="font-headline-md text-headline-md text-heritage-navy">Total Paid</span>
                <span className="font-headline-md text-headline-md text-heritage-navy">₹{order?.amount ? order.amount.toLocaleString('en-IN') : '71,626.00'}</span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-surface-container-highest">
              <p className="font-label-lg text-label-lg uppercase text-slate-gray mb-4">Payment Method</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-heritage-navy flex items-center justify-center rounded">
                  <span className="material-symbols-outlined text-porcelain-white text-xl" data-icon="credit_card">credit_card</span>
                </div>
                <span className="text-heritage-navy font-body-md">Credit Card ending in 4482</span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-surface-container-highest">
              <h4 className="font-headline-md text-headline-md text-heritage-navy mb-8">Shipment Tracking</h4>
              <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-surface-container-highest"></div>

                {/* Step 1: Delivered (Active/Completed) */}
                <div className="flex gap-4 relative">
                  <div className="w-6 h-6 rounded-full bg-heritage-navy flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-porcelain-white text-[14px]" data-icon="check">check</span>
                  </div>
                  <div>
                    <p className="font-label-lg text-label-lg text-heritage-navy uppercase tracking-wide">Delivered</p>
                    <p className="text-slate-gray text-label-md">Oct 14, 2023 • 2:45 PM</p>
                  </div>
                </div>

                {/* Step 2: Shipped */}
                <div className="flex gap-4 relative">
                  <div className="w-6 h-6 rounded-full bg-heritage-navy flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-porcelain-white text-[14px]" data-icon="check">check</span>
                  </div>
                  <div>
                    <p className="font-label-lg text-label-lg text-heritage-navy uppercase tracking-wide">Shipped</p>
                    <p className="text-slate-gray text-label-md">Oct 12, 2023 • Mumbai Hub</p>
                  </div>
                </div>

                {/* Step 3: Processing */}
                <div className="flex gap-4 relative">
                  <div className="w-6 h-6 rounded-full bg-heritage-navy flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-porcelain-white text-[14px]" data-icon="check">check</span>
                  </div>
                  <div>
                    <p className="font-label-lg text-label-lg text-heritage-navy uppercase tracking-wide">Processing</p>
                    <p className="text-slate-gray text-label-md">Oct 11, 2023</p>
                  </div>
                </div>

                {/* Step 4: Order Placed */}
                <div className="flex gap-4 relative">
                  <div className="w-6 h-6 rounded-full bg-heritage-navy flex items-center justify-center z-10">
                    <span className="material-symbols-outlined text-porcelain-white text-[14px]" data-icon="check">check</span>
                  </div>
                  <div>
                    <p className="font-label-lg text-label-lg text-heritage-navy uppercase tracking-wide">Order Placed</p>
                    <p className="text-slate-gray text-label-md">Oct 10, 2023</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-4 bg-porcelain-white border border-surface-container-highest">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-gray font-label-md text-label-md uppercase">Current Location</span>
                  <span className="text-heritage-navy font-semibold text-label-md">Mumbai Hub</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-gray font-label-md text-label-md uppercase">Estimated Delivery</span>
                  <span className="text-champagne-gold font-semibold text-label-md">Oct 16 (Completed)</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-slate-gray font-label-md text-label-md">
              Need help? <Link className="text-heritage-navy underline" href="/contact">Contact Concierge</Link>
            </p>
          </div>

          {/* Atmospheric Background Image */}
          <div 
            className="mt-8 h-48 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGTKRL_5uqeS7RWQYiOnylW0z9y7YWZjRbNY5hugikp3cRrlwdcIjBcP9V6y6yy87JIlVBxutpayRPvIJjHd920zVvFiV34GwxeJIPyUuFO5zOWXdyXc2b2yWMXnyAerQquZljaOTYd9jCNuaK1R7DTPf9yfgEA_JdJGJV2E6mBPH1OAMkxH_vQi02iS82Pa50yYuU0dGe1kqhnH2ultKlTWtUqxc1IhrFEyZawWftv8zZ_iuBE9Cem3vnwTav8eS3tLKhcXfPkCg')" }}
          >
            <div className="w-full h-full bg-primary/20 flex items-center justify-center">
              <span className="text-porcelain-white font-display-lg text-headline-md italic opacity-50">Siphorahq</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
