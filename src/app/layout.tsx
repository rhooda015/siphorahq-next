import React from 'react';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { BRAND, getWhatsAppLink } from '@/config/brand';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: `${BRAND.name} — Handcrafted Porcelain Dinnerware & Tea Sets | India`,
  description:
    'Shop artisan-made porcelain tea cup sets, luxury dinnerware, and handcrafted gifting collections — designed in India, delivered nationwide.',
  openGraph: {
    title: `${BRAND.name} — Handcrafted Porcelain Dinnerware & Tea Sets | India`,
    description:
      'Shop artisan-made porcelain tea cup sets, luxury dinnerware, and handcrafted gifting collections — designed in India, delivered nationwide.',
    url: BRAND.domain,
    siteName: BRAND.name,
    images: [{ url: `${BRAND.domain}/og-banner.png` }],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} — Handcrafted Porcelain Dinnerware & Tea Sets | India`,
    description:
      'Shop artisan-made porcelain tea cup sets, luxury dinnerware, and handcrafted gifting collections — designed in India, delivered nationwide.',
    images: [`${BRAND.domain}/og-banner.png`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${BRAND.domain}/#organization`,
        name: BRAND.name,
        url: BRAND.domain,
        logo: `${BRAND.domain}/assets/siphorahq/logo.png`,
        description:
          'Siphorahq crafts premium handcrafted porcelain dinnerware and tea sets, made by skilled artisans across India.',
        knowsAbout: [
          'Handcrafted Porcelain',
          'Luxury Dinnerware',
          'Artisan Tea Sets',
          'Indian Kitchenware',
          'Bone China',
          'Gifting Collections',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['English', 'Hindi'],
          url: getWhatsAppLink('Hi, I am interested in Siphorahq products'),
        },
        sameAs: [BRAND.social.instagram, BRAND.social.pinterest],
      },
      {
        '@type': 'WebSite',
        '@id': `${BRAND.domain}/#website`,
        url: BRAND.domain,
        name: `${BRAND.name} — Luxury Porcelain Dinnerware India`,
        publisher: { '@id': `${BRAND.domain}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BRAND.domain}/products?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <meta name="theme-color" content="#1A1A1A" />
        <link rel="canonical" href={BRAND.domain} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="pb-[64px] md:pb-0">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileBottomNav />
      </body>
    </html>
  );
}
