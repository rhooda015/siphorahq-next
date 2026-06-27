import { Plus } from 'lucide-react';
import React from 'react';
import { Gem, ShieldCheck, Gift, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import ProductListing from '@/components/ProductListing';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import NewsletterForm from '@/components/NewsletterForm';
import { headers } from 'next/headers';

export const metadata = {
  title: 'Best Sellers | Premium Indian Porcelain | Siphorahq',
  description: 'Shop Siphorahq’s best-selling luxury porcelain. Discover the most loved dinnerware, tea sets, and premium gifting collections crafted for modern Indian homes.',
  openGraph: {
    title: 'Best Sellers | Premium Indian Porcelain | Siphorahq',
    description: 'Shop Siphorahq’s best-selling luxury porcelain. Discover the most loved dinnerware, tea sets, and premium gifting collections crafted for modern Indian homes.',
  }
};

async function getBestSellers() {
  await dbConnect();
  // Fetch active products, limit to 12 as top picks.
  const products = await Product.find({ status: 'active' }).limit(12).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function BestSellersPage() {
  const products = await getBestSellers();
  const nonce = (await headers()).get('x-nonce') || '';

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Best Sellers',
    description: metadata.description,
    url: `${BRAND.domain}/best-sellers`
  };

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BRAND.domain },
      { '@type': 'ListItem', position: 2, name: 'Best Sellers', item: `${BRAND.domain}/best-sellers` }
    ]
  };

  return (
    <div className="bg-surface-cream text-ink-charcoal font-body-md overflow-x-hidden min-h-screen">
      <script nonce={nonce} suppressHydrationWarning={true} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script nonce={nonce} suppressHydrationWarning={true} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }} />

      {/* ── 1. HERO SECTION (ENHANCED) ── */}
      <section className="bg-muted-sand/30 py-24 md:py-36 px-5 text-center relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-gradient-to-l from-burnished-gold to-transparent transform rotate-12 blur-3xl rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <p className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-burnished-gold mb-6">
            The Iconic Collection
          </p>
          <h1 className="font-headline-lg text-4xl md:text-6xl text-ink-charcoal italic tracking-tighter mb-8 leading-tight">
            Most Loved by Modern Indian Homes
          </h1>
          <p className="font-body-md text-on-surface-variant text-lg max-w-xl mx-auto leading-relaxed">
            Discover the aspirational pieces that our discerning community adores. From morning rituals to exquisite festive dinners, these are our most celebrated creations.
          </p>
        </div>
      </section>

      {/* ── 2. TRUST BAR ── */}
      <section className="border-y border-muted-sand py-8 px-5 bg-surface-cream">
        <div className="max-w-container-max mx-auto flex flex-wrap justify-center gap-x-12 gap-y-6 md:justify-between items-center text-center">
          {[
            { icon: <Gem className="w-5 h-5 text-burnished-gold" />, text: 'Premium Porcelain Finish' },
            { icon: <ShieldCheck className="w-5 h-5 text-burnished-gold" />, text: 'Lead-Free & Food Safe' },
            { icon: <Gift className="w-5 h-5 text-burnished-gold" />, text: 'Elegant Gift Packaging' },
            { icon: <Truck className="w-5 h-5 text-burnished-gold" />, text: 'Damage Replacement Support' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              {item.icon}
              <span className="font-label-caps text-[10px] uppercase tracking-widest text-ink-charcoal">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. BEST SELLERS GRID ── */}
      <section className="py-20 md:py-32 px-5 max-w-container-max mx-auto">
        <ProductListing products={products} />
      </section>

      {/* ── 4. REVIEWS SECTION ── */}
      <section className="py-24 px-5 bg-muted-sand/20">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-4">Testimonials</p>
            <h2 className="font-headline-lg text-3xl md:text-4xl italic text-ink-charcoal">Words of Appreciation</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The dinner set completely transformed my dining table for our Diwali party. The porcelain feels incredibly premium and light, yet durable. A true luxury experience.",
                author: "Priya Sharma",
                location: "Delhi"
              },
              {
                text: "I gifted the gold-rimmed tea set to my sister for her housewarming. The elegant packaging and the sheer quality of the pieces left her completely mesmerized.",
                author: "Rohan Desai",
                location: "Mumbai"
              },
              {
                text: "Absolutely stunning craftsmanship. I have been collecting luxury tableware for years, and Siphorahq's finish matches the best international brands I own.",
                author: "Anjali Verma",
                location: "Gurgaon"
              }
            ].map((review, idx) => (
              <div key={idx} className="bg-surface-cream p-10 border border-muted-sand hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <div className="flex text-burnished-gold text-sm mb-6">★★★★★</div>
                <p className="font-body-md text-on-surface-variant text-base leading-relaxed mb-8 italic">
                  "{review.text}"
                </p>
                <div>
                  <p className="font-label-caps text-[11px] uppercase tracking-widest text-ink-charcoal">{review.author}</p>
                  <p className="font-body-md text-xs text-on-surface-variant mt-1">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. GIFTING SECTION ── */}
      <section className="py-24 px-5 bg-ink-charcoal text-surface-cream overflow-hidden relative">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col justify-center max-w-lg z-10">
            <p className="font-label-caps text-[11px] uppercase tracking-[0.2em] text-burnished-gold mb-6">
              The Art of Giving
            </p>
            <h2 className="font-headline-lg text-4xl md:text-5xl italic tracking-tighter mb-8 leading-tight">
              Gifts That Become Heirlooms
            </h2>
            <p className="font-body-md text-surface-cream/80 text-lg leading-relaxed mb-10">
              Whether it is a grand wedding, a cherished anniversary, or a warm housewarming, our exquisitely crafted porcelain sets make the perfect emotional statement. Presented in our signature luxury packaging.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link 
                href="/gift-sets"
                className="inline-block bg-surface-cream text-ink-charcoal font-label-caps text-[11px] uppercase tracking-widest px-8 py-4 hover:bg-white transition-colors duration-300"
              >
                Explore Gift Sets
              </Link>
            </div>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[4/5] z-10 group">
            <Image
              src="/images/gifting_siporahq_8k_1780322633512.webp"
              alt="Luxury Gifting by Siphorahq"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink-charcoal/20 transition-opacity duration-500 group-hover:opacity-0" />
          </div>
        </div>
      </section>

      {/* ── 6. FAQ SECTION (Native HTML Accordion) ── */}
      <section className="py-24 px-5 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-label-caps text-[11px] uppercase tracking-widest text-burnished-gold mb-4">Have Questions?</p>
          <h2 className="font-headline-md text-3xl md:text-4xl italic text-ink-charcoal">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {[
            {
              q: "Are the porcelain sets microwave and dishwasher safe?",
              a: "Yes, unless specified otherwise (such as pieces with 24k gold rims), our porcelain collections are designed to be entirely microwave and dishwasher safe for everyday modern luxury."
            },
            {
              q: "Do you offer damage replacement during shipping?",
              a: "Absolutely. We use highly secure, premium packaging. However, if any piece arrives damaged, our concierge team will immediately process a free replacement for you."
            },
            {
              q: "Can I include a personalized note with my gift order?",
              a: "Yes. All gift orders come with the option to include a beautifully handwritten premium note to add that personal, emotional touch to your gifting experience."
            },
            {
              q: "How long does shipping take within India?",
              a: "We offer express shipping pan-India. Most metropolitan orders are delivered within 3-5 business days."
            }
          ].map((faq, idx) => (
            <details key={idx} className="group border-b border-muted-sand bg-surface-cream">
              <summary className="font-headline-md text-lg md:text-xl text-ink-charcoal cursor-pointer py-6 pr-8 relative list-none outline-none">
                {faq.q}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-burnished-gold transition-transform duration-300 group-open:rotate-45">
                  <Plus className=" w-5 h-5 inline-block" />
                </span>
              </summary>
              <div className="pb-6 pr-8 text-on-surface-variant font-body-md text-base leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <NewsletterForm />
    </div>
  );
}
