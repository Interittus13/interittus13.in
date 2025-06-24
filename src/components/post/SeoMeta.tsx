import { NextSeo, ArticleJsonLd } from 'next-seo'
import { me } from '@/src/config/me'
import { CONFIG } from '@/src/config/blog'

type PostSeoProps = {
  author?: string
  date: Date
  description: string
  image: string
  locale?: string
  title: string
  url: string
}

/**
 * SEO component for individual blog posts.
*/
const SeoMeta: React.FC<PostSeoProps> = ({
  author = me.name,
  date,
  description,
  image,
  locale = 'en_US',
  title,
  url,
}) => {
  const publishedAt = new Date(date).toISOString()
  const featuredImage = {
    url: image || `${me.site}/static/images/og.png`,
    alt: title,
  }
  return (
    <>
      <NextSeo
        title={`${title} | ${CONFIG.BLOG_TITLE}`}
        description={description}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: publishedAt,
          },
          locale,
          url,
          title,
          description,
          images: [featuredImage],
        }}
      />
      <ArticleJsonLd
        authorName={author}
        dateModified={publishedAt}
        datePublished={publishedAt}
        description={description}
        images={[featuredImage.url]}
        publisherLogo="/android-chrome-192x192.png"
        publisherName={author}
        title={title}
        url={url}
      />
    </>
  )
}

export default SeoMeta
