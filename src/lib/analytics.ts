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
 * Wilson Score Interval (Lower Bound)
 * Standardizes the "Quality" signal for small sample sizes.
 * Reference: https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Wilson_score_interval
 */
function calculateWilsonScore(numerator: number, denominator: number, z = 1.96): number {
  if (denominator === 0) return 0
  const n = denominator
  const p = numerator / n
  const score = (p + (z * z) / (2 * n) - z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))) / (1 + (z * z) / n)
  return score
}

/**
 * Calculates a temporary boost for new posts to solve the "Cold Start" problem.
 * Decays linearly from 1.5x to 1.0x over 7 days.
 */
function calculateFreshnessBoost(publishDate: string): number {
  const pubDate = new Date(publishDate)
  const daysOld = Math.max(0, (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24))
  if (daysOld > 7) return 1
  return 1 + (0.5 * (7 - daysOld)) / 7
}

/**
 * Normalizes and calculates the engagement score for a post.
 * Uses weights: Scroll(2), Completion(3), Avg Time(1.5)
 * Applies Time Decay and Freshness Boost.
 */
export function calculatePostScore(metrics: PostEngagementMetrics, publishDate: string) {
  const { views, scroll_75, completions, time_spent } = metrics

  // Base Quality Signal (Wilson-weighted rates)
  const scrollScore = calculateWilsonScore(scroll_75, views)
  const completionScore = calculateWilsonScore(completions, views)
  const avgTimeMinutes = views > 0 ? (time_spent / views) / 60 : 0

  const baseScore = (scrollScore * 2) + (completionScore * 3) + (avgTimeMinutes * 1.5)

  // Time Signals
  const pubDate = new Date(publishDate)
  const daysOld = Math.max(0, (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24))
  const decayFactor = 1 / (1 + daysOld / 7)
  const freshBoost = calculateFreshnessBoost(publishDate)

  return baseScore * decayFactor * freshBoost
}

export function assignEngagementLevels(
  posts: TPost[],
  stats: Record<string, Record<string, number>>,
  statsWeekly: Record<string, Record<string, number>> = {}
) {
  const enrichedPosts = posts.map(post => {
    const { metrics, weeklyViews } = deriveMetricsFromStats(post.slug, stats, statsWeekly)
    
    // Use Wilson Score for robust Completion Rate (handles small samples)
    const completionRateLowerBound = calculateWilsonScore(metrics.completions, metrics.views)
    const actualCompletionRate = metrics.views > 0 ? metrics.completions / metrics.views : 0

    return {
      slug: post.slug,
      post,
      metrics,
      weeklyViews,
      actualCompletionRate,
      completionRateLowerBound,
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
    // Only rank if it has meaningful recent views (Threshold: > 10)
    const isTop5 = weeklyRank <= 5 && p.weeklyViews >= 10
    // Trending threshold: > 5 views in a week
    const isTrending = weeklyRank <= Math.ceil(totalPosts * 0.1) && p.weeklyViews >= 5

    const totalSortedIndex = totalSorted.findIndex(s => s.slug === p.slug)
    const scorePercentile = (totalSortedIndex / totalPosts) * 100
    const viewSortedIndex = viewSorted.findIndex(s => s.slug === p.slug)
    const viewPercentile = (viewSortedIndex / totalPosts) * 100
    const hasMeaningfulViews = p.metrics.views >= 10

    const pubDate = new Date(p.post.date.start_date)
    const daysOld = Math.max(0, (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24))
    const isNew = daysOld < 30
    const isVeryNew = daysOld < 7

    // Start with Baseline
    let postLabel = isNew ? (isVeryNew ? 'Hot Release' : 'Fresh') : 'Discovery'
    let recommendedLabel = isNew ? (isVeryNew ? 'New Event' : 'Recommended') : 'Discovery'
    let trendingLabel = isNew ? (isVeryNew ? 'Rising Fast' : 'Growing Interest') : 'Discovery'
    let level: 'High' | 'Medium' | 'Low' = 'Low'

    // QUALITY-FIRST WATERFALL (Wilson Lower Bound > 0.6 indicates proven high engagement)
    if (p.completionRateLowerBound >= 0.7 && p.metrics.views >= 5) {
      recommendedLabel = `${Math.round(p.actualCompletionRate * 100)}% Finish Rate`
      postLabel = 'Deep Engagement'
      level = 'High'
    } else if (p.score > 0.8) {
      recommendedLabel = 'Highly Recommended'
      postLabel = 'Must Read'
      level = 'High'
    }

    // STATISTICAL RANKINGS
    if (isTop5) {
      postLabel = weeklyRank === 1 ? 'No. 1 Most Read This Week' : `No. ${weeklyRank} This Week`
      level = 'High'
    } else if (isTrending) {
      postLabel = 'Trending this week'
      level = 'High'
    } else if (hasMeaningfulViews && viewPercentile <= 10) {
      postLabel = 'Trending All-Time'
      level = 'High'
    } else if (hasMeaningfulViews && viewPercentile <= 30) {
      postLabel = 'Verified Popular'
      level = 'High'
    } else if (hasMeaningfulViews && viewPercentile <= 50) {
      postLabel = 'Popular'
      level = 'Medium'
    }

    // RECOMMENDATION OVERLAYS (Refine Labels based on Score)
    if (scorePercentile <= 20) {
      recommendedLabel = 'Editor Choice'
    } else if (scorePercentile <= 50) {
      recommendedLabel = 'Deep Dive'
    }

    // TRENDING VELOCITY
    if (weeklyRank === 1) {
      trendingLabel = 'No. 1 Trending'
    } else if (isTop5) {
      trendingLabel = 'Trending Now'
    } else if (isTrending) {
      trendingLabel = 'Rising Fast'
    }

    levels[p.slug] = {
      level,
      label: postLabel, 
      globalLabel: postLabel,
      sectionLabels: {
        post: postLabel,
        recommended: recommendedLabel,
        trending: trendingLabel,
      },
      secondarySignal: p.actualCompletionRate > 0.9 ? 'Most completed' : undefined,
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
