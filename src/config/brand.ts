export const BRAND = {
  name: "Siphorahq",
  domain: "https://siphorahq.in",
  social: {
    instagram: "https://www.instagram.com/siphorahq",
    pinterest: "https://pinterest.com/siphorahq",
    facebook: "https://www.facebook.com/siphorahq",
    twitter: "https://x.com/siphorahq",
    youtube: "https://www.youtube.com/@siphorahq",
    linkedin: "https://www.linkedin.com/company/siphorahq",
  },
  contact: {
    whatsappNumber: "919540027978",
    email: "concierge@siphorahq.in"
  },
  freeShippingThreshold: 999,
  shippingCost: 99,
};

/**
 * Generates a pre-filled WhatsApp link with the official business number.
 * @param message The pre-filled message text.
 * @returns Formatted WhatsApp wa.me URL
 */
export function getWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${BRAND.contact.whatsappNumber}?text=${encodedMessage}`;
}
