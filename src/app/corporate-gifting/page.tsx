import React from "react";
import { BRAND } from "@/config/brand";
export { corporateGiftingMetadata as metadata } from '@/lib/metadata';

const corporateServices = [
  {
    title: "1. Brand Customization & Logo Detailing",
    desc: "We offer professional custom branding services for corporate orders. Depending on the order volume, we can apply custom company logo prints on the underside of porcelain pieces, design specialized gold decals, or incorporate corporate colors into custom sleeves for our presentation gift boxes."
  },
  {
    title: "2. Tailored Gift Packaging & Hampers",
    desc: "Every gift box is packed with our signature plastic-free honeycomb paper padding and includes custom printed greeting cards. We can tailor the inner layouts of the boxes to fit different mug counts, saucer combinations, or accessory bowls, giving your employees and clients a clean, luxury unboxing experience."
  },
  {
    title: "3. Volume Discounts & Event Planning",
    desc: "Whether you are curating Diwali client gifts, celebrating company milestones, or preparing executive onboarding boxes, we provide flexible tier-based bulk pricing. We work closely with procurement officers to accommodate specific company budgets and organize scheduled event shipments."
  },
  {
    title: "4. Pan-India Delivery & Freight Tracking",
    desc: "Siphorahq coordinates with top-tier national logistics providers to handle bulk shipments safely. We manage both centralized single-point bulk deliveries to corporate offices and decentralized direct shipments to individual employee/client addresses across India with full tracking support."
  }
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-24 px-4 md:px-margin-desktop">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-3">Bespoke Corporate Services</p>
        <h1 className="text-4xl md:text-5xl font-serif font-light text-[var(--color-primary)] text-center mb-8">
          Corporate Gifting
        </h1>
        <div className="h-px bg-zinc-200 w-24 mx-auto mb-12" />

        <div className="max-w-3xl mx-auto text-center font-sans text-zinc-600 text-lg leading-relaxed mb-16">
          Elevate your corporate relationships and show appreciation with Siphorahq's premium handcrafted tableware. 
          Our collections represent refinement, quality, and timeless craftsmanship. 
          Whether gifting premium coffee mugs to a team, custom tea sets to key clients, or complete dinner sets for special occasions, 
          we ensure your company's values are expressed beautifully.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto font-sans mb-12">
          {corporateServices.map((service, idx) => (
            <div key={idx} className="bg-white p-8 border border-zinc-200/50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="font-serif text-xl text-[var(--color-primary)] mb-3">{service.title}</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50/50 border border-amber-100 p-8 rounded-xl max-w-2xl mx-auto text-center font-sans">
          <p className="text-xs uppercase tracking-wider text-amber-800 font-bold mb-2">Request a Catalog</p>
          <p className="text-sm text-amber-700 leading-relaxed">
            Please email us at <a href="mailto:concierge@siphorahq.in" className="underline font-medium">concierge@siphorahq.in</a> with your approximate quantity, target delivery dates, and custom requirements. Our concierge team will share our bulk catalog within 24 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
