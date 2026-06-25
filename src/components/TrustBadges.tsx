import React from 'react';
import { Truck, ShieldCheck, Undo2, CreditCard, Package, Umbrella } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    { icon: <Truck className="w-4 h-4" />, text: 'Free Shipping' },
    { icon: <ShieldCheck className="w-4 h-4" />, text: 'Secure Checkout' },
    { icon: <Undo2 className="w-4 h-4" />, text: '7-Day Returns' },
    { icon: <CreditCard className="w-4 h-4" />, text: 'COD Available' },
    { icon: <Package className="w-4 h-4" />, text: 'Premium Packaging' },
    { icon: <Umbrella className="w-4 h-4" />, text: 'Damage Protection' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      {badges.map((badge, index) => (
        <div 
          key={index} 
          className="flex items-center gap-2 p-2 rounded-sm bg-[#F7F5F0] border border-[#E8E1D3]"
        >
          <div className="text-[#8A733F]">
            {badge.icon}
          </div>
          <span className="text-xs font-sans font-medium text-ink-charcoal uppercase tracking-wider">
            {badge.text}
          </span>
        </div>
      ))}
    </div>
  );
}
