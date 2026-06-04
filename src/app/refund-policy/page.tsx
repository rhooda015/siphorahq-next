import React from "react";
import { BRAND } from "@/config/brand";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Return & Refund Policy | ${BRAND.name}`,
  description: "Review our comprehensive return window, verification protocols, and liquidation timelines for luxury items.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf9] py-16 md:py-24 px-6 md:px-0">
      <article className="max-w-3xl mx-auto">
        <header className="mb-16 md:mb-20 text-center">
          <h1 className="text-3xl md:text-5xl font-serif text-[#1a1612] mb-6 tracking-wide">
            Return & Refund Policy
          </h1>
          <p className="font-sans text-xs uppercase tracking-widest text-zinc-500">
            Siphorahq Client Concierge
          </p>
        </header>

        <div className="space-y-12 md:space-y-16">
          <p className="font-sans text-base md:text-lg text-zinc-600 leading-relaxed">
            We want you to love your Siphorahq purchase. Our policies are crafted to ensure a seamless and premium experience, maintaining the highest standards of our luxury curations.
          </p>

          <section>
            <h2 className="font-serif text-xl md:text-2xl text-[#1a1612] mb-4 tracking-wide">
              1. The Return Window
            </h2>
            <p className="font-sans text-base text-zinc-600 leading-relaxed">
              We uphold a strict 7-day policy boundary for any returns. Returns are exclusively accepted for items that are verified as damaged or defective upon arrival. 
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl md:text-2xl text-[#1a1612] mb-6 tracking-wide">
              2. The Verification Protocol
            </h2>
            <div className="bg-zinc-50/60 border-l-2 border-[#1a1612] p-5 md:p-8">
              <p className="font-sans text-base text-zinc-700 leading-relaxed">
                To uphold the integrity of our pieces, an unboxing video is a mandatory structural dependency for processing claims. You must dispatch an unedited unboxing video to <a href="mailto:concierge@siphorahq.in" className="text-[#1a1612] font-medium underline underline-offset-4 hover:text-zinc-500 transition-colors">concierge@siphorahq.in</a> within 48 hours of timestamped delivery. Failure to provide verification within this timeframe will void the return authorization.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl md:text-2xl text-[#1a1612] mb-4 tracking-wide">
              3. Liquidation Timelines
            </h2>
            <p className="font-sans text-base text-zinc-600 leading-relaxed">
              Upon successful verification and approval of the returned asset, your refund will be initiated. Please allow explicit processing cycles of 5–7 banking business days for the funds to reflect back to your original source instrument.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
