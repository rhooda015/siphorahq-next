import React from "react";
export { whyChooseUsMetadata as metadata } from '@/lib/metadata';

const features = [
  {
    title: "Artisanal Craftsmanship & 1350°C Firing",
    desc: "Siphorahq porcelain and ceramic collections are crafted using traditional techniques and fired at an intense 1350°C. This extreme heat vitrifies the clay body, making it exceptionally dense, non-porous, and highly resistant to chipping, cracking, or thermal shock. Our tableware is designed for daily durability."
  },
  {
    title: "100% Food-Safe & Lead-Free Glazes",
    desc: "Your health is our utmost priority. We guarantee that all glazes, clay substrates, and metallic decorations used in our tableware are certified 100% lead-free and cadmium-free. We only use premium food-safe minerals, preventing toxic chemical run-off and ensuring safe everyday dining."
  },
  {
    title: "Artisanal Hand-Applied 24k Gold Accents",
    desc: "Many of our flagship collections (such as the Mughal Gold and Emerald Regent sets) feature exquisite gold detailing. These intricate designs are hand-painted by master artisans using genuine 24k gold liquid alloy before undergoing a secondary low-fire cycle to fuse the precious metal to the glaze."
  },
  {
    title: "Signature Packaging & Transit Guarantee",
    desc: "We understand that ceramics are fragile. To guarantee a perfect delivery, we ship all orders in custom-engineered luxury boxes wrapped in plastic-free honeycomb padding. In the extremely rare event that any piece is damaged during transit, our concierge team will dispatch a replacement immediately, completely free."
  }
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-24 px-4 md:px-margin-desktop">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-xs tracking-[0.25em] uppercase text-[#C9A84C] mb-3">Our Standards</p>
        <h1 className="text-4xl md:text-5xl font-serif font-light text-[var(--color-primary)] text-center mb-8">
          Why Choose Siphorahq
        </h1>
        <div className="h-px bg-zinc-200 w-24 mx-auto mb-12" />

        <div className="max-w-3xl mx-auto text-center font-sans text-zinc-600 text-lg leading-relaxed mb-16">
          Siphorahq is born from a desire to combine the time-honored poetry of porcelain with the functional demands of modern Indian dining. 
          We do not believe in compromise. From the weight of our mugs to the depth of our plates and the safety of our glazes, 
          every detail is meticulously designed and tested to bring trust, elegance, and beauty to your dining space.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto font-sans">
          {features.map((feat, idx) => (
            <div key={idx} className="bg-white p-8 border border-zinc-200/50 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-[#C9A84C] font-serif text-lg font-bold mb-5 border border-amber-100">
                0{idx + 1}
              </div>
              <h2 className="font-serif text-xl text-[var(--color-primary)] mb-3">{feat.title}</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}