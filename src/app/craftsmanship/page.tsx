import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gem, ShieldAlert, Award, Sparkles, ChevronRight, Hammer } from "lucide-react";
import { BRAND } from "@/config/brand";

export { craftsmanshipMetadata as metadata } from "@/lib/metadata";

export default function Page() {
  return (
    <div className="bg-surface-cream text-ink-charcoal font-body-md overflow-x-hidden min-h-screen">
      {/* ── HERO BANNER ── */}
      <section className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/our-story/hero-porcelain-craft.webp"
          alt="Artisan hands crafting fine porcelain tableware"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-ink-charcoal/35" />

        <div className="relative z-10 text-center px-5 max-w-4xl mx-auto flex flex-col items-center mt-12">
          <nav className="flex justify-center items-center gap-2 font-label-caps text-[10px] uppercase tracking-widest text-surface-cream/70 mb-6">
            <Link href="/" className="hover:text-burnished-gold transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-burnished-gold">Craftsmanship</span>
          </nav>
          <h1 className="font-headline-lg text-4xl md:text-6xl text-surface-cream italic tracking-tighter mb-6 drop-shadow-sm leading-tight">
            Artisanal Craftsmanship
          </h1>
          <p className="font-body-md text-surface-cream/90 text-lg max-w-xl mx-auto drop-shadow-sm leading-relaxed">
            Every piece of Siphorahq tableware is a marriage of time-honored heritage, meticulous raw materials, and precision firing.
          </p>
        </div>
      </section>

      {/* ── CORE SPECIFICATIONS SECTION ── */}
      <section className="py-24 px-5 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-burnished-gold mb-4 block">The Process</span>
            <h2 className="font-serif text-3xl md:text-5xl italic mb-8 leading-tight">
              Fired at 1350°C for Lifetime Durability
            </h2>
            <div className="space-y-6 text-zinc-600 font-sans text-base leading-relaxed">
              <p>
                Siphorahq porcelain pieces undergo a double-firing process, reaching peak vitrification at <strong className="text-zinc-900 font-medium">1350 degrees Celsius</strong>. This intense heat changes the molecular structure of the clay, fusing it into a highly dense, non-porous ceramic body.
              </p>
              <p>
                The resulting tableware is exceptionally chip-resistant, scratch-resistant, and impervious to moisture absorption. It remains pristine over decades of daily use, bridging the gap between delicate beauty and absolute utility.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="border-l-2 border-burnished-gold pl-4">
                <p className="text-2xl font-serif text-ink-charcoal font-medium">1350°C</p>
                <p className="text-[11px] font-sans text-zinc-400 uppercase tracking-widest mt-1">Vitrification Temp</p>
              </div>
              <div className="border-l-2 border-burnished-gold pl-4">
                <p className="text-2xl font-serif text-ink-charcoal font-medium">100%</p>
                <p className="text-[11px] font-sans text-zinc-400 uppercase tracking-widest mt-1">Lead & Cadmium Free</p>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/5] md:aspect-square bg-zinc-100 rounded-xl overflow-hidden shadow-sm">
            <Image
              src="/images/our-story/craftsmanship-detail.webp"
              alt="Close-up of premium porcelain detailing"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── METICULOUS ARTISTRY (THE GOLD RIM) ── */}
      <section className="py-24 px-5 bg-ink-charcoal text-surface-cream">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/5] md:aspect-square lg:order-2 bg-zinc-800 rounded-xl overflow-hidden shadow-md">
            <Image
              src="/images/our-story/porcelain-table-setting.webp"
              alt="Handcrafted fine porcelain tableware dinner setting"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:order-1 max-w-lg">
            <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-burnished-gold mb-4 block">Hand-Applied Detailing</span>
            <h2 className="font-serif text-3xl md:text-5xl italic text-surface-cream mb-8 leading-tight">
              Genuine 24k Gold Accents
            </h2>
            <div className="space-y-6 text-surface-cream/80 font-sans text-base leading-relaxed">
              <p>
                Each gold rim, delicate handle, and intricate design highlight is painted by hand using liquid 24-karat gold. Our master artisans utilize specialized precision brushes to apply the gold glaze, resulting in unique nuances that distinguish handmade luxury from assembly-line imports.
              </p>
              <p>
                Following application, the pieces are fired once more in a low-temperature kiln to bond the gold element securely to the glaze layer, ensuring a durable, reflective lustre that catches the morning light beautifully.
              </p>
            </div>
            
            <ul className="space-y-4 mt-8 font-sans text-sm text-surface-cream/95">
              <li className="flex items-center gap-3">
                <Gem className="w-5 h-5 text-burnished-gold shrink-0" />
                <span>Liquid 24k Gold glaze formulated for resilience</span>
              </li>
              <li className="flex items-center gap-3">
                <Hammer className="w-5 h-5 text-burnished-gold shrink-0" />
                <span>Individually detailed by third-generation gilding artisans</span>
              </li>
              <li className="flex items-center gap-3">
                <Award className="w-5 h-5 text-burnished-gold shrink-0" />
                <span>Triple kiln firing process locks in brilliance</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── SAFETY AND STANDARDS ── */}
      <section className="py-24 px-5 max-w-container-md mx-auto text-center">
        <span className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-burnished-gold mb-4 block">Certified Standards</span>
        <h2 className="font-serif text-3xl md:text-5xl italic text-ink-charcoal mb-6">
          Food Safe, Lead Free, Cadmium Free
        </h2>
        <p className="font-body-md text-zinc-500 max-w-xl mx-auto mb-16 leading-relaxed">
          At Siphorahq, aesthetics never compromise health. All our glazes are certified lead-free and non-toxic, conforming to strict international food safety standards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-8 border border-zinc-200/60 rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-burnished-gold/10 flex items-center justify-center text-burnished-gold mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium mb-3">Bone China Finish</h3>
            <p className="text-sm text-zinc-500 font-sans leading-relaxed">
              Formulated with high-grade kaolin clay for a beautifully translucent texture, delicate handle weight, and stunning cream-white shade.
            </p>
          </div>

          <div className="bg-white p-8 border border-zinc-200/60 rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-burnished-gold/10 flex items-center justify-center text-burnished-gold mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium mb-3">High Lustre Glaze</h3>
            <p className="text-sm text-zinc-500 font-sans leading-relaxed">
              A smooth, non-porous glass glaze barrier protects the artwork against acidic foods, staining, and daily scratches.
            </p>
          </div>

          <div className="bg-white p-8 border border-zinc-200/60 rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-burnished-gold/10 flex items-center justify-center text-burnished-gold mb-6">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium mb-3">Safe Transit Guarantee</h3>
            <p className="text-sm text-zinc-500 font-sans leading-relaxed">
              Protected by multi-layered foam frames and heavy corrugated drop-tested gift boxes, guaranteeing 100% damage-free delivery.
            </p>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="py-24 px-5 text-center bg-[#F8F5F1] border-t border-zinc-200/50">
        <h2 className="font-serif text-3xl md:text-5xl italic text-ink-charcoal mb-4">
          Experience Fine Craftsmanship
        </h2>
        <p className="font-body-md text-zinc-500 mb-10 max-w-md mx-auto leading-relaxed">
          Bring the quiet luxury of handcrafted Indian porcelain to your dining room and morning rituals.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/products"
            className="bg-ink-charcoal text-surface-cream font-label-caps text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-black transition-colors duration-300"
          >
            Shop Fine Porcelain
          </Link>
          <Link
            href="/collections"
            className="bg-transparent text-ink-charcoal border border-ink-charcoal font-label-caps text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-ink-charcoal hover:text-surface-cream transition-colors duration-300"
          >
            Explore Collections
          </Link>
        </div>
      </section>
    </div>
  );
}
