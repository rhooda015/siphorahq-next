import React from 'react';
import { Droplets, Sparkles, Box, CheckCircle2 } from 'lucide-react';

export default function CareGuide() {
  const instructions = [
    {
      icon: <Droplets className="w-4 h-4" />,
      title: 'Cleaning',
      detail: 'Wash with a mild detergent and a soft sponge. Avoid abrasive scrubbers to maintain the pristine finish.'
    },
    {
      icon: <CheckCircle2 className="w-4 h-4" />,
      title: 'Dishwasher Safe',
      detail: 'Safe for standard dishwasher cycles, though hand-washing is recommended for pieces with delicate trims.'
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      title: 'Microwave Safe',
      detail: 'Standard pieces are fully microwave safe. Avoid microwaving any items featuring gold or platinum accents.'
    },
    {
      icon: <Box className="w-4 h-4" />,
      title: 'Storage',
      detail: 'Stack carefully and store in a dry place. We recommend placing a soft cloth between plates to prevent scratches.'
    }
  ];

  return (
    <div className="py-12 border-t border-[var(--color-border)] mt-8">
      <h3 className="font-serif text-2xl text-ink-charcoal mb-6 text-center lg:text-left">Care & Maintenance</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {instructions.map((item, index) => (
          <div key={index} className="flex gap-4 items-start p-4 bg-[#Fdfbf9] border border-[#E8E1D3] rounded-sm">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-surface-cream text-burnished-gold">
              {item.icon}
            </div>
            <div>
              <h4 className="font-headline-md text-sm text-ink-charcoal mb-1 uppercase tracking-wide">{item.title}</h4>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
