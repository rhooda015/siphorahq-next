import React from 'react';
import Image from "next/image";
import Link from "next/link";
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { STATIC_PRODUCTS } from '@/data/products';
import dynamic from 'next/dynamic';
const NewsletterForm = dynamic(() => import('@/components/NewsletterForm'), { ssr: false });
import AutoCarousel from '@/components/AutoCarousel';

export const revalidate = 60; // Use ISR

const WHATSAPP_NUMBER = "919540027978";

export default async function HomePage() {
  await dbConnect();
  
  // Fetch live products from DB
  const dbProducts = await Product.find({ status: 'Live' }).sort({ createdAt: -1 }).lean();
  
  const mappedProducts = dbProducts.map((p: any) => ({
    id: p.handle || p._id.toString(),
    slug: p.handle || p._id.toString(),
    name: p.title,
    price: p.price,
    salePrice: p.price, 
    category: p.category,
    image: p.images?.[0]?.url || '/images/dinnerware.webp',
  }));

  // Filter out duplicates (if static products are already in the DB)
  const filteredStatic = STATIC_PRODUCTS.filter(
    (sp: any) => !mappedProducts.find((mp: any) => mp.id === sp.id || mp.name === sp.name)
  );

  const displayProducts = [...mappedProducts, ...filteredStatic].slice(0, 4);

  return (
    <>
      <AutoCarousel />

      {/* 4. Trust Grid */}
      <section className="border-b border-muted-sand">
        <div className="max-w-container-max mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-muted-sand">
          <div className="p-8 md:p-12 text-center group hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-4xl text-burnished-gold mb-4 group-hover:scale-110 transition-transform">workspace_premium</span>
            <h3 className="font-label-caps text-[11px] uppercase tracking-widest text-ink-charcoal mb-2">Artisan Crafted</h3>
            <p className="font-body-md text-on-surface-variant text-sm">Fine porcelain, fired at 1350°C</p>
          </div>
          <div className="p-8 md:p-12 text-center group hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-4xl text-burnished-gold mb-4 group-hover:scale-110 transition-transform">local_shipping</span>
            <h3 className="font-label-caps text-[11px] uppercase tracking-widest text-ink-charcoal mb-2">Secure Delivery</h3>
            <p className="font-body-md text-on-surface-variant text-sm">Damage-free guarantee across India</p>
          </div>
          <div className="p-8 md:p-12 text-center group hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-4xl text-burnished-gold mb-4 group-hover:scale-110 transition-transform">redeem</span>
            <h3 className="font-label-caps text-[11px] uppercase tracking-widest text-ink-charcoal mb-2">Luxury Packaging</h3>
            <p className="font-body-md text-on-surface-variant text-sm">Signature gifting boxes included</p>
          </div>
          <div className="p-8 md:p-12 text-center group hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-4xl text-burnished-gold mb-4 group-hover:scale-110 transition-transform">headset_mic</span>
            <h3 className="font-label-caps text-[11px] uppercase tracking-widest text-ink-charcoal mb-2">Private Concierge</h3>
            <p className="font-body-md text-on-surface-variant text-sm">Dedicated WhatsApp support</p>
          </div>
        </div>
      </section>

      {/* 5. Shop by Category (Editorial Grid) */}
      <section className="py-section-gap px-5 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-4xl md:text-5xl italic text-ink-charcoal mb-4">Curated Essentials</h2>
            <p className="font-body-md text-on-surface-variant">The foundation of a beautiful dining experience</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            <Link href="/collections/dinnerware" className="group relative aspect-[4/5] md:h-[600px] overflow-hidden">
              <Image src="/images/homepage/curated_dinnerware.png" alt="Dinnerware Collections" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-8 left-3 sm:left-6 text-surface-cream">
                <h3 className="font-headline-md text-lg sm:text-2xl mb-1 leading-snug">Dinnerware Sets</h3>
                <span className="font-label-caps text-[9px] sm:text-[10px] uppercase tracking-widest border-b border-burnished-gold pb-0.5 sm:pb-1 group-hover:text-burnished-gold transition-colors">Shop Now</span>
              </div>
            </Link>
            
            <Link href="/products" className="group relative aspect-[4/5] md:h-[600px] overflow-hidden">
              <Image src="/images/homepage/curated_mugs.png" alt="Cups & Mugs" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-8 left-3 sm:left-6 text-surface-cream">
                <h3 className="font-headline-md text-lg sm:text-2xl mb-1 leading-snug">Cups &amp; Mugs</h3>
                <span className="font-label-caps text-[9px] sm:text-[10px] uppercase tracking-widest border-b border-burnished-gold pb-0.5 sm:pb-1 group-hover:text-burnished-gold transition-colors">Shop Now</span>
              </div>
            </Link>

            <Link href="/collections/tea-sets" className="group relative aspect-[4/5] md:h-[600px] overflow-hidden">
              <Image src="/images/homepage/curated_teasets.png" alt="Tea Sets" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-8 left-3 sm:left-6 text-surface-cream">
                <h3 className="font-headline-md text-lg sm:text-2xl mb-1 leading-snug">Tea Sets</h3>
                <span className="font-label-caps text-[9px] sm:text-[10px] uppercase tracking-widest border-b border-burnished-gold pb-0.5 sm:pb-1 group-hover:text-burnished-gold transition-colors">Shop Now</span>
              </div>
            </Link>

            <Link href="/collections/gifting" className="group relative aspect-[4/5] md:h-[600px] overflow-hidden">
              <Image src="/images/homepage/curated_luxury_gifting.png" alt="Luxury Gifting" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-8 left-3 sm:left-6 text-surface-cream">
                <h3 className="font-headline-md text-lg sm:text-2xl mb-1 leading-snug">Luxury Gifting</h3>
                <span className="font-label-caps text-[9px] sm:text-[10px] uppercase tracking-widest border-b border-burnished-gold pb-0.5 sm:pb-1 group-hover:text-burnished-gold transition-colors">Shop Now</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Best Sellers */}
      <section className="bg-white py-10 md:py-section-gap px-4 md:px-margin-desktop border-y border-muted-sand">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-burnished-gold mb-4 block">Iconic Pieces</span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-5xl italic text-ink-charcoal">Most Loved by Modern Homes</h2>
            </div>
            <Link href="/best-sellers" className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-ink-charcoal border-b border-ink-charcoal pb-1 hover:text-burnished-gold hover:border-burnished-gold transition-colors">
              View All Best Sellers
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 gap-y-12">
            {displayProducts.map((p: any) => (
              <div key={p.id} className="group cursor-pointer flex flex-col h-full">
                <Link href={`/products/${p.id || p.slug}`} className="flex-1 flex flex-col">
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[#faf7f2] border border-[#f0ebe1] rounded-sm">
                    <span className="absolute top-3 left-3 z-10 bg-surface-cream px-3 py-1.5 font-label-caps text-[9px] uppercase tracking-widest text-ink-charcoal shadow-sm">Best Seller</span>
                    <Image src={p.image || p.imageURL || '/images/dinnerware.webp'} alt={p.name} fill className="w-full h-full object-contain p-4 bg-[#faf7f2] transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw" />
                    <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-burnished-gold hover:text-white">
                      <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                    </button>
                  </div>
                  <div className="text-center flex-1 flex flex-col justify-between pt-2">
                    <div>
                      <h3 className="font-headline-md text-base sm:text-lg text-ink-charcoal mb-2 group-hover:text-burnished-gold transition-colors line-clamp-2 leading-snug">{p.name}</h3>
                      <div className="flex justify-center gap-1 mb-3">
                        {[1,2,3,4,5].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[12px] text-burnished-gold" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        ))}
                      </div>
                    </div>
                    <p className="font-price-lg text-sm sm:text-base text-on-surface-variant mt-auto">₹{p.price?.toLocaleString('en-IN') || p.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Shop by Occasion */}
      <section className="py-10 md:py-section-gap px-4 md:px-margin-desktop bg-surface-cream">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-12">
            <span className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-burnished-gold mb-4 block">The Art of Gifting</span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-5xl italic text-ink-charcoal">Gifts for Every Milestone</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <Link href="/collections/gifting" className="group text-center">
              <div className="relative aspect-square overflow-hidden mb-4 bg-muted-sand rounded-sm">
                <Image src="/images/homepage/milestone_wedding.png" alt="Wedding Gifts" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <h3 className="font-headline-md text-xl text-ink-charcoal">Wedding &amp; Trousseau</h3>
            </Link>
            <Link href="/collections/gifting" className="group text-center">
              <div className="relative aspect-square overflow-hidden mb-4 bg-muted-sand rounded-sm">
                <Image src="/images/homepage/milestone_corporate.png" alt="Corporate Gifts" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <h3 className="font-headline-md text-xl text-ink-charcoal">Corporate Gifting</h3>
            </Link>
            <Link href="/collections/gifting" className="group text-center">
              <div className="relative aspect-square overflow-hidden mb-4 bg-muted-sand rounded-sm">
                <Image src="/images/homepage/milestone_festive.png" alt="Festive Gifts" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <h3 className="font-headline-md text-xl text-ink-charcoal">Festive Gifts</h3>
            </Link>
            <Link href="/collections/gifting" className="group text-center">
              <div className="relative aspect-square overflow-hidden mb-4 bg-muted-sand rounded-sm">
                <Image src="/images/homepage/milestone_everyday.png" alt="Everyday Dining" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <h3 className="font-headline-md text-xl text-ink-charcoal">Everyday Dining</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Collections Grid (Masonry-style) */}
      <section className="py-10 md:py-section-gap px-4 md:px-margin-desktop bg-white border-t border-muted-sand">
        <div className="max-w-container-max mx-auto text-center">
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-5xl italic text-ink-charcoal mb-12">The Artisanal Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <Link href="/collections/dinnerware" className="group text-left flex flex-col h-full">
              <div className="relative aspect-square md:h-[800px] w-full overflow-hidden mb-6 bg-muted-sand">
                <Image src="/images/homepage/artisanal_left.png" alt="The Azure Series" fill className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <h3 className="font-headline-md text-2xl text-ink-charcoal mb-2">The Imperial White</h3>
              <p className="font-body-md text-on-surface-variant">Timeless white porcelain with subtle brush details.</p>
            </Link>
            
            <div className="flex flex-col gap-8 md:gap-12">
              <Link href="/collections/gifting" className="group text-left flex-1">
                <div className="relative aspect-square md:aspect-auto md:h-[350px] w-full overflow-hidden mb-6 bg-muted-sand">
                  <Image src="/images/homepage/artisanal_top_right.png" alt="The Handpainted Collection" fill className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <h3 className="font-headline-md text-2xl text-ink-charcoal mb-2">The Handpainted Collection</h3>
                <p className="font-body-md text-on-surface-variant">Meticulous craftsmanship by master artisans.</p>
              </Link>

              <Link href="/collections/tea-sets" className="group text-left flex-1">
                <div className="relative aspect-square md:aspect-auto md:h-[350px] w-full overflow-hidden mb-6 bg-muted-sand">
                  <Image src="/images/homepage/artisanal_bottom_right.png" alt="The Emerald Heritage" fill className="object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <h3 className="font-headline-md text-2xl text-ink-charcoal mb-2">The Emerald Heritage</h3>
                <p className="font-body-md text-on-surface-variant">Rich jewel tones paired with 24k gold motifs.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Limited Edition Collection */}
      <section className="bg-ink-charcoal text-surface-cream">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[300px] md:h-[500px] lg:h-auto">
            <Image src="/images/homepage/kintsugi_mug.png" alt="Kintsugi Collection" fill className="object-cover opacity-80" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div className="p-8 md:p-24 flex flex-col justify-center">
            <span className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-burnished-gold mb-4 block">Limited Edition</span>
            <h2 className="font-headline-lg text-3xl sm:text-4xl md:text-6xl italic mb-6">The Kintsugi Series</h2>
            <p className="font-body-md text-surface-cream/80 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Celebrating the beauty of imperfection. Only 50 exclusive pieces crafted, each uniquely adorned with pure gold powder lines highlighting natural forms.
            </p>
            <div>
              <Link href="/collections" className="inline-block border border-burnished-gold text-burnished-gold px-10 py-4 font-label-caps text-[11px] uppercase tracking-widest hover:bg-burnished-gold hover:text-white transition-colors">
                Discover the Series
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Brand Story */}
      <section className="py-10 md:py-section-gap px-4 md:px-margin-desktop bg-surface-cream text-center">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 relative h-[300px] md:h-[600px] overflow-hidden">
              <Image src="/images/homepage/brand_story.png" alt="Brand Story" fill className="object-cover transition-transform duration-1000 hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="w-full md:w-1/2 md:pl-10 text-left">
              <span className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-burnished-gold mb-4 block">Our Philosophy</span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-5xl italic text-ink-charcoal mb-6 leading-tight">Poetry in Porcelain, Crafted for the Modern Home</h2>
              <p className="font-body-md text-sm sm:text-base leading-relaxed text-on-surface-variant mb-4">
                Siphorahq was born from a simple desire: to make everyday dining feel like an occasion. We believe that the objects we interact with daily should bring us joy, pause, and a touch of luxury.
              </p>
              <p className="font-body-md text-sm sm:text-base leading-relaxed text-on-surface-variant mb-8">
                Working with master artisans, we combine timeless traditional techniques with contemporary aesthetics to create porcelain that isn't just beautiful to look at, but a pleasure to use.
              </p>
              <Link href="/our-story" className="font-label-caps text-[12px] uppercase tracking-widest text-ink-charcoal border-b border-burnished-gold pb-1 hover:text-burnished-gold transition-colors">
                Read Our Full Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Craftsmanship / Quality */}
      <section className="bg-white py-24 border-y border-muted-sand">
        <div className="max-w-container-max mx-auto px-5 md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-muted-sand">
            <div className="pt-8 md:pt-0 md:px-8">
              <div className="w-16 h-16 mx-auto bg-surface-cream rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-burnished-gold text-2xl">local_fire_department</span>
              </div>
              <h3 className="font-headline-md text-xl text-ink-charcoal mb-3">Fired at 1350°C</h3>
              <p className="font-body-md text-on-surface-variant">Ensuring maximum durability and a perfectly non-porous finish.</p>
            </div>
            <div className="pt-8 md:pt-0 md:px-8">
              <div className="w-16 h-16 mx-auto bg-surface-cream rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-burnished-gold text-2xl">diamond</span>
              </div>
              <h3 className="font-headline-md text-xl text-ink-charcoal mb-3">24k Gold Accents</h3>
              <p className="font-body-md text-on-surface-variant">Real gold detailing applied meticulously by hand on select pieces.</p>
            </div>
            <div className="pt-8 md:pt-0 md:px-8">
              <div className="w-16 h-16 mx-auto bg-surface-cream rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-burnished-gold text-2xl">eco</span>
              </div>
              <h3 className="font-headline-md text-xl text-ink-charcoal mb-3">Lead-Free &amp; Safe</h3>
              <p className="font-body-md text-on-surface-variant">Completely free from harmful toxins, prioritizing your family's health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Reviews */}
      <section className="py-section-gap px-5 md:px-margin-desktop bg-surface-cream">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-4xl md:text-5xl italic text-ink-charcoal mb-4">Words from Happy Homes</h2>
            <div className="flex justify-center gap-1">
              {[1,2,3,4,5].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[18px] text-burnished-gold" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The quality is simply unmatched. The weight, the finish, and the packaging make it feel like you're opening a piece of jewelry.",
                author: "Priya S.",
                location: "Mumbai"
              },
              {
                text: "I bought the Emerald series for my new home and it completely elevated my dining table. Every guest asks where I got them.",
                author: "Aanya R.",
                location: "Delhi"
              },
              {
                text: "Their customer service is incredible. A piece was damaged in transit and they replaced it within 48 hours, no questions asked.",
                author: "Karan M.",
                location: "Bangalore"
              }
            ].map((review, i) => (
              <div key={i} className="bg-white p-10 border border-muted-sand hover:border-burnished-gold transition-colors">
                <p className="font-body-md text-on-surface-variant text-lg italic leading-relaxed mb-8">"{review.text}"</p>
                <div>
                  <p className="font-label-caps text-[12px] uppercase tracking-widest text-ink-charcoal font-bold">{review.author}</p>
                  <p className="font-body-md text-on-surface-variant text-sm mt-1">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="py-section-gap px-5 md:px-margin-desktop bg-white border-t border-muted-sand">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-4xl md:text-5xl italic text-ink-charcoal mb-4">Service &amp; Care</h2>
          </div>
          <div className="divide-y divide-muted-sand">
            {[
              {
                q: "Are the products microwave and dishwasher safe?",
                a: "Most of our porcelain is microwave and dishwasher safe. However, pieces with 24k gold or platinum accents should be hand-washed and kept out of the microwave."
              },
              {
                q: "Do you offer international shipping?",
                a: "Currently, we ship exclusively within India to ensure the highest quality of service and safe delivery of our delicate products."
              },
              {
                q: "What happens if a piece breaks during delivery?",
                a: "We offer a 100% damage-free guarantee. If your order arrives damaged, send us a photo on WhatsApp within 48 hours, and we will send a free replacement immediately."
              },
              {
                q: "Can I customize a set for a wedding gift?",
                a: "Yes, we offer bespoke gifting concierge services. You can contact our team via WhatsApp to curate a custom box for your special occasion."
              }
            ].map((faq, i) => (
              <details key={i} className="group py-6">
                <summary className="flex justify-between items-center cursor-pointer list-none font-headline-md text-xl text-ink-charcoal group-open:text-burnished-gold transition-colors">
                  {faq.q}
                  <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-burnished-gold">expand_more</span>
                </summary>
                <p className="font-body-md text-on-surface-variant mt-4 leading-relaxed pr-12">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <NewsletterForm />

      {/* WhatsApp Floating Button */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I'm%20interested%20in%20Siphorahq%20products`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </>
  );
}
