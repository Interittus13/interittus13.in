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
  const [hasError, setHasError] = useState(false)

  // Ensure imgSrc updates if post.thumbnail changes (e.g., navigation)
  useEffect(() => {
    setImgSrc(post.thumbnail || OG_FALLBACK)
    setHasError(false)
  }, [post.thumbnail])

  const blurSrc = useMemo(() => mounted
    ? getBlurSrc(post, resolvedTheme, EMPTY_IMAGE) : EMPTY_IMAGE,
    [post, resolvedTheme, mounted])

  return (
    <div className={`relative overflow-hidden group/img ${className}`}>
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

      {/* Interaction Protection Overlay */}
      <div
        className="absolute inset-0 z-10"
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Subtle Branded Watermark */}
      <div className="absolute bottom-4 right-6 z-20 opacity-0 group-hover/img:opacity-40 transition-opacity duration-500 pointer-events-none">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 drop-shadow-sm select-none">
          © {new Date().getFullYear()} interittus.in
        </span>
      </div>
    </div>
  )
}

export default ThemedImage
