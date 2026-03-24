import { getPostBlocks, getPosts } from '@/src/lib/apis'
import { filterPosts } from '@/src/lib/apis/filterPosts'
import ContentRenderer from '@/src/components/post/ContentRenderer'
import ThemedImage from '@/src/components/post/ThemedImage'
import { getCategoryTextColor } from '@/src/lib/utils/categoryColors'
import Link from 'next/link'
import FormattedDate from '@/src/components/ui/FormattedDate'
import { WidgetMeMedium } from '@/src/components/widgets/MeWidget'
import { WidgetOverViewMedium } from '@/src/components/widgets/WidgetOverview'
import Pagination from '@/src/components/post/Pagination'
import Comment from '@/src/components/post/Comment'
import { Share } from '@/src/components/post/Share'
import { Metadata } from 'next'
import type { TPost } from '@/src/types'
import React from 'react'
import ReadingProgress from '@/src/components/post/ReadingProgress'

export async function generateStaticParams() {
  try {
    const posts = await getPosts()
    return filterPosts(posts).map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = filterPosts(await getPosts()).find((p) => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }

  const metaTitle = post.seoTitle || post.title
  const metaDescription = post.seoDescription || post.summary

  // Use a proxy API to serve the notion thumbnail to prevent S3 expiry issues
  // We add a version/timestamp to help force a re-scrape if needed
  const ogImageUrl = `/api/og-image/${slug}?v=${Date.now()}`

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      type: 'article',
      url: `./${slug}`,
      title: metaTitle,
      description: metaDescription,
      images: post.thumbnail ? [ogImageUrl] : [],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: post.thumbnail ? [ogImageUrl] : [],
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const allPosts = await getPosts()
  const filteredPosts = filterPosts(allPosts)
  const pageIndex = filteredPosts.findIndex((p) => p.slug === slug)
  const post = filteredPosts[pageIndex]

  if (!post) return <PostNotFound />

  const [blocks, prevPost, nextPost] = await Promise.all([
    getPostBlocks(post.id),
    Promise.resolve(pageIndex > 0 ? filteredPosts[pageIndex - 1] : null),
    Promise.resolve(
      pageIndex + 1 < filteredPosts.length ? filteredPosts[pageIndex + 1] : null
    ),
  ])

  return (
    <>
      <ReadingProgress />
      <main className="min-h-screen">
        {/* Hero */}
        <PostHero post={post} />

        {/* Cover Image */}
        {post.thumbnail && <PostCover post={post} />}

        {/* Article body */}
        <section className="max-w-4xl mx-auto px-5 md:px-8 mt-8 md:mt-12">
          <ContentRenderer blocks={blocks} />
        </section>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <PostTags tags={post.tags} />
        )}

        {/* Share */}
        <div className="max-w-4xl mx-auto px-5 md:px-8 mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800/50">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Share</p>
          <Share />
        </div>

        {/* Pagination */}
        <div className="max-w-5xl mx-auto px-5 md:px-8 mt-20">
          <Pagination pagination={{ prev: prevPost, next: nextPost }} />
        </div>

        {/* Widgets */}
        <div className="max-w-5xl mx-auto px-5 md:px-8 mt-24 mb-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WidgetMeMedium fix />
          <WidgetOverViewMedium posts={filteredPosts} fix />
        </div>

        {/* Comments */}
        <div className="max-w-4xl mx-auto px-5 md:px-8 mt-12 mb-32">
          <Comment />
        </div>
      </main>
    </>
  )
}

function PostHero({ post }: { post: TPost }) {
  const category = post.category?.[0]
  const categoryColor = category
    ? getCategoryTextColor(category)
    : undefined

  return (
    <header className="max-w-4xl mx-auto px-5 md:px-8 pt-32 md:pt-40 pb-8">
      {/* Breadcrumb row */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        {category && (
          <Link
            href={`/category/${category}`}
            className={`text-[0.65rem] font-black uppercase tracking-[0.3em] ${categoryColor} px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800/60 rounded-full transition-all hover:scale-105 active:scale-95`}
          >
            {category}
          </Link>
        )}
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <FormattedDate
          date={post.date.start_date}
          className="text-[0.65rem] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]"
        />
        {post.tags && post.tags.length > 0 && (
          <>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <span className="text-[0.65rem] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
              {post.tags.length} tag{post.tags.length > 1 ? 's' : ''}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 leading-[1.0] mb-8">
        {post.title}
      </h1>

      {/* Summary */}
      {post.summary && (
        <p className="text-2xl md:text-3xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-4xl italic opacity-85">
          {post.summary}
        </p>
      )}
    </header>
  )
}

function PostCover({ post }: { post: TPost }) {
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 mb-4">
      <div className="relative w-full aspect-[16/9] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-[8px] md:border-[10px] border-white dark:border-zinc-800 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] dark:shadow-none">
        <ThemedImage
          post={post}
          className="object-cover transition-transform duration-1000 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

function PostTags({ tags }: { tags: string[] }) {
  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 mt-12 pt-10 border-t border-zinc-100 dark:border-zinc-800/50">
      <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Tagged</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="px-5 py-2.5 rounded-2xl bg-zinc-100/60 dark:bg-zinc-800/60 text-[0.65rem] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-orange-500 hover:bg-white dark:hover:bg-zinc-700/80 transition-all duration-300 hover:scale-105 active:scale-95 border border-zinc-200/50 dark:border-zinc-700/50 hover:border-orange-200 dark:hover:border-orange-900/50 hover:shadow-sm"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  )
}

function PostNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 gap-6">
      <p className="text-8xl">🔍</p>
      <h1 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
        Post Not Found
      </h1>
      <p className="text-lg text-zinc-400 max-w-sm">
        This post doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/"
        className="mt-4 px-8 py-4 rounded-2xl bg-orange-500 text-white font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/30"
      >
        Return Home
      </Link>
    </main>
  )
}
