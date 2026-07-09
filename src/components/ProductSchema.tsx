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

export default function ProductSchema({ product, nonce }: { product: Product; nonce?: string }) {
  const imageUrl = product.image && !product.image.startsWith('data:')
    ? (product.image.startsWith('http') ? product.image : `https://siphorahq.in${product.image.startsWith('/') ? product.image : '/' + product.image}`)
    : 'https://siphorahq.in/images/dinnerware.webp';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `Siphorahq ${product.name} — Premium porcelain and ceramic tableware. Handcrafted for modern elegance.`,
    sku: product.id || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    mpn: product.id || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    image: imageUrl,
    brand: {
      '@type': 'Brand',
      name: 'Siphorahq',
    },
    offers: {
      '@type': 'Offer',
      url: `https://siphorahq.in/products/${product.id}`,
      priceCurrency: 'INR',
      price: product.salePrice || product.price,
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Siphorahq',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'INR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 7,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.reviews || '4.8',
      reviewCount: product.reviewCount || '24',
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <script
      nonce={nonce}
      suppressHydrationWarning={true}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
