import { NextSeo, ArticleJsonLd, NextSeoProps, DefaultSeo } from 'next-seo'
import { me } from '@/src/config/me'
import { CONFIG } from '@/src/config/blog'

type SeoMetaProps = {
  title: string
  description: string
  url: string
  date: Date
  image: string
  author?: string
  locale?: string
  noindex?: boolean
}

/**
 * SEO component for individual blog posts.
*/
const SeoMeta: React.FC<SeoMetaProps> = ({
  title,
  description,
  url,
  date,
  image,
  author = me.name,
  locale = 'en_US',
  noindex = false,
}) => {
  const publishedAt = new Date(date).toISOString()
  const ogImage = {
    url: image?.startsWith('http') ? image : `${me.site}/static/images/og.png`,
    alt: `${title} -  ${CONFIG.BLOG_TITLE}`,
    type: 'image/png',
  }

  const seoProps: NextSeoProps = {
    title,
    description,
    canonical: url,
    noindex,
    openGraph: {
      type: 'article',
      article: { publishedTime: publishedAt },
      locale,
      url,
      site_name: CONFIG.BLOG_TITLE,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      cardType: 'summary_large_image',
      site: "@interittus13",
      handle: "@interittus13",
    },
  }

  return (
    <>
      <NextSeo {...seoProps} />
      <ArticleJsonLd
        authorName={author}
        dateModified={publishedAt}
        datePublished={publishedAt}
        description={description}
        images={[ogImage.url]}
        publisherName={author}
        publisherLogo={`${me.site}/android-chrome-192x192.png`}
        title={title}
        url={url}
      />
    </>
  )
}

export default SeoMeta
