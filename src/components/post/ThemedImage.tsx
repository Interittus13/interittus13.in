import Image from 'next/image'
import { useTheme } from 'next-themes'
import type { TPost } from '../../types'
import { useMounted } from '@/src/hooks/useMounted'
import { useMemo } from 'react'

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

  const ThemedImage = ({
    post,
    quality = 100,
    className = '',
    priority = false,
  }: ThemedImageProps) => {
    const { resolvedTheme } = useTheme()
    const mounted = useMounted()

    const src = post.thumbnail || EMPTY_IMAGE
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
