import React from "react";
export { sustainabilityMetadata as metadata } from '@/lib/metadata';

const sections = [
  {
    title: "1. Conscious & Plastic-Free Packaging",
    content: "We take immense pride in our 100% plastic-free packaging initiative. Every Siphorahq order is packaged using custom-cut honeycomb protective paper wrap and starch-based biodegradable packaging peanuts. We completely avoid plastic bubble wrap, synthetic tape, or non-recyclable foam inserts, ensuring that our signature luxury boxes can be fully recycled or reused by our customers without sending plastic waste to landfills."
  },
  {
    title: "2. Energy-Efficient Crafting & High Firing",
    content: "Siphorahq porcelain and ceramic tableware is fired in advanced, high-efficiency kilns at temperatures exceeding 1350°C. This extreme heat ensures maximum thermal fusion, resulting in highly durable, chip-resistant porcelain that lasts for generations. By designing products for lifelong durability, we stand against the disposable culture of low-quality homeware, actively reducing manufacturing waste over time."
  },
  {
    title: "3. Consolidated Logistics & Reduced Footprint",
    content: "To minimize carbon emissions throughout our supply chain, we consolidate all raw clay transports and cargo movements. We coordinate with local logistics partners to ensure that domestic shipments across India are packed with optimal volume density, reducing the net carbon footprint of each delivery. Furthermore, we consolidate last-mile logistics to minimize multiple delivery attempts."
  },
  {
    title: "4. Lead-Free and Safe Raw Materials",
    content: "Sustainability is also about personal health. We utilize only 100% lead-free and cadmium-free raw mineral clays for our glazes. This makes our dinnerware and tea sets completely food-safe and prevents the run-off of toxic heavy metals in our workshop ecosystems. We ensure our materials are ethically sourced and harvested from certified mineral sites."
  }
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-24 px-4 md:px-margin-desktop">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-3">Our Core Values</p>
        <h1 className="text-4xl md:text-5xl font-serif font-light text-[var(--color-primary)] mb-8 text-center">
          Sustainability Commitment
        </h1>
        <div className="h-px bg-zinc-200 w-24 mx-auto mb-12" />
        
        {/* Intro */}
        <div className="max-w-3xl mx-auto text-center font-sans text-zinc-600 text-lg leading-relaxed mb-16">
          At Siphorahq, we believe that luxury tableware should exist in harmony with our planet. 
          Our dedication to sustainability guides every decision we make — from sourcing premium, lead-free raw mineral clays 
          to optimizing our firing cycles and adopting plastic-free shipping practices. 
          We craft poetry in porcelain that respects the earth.
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto font-sans">
          {sections.map((sec, idx) => (
            <div key={idx} className="bg-white p-8 border border-zinc-200/50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="font-serif text-xl text-[var(--color-primary)] mb-4">{sec.title}</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{sec.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
