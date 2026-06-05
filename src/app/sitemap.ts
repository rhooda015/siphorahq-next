import { MetadataRoute } from 'next'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://siphorahq.in', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://siphorahq.in/collections', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://siphorahq.in/corporate-gifting', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://siphorahq.in/faq', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://siphorahq.in/returns', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://siphorahq.in/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  try {
    await dbConnect()
    const products = await Product.find({}, '_id handle updatedAt').lean()
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
