'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const WHATSAPP_NUMBER = "919540027978";

const collections = [
  ["Dinnerware", "/images/homepage/dinnerware-collection.webp", "/collections/dinnerware"],
  ["Cups & Mugs", "/images/homepage/cups-mugs-collection.webp", "/collections/cups-mugs"],
  ["Tea Sets", "/images/homepage/tea-set-collection.webp", "/collections/tea-sets"],
  ["Luxury Gifting", "/images/homepage/luxury-gifting.webp", "/collections/gifting"],
];

const trust = [
  "Premium Porcelain",
  "Lead-free & Food Safe",
  "Gift-ready Packaging",
  "Damage Replacement",
  "Secure Razorpay Checkout",
  "WhatsApp Concierge",
];

export default function HomeClient({ products }: { products: any[] }) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  function submitNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setJoined(true);
    setEmail("");
  }

  // Fallback to static products if DB products are empty or not provided
  const displayProducts = products && products.length > 0 ? products : [
    {
      name: "Emerald Regent Mug",
      price: "₹999",
      image: "/images/homepage/emerald-mug.webp",
      badge: "Best Seller",
      slug: "emerald-regent-mug",
    },
    {
      name: "Imperial White Porcelain Mug",
      price: "₹799",
      image: "/images/homepage/white-porcelain-mug.webp",
      badge: "New Arrival",
      slug: "imperial-white-porcelain-mug",
    },
    {
      name: "Premium Gold Dinner Set",
      price: "₹25,500",
      image: "/images/homepage/dinnerware-set.webp",
      badge: "Luxury Pick",
      slug: "premium-gold-dinner-set",
    },
    {
      name: "Moroccan Azure Tea Mug",
      price: "₹599",
      image: "/images/homepage/moroccan-azure-mug.webp",
      badge: "Popular",
      slug: "moroccan-azure-tea-mug",
    },
  ];

  return (
    <div className="bg-[#FCF9F4] text-[#1A2A3A]">
      <section className="relative min-h-[82svh] overflow-hidden">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjKFOZSacyg5S9aewoF3p5oBtjy_Q6nHjK8fbYWNIEQ3LSTzg57OIL9Xx8kgOKA3TaHabGVUW5M7MxrG3Pa6wcW0jutvTnX9A2m0Dy_Mgnq0FH1H2YbQAJzDywwfuPRN7nCM2qoxAGBJnml4nkufhGUF0yRZjQqLwTotipfqv95Uu2K72OnDAR4D0pMGx4tR3hzakgB_9ZslgeKvzBCkeYXLKZd5IbwxK2x2TE9WDOYHDU_WMBW-Rvpn9CTc7WHhg6deAZq7lKEgM"
          alt="Luxury Siphorahq porcelain dining table"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1A2A3A]/65 sm:bg-gradient-to-r sm:from-[#1A2A3A]/85 sm:via-[#1A2A3A]/45 sm:to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-7xl items-center px-5 lg:px-10">
          <div className="max-w-2xl text-white">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37]">
              Poetry in Porcelain
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              Luxury Porcelain for Elegant Living
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/85">
              Premium porcelain cups, tea sets, dinnerware, and gift-ready
              tableware crafted for modern Indian homes.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link href="/collections" className="bg-white px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-[#1A2A3A] hover:bg-[#D4AF37] transition-colors">
                Shop Collection
              </Link>
              <Link href="/products" className="border border-white px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.25em] text-white hover:bg-white hover:text-[#1A2A3A] transition-colors">
                Explore Best Sellers
              </Link>
            </div>

            <p className="mt-5 text-sm text-white/75">
              Free shipping above ₹999 · Damage replacement support · Gift-ready packaging
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-10 md:grid-cols-3 lg:grid-cols-6 lg:px-10">
        {trust.map((item) => (
          <div key={item} className="border border-[#E5E4E2] bg-white p-5 text-center shadow-sm hover:border-[#C5A059] transition-colors cursor-default">
            <p className="text-[#C5A059]">✦</p>
            <h3 className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em]">{item}</h3>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">Best Sellers</p>
            <h2 className="font-serif text-4xl font-semibold">Most Loved by Modern Homes</h2>
          </div>
          <Link href="/products" className="hidden text-xs font-bold uppercase tracking-[0.25em] underline decoration-[#C5A059] underline-offset-8 md:block hover:text-[#C5A059] transition-colors">
            View All
          </Link>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {displayProducts.map((p: any) => (
            <article key={p.name} className="group flex flex-col h-full">
              <Link href={`/products/${p.id || p.slug}`} className="flex-1">
                <div className="relative aspect-[4/5] overflow-hidden border border-transparent bg-[#F0EDE9] transition group-hover:border-[#C5A059] group-hover:shadow-lg">
                  <span className="absolute left-4 top-4 z-10 bg-[#1A2A3A] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    {p.badge || 'Premium'}
                  </span>
                  <img
                    src={p.image || p.imageURL || '/images/dinnerware.webp'}
                    alt={`${p.name} by Siphorahq`}
                    className="object-cover w-full h-full transition duration-700 group-hover:scale-105 mix-blend-multiply"
                  />
                </div>

                <div className="mt-4 flex justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-xl line-clamp-1">{p.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#C5A059]">★★★★★</p>
                    <p className="mt-2 text-xs text-[#4A4A4A]">Gift-ready box · Safe delivery</p>
                  </div>
                  <p className="font-semibold whitespace-nowrap">₹{p.price?.toLocaleString('en-IN') || p.price}</p>
                </div>
              </Link>

              <Link
                href={`/products/${p.id || p.slug}`}
                className="mt-4 block w-full border border-[#1A2A3A] py-3 text-center text-xs font-bold uppercase tracking-[0.22em] hover:bg-[#1A2A3A] hover:text-white transition-colors"
              >
                View Product
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">Curated Collections</p>
            <h2 className="font-serif text-4xl font-semibold">Shop by Collection</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map(([title, image, href]) => (
              <Link key={title} href={href} className="group relative h-[380px] overflow-hidden bg-[#F0EDE9]">
                <img
                  src={image}
                  alt={`${title} collection by Siphorahq`}
                  className="object-cover w-full h-full transition duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida/AP1WRLvJilvd4DAGPQIJUmgJCutZJW1wikX5GXdRfA-_nIQ2ZuoAvoR0C6VoIE1fYbODZBS4WetiZQEwzT3xdq6e7Vkr2WJbAqzX6S4dApdJWKn4RM_4BO65E8RKSaYBge501116uNlwxKffJRg1GN67d9tfePiJWwXmStFU1awCmbx9OExGE7BhtCzqtA5UP2plmqHLQv6hnRG8h2kYMZS6jkK8IK4H51ogxM8u7d1P5tUYV1ZrRgZ5D43sD4k";
                  }}
                />
                <div className="absolute inset-0 bg-[#1A2A3A]/40 transition-opacity group-hover:bg-[#1A2A3A]/50" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-serif text-3xl">{title}</h3>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] group-hover:translate-x-2 transition-transform">
                    Shop Now →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F0EDE9] py-20">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">Shop by Occasion</p>
          <h2 className="font-serif text-4xl font-semibold">Gifts That Feel Truly Premium</h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {["Wedding Gifts", "Housewarming", "Corporate Gifting", "Premium Tea Moments", "Luxury Dining", "Festive Gifts"].map((item) => (
              <Link key={item} href="/products" className="bg-white p-6 text-sm font-semibold hover:shadow-md hover:border-[#C5A059] border border-transparent transition-all">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="grid items-center lg:grid-cols-2">
          <div className="relative h-[420px] lg:h-[560px] bg-bone-white">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGTKRL_5uqeS7RWQYiOnylW0z9y7YWZjRbNY5hugikp3cRrlwdcIjBcP9V6y6yy87JIlVBxutpayRPvIJjHd920zVvFiV34GwxeJIPyUuFO5zOWXdyXc2b2yWMXnyAerQquZljaOTYd9jCNuaK1R7DTPf9yfgEA_JdJGJV2E6mBPH1OAMkxH_vQi02iS82Pa50yYuU0dGe1kqhnH2ultKlTWtUqxc1IhrFEyZawWftv8zZ_iuBE9Cem3vnwTav8eS3tLKhcXfPkCg"
              alt="Elegant fine dining experience with Siphorahq porcelain"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="bg-[#1A2A3A] p-10 text-white lg:p-16 h-full flex flex-col justify-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Siphorahq Philosophy</p>
            <h2 className="font-serif text-4xl font-semibold">More Than Utensils — A Dining Experience</h2>
            <p className="mt-6 leading-8 text-white/80">
              Siphorahq brings timeless elegance to modern homes. Every piece is designed
              to make everyday meals feel special, meaningful, and beautifully presented.
            </p>
            <Link href="/our-story" className="mt-8 inline-block text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] hover:text-white transition-colors">
              Discover Our Story →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 text-center lg:px-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">Customer Love</p>
          <h2 className="font-serif text-4xl font-semibold">Real Stories from Happy Homes</h2>
          <p className="mt-3 text-[#4A4A4A]">4.8 / 5 rating · Trusted by 2,500+ homes across India</p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ["The porcelain quality feels genuinely premium. Packaging was stunning.", "Anjali M.", "Delhi"],
              ["Perfect wedding gift. The box itself looked like a luxury brand.", "Rahul S.", "Mumbai"],
              ["Fast delivery, excellent quality, and responsive support.", "Priya K.", "Bangalore"],
            ].map(([text, name, city]) => (
              <blockquote key={name} className="border border-[#E5E4E2] p-8 text-left hover:border-[#C5A059] transition-colors">
                <p className="text-[#C5A059]">★★★★★</p>
                <p className="mt-5 leading-7 text-[#4A4A4A]">“{text}”</p>
                <footer className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#1A2A3A]">
                  {name}
                  <span className="block pt-1 text-xs font-normal tracking-normal text-[#888]">{city}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20">
        <h2 className="text-center font-serif text-4xl font-semibold mb-10 text-[#1A2A3A]">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            ["Are products food safe?", "Yes, our porcelain products are food safe and designed for everyday dining."],
            ["Do you offer gift packaging?", "Yes, selected products come in premium gift-ready packaging."],
            ["What if product arrives damaged?", "Contact us within 48 hours with photos for replacement support."],
            ["How long does delivery take?", "Usually 4–7 business days depending on your location."],
          ].map(([q, a]) => (
            <details key={q} className="border border-[#E5E4E2] bg-white p-5 group cursor-pointer">
              <summary className="font-semibold text-[#1A2A3A] group-open:text-[#C5A059] transition-colors outline-none">{q}</summary>
              <p className="mt-3 text-sm leading-7 text-[#4A4A4A]">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-[#1A2A3A] py-16 text-white border-y border-[#C5A059]/20">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Join Siphorahq Circle</p>
          <h2 className="font-serif text-3xl font-semibold">Get Early Access to New Collections</h2>

          <form onSubmit={submitNewsletter} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 border border-white/20 bg-white/10 px-5 py-3 text-white placeholder-white/50 outline-none focus:border-[#D4AF37] transition-colors"
            />
            <button className="bg-[#D4AF37] px-8 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[#1A2A3A] hover:bg-white transition-colors">
              Subscribe
            </button>
          </form>

          {joined && (
            <p className="mt-4 text-sm text-[#D4AF37] animate-pulse">
              Thank you for joining Siphorahq Circle.
            </p>
          )}
        </div>
      </section>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Siphorahq%2C%20I%20need%20help%20choosing%20a%20premium%20gift.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg hover:scale-105 transition-transform"
      >
        WhatsApp Concierge
      </a>
    </div>
  );
}
