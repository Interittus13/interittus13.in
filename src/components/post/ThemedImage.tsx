'use client'

import { useTheme } from 'next-themes'
import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import { useMounted } from '@/src/hooks/useMounted'
import type { TPost } from '@/src/types'

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

const ThemedImage = ({
  post,
  quality = 100,
  className = '',
  priority = false,
}: ThemedImageProps) => {
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const [imgSrc, setImgSrc] = useState<string>(post.thumbnail || OG_FALLBACK)

  // Ensure imgSrc updates if post.thumbnail changes (e.g., navigation)
  useEffect(() => {
    setImgSrc(post.thumbnail || OG_FALLBACK)
  }, [post.thumbnail])

  const blurSrc = useMemo(() => mounted
    ? getBlurSrc(post, resolvedTheme, EMPTY_IMAGE) : EMPTY_IMAGE,
    [post, resolvedTheme, mounted])

  return (
    <Image
      priority={priority}
      src={imgSrc}
      {...(imgSrc !== EMPTY_IMAGE ? { quality } : {})}
      fill
      style={{ objectFit: 'cover' }}
      alt={post.title}
      placeholder="blur"
      blurDataURL={blurSrc}
      className={className}
      sizes='100%'
      onError={() => {
        if (imgSrc !== OG_FALLBACK) {
          setImgSrc(OG_FALLBACK)
        }
      }}
    />
  )
}

export default ThemedImage
