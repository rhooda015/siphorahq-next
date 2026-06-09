import { MetadataRoute } from 'next'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://siphorahq.in', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://siphorahq.in/products', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://siphorahq.in/collections', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://siphorahq.in/gifting', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://siphorahq.in/corporate-gifting', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://siphorahq.in/our-story', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://siphorahq.in/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://siphorahq.in/journal', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: 'https://siphorahq.in/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://siphorahq.in/faq', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://siphorahq.in/track-order', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: 'https://siphorahq.in/sustainability', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: 'https://siphorahq.in/why-choose-us', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: 'https://siphorahq.in/craftsmanship', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: 'https://siphorahq.in/care-instructions', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://siphorahq.in/refund-policy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://siphorahq.in/shipping-policy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://siphorahq.in/privacy-policy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://siphorahq.in/terms-of-service', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  try {
    await dbConnect()
    const products = await Product.find({ status: 'Live' }, '_id handle updatedAt').lean()
    const productPages: MetadataRoute.Sitemap = products.map((p: any) => ({
      url: `https://siphorahq.in/products/${p.handle || p._id}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
    return [...staticPages, ...productPages]
  } catch {
    return staticPages
  }
}
