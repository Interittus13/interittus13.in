import { getPostBlocks, getPosts } from '@/src/lib/apis'
import { filterPosts } from '@/src/lib/apis/filterPosts'
import ContentRenderer from '@/src/components/post/ContentRenderer'
import { WidgetMeMedium } from '@/src/components/widgets/MeWidget'
import { WidgetOverViewMedium } from '@/src/components/widgets/WidgetOverview'
import Pagination from '@/src/components/post/Pagination'
import Comment from '@/src/components/post/Comment'
import { Share } from '@/src/components/post/Share'
import Link from 'next/link'
import { Metadata } from 'next'
import React from 'react'
import ReadingProgress from '@/src/components/post/ReadingProgress'
import { me } from '@/src/config/me'
import { getMetadata } from '@/src/lib/utils/seo'
import PostHero from '@/src/components/post/PostHero'
import PostCover from '@/src/components/post/PostCover'
import PostTags from '@/src/components/post/PostTags'
import BlogAnalytics from '@/src/components/post/BlogAnalytics'
import { fetchAllPostMetrics } from '@/src/lib/ga'
import { enrichPostsWithAnalytics } from '@/src/lib/analytics'
import { getRecommendedPosts } from '@/src/lib/recommendations'
import { RecommendedPosts } from '@/src/components/post/RecommendedPosts'
import InsightsBar from '@/src/components/post/InsightsBar'
import { resolveEngagementLabel } from '@/src/lib/engagementLabels'
import AdSlot from '@/src/components/ads/AdSlot'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const posts = await getPosts()
  const post = filterPosts(posts).find((p) => p.slug === slug)
  if (!post) return { title: 'Post Not Found' }

  return getMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.summary,
    url: `/posts/${slug}`,
    image: post.thumbnail,
    type: 'article',
    publishedTime: post.date.start_date,
    authors: [me.name],
  })
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const allPosts = await getPosts()
  const filteredPosts = filterPosts(allPosts)
  const stats = await fetchAllPostMetrics()
  const enrichedPosts = enrichPostsWithAnalytics(filteredPosts, stats.total, stats.weekly)

  const pageIndex = enrichedPosts.findIndex((p) => p.slug === slug)
  const post = enrichedPosts[pageIndex]

  if (!post) return <PostNotFound />

  const [blocks, prevPost, nextPost] = await Promise.all([
    getPostBlocks(post.id),
    Promise.resolve(pageIndex > 0 ? enrichedPosts[pageIndex - 1] : null),
    Promise.resolve(pageIndex + 1 < enrichedPosts.length ? enrichedPosts[pageIndex + 1] : null),
  ])

  const recommended = getRecommendedPosts(post, enrichedPosts, stats.total, 3)

  return (
    <>
      <ReadingProgress />
      <BlogAnalytics slug={slug} />
      <main className="min-h-screen">
        <PostHero post={post} />

        {post.thumbnail && <PostCover post={post} />}

        <section className="max-w-4xl mx-auto px-5 md:px-8 mt-8 md:mt-12">
          {post.engagement && (
            <InsightsBar
              views={post.engagement.views}
              readTime={post.engagement.readTime}
              label={resolveEngagementLabel(post.engagement, 'post')}
              secondarySignal={post.engagement.secondarySignal}
            />
          )}

          <ContentRenderer blocks={blocks} />
        </section>

        {post.tags && post.tags.length > 0 && (
          <PostTags tags={post.tags} />
        )}

        <div className="max-w-4xl mx-auto px-5 md:px-8 mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800/50">
          <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Share</p>
          <Share />
        </div>

        <div className="max-w-5xl mx-auto px-5 md:px-8 mt-10">
          <AdSlot slot="postAfterContent" className="mb-10" />
        </div>

        <div className="max-w-5xl mx-auto px-5 md:px-8 mt-20">
          <Pagination pagination={{ prev: prevPost, next: nextPost }} />
        </div>

        <div className="max-w-5xl mx-auto px-5 md:px-8 mb-20">
          <RecommendedPosts posts={recommended} />
        </div>

        <div className="max-w-5xl mx-auto px-5 md:px-8 mt-12 mb-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WidgetMeMedium fix />
          <WidgetOverViewMedium posts={enrichedPosts} fix />
        </div>

        <div className="max-w-4xl mx-auto px-5 md:px-8 mt-12">
          <Comment />
        </div>
      </main>
    </>
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
