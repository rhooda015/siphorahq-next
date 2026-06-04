import React from 'react';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import { BRAND, getWhatsAppLink } from '@/config/brand';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import FooterWrapper from '@/components/FooterWrapper';
import CartDrawer from '@/components/CartDrawer';
import ExitIntentModal from '@/components/ExitIntentModal';
import CookieConsent from '@/components/CookieConsent';
import { Providers } from '@/components/Providers';
import Script from 'next/script';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-serif', style: ['normal', 'italic'] });
const jost = Jost({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-sans' });

export const metadata = {
  title: `${BRAND.name} | Premium Porcelain & Luxury Home Decor`,
  description: 'Elevate your dining experience with luxury porcelain dinnerware, aesthetic serveware, and premium home decor collections.',
  metadataBase: new URL('https://siphorahq.in'),
  openGraph: {
    title: `${BRAND.name} | Premium Porcelain & Luxury Home Decor`,
    description: 'Elevate your dining experience with luxury porcelain dinnerware, aesthetic serveware, and premium home decor collections.',
    url: 'https://siphorahq.in',
    siteName: BRAND.name,
    images: [
      {
        url: '/images/og-banner.png',
        width: 1200,
        height: 630,
        alt: `${BRAND.name} Luxury Dinnerware`,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | Premium Porcelain & Luxury Home Decor`,
    description: 'Elevate your dining experience with luxury porcelain dinnerware, aesthetic serveware, and premium home decor collections.',
    images: ['/images/og-banner.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${BRAND.domain}/#organization`,
                  "name": BRAND.name,
                  "url": BRAND.domain,
                  "description": `Luxury home decor and premium tableware. ${BRAND.name} specializes in high-end porcelain dinner sets, serveware, and aesthetic gifting.`,
                  "knowsAbout": [
                    "Luxury Home Decor",
                    "Premium Dinnerware",
                    "Porcelain Tea Sets",
                    "Aesthetic Serveware",
                    "Luxury Gifting"
                  ],
                  "sameAs": [
                    BRAND.social.instagram,
                    BRAND.social.pinterest
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": `${BRAND.domain}/#website`,
                  "url": BRAND.domain,
                  "name": `${BRAND.name} Luxury Fashion`,
                  "publisher": {
                    "@id": `${BRAND.domain}/#organization`
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className="pb-[60px] md:pb-0">
        <Providers>
          <CookieConsent />
          <Header />
          
          {/* Main Application Content */}
          <main className="min-h-screen pt-0">{children}</main>

          <FooterWrapper>
            <Footer />
          </FooterWrapper>
          <CartDrawer />
          <MobileBottomNav />
          <ExitIntentModal />

          {/* Global Footer Block: Floating Real-Time Concierge Support Component */}
          <a
            href={getWhatsAppLink(`I am inquiring about ${BRAND.name} Premium Porcelain Collections`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with ${BRAND.name} Concierge on WhatsApp`}
            className="group fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            <span className="absolute left-16 px-3 py-1 bg-white text-gray-800 text-xs font-sans font-medium rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Chat with us
            </span>
            {/* SVG Icon for WhatsApp */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.477 2 12c0 1.77.458 3.43 1.258 4.856L2 22l5.303-1.229C8.683 21.558 10.3 22 12 22c5.523 2 10-2.477 10-8s-4.477-10-10-10zm-1.076 4.757c.216-.002.435.003.626.01.218.007.508.053.71.553.24.588.672 1.637.73 1.758.06.121.1.261.02.42-.078.16-.12.261-.24.402-.121.14-.251.3-.351.39-.11.09-.231.192-.1.411.13.22 .58 1.05 1.33 1.71.97.86 1.76 1.12 1.98 1.22.22.1.35.08.48-.07.13-.15.56-.65.71-.87.15-.22.3-.18.5-.11.2.07 1.27.6 1.49.71.22.11.37.17.42.26.05.09.05.53-.13 1.03-.18.5-1.06.98-1.45 1.01-.39.03-.84.22-2.83-.58-2.39-1-3.92-3.41-4.04-3.57-.12-.16-1-1.33-1-2.54 0-1.21.62-1.8.84-2.04.22-.24.48-.3.64-.3z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </Providers>
      </body>
    </html>
  );
}
