import React from 'react';
import Image from 'next/image';

export default function GiftPackaging() {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-surface-cream/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full lg:w-1/2 relative aspect-[4/5] bg-surface-cream rounded-sm overflow-hidden">
            <Image
              src="/images/gifting.webp"
              alt="Siphorahq Premium Gift Packaging"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="w-full lg:w-1/2">
            <span className="text-xs font-sans font-medium uppercase tracking-widest text-[#C9A84C] mb-4 block">The Art of Gifting</span>
            <h2 className="text-3xl md:text-4xl font-serif text-ink-charcoal mb-6 leading-tight">
              Thoughtful Presentation for Memorable Moments
            </h2>
            <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
              Every piece of our premium ceramic and porcelain arrives in our signature packaging. Whether you are celebrating a wedding, a housewarming, or an anniversary, our presentation ensures the unboxing experience is as exceptional as the piece itself.
            </p>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              <div>
                <h4 className="font-headline-md text-sm text-ink-charcoal mb-2 uppercase tracking-wide">Wedding Gifting</h4>
                <p className="font-body-md text-sm text-on-surface-variant">Timeless sets designed to last a lifetime together.</p>
              </div>
              <div>
                <h4 className="font-headline-md text-sm text-ink-charcoal mb-2 uppercase tracking-wide">Housewarming</h4>
                <p className="font-body-md text-sm text-on-surface-variant">Elevate a new space with elegant everyday dining essentials.</p>
              </div>
              <div>
                <h4 className="font-headline-md text-sm text-ink-charcoal mb-2 uppercase tracking-wide">Anniversaries</h4>
                <p className="font-body-md text-sm text-on-surface-variant">Celebrate milestones with exceptional craftsmanship.</p>
              </div>
              <div>
                <h4 className="font-headline-md text-sm text-ink-charcoal mb-2 uppercase tracking-wide">Festive Joy</h4>
                <p className="font-body-md text-sm text-on-surface-variant">Curated collections perfect for hosting and sharing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
