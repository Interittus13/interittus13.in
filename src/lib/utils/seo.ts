import { Metadata } from 'next'
import { CONFIG } from '@/src/config/blog'
import { getBaseUrl } from './url'

interface SeoOptions {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  authors?: string[]
}

/**
 * Robust DRY metadata generator for Nextjs 15.
 * Handles absolute URLs, truncation, and consistent OG/Twitter tags.
 */
export function getMetadata(options: SeoOptions = {}): Metadata {
  const baseUrl = getBaseUrl()
  
  // 1. Resolve Title
  const rawTitle = options.title || CONFIG.BLOG_TITLE
  const displayTitle = rawTitle.length > 60 ? rawTitle.slice(0, 57) + '...' : rawTitle
  
  // 2. Resolve Description
  const rawDescription = options.description || 'DevOps Engineer & Cloud Architect. Writing about cloud infra, Kubernetes, Terraform, and platform engineering.'
  const displayDescription = rawDescription.length > 160 ? rawDescription.slice(0, 157) + '...' : rawDescription
  
  // 3. Resolve Image (ALWAYS ABSOLUTE)
  // Ensure the image URL is absolute and matches the CURRENT domain
  const imagePath = options.image || '/static/images/og.png'
  const imageUrl = imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`
  
  // 4. Resolve Canonical URL
  const canonicalUrl = options.url ? (options.url.startsWith('http') ? options.url : `${baseUrl}${options.url}`) : baseUrl

  return {
    title: displayTitle,
    description: displayDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: options.type || 'website',
      siteName: CONFIG.BLOG_TITLE,
      title: displayTitle,
      description: displayDescription,
      url: canonicalUrl,
      locale: 'en_US',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: displayTitle,
        },
      ],
      ...(options.publishedTime && { publishedTime: options.publishedTime }),
      ...(options.authors && { authors: options.authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description: displayDescription,
      images: [imageUrl],
      creator: '@interittus13',
    },
  }
}
