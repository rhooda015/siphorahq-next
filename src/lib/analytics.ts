/**
 * Analytics Tracking Utility
 * 
 * In a real production environment, this would push events to the dataLayer (GTM),
 * Facebook Pixel (fbq), Google Analytics (gtag), or Segment.
 */

export const trackAddToCart = (product: any, quantity: number = 1) => {
  const value = (product.salePrice || product.price) * quantity;
  
  if (typeof window !== 'undefined') {
    // Google Analytics (GA4)
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'add_to_cart', {
        currency: 'INR',
        value: value,
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.salePrice || product.price,
          quantity: quantity
        }]
      });
    }

    // Meta Pixel
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'AddToCart', {
        content_ids: [product.id],
        content_name: product.name,
        content_type: 'product',
        value: value,
        currency: 'INR'
      });
    }
  }
};

export const trackBeginCheckout = (cartTotal: number, items: any[]) => {
  if (typeof window !== 'undefined') {
    // Google Analytics (GA4)
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'begin_checkout', {
        currency: 'INR',
        value: cartTotal,
        items: items
      });
    }

    // Meta Pixel
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: cartTotal,
        currency: 'INR'
      });
    }
  }
};

export const trackPurchase = (transactionId: string, orderTotal: number, items: any[]) => {
  if (typeof window !== 'undefined') {
    // Google Analytics (GA4)
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'purchase', {
        transaction_id: transactionId,
        currency: 'INR',
        value: orderTotal,
        items: items
      });
    }

    // Meta Pixel
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Purchase', {
        value: orderTotal,
        currency: 'INR'
      });
    }
  }
};
