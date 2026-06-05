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
import Script from 'next/script';
import SessionWrapper from '@/components/SessionWrapper';
import CartSync from '@/components/CartSync';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-serif', style: ['normal', 'italic'] });
const jost = Jost({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-sans' });

export const metadata = {
  title: "Premium Porcelain Dinnerware & Tea Sets India | SiphoraHQ",
  description: 'Elevate your dining experience with luxury porcelain dinnerware, aesthetic serveware, and premium home decor collections.',
  metadataBase: new URL('https://siphorahq.in'),
  openGraph: {
    title: "Premium Porcelain Dinnerware & Tea Sets India | SiphoraHQ",
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
    title: "Premium Porcelain Dinnerware & Tea Sets India | SiphoraHQ",
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
    <SessionWrapper>
      <CartSync />
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

        {/* WhatsApp button removed */}
      </body>
    </html>
  </SessionWrapper>
  );
}
