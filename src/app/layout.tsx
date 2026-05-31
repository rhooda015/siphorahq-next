import React from 'react';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { BRAND, getWhatsAppLink } from '@/config/brand';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-cormorant' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-sans' });

export const metadata = {
  title: `${BRAND.name} | Luxury Indian Fashion & Ethnic Wear`,
  description: 'Premium handcrafted luxury Indian fashion, festive kurtas, and silk sarees.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
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
                  "description": `Premium handcrafted luxury Indian fashion. ${BRAND.name} specializes in festive kurtas, silk sarees, and occasion wear.`,
                  "knowsAbout": [
                    "Luxury Fashion",
                    "Indian Ethnic Wear",
                    "Silk Sarees",
                    "Designer Kurtas",
                    "Bridal Lehengas"
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
        <Header />
        
        {/* Main Application Content */}
        <main className="min-h-screen pt-20">{children}</main>

        <Footer />
        <MobileBottomNav />

        {/* Global Footer Block: Floating Real-Time Concierge Support Component */}
        <a
          href={getWhatsAppLink(`I am inquiring about ${BRAND.name} Premium Porcelain Collections`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with ${BRAND.name} Concierge on WhatsApp`}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
        >
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
      </body>
    </html>
  );
}
