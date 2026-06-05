import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://siphorahq.in', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://siphorahq.in/collections', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: 'https://siphorahq.in/corporate-gifting', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]
}
