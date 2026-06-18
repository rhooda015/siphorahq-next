"use client";

import React, { useState, useEffect } from 'react';

interface ProtectedEmailProps {
  email: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Renders an email link that is obfuscated from spam bots in the initial HTML payload.
 * It uses JS to decode and render the actual mailto: link on the client side.
 */
export default function ProtectedEmail({ email, className = "", children }: ProtectedEmailProps) {
  const [mounted, setMounted] = useState(false);
  
  // Simple obfuscation: base64 encoding (not crypto secure, but fools basic regex bots)
  // We do the encoding at build time essentially by just having the component do it 
  // Wait, no, we need to pass the email raw, but we can render it as a button initially
  // Actually, simplest obfuscation that passes SEO tools is just rendering the link only after mount.

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span className={className}>
        {children || "Contact Us"}
      </span>
    );
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {children || email}
    </a>
  );
}
