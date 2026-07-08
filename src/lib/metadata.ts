import { Metadata } from 'next';
import React from 'react';

export const rootMetadata: Metadata = {
  metadataBase: new URL('https://siphorahq.in'),
  title: {
    default: 'Siphorahq — Premium Porcelain & Ceramic Tableware India',
    template: '%s | Siphorahq',
  },
  description:
    'Shop premium handcrafted porcelain and ceramic tableware at Siphorahq. Tea cups, dinner sets, mug gift sets & more. Free shipping above ₹999. Pan-India delivery.',
  keywords: [
    'porcelain tableware India',
    'ceramic tea cups',
    'dinner set online',
    'handcrafted ceramic India',
    'mug gift set',
    'premium tableware',
    'Siphorahq',
    'porcelain cups India',
    'ceramic dinnerware',
    'corporate gifting tableware',
  ],
  authors: [{ name: 'Siphorahq', url: 'https://siphorahq.in' }],
  creator: 'Siphorahq',
  publisher: 'Siphorahq',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://siphorahq.in',
    siteName: 'Siphorahq',
    title: 'Siphorahq — Premium Porcelain & Ceramic Tableware India',
    description:
      'Shop premium handcrafted porcelain and ceramic tableware. Tea cups, dinner sets, mug gift sets & more. Free shipping above ₹999.',
    images: [
      {
        url: '/images/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Siphorahq — Poetry in Porcelain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siphorahq — Premium Porcelain & Ceramic Tableware India',
    description:
      'Handcrafted porcelain and ceramic tableware. Free shipping above ₹999. Pan-India delivery.',
    images: ['/images/og-banner.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://siphorahq.in',
  },
};

export const homeMetadata: Metadata = {
  title: 'Siphorahq — Premium Porcelain & Ceramic Tableware India',
  description:
    'Discover Siphorahq\'s collection of premium handcrafted porcelain and ceramic tableware. Tea cups, dinner sets, mug gift sets — crafted for modern Indian homes. Free shipping above ₹999.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Siphorahq — Premium Porcelain & Ceramic Tableware India',
    description:
      'Handcrafted porcelain and ceramic tableware for modern Indian homes. Free shipping above ₹999.',
    url: 'https://siphorahq.in',
    images: [{ url: '/images/og-banner.jpg', width: 1200, height: 630, alt: 'Siphorahq Homepage' }],
  },
};

export const productsMetadata: Metadata = {
  title: 'Shop All Products — Porcelain & Ceramic Tableware',
  description:
    'Browse Siphorahq\'s full collection of premium porcelain and ceramic tableware. Ceramic tea cups (₹549), Porcelain dinner sets (₹899), Mug gift sets & more. Free shipping above ₹999.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Shop Porcelain & Ceramic Tableware — Siphorahq',
    description: 'Premium handcrafted tableware starting at ₹399. Free shipping above ₹999.',
    url: 'https://siphorahq.in/products',
  },
};

export const collectionsMetadata: Metadata = {
  title: 'Collections — Curated Tableware Sets',
  description:
    'Explore Siphorahq\'s curated tableware collections. From everyday ceramic tea cups to complete porcelain dinner sets — find the perfect set for your home or as a gift.',
  alternates: { canonical: '/collections' },
  openGraph: {
    title: 'Curated Tableware Collections — Siphorahq',
    description: 'Curated porcelain and ceramic tableware collections for every occasion.',
    url: 'https://siphorahq.in/collections',
  },
};

export const corporateGiftingMetadata: Metadata = {
  title: 'Corporate Gifting — Bulk Porcelain Tableware Gifts',
  description:
    'Premium ceramic and porcelain tableware for corporate gifting. Custom branding, bulk orders, and curated gift sets for Diwali, events, and client appreciation. Enquire for bulk pricing.',
  keywords: [
    'corporate gifting tableware India',
    'bulk ceramic gifts',
    'custom porcelain gifts',
    'Diwali corporate gifts',
    'branded tableware gifts',
    'premium gift sets India',
  ],
  alternates: { canonical: '/corporate-gifting' },
  openGraph: {
    title: 'Corporate Gifting — Premium Tableware | Siphorahq',
    description:
      'Curated ceramic and porcelain gift sets for corporate events, Diwali, and client appreciation. Bulk pricing available.',
    url: 'https://siphorahq.in/corporate-gifting',
  },
};

export const ourStoryMetadata: Metadata = {
  title: 'Our Story — The Siphorahq Journey',
  description:
    'Learn about Siphorahq — a premium porcelain and ceramic tableware brand born in Faridabad, India. Our story of craftsmanship, quality, and bringing artisan tableware to modern Indian homes.',
  alternates: { canonical: '/our-story' },
  openGraph: {
    title: 'Our Story — Siphorahq',
    description:
      'The story behind Siphorahq — crafting premium porcelain tableware for modern Indian homes.',
    url: 'https://siphorahq.in/our-story',
  },
};

export const journalMetadata: Metadata = {
  title: 'Journal — Tableware Stories & Styling Tips',
  description:
    'The Siphorahq Journal — stories on ceramic care, tableware styling, gifting ideas, and the art of the Indian table. Explore tips for using and maintaining your porcelain pieces.',
  alternates: { canonical: '/journal' },
  openGraph: {
    title: 'Journal — Siphorahq',
    description: 'Tableware stories, styling tips, and ceramic care guides from Siphorahq.',
    url: 'https://siphorahq.in/journal',
  },
};

export const contactMetadata: Metadata = {
  title: 'Contact Us — Siphorahq Customer Care',
  description:
    'Get in touch with Siphorahq for order queries, returns, corporate gifting enquiries, or any support. Email: concierge@siphorahq.in. Response within 24–48 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Siphorahq',
    description: 'Reach us for order support, returns, or corporate gifting enquiries.',
    url: 'https://siphorahq.in/contact',
  },
};

export const privacyMetadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read Siphorahq\'s Privacy Policy — how we collect, use, and protect your personal data when you shop with us.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: true },
};

export const refundMetadata: Metadata = {
  title: 'Refund & Return Policy',
  description:
    'Siphorahq\'s 7-day return policy — how to return products, get refunds, and resolve order issues.',
  alternates: { canonical: '/refund-policy' },
  robots: { index: true, follow: true },
};

export const shippingMetadata: Metadata = {
  title: 'Shipping Policy',
  description:
    'Siphorahq shipping information — free shipping above ₹999, delivery timelines, courier partners, and order tracking.',
  alternates: { canonical: '/shipping-policy' },
  robots: { index: true, follow: true },
};

export const faqMetadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Siphorahq',
  description:
    'Find answers to common questions about Siphorahq luxury porcelain dinnerware, tea sets, shipping, cash on delivery (COD), return policies, and transit damage guarantees.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) | Siphorahq',
    description: 'Find answers to common questions about Siphorahq luxury porcelain dinnerware, tea sets, shipping, returns, and damage guarantees.',
    url: 'https://siphorahq.in/faq',
  },
};

export const whyChooseUsMetadata: Metadata = {
  title: 'Why Choose Siphorahq | Luxury Tableware & Porcelain',
  description:
    'Discover what makes Siphorahq India\'s leading brand for luxury handcrafted porcelain dinnerware, premium tea sets, gold-finish mugs, and ready-to-gift collections.',
  alternates: { canonical: '/why-choose-us' },
  openGraph: {
    title: 'Why Choose Siphorahq | Premium Porcelain Tableware',
    description: 'Discover the craftsmanship, packaging, and service quality that sets Siphorahq apart.',
    url: 'https://siphorahq.in/why-choose-us',
  },
};

export const sustainabilityMetadata: Metadata = {
  title: 'Sustainability Commitment | Eco-Friendly Tableware | Siphorahq',
  description:
    'Learn about Siphorahq\'s commitment to eco-friendly practices, plastic-free 100% recyclable luxury packaging, and sustainable craftsmanship in India.',
  alternates: { canonical: '/sustainability' },
  openGraph: {
    title: 'Sustainability Commitment | Siphorahq',
    description: 'Our journey towards eco-friendly practices, plastic-free packaging, and sustainable craftsmanship.',
    url: 'https://siphorahq.in/sustainability',
  },
};

export const craftsmanshipMetadata: Metadata = {
  title: 'Artisanal Craftsmanship & Quality Standards | Siphorahq',
  description:
    'Discover the meticulous craftsmanship behind Siphorahq porcelain. Fired at 1350°C for maximum durability, detailed with hand-applied 24k gold, and certified lead-free.',
  alternates: { canonical: '/craftsmanship' },
  openGraph: {
    title: 'Artisanal Craftsmanship & Quality Standards | Siphorahq',
    description: 'Inside the creation of Siphorahq porcelain: fired at 1350°C, 24k gold accents, and lead-free safety.',
    url: 'https://siphorahq.in/craftsmanship',
  },
};

export const termsMetadata: Metadata = {
  title: 'Terms & Conditions | Siphorahq',
  description: 'Terms and conditions for purchasing from Siphorahq.',
  alternates: { canonical: '/terms-of-service' },
  openGraph: {
    title: 'Terms & Conditions | Siphorahq',
    description: 'Read the terms and conditions for purchasing from Siphorahq.',
    url: 'https://siphorahq.in/terms-of-service',
  },
};

export function ProductSchema({
  name,
  description,
  price,
  sku,
  image,
  inStock = true,
  nonce,
}: {
  name: string;
  description: string;
  price: number;
  sku: string;
  image: string;
  inStock?: boolean;
  nonce?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku,
    image,
    brand: { '@type': 'Brand', name: 'Siphorahq' },
    offers: {
      '@type': 'Offer',
      url: `https://siphorahq.in/products/${sku.toLowerCase()}`,
      priceCurrency: 'INR',
      price,
      priceValidUntil: '2026-12-31',
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Siphorahq' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '24',
    },
  };

  return React.createElement('script', {
    type: 'application/ld+json',
    nonce,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) }
  });
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Siphorahq',
  url: 'https://siphorahq.in',
  logo: 'https://siphorahq.in/images/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'concierge@siphorahq.in',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Faridabad',
    addressRegion: 'Haryana',
    postalCode: '121004',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/siporahq',
    'https://pinterest.com/siphorahq',
  ],
};
