import { Metadata } from 'next';
import React from 'react';

export const rootMetadata: Metadata = {
  metadataBase: new URL('https://www.siphorahq.in'),
  title: {
    default: 'SiphoraHQ — Premium Porcelain & Ceramic Tableware India',
    template: '%s | SiphoraHQ',
  },
  description:
    'Shop premium handcrafted porcelain and ceramic tableware at SiphoraHQ. Tea cups, dinner sets, mug gift sets & more. Free shipping above ₹999. Pan-India delivery.',
  keywords: [
    'porcelain tableware India',
    'ceramic tea cups',
    'dinner set online',
    'handcrafted ceramic India',
    'mug gift set',
    'premium tableware',
    'SiphoraHQ',
    'porcelain cups India',
    'ceramic dinnerware',
    'corporate gifting tableware',
  ],
  authors: [{ name: 'SiphoraHQ', url: 'https://www.siphorahq.in' }],
  creator: 'SiphoraHQ',
  publisher: 'SiphoraHQ',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.siphorahq.in',
    siteName: 'SiphoraHQ',
    title: 'SiphoraHQ — Premium Porcelain & Ceramic Tableware India',
    description:
      'Shop premium handcrafted porcelain and ceramic tableware. Tea cups, dinner sets, mug gift sets & more. Free shipping above ₹999.',
    images: [
      {
        url: '/images/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'SiphoraHQ — Poetry in Porcelain',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiphoraHQ — Premium Porcelain & Ceramic Tableware India',
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

  },
};

export const homeMetadata: Metadata = {
  title: 'SiphoraHQ — Premium Porcelain & Ceramic Tableware India',
  description:
    'Discover SiphoraHQ\'s collection of premium handcrafted porcelain and ceramic tableware. Tea cups, dinner sets, mug gift sets — crafted for modern Indian homes. Free shipping above ₹999.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SiphoraHQ — Premium Porcelain & Ceramic Tableware India',
    description:
      'Handcrafted porcelain and ceramic tableware for modern Indian homes. Free shipping above ₹999.',
    url: 'https://www.siphorahq.in',
    images: [{ url: '/images/og-banner.jpg', width: 1200, height: 630, alt: 'SiphoraHQ Homepage' }],
  },
};

export const productsMetadata: Metadata = {
  title: 'Shop All Products — Porcelain & Ceramic Tableware',
  description:
    'Browse SiphoraHQ\'s full collection of premium porcelain and ceramic tableware. Ceramic tea cups (₹549), Porcelain dinner sets (₹899), Mug gift sets & more. Free shipping above ₹999.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Shop Porcelain & Ceramic Tableware — SiphoraHQ',
    description: 'Premium handcrafted tableware starting at ₹399. Free shipping above ₹999.',
    url: 'https://www.siphorahq.in/products',
  },
};

export const collectionsMetadata: Metadata = {
  title: 'Collections — Curated Tableware Sets',
  description:
    'Explore SiphoraHQ\'s curated tableware collections. From everyday ceramic tea cups to complete porcelain dinner sets — find the perfect set for your home or as a gift.',
  alternates: { canonical: '/collections' },
  openGraph: {
    title: 'Curated Tableware Collections — SiphoraHQ',
    description: 'Curated porcelain and ceramic tableware collections for every occasion.',
    url: 'https://www.siphorahq.in/collections',
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
    title: 'Corporate Gifting — Premium Tableware | SiphoraHQ',
    description:
      'Curated ceramic and porcelain gift sets for corporate events, Diwali, and client appreciation. Bulk pricing available.',
    url: 'https://www.siphorahq.in/corporate-gifting',
  },
};

export const ourStoryMetadata: Metadata = {
  title: 'Our Story — The SiphoraHQ Journey',
  description:
    'Learn about SiphoraHQ — a premium porcelain and ceramic tableware brand born in Faridabad, India. Our story of craftsmanship, quality, and bringing artisan tableware to modern Indian homes.',
  alternates: { canonical: '/our-story' },
  openGraph: {
    title: 'Our Story — SiphoraHQ',
    description:
      'The story behind SiphoraHQ — crafting premium porcelain tableware for modern Indian homes.',
    url: 'https://www.siphorahq.in/our-story',
  },
};

export const journalMetadata: Metadata = {
  title: 'Journal — Tableware Stories & Styling Tips',
  description:
    'The SiphoraHQ Journal — stories on ceramic care, tableware styling, gifting ideas, and the art of the Indian table. Explore tips for using and maintaining your porcelain pieces.',
  alternates: { canonical: '/journal' },
  openGraph: {
    title: 'Journal — SiphoraHQ',
    description: 'Tableware stories, styling tips, and ceramic care guides from SiphoraHQ.',
    url: 'https://www.siphorahq.in/journal',
  },
};

export const contactMetadata: Metadata = {
  title: 'Contact Us — SiphoraHQ Customer Care',
  description:
    'Get in touch with SiphoraHQ for order queries, returns, corporate gifting enquiries, or any support. Email: concierge [at] siphorahq.in. Response within 24–48 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact SiphoraHQ',
    description: 'Reach us for order support, returns, or corporate gifting enquiries.',
    url: 'https://www.siphorahq.in/contact',
  },
};

export const privacyMetadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read SiphoraHQ\'s Privacy Policy — how we collect, use, and protect your personal data when you shop with us.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: false },
};

export const refundMetadata: Metadata = {
  title: 'Refund & Return Policy',
  description:
    'SiphoraHQ\'s 7-day return policy — how to return products, get refunds, and resolve order issues.',
  alternates: { canonical: '/refund-policy' },
  robots: { index: true, follow: false },
};

export const shippingMetadata: Metadata = {
  title: 'Shipping Policy',
  description:
    'SiphoraHQ shipping information — free shipping above ₹999, delivery timelines, courier partners, and order tracking.',
  alternates: { canonical: '/shipping-returns' },
  robots: { index: true, follow: false },
};

export function ProductSchema({
  name,
  description,
  price,
  sku,
  image,
  inStock = true,
}: {
  name: string;
  description: string;
  price: number;
  sku: string;
  image: string;
  inStock?: boolean;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku,
    image,
    brand: { '@type': 'Brand', name: 'SiphoraHQ' },
    offers: {
      '@type': 'Offer',
      url: `https://www.siphorahq.in/products/${sku.toLowerCase()}`,
      priceCurrency: 'INR',
      price,
      priceValidUntil: '2026-12-31',
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'SiphoraHQ' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      reviewCount: '24',
    },
  };

  return React.createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) }
  });
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SiphoraHQ',
  url: 'https://www.siphorahq.in',
  logo: 'https://www.siphorahq.in/images/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'concierge [at] siphorahq.in',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Faridabad',
    addressRegion: 'Haryana',
    postalCode: '121001',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.instagram.com/siphorahq',
    'https://www.amazon.in/s?k=siphorahq',
  ],
};
