export const BRAND = {
  name: "SIPORAHQ",
  domain: "https://siporahq.com",
  social: {
    instagram: "https://instagram.com/siporahq",
    pinterest: "https://pinterest.com/siporahq",
  },
  contact: {
    whatsappNumber: "919540027978",
  },
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
