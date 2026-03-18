'use client'

import { useTheme } from 'next-themes'
import { useMemo } from 'react'
import Image from 'next/image'
import { useMounted } from '@/src/hooks/useMounted'
import type { TPost } from '@/src/types'

/**
 * Returns the correct blur image source based on the theme.
 */
function getBlurSrc(post: TPost, theme: string| undefined, emptyImage: string): string {
  if (theme === 'light' && post.coverBlur?.blurLight) return post.coverBlur.blurLight
  if (theme === 'dark' && post.coverBlur?.blurDark) return post.coverBlur.blurDark
  return emptyImage
}

/**
 * Renders a responsive themed image for a blog post.
 * @param props The properties for the themed image component.
 */

export interface ThemedImageProps {
  post: TPost
  quality?: number
  className?: string
  priority?: boolean
}

  const EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  // Hostnames allowed in next/image remotePatterns — others fall back to empty placeholder
  const ALLOWED_HOSTS = [
    'static.anzifan.com', 'cdn.sspai.com', 'cdn.dribbble.com', 'image.freepik.com',
    'avatars.githubusercontent.com', 'cdn.jsdelivr.net', 'image.cugxuan.cn',
    'blog-static.mikuchan.top', 'amazonaws.com', 'img.zhheo.com', 'www.aohuiliu.fun',
    'rxhsk.xicp.fun', 'www.fomal.cc', 'www.notion.so', 'lh5.googleusercontent.com',
    's3-us-west-2.amazonaws.com', 'prod-files-secure.s3.us-west-2.amazonaws.com',
    'images.unsplash.com', 'upload.wikimedia.org',
  ]

  function isSafeImageUrl(url: string | undefined): boolean {
    if (!url || url.startsWith('data:')) return true
    try {
      const h = new URL(url).hostname
      return ALLOWED_HOSTS.some(a => h === a || h.endsWith('.' + a))
    } catch { return false }
  }

  const ThemedImage = ({
    post,
    quality = 100,
    className = '',
    priority = false,
  }: ThemedImageProps) => {
    const { resolvedTheme } = useTheme()
    const mounted = useMounted()

    const raw = post.thumbnail
    const src = (raw && isSafeImageUrl(raw)) ? raw : EMPTY_IMAGE
    const blurSrc = useMemo(() => mounted
      ? getBlurSrc(post, resolvedTheme, EMPTY_IMAGE) : EMPTY_IMAGE,
      [post, resolvedTheme, mounted])

    return (
      <Image
        priority={priority}
        src={src}
        quality={quality}
        fill
        style={{ objectFit: 'cover' }}
        alt={post.title}
        placeholder="blur"
        blurDataURL={blurSrc}
        className={className}
        sizes='100%'
      />
      )
  }

export default ThemedImage
