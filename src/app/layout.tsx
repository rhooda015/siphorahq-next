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

export { rootMetadata as metadata } from '@/lib/metadata';

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
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'SiphoraHQ',
              url: 'https://www.siphorahq.in',
              logo: 'https://www.siphorahq.in/images/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'concierge@siphorahq.in',
                contactType: 'customer service',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Faridabad',
                addressRegion: 'Haryana',
                postalCode: '121001',
                addressCountry: 'IN',
              },
              sameAs: ['https://www.instagram.com/siphorahq'],
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
