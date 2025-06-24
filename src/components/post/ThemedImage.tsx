import Image from 'next/image'
import { useTheme } from 'next-themes'
import type { TPost } from '../../types'
import { useMounted } from '@/src/hooks/useMounted'

/**
 * Returns the correct blur image source based on the theme.
 */
function useBlurSrc(post: TPost, theme: string| undefined, emptyImage: string) {
  if (theme === 'light' && post.coverBlur?.blurLight) return post.coverBlur.blurLight
  if (theme === 'dark' && post.coverBlur?.blurDark) return post.coverBlur.blurDark
  return emptyImage
}

/**
 * Renders a responsive themed image for a blog post.
 * @param props The properties for the themed image component.
 */

export interface ThemedimageProps {
  post: TPost
  quality?: number
  className?: string
  priority?: boolean
}

  const emptyImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  const ThemedImage = ({
    post,
    quality = 100,
    className = '',
    priority = false,
  }: ThemedimageProps) => {
    const { resolvedTheme } = useTheme()
    const mounted = useMounted()

    const src = post.thumbnail || emptyImage
    const blurSrc = mounted ? useBlurSrc(post, resolvedTheme, emptyImage) : emptyImage

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

// function ThemedImage({ post, quality = 100, className = '' }: Props) {
//   const { resolvedTheme } = useTheme()
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])



//   if (!mounted) {
//     return (
//       <Image
//         src={post.thumbnail || emptyImage}
//         quality={quality}
//         fill
//         style={{ objectFit: "cover" }}
//         sizes="100%"
//         alt={post.title}
//         // onLoadingComplete={handleLoad}
//         placeholder="blur"
//         // TODO: Blur image
//         blurDataURL={emptyImage}
//         // blurDataURL={post.cover.blurLight }
//         className={className}
//       />
//     )
//   }

//   const src = post.thumbnail || emptyImage
//   let blurSrc = emptyImage

//   // if (resolvedTheme === "light" && post.cover?.blurLight) {
//   //   blurSrc = post.cover.blurLight
//   // } else if (resolvedTheme === "dark" && post.cover?.blurDark) {
//   //   blurSrc = post.cover.blurDark
//   // }

//   return (
//     <Image
//       priority={true}
//       src={src}
//       quality={quality}
//       fill
//       style={{ objectFit: "cover" }}
//       alt={post.title}
//       // onLoadingComplete={handleLoad}
//       placeholder="blur"
//       blurDataURL={blurSrc}
//       className={className}
//     />
//   )
// }

export default ThemedImage
