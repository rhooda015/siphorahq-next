import React from 'react';
import Script from 'next/script';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { BRAND, getWhatsAppLink } from '@/config/brand';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawerDynamic from '@/components/CartDrawerDynamic';
import SessionWrapper from '@/components/SessionWrapper';
import dbConnect from '@/lib/db';
import StoreSettings from '@/models/StoreSettings';
import ThemeSettings from '@/models/ThemeSettings';
import SettingsProvider from '@/providers/SettingsProvider';
import NonceProvider from '@/providers/NonceProvider';
import ThemeInjector from '@/components/ThemeInjector';
import dynamic from 'next/dynamic';
import { GoogleAnalytics } from '@next/third-parties/google';
import { headers } from 'next/headers';

const MobileBottomNav = dynamic(() => import('@/components/MobileBottomNav'));
const Toaster = dynamic(() => import('react-hot-toast').then(mod => mod.Toaster));

export const revalidate = 60;

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
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
  const nonce = (await headers()).get('x-nonce') || '';

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
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />
        <script
          nonce={nonce}
          suppressHydrationWarning={true}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="bg-surface-cream text-ink-charcoal font-body-md antialiased min-h-screen pb-[64px] md:pb-0 flex flex-col overflow-x-hidden">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:p-4 focus:bg-white focus:text-black">
          Skip to main content
        </a>
        <ThemeInjector theme={theme} />
        <NonceProvider nonce={nonce}>
          <SettingsProvider initialSettings={JSON.parse(JSON.stringify(settings))}>
            <SessionWrapper>
              <Header />
              <main id="main-content" className="flex-1 flex flex-col">{children}</main>
              <Footer />
              <MobileBottomNav />
              <CartDrawerDynamic />
              {/* WhatsApp Floating Button */}
              <a
                href="https://wa.me/919540027978?text=Hi%2C%20I%27m%20interested%20in%20Siphorahq%20products"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Siphorahq concierge on WhatsApp"
                className="fixed bottom-24 md:bottom-6 right-6 z-40 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
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
        </NonceProvider>
        <GoogleAnalytics gaId="G-22VV0R5MCN" nonce={nonce} />
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","x8rtgt9b6p");`,
          }}
        />
      </body>
    </html>
  );
}
