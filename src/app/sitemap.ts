import { MetadataRoute } from 'next'
import { getPosts } from '@/src/lib/apis'
import { CONFIG } from '@/src/config/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = CONFIG.getBaseUrl()

  // Fetch all posts from the API
  const allPosts = await getPosts()
  const posts = allPosts.filter((post) => post.status.includes('Public'))

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date.start_date || post.createdTime),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/me`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.1,
    },
  ]

  return [...staticUrls, ...postUrls]
}
