import { TPost } from '../types'

export interface PostEngagementMetrics {
  views: number
  scroll_50: number
  scroll_75: number
  completions: number
  time_spent: number // total seconds
}

/**
 * Normalizes and calculates the engagement score for a post.
 * Uses weights: Scroll(2), Completion(3), Avg Time(1.5)
 * Applies Time Decay based on post age.
 */
export function calculatePostScore(metrics: PostEngagementMetrics, publishDate: string) {
  const { views, scroll_75, completions, time_spent } = metrics
  
  if (views === 0) return 0

  // 1. Normalization (Rates)
  const scrollRate = Math.min(1, scroll_75 / views)
  const completionRate = Math.min(1, completions / views)
  const avgTimeMinutes = (time_spent / views) / 60

  // 2. Base Weighted Score
  // Note: views are handled during the ranking phase for global normalization
  const baseScore = (scrollRate * 2) + (completionRate * 3) + (avgTimeMinutes * 1.5)

  // 3. Time Decay Factor
  // score = baseScore * (1 / (1 + daysSincePublished / 7))
  const pubDate = new Date(publishDate)
  const daysOld = Math.max(0, (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24))
  const decayFactor = 1 / (1 + daysOld / 7)

  return baseScore * decayFactor
}

/**
 * Assigns engagement levels and smart signals.
 * Logic:
 * 1. Primary Signal: Trending this week (Top 10% velocity) or Top 5 this week (Rank 1-5).
 * 2. Secondary Signal: Highly read (Top 20% total views) or Most completed (Completion rate > 75%).
 * 3. Stats: Formatted views (1.2k) and estimated reading time.
 */
export function assignEngagementLevels(
  posts: TPost[], 
  stats: Record<string, Record<string, number>>,
  statsWeekly: Record<string, Record<string, number>> = {}
) {
  // 1. Calculate base stats and weekly momentum for all posts
  const enrichedPosts = posts.map(post => {
    const path = `/posts/${post.slug}`
    const pStats = stats[path] || {}
    const pStatsWeekly = statsWeekly[path] || {}
    
    const totalViews = pStats['blog_view'] || pStats['page_view'] || 0
    const weeklyViews = pStatsWeekly['blog_view'] || pStatsWeekly['page_view'] || 0
    const completions = pStats['blog_complete'] || 0
    const completionRate = totalViews > 0 ? completions / totalViews : 0
    
    const metrics: PostEngagementMetrics = {
      views: totalViews,
      scroll_50: pStats['scroll_depth_50'] || 0,
      scroll_75: pStats['scroll_depth_75'] || 0,
      completions: completions,
      time_spent: pStats['time_spent'] || 0,
    }

    return {
      slug: post.slug,
      post,
      metrics,
      weeklyViews,
      completionRate,
      score: calculatePostScore(metrics, post.date.start_date),
      weeklyScore: weeklyViews + (pStatsWeekly['blog_complete'] || 0) * 2
    }
  })

  // 2. Rank by Weekly Score to find "Top 5" and "Trending"
  const weeklySorted = [...enrichedPosts].sort((a, b) => b.weeklyScore - a.weeklyScore)
  const totalPosts = enrichedPosts.length
  
  // 3. Final Signal Assignment
  const levels: Record<string, TPost['engagement']> = {}

  enrichedPosts.forEach((p) => {
    const weeklyRank = weeklySorted.findIndex(s => s.slug === p.slug) + 1
    const isTop5 = weeklyRank <= 5 && p.weeklyViews > 0
    const isTrending = weeklyRank <= Math.ceil(totalPosts * 0.1) && p.weeklyViews > 2
    
    // Sort by total score for percentiles
    const totalSortedIndex = enrichedPosts.sort((a, b) => b.score - a.score).findIndex(s => s.slug === p.slug)
    const percentile = (totalSortedIndex / totalPosts) * 100

    let label = 'Fresh 🆕'
    let level: 'High' | 'Medium' | 'Low' = 'Low'

    // Smart Label Hierarchy
    if (isTop5) {
      if (weeklyRank === 1) label = '🏆 Top 1 this week'
      else label = `🏆 Top ${weeklyRank} this week`
      level = 'High'
    } else if (isTrending) {
      label = '🔥 Trending this week'
      level = 'High'
    } else if (percentile <= 20) {
      label = 'Must Read 🔥'
      level = 'High'
    } else if (percentile <= 50) {
      label = 'Popular 📈'
      level = 'Medium'
    }

    // Secondary Signals
    let secondarySignal = undefined
    if (p.completionRate > 0.8 && p.metrics.views > 5) {
      secondarySignal = 'Most completed'
    } else if (percentile <= 10) {
      secondarySignal = 'Highly read'
    }

    levels[p.slug] = {
      level,
      label,
      secondarySignal,
      views: formatViews(p.metrics.views),
      readTime: estimateReadTime(p.post.summary || '', p.post.title),
      score: p.score
    }
  })

  return levels
}

function formatViews(views: number): string {
  if (views === 0) return '0'
  if (views < 1000) return `${views}`
  return `${(views / 1000).toFixed(1)}k`
}

function estimateReadTime(summary: string, title: string): string {
  // Heuristic: Approx 1 min per 150 words.
  // Using characters as proxy: (chars / 5) = words. 
  const totalChars = (summary?.length || 0) + (title?.length || 0)
  const words = totalChars / 5
  // Technical blogs average 180-200 wpm.
  // We double it to account for code blocks which aren't in the summary.
  const baseMins = Math.ceil(words / 180)
  const mins = Math.max(3, baseMins * 2) 
  return `${mins} min read`
}

/**
 * Calculates trending score based on weekly momentum.
 * trendingScore = weeklyViews + (weeklyCompletions * 2)
 */
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
      trendingScore: weeklyViews + (weeklyCompletions * 2)
    }
  }).sort((a, b) => b.trendingScore - a.trendingScore)
}
