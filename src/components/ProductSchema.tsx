interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  description?: string;
  image?: string;
  reviews?: number;
  reviewCount?: number;
  category?: string;
}

export default function ProductSchema({ product }: { product: Product }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || '',
    image: product.image?.startsWith('http')
      ? product.image
      : `https://www.siphorahq.in${product.image}`,
    brand: {
      '@type': 'Brand',
      name: 'SiphoraHQ',
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.siphorahq.in/products/${product.id}`,
      priceCurrency: 'INR',
      price: product.salePrice || product.price,
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'SiphoraHQ',
      },
    },
    ...(product.reviewCount && product.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.reviews,
            reviewCount: product.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
