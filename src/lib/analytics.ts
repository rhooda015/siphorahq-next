/**
 * Analytics Tracking Utility
 * 
 * In a real production environment, this would push events to the dataLayer (GTM),
 * Facebook Pixel (fbq), Google Analytics (gtag), or Segment.
 */

export const trackAddToCart = (product: any, quantity: number = 1) => {
  console.log(`[Analytics] Add To Cart`, {
    currency: 'INR',
    value: (product.salePrice || product.price) * quantity,
    items: [{
      item_id: product.id,
      item_name: product.name,
      price: product.salePrice || product.price,
      quantity: quantity
    }]
  });
  
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'INR',
        value: (product.salePrice || product.price) * quantity,
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.salePrice || product.price,
          quantity: quantity
        }]
      }
    });
  }
};

export const trackBeginCheckout = (cartTotal: number, items: any[]) => {
  console.log(`[Analytics] Begin Checkout`, {
    currency: 'INR',
    value: cartTotal,
    items: items
  });
  
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'begin_checkout',
      ecommerce: {
        currency: 'INR',
        value: cartTotal,
        items: items
      }
    });
  }
};

export const trackPurchase = (transactionId: string, orderTotal: number, items: any[]) => {
  console.log(`[Analytics] Purchase Complete`, {
    transaction_id: transactionId,
    currency: 'INR',
    value: orderTotal,
    items: items
  });
  
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'purchase',
      ecommerce: {
        transaction_id: transactionId,
        currency: 'INR',
        value: orderTotal,
        items: items
      }
    });
  }
};
