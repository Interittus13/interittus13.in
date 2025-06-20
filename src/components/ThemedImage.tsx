import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { TPost } from '../types'

type Props = {
  post: TPost
  quality?: number
  className?: string
}

function ThemedImage({ post, quality = 100, className = '' }: Props) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const emptyImage =
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  if (!mounted) {
    return (
      <Image
        src={post.thumbnail || emptyImage}
        quality={quality}
        fill
        style={{ objectFit: "cover" }}
        sizes="100%"
        alt={post.title}
        // onLoadingComplete={handleLoad}
        placeholder="blur"
        // TODO: Blur image
        blurDataURL={emptyImage}
        // blurDataURL={post.cover.blurLight }
        className={className}
      />
    )
  }

  const src = post.thumbnail || emptyImage
  let blurSrc = emptyImage

  // if (resolvedTheme === "light" && post.cover?.blurLight) {
  //   blurSrc = post.cover.blurLight
  // } else if (resolvedTheme === "dark" && post.cover?.blurDark) {
  //   blurSrc = post.cover.blurDark
  // }

  return (
    <Image
      priority={true}
      src={src}
      quality={quality}
      fill
      style={{ objectFit: "cover" }}
      alt={post.title}
      // onLoadingComplete={handleLoad}
      placeholder="blur"
      blurDataURL={blurSrc}
      className={className}
    />
  )
}

export default ThemedImage
