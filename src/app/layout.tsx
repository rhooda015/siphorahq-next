import React from 'react';
import Script from 'next/script';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { BRAND, getWhatsAppLink } from '@/config/brand';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import CartDrawerDynamic from '@/components/CartDrawerDynamic';
import SessionWrapper from '@/components/SessionWrapper';
import dbConnect from '@/lib/db';
import StoreSettings from '@/models/StoreSettings';
import ThemeSettings from '@/models/ThemeSettings';
import SettingsProvider from '@/providers/SettingsProvider';
import ThemeInjector from '@/components/ThemeInjector';
import { Toaster } from 'react-hot-toast';

export const revalidate = 60;

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});



export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A1A1A',
};

export async function generateMetadata() {
  await dbConnect();
  const settings = await StoreSettings.findOne().lean() || {
    seoTitle: `Siphorahq | Best Luxury Porcelain Gift Sets, Tea Sets & Fine Dinnerware | Shop Now`,
    seoDescription: 'Shop Siphorahq\'s best seller luxury porcelain dinnerware, gold-finish tea sets, fine porcelain gift sets & more. Free shipping above ₹999. Pan-India delivery.',
  };

  return {
    metadataBase: new URL(BRAND.domain),
    title: settings.seoTitle,
    description: settings.seoDescription,
    openGraph: {
      title: settings.seoTitle,
      description: settings.seoDescription,
      url: BRAND.domain,
      siteName: BRAND.name,
      images: [{ url: `${BRAND.domain}/og-banner.png` }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.seoTitle,
      description: settings.seoDescription,
      images: [`${BRAND.domain}/og-banner.png`],
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await dbConnect();
  const settings = await StoreSettings.findOne().lean();
  const theme = await ThemeSettings.findOne().lean();

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
      {
        '@type': 'Store',
        '@id': `${BRAND.domain}/#store`,
        name: 'Siphorahq',
        url: 'https://siphorahq.in',
        description: 'Luxury porcelain tea cups, tea sets, dinnerware and gifting collections.',
        image: `${BRAND.domain}/assets/siphorahq/logo.png`,
        sameAs: [BRAND.social.instagram],
        telephone: '+919540027978',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '671, Dayalpur, Ballabgarh',
          addressLocality: 'Faridabad',
          addressRegion: 'Haryana',
          postalCode: '121004',
          addressCountry: 'IN'
        },
        priceRange: '$$$'
      }
    ],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preload" as="image" href="/images/hero.webp" fetchPriority="high" />
        <link rel="canonical" href={BRAND.domain} />
        <link rel="alternate" hrefLang="en-IN" href={BRAND.domain} />
        <link rel="alternate" hrefLang="x-default" href={BRAND.domain} />
        <link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="bg-surface-cream text-ink-charcoal font-body-md antialiased min-h-screen pb-[64px] md:pb-0 flex flex-col overflow-x-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:p-4 focus:bg-white focus:text-black">
          Skip to main content
        </a>
        <ThemeInjector theme={theme} />
        <SettingsProvider initialSettings={JSON.parse(JSON.stringify(settings))}>
          <SessionWrapper>
            <Header />
            <main id="main-content" className="flex-1 flex flex-col">{children}</main>
            <Footer />
            <MobileBottomNav />
            <CartDrawerDynamic />
            <Toaster 
              position="bottom-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#1A1A1A',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  borderRadius: '0px',
                  padding: '16px 24px',
                  border: '1px solid #D4AF37',
                },
              }}
            />
          </SessionWrapper>
        </SettingsProvider>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-22VV0R5MCN`}
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-22VV0R5MCN', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","x8rtgt9b6p");`,
          }}
        />
      </body>
    </html>
  );
}
