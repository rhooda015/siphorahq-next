import React from 'react';
import { Sparkles, CupSoda, Gift, LayoutGrid, Truck, HeartHandshake } from 'lucide-react';

export default function WhySiphorahq() {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: 'Premium Ceramic & Porcelain',
      description: 'Fired at high temperatures for exceptional durability and a refined, smooth finish.'
    },
    {
      icon: <CupSoda className="w-5 h-5" />,
      title: 'Elegant Everyday Design',
      description: 'Thoughtfully proportioned pieces designed to elevate daily dining and hosting.'
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: 'Gift-Ready Packaging',
      description: 'Delivered in signature boxes, perfect for weddings, housewarmings, and special occasions.'
    },
    {
      icon: <LayoutGrid className="w-5 h-5" />,
      title: 'Carefully Curated Collections',
      description: 'Cohesive sets that allow you to mix, match, and build your perfect tablescape.'
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: 'Secure Nationwide Delivery',
      description: 'Packaged with multi-layer protection to ensure your items arrive in pristine condition.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5" />,
      title: 'Dedicated Customer Support',
      description: 'Responsive assistance for everything from styling advice to order inquiries.'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#Fdfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-ink-charcoal mb-4">Why Siphorahq</h2>
          <p className="font-body-md text-on-surface-variant">
            Bringing timeless elegance and exceptional quality to modern Indian homes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-surface-cream flex items-center justify-center text-burnished-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="font-headline-md text-lg text-ink-charcoal mb-3">{feature.title}</h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed max-w-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
