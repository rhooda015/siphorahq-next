"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === 'true') {
      setHasConsent(true);
    } else if (consent !== 'false') {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setHasConsent(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'false');
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] p-4 md:p-6 shadow-2xl z-[100] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm font-sans text-[var(--color-text-muted)] flex-1">
            <strong className="text-[var(--color-primary)] font-serif block mb-1">We value your privacy</strong>
            We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. By clicking "Accept", you consent to our use of cookies in accordance with the DPDP Act 2023.
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-sans tracking-widest uppercase border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-gray-50 transition-colors"
            >
              Decline
            </button>
            <button 
              onClick={handleAccept}
              className="px-6 py-2 text-sm font-sans tracking-widest uppercase bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] transition-colors shadow-md"
            >
              Accept
            </button>
          </div>
        </div>
      )}

      {/* Conditionally Render Tracking Scripts Based on Consent */}
      {hasConsent && (
        <>
          {/* Google Tag Manager */}
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `}
          </Script>
          
          {/* Microsoft Clarity */}
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "CLARITY_ID_HERE");
            `}
          </Script>
        </>
      )}
    </>
  );
}
