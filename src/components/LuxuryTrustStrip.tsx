import React from 'react';
import { ShieldCheck, Package, Truck, HeadphonesIcon } from 'lucide-react';

export default function LuxuryTrustStrip() {
  const items = [
    { icon: <ShieldCheck className="w-4 h-4" />, text: 'Secure Checkout' },
    { icon: <Package className="w-4 h-4" />, text: 'Carefully Packed' },
    { icon: <Truck className="w-4 h-4" />, text: 'Nationwide Delivery' },
    { icon: <HeadphonesIcon className="w-4 h-4" />, text: 'Responsive Support' }
  ];

  return (
    <div className="bg-[#F7F5F0] border-y border-[#E8E1D3] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-between">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-ink-charcoal">
              <div className="text-burnished-gold">{item.icon}</div>
              <span className="font-label-caps text-[10px] uppercase tracking-[0.2em]">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
