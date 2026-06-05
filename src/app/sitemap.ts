import { MetadataRoute } from 'next'

export const revalidate = 86400 // Cache for 24 hours (86400 seconds)

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://siphorahq.in', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://siphorahq.in/collections', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://siphorahq.in/corporate-gifting', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]
}
