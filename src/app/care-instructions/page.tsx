import React from "react";
import { Metadata } from 'next';
import { BRAND } from '@/config/brand';

export const metadata: Metadata = {
  title: `Tableware Care & Maintenance | ${BRAND.name}`,
  description: `Learn how to wash, store, and care for your premium porcelain, bone china, and gold-accented tea cups and dinnerware.`,
  alternates: {
    canonical: `${BRAND.domain}/care-instructions`,
  }
};

const carePillars = [
  {
    title: "1. Gentle Hand Washing (Recommended)",
    desc: "To keep the glaze looking brilliant, we recommend hand washing your porcelain and ceramic items using a soft sponge, warm water, and a mild, non-citrus dish soap. Avoid using abrasive scrubbing pads, steel wool, or harsh scouring powders, as these can scratch the delicate surface glaze over time."
  },
  {
    title: "2. Gold Trims & Microwave Safety",
    desc: "Important: Any mugs, cups, plates, or tea sets featuring hand-painted 24k gold trims (such as our Mughal Gold and Emerald Regent collections) must NEVER be put in the microwave or oven. The metal detailing can spark and sustain damage under microwave radiation. Standard, undecorated tableware is completely microwave safe."
  },
  {
    title: "3. Dishwasher Best Practices",
    desc: "Our standard ceramic and porcelain collections are dishwasher safe. When loading the dishwasher, ensure that all plates, cups, and bowls are placed securely with adequate space between them. Preventing items from touching during the wash cycle is key to avoiding accidental chips, cracks, or mechanical wear."
  },
  {
    title: "4. Staining & Tannin Removal",
    desc: "Over time, regular use with dark teas or espresso can leave superficial tannin stains on the interior glazes. You can easily remove these blemishes without scratching the cup. Simply create a gentle paste using baking soda and warm water, rub it softly over the stained area with a cloth, and rinse thoroughly."
  },
  {
    title: "5. Safe Stacking & Cabinet Storage",
    desc: "When stacking dinnerware in your cabinets, place a thin paper plate, felt liner, or soft cloth separator between each plate. This prevents the raw, unglazed foot ring of the top plate from grinding against the smooth glazed surface of the plate underneath, keeping your tableware free from cutlery-like scratch marks."
  }
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-24 px-4 md:px-margin-desktop">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-3">Longevity Guide</p>
        <h1 className="text-4xl md:text-5xl font-serif font-light text-[var(--color-primary)] text-center mb-8">
          Care &amp; Maintenance Instructions
        </h1>
        <div className="h-px bg-zinc-200 w-24 mx-auto mb-12" />

        <div className="max-w-3xl mx-auto text-center font-sans text-zinc-600 text-lg leading-relaxed mb-16">
          Every Siphorahq piece is handcrafted and high-fired to achieve exceptional durability. 
          With proper handling and care, your luxury porcelain dinnerware and gold-finish tea sets 
          will preserve their brilliant finish and elegant luster for many years. 
          Follow our guidelines below to maintain your tableware.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto font-sans mb-12">
          {carePillars.map((pillar, idx) => (
            <div key={idx} className="bg-white p-8 border border-zinc-200/50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="font-serif text-xl text-[var(--color-primary)] mb-3">{pillar.title}</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50/50 border border-amber-100 p-8 rounded-xl max-w-4xl mx-auto text-center font-sans">
          <p className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-2">Need Concierge Support?</p>
          <p className="text-sm text-amber-700 leading-relaxed">
            If you have questions about specific items, glazes, or customization, please email us at concierge [at] siphorahq.in.
          </p>
        </div>
      </div>
    </div>
  );
}