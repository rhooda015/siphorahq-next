'use client';
import React from 'react';

export default function ThemeInjector({ theme }: { theme: any }) {
  if (!theme) return null;
  
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      :root {
        --color-primary: ${theme.primaryColor || '#D4AF37'};
        --color-secondary: ${theme.secondaryColor || '#1A1A1A'};
        --color-accent: ${theme.accentColor || '#F9F6F0'};
        
        --font-heading: ${theme.headingFont ? `"${theme.headingFont}", serif` : 'var(--font-cormorant)'};
        --font-body: ${theme.bodyFont ? `"${theme.bodyFont}", sans-serif` : 'var(--font-dm-sans)'};
        
        --border-radius: ${theme.borderRadius || '0px'};
        --layout-width: ${theme.layoutWidth || '1280px'};
      }
    ` }} />
  );
}
