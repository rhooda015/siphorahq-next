import { MetadataRoute } from 'next';
import { STATIC_PRODUCTS } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://siphorahq.in';

  // Dynamic products routes
  const dynamicRoutes = STATIC_PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticRoutes = [
    '',
    '/about',
    '/journal',
    '/gifting',
    '/contact',
    '/our-story',
    '/why-choose-us',
    '/corporate-gifting',
    '/privacy-policy',
    '/refund-policy',
    '/products',
    '/products?category=dinner-set',
    '/products?category=tea-set',
    '/products?category=serveware',
    '/products?category=cutlery',
    '/products?category=mugs',
    '/products?maxPrice=999',
    '/products?maxPrice=2000',
    '/products?maxPrice=5000',
    '/products?maxPrice=10000',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
