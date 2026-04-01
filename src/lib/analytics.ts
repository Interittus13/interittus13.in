import { TPost } from '../types'

export interface PostEngagementMetrics {
  views: number
  scroll_50: number
  scroll_75: number
  completions: number
  time_spent: number // total seconds
}

export interface PostAnalyticsSnapshot {
  metrics: {
    totalViews: number
    weeklyViews: number
  }
  engagement: TPost['engagement']
}

export function deriveMetricsFromStats(
  slug: string,
  stats: Record<string, Record<string, number>>,
  statsWeekly: Record<string, Record<string, number>> = {}
): { metrics: PostEngagementMetrics; weeklyViews: number } {
  const path = `/posts/${slug}`
  const pStats = stats[path] || {}
  const pStatsWeekly = statsWeekly[path] || {}

  const views = pStats['blog_view'] || pStats['page_view'] || 0
  const weeklyViews = pStatsWeekly['blog_view'] || pStatsWeekly['page_view'] || 0

  const timeSpentSeconds =
    (pStats['time_spent_30'] || 0) * 30 +
    (pStats['time_spent_60'] || 0) * 60 +
    (pStats['time_spent_120'] || 0) * 120

  return {
    metrics: {
      views,
      scroll_50: pStats['scroll_depth_50'] || 0,
      scroll_75: pStats['scroll_depth_75'] || 0,
      completions: pStats['blog_complete'] || 0,
      time_spent: timeSpentSeconds,
    },
    weeklyViews,
  }
}

/**
 * Normalizes and calculates the engagement score for a post.
 * Uses weights: Scroll(2), Completion(3), Avg Time(1.5)
 * Applies Time Decay based on post age.
 */
export function calculatePostScore(metrics: PostEngagementMetrics, publishDate: string) {
  const { views, scroll_75, completions, time_spent } = metrics

  if (views === 0) return 0

  const scrollRate = Math.min(1, scroll_75 / views)
  const completionRate = Math.min(1, completions / views)
  const avgTimeMinutes = (time_spent / views) / 60

  const baseScore = (scrollRate * 2) + (completionRate * 3) + (avgTimeMinutes * 1.5)

  const pubDate = new Date(publishDate)
  const daysOld = Math.max(0, (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24))
  const decayFactor = 1 / (1 + daysOld / 7)

  return baseScore * decayFactor
}

export function assignEngagementLevels(
  posts: TPost[],
  stats: Record<string, Record<string, number>>,
  statsWeekly: Record<string, Record<string, number>> = {}
) {
  const enrichedPosts = posts.map(post => {
    const { metrics, weeklyViews } = deriveMetricsFromStats(post.slug, stats, statsWeekly)
    const completionRate = metrics.views > 0 ? metrics.completions / metrics.views : 0

    return {
      slug: post.slug,
      post,
      metrics,
      weeklyViews,
      completionRate,
      score: calculatePostScore(metrics, post.date.start_date),
      weeklyScore: weeklyViews + ((statsWeekly[`/posts/${post.slug}`]?.['blog_complete'] || 0) * 2),
    }
  })

  const weeklySorted = [...enrichedPosts].sort((a, b) => b.weeklyScore - a.weeklyScore)
  const totalSorted = [...enrichedPosts].sort((a, b) => b.score - a.score)
  const viewSorted = [...enrichedPosts].sort((a, b) => b.metrics.views - a.metrics.views)
  const totalPosts = Math.max(1, enrichedPosts.length)

  const levels: Record<string, TPost['engagement']> = {}

  enrichedPosts.forEach((p) => {
    const weeklyRank = weeklySorted.findIndex(s => s.slug === p.slug) + 1
    const isTop5 = weeklyRank <= 5 && p.weeklyViews > 0
    const isTrending = weeklyRank <= Math.ceil(totalPosts * 0.1) && p.weeklyViews > 2

    const totalSortedIndex = totalSorted.findIndex(s => s.slug === p.slug)
    const percentile = (totalSortedIndex / totalPosts) * 100
    const viewSortedIndex = viewSorted.findIndex(s => s.slug === p.slug)
    const viewPercentile = (viewSortedIndex / totalPosts) * 100

    let postLabel = 'Fresh'
    let recommendedLabel = 'Fresh'
    let trendingLabel = 'Fresh'
    let level: 'High' | 'Medium' | 'Low' = 'Low'

    // Logic for Post Hero (Authority & All-time status)
    if (isTop5) {
      postLabel = weeklyRank === 1 ? 'No. 1 Most Read This Week' : `No. ${weeklyRank} This Week`
      level = 'High'
    } else if (isTrending) {
      postLabel = 'Trending this week'
      level = 'High'
    } else if (percentile <= 10) {
      postLabel = 'Trending All-Time'
      level = 'High'
    } else if (percentile <= 30) {
      postLabel = 'Verified Popular'
      level = 'High'
    } else if (percentile <= 50) {
      postLabel = 'Popular'
      level = 'Medium'
    }

    // Logic for Recommended (Quality & Completion signals)
    if (p.completionRate >= 0.85 && p.metrics.views >= 5) {
      recommendedLabel = `${Math.round(p.completionRate * 100)}% Finish Rate`
    } else if (p.score > 0.8) {
      recommendedLabel = 'Highly Recommended'
    } else if (percentile <= 20) {
      recommendedLabel = 'Must Read'
    } else if (percentile <= 50) {
      recommendedLabel = 'Deep Dive'
    }

    // Logic for Trending (Velocity & Recent growth)
    if (weeklyRank === 1) {
      trendingLabel = 'No. 1 Trending'
    } else if (isTop5) {
      trendingLabel = 'Trending Now'
    } else if (isTrending) {
      trendingLabel = 'Rising Fast'
    } else if (p.weeklyViews > 2) {
      trendingLabel = 'Growing Interest'
    }

    levels[p.slug] = {
      level,
      label: postLabel, // fallback for global usage
      globalLabel: postLabel,
      sectionLabels: {
        post: postLabel,
        recommended: recommendedLabel,
        trending: trendingLabel,
      },
      secondarySignal: p.completionRate > 0.9 ? 'Most completed' : undefined,
      views: formatViews(p.metrics.views),
      readTime: estimateReadTime(p.post.summary || '', p.post.title),
      score: p.score,
    }
  })

  return levels
}

export function enrichPostsWithAnalytics(
  posts: TPost[],
  stats: Record<string, Record<string, number>>,
  statsWeekly: Record<string, Record<string, number>> = {}
): TPost[] {
  const levels = assignEngagementLevels(posts, stats, statsWeekly)

  return posts.map((post) => {
    const { metrics, weeklyViews } = deriveMetricsFromStats(post.slug, stats, statsWeekly)

    return {
      ...post,
      metrics: {
        totalViews: metrics.views,
        weeklyViews,
      },
      engagement: levels[post.slug],
    }
  })
}

function formatViews(views: number): string {
  if (views === 0) return '0'
  if (views < 1000) return `${views}`
  return `${(views / 1000).toFixed(1)}k`
}

function estimateReadTime(summary: string, title: string): string {
  const totalChars = (summary?.length || 0) + (title?.length || 0)
  const words = totalChars / 5
  const baseMins = Math.ceil(words / 180)
  const mins = Math.max(3, baseMins * 2)
  return `${mins} min read`
}

export function getTrendingPosts(
  posts: TPost[],
  weeklyStats: Record<string, Record<string, number>>
) {
  return posts.map(post => {
    const path = `/posts/${post.slug}`
    const pStats = weeklyStats[path] || {}
    const weeklyViews = pStats['blog_view'] || pStats['page_view'] || 0
    const weeklyCompletions = pStats['blog_complete'] || 0

    return {
      ...post,
      trendingScore: weeklyViews + (weeklyCompletions * 2),
    }
  }).sort((a, b) => b.trendingScore - a.trendingScore)
}
