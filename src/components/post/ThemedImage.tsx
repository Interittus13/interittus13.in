'use client'

import { useTheme } from 'next-themes'
import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import { useMounted } from '@/src/hooks/useMounted'
import type { TPost } from '@/src/types'
import ImageGuard from '@/src/components/ui/ImageGuard'

/**
 * Returns the correct blur image source based on the theme.
 */
function getBlurSrc(post: TPost, theme: string | undefined, emptyImage: string): string {
  if (theme === 'light' && post.coverBlur?.blurLight) return post.coverBlur.blurLight
  if (theme === 'dark' && post.coverBlur?.blurDark) return post.coverBlur.blurDark
  return emptyImage
}

export interface ThemedImageProps {
  post: TPost
  quality?: number
  className?: string
  priority?: boolean
}

const EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
const OG_FALLBACK = '/static/images/og.png'
const normalizeImageUrl = (url?: string): string =>
  (url || '').replace(/\s+/g, '').replace(/&amp;/g, '&')

const isSignedS3Url = (url: string): boolean => {
  if (!url.startsWith('http')) return false
  try {
    const parsed = new URL(url)
    const isS3Host = parsed.hostname.includes('amazonaws.com')
    return isS3Host && (
      parsed.searchParams.has('X-Amz-Signature') ||
      parsed.searchParams.has('X-Amz-Security-Token')
    )
  } catch {
    return false
  }
}

const ThemedImage = ({
  post,
  quality = 100,
  className = '',
  priority = false,
}: ThemedImageProps) => {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const [imgSrc, setImgSrc] = useState<string>(normalizeImageUrl(post.thumbnail) || OG_FALLBACK)
  const [hasError, setHasError] = useState(false)

  // Ensure imgSrc updates if post.thumbnail changes (e.g., navigation)
  useEffect(() => {
    setImgSrc(normalizeImageUrl(post.thumbnail) || OG_FALLBACK)
    setHasError(false)
  }, [post.thumbnail])

  const blurSrc = useMemo(() => mounted
    ? getBlurSrc(post, resolvedTheme, EMPTY_IMAGE) : EMPTY_IMAGE,
    [post, resolvedTheme, mounted])
  const isSignedUrl = isSignedS3Url(imgSrc)

  return (
    <ImageGuard className={className}>
      {isSignedUrl ? (
        <img
          key={imgSrc}
          src={imgSrc}
          alt={post.title}
          loading={priority ? 'eager' : 'lazy'}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          onError={() => {
            if (!hasError && imgSrc !== OG_FALLBACK) {
              setHasError(true)
              setImgSrc(OG_FALLBACK)
            }
          }}
        />
      ) : (
        <Image
          key={imgSrc} // Force re-render if we switch to fallback
          priority={priority}
          src={imgSrc}
          {...(imgSrc !== EMPTY_IMAGE ? { quality } : {})}
          fill
          style={{
            objectFit: 'cover',
            pointerEvents: 'none',
            userSelect: 'none'
          }}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          alt={post.title}
          placeholder="blur"
          blurDataURL={blurSrc}
          sizes='100%'
          onError={() => {
            if (!hasError && imgSrc !== OG_FALLBACK) {
              setHasError(true)
              setImgSrc(OG_FALLBACK)
            }
          }}
        />
      )}
    </ImageGuard>
  )
}

export default ThemedImage
