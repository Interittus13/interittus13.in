import { TPost } from '../types'
import { calculatePostScore, deriveMetricsFromStats } from './analytics'

/**
 * Advanced Recommendation Engine
 *
 * Strategies:
 * 1. Weighted Relevance (60%): Category(3), Tags(1), Title intersection(0.5)
 * 2. Engagement Momentum (40%): Behavioral metrics + Time Decay
 * 3. Filtering: No self-recommendation
 * 4. Diversity Control: Max 2 posts from same category
 */
export function getRecommendedPosts(
  currentPost: TPost,
  allPosts: TPost[],
  stats: Record<string, Record<string, number>>,
  limit: number = 5
) {
  const currentTitleWords = currentPost.title.toLowerCase().split(/\s+/).filter(w => w.length > 3)

  const scoredPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      let relevanceScore = 0

      if (post.category?.[0] === currentPost.category?.[0]) relevanceScore += 3

      const commonTags = post.tags?.filter(tag => currentPost.tags?.includes(tag)) || []
      relevanceScore += commonTags.length

      const postTitleWords = post.title.toLowerCase().split(/\s+/).filter(w => w.length > 3)
      const matchingWords = postTitleWords.filter(w => currentTitleWords.includes(w))
      relevanceScore += matchingWords.length * 0.5

      const { metrics } = deriveMetricsFromStats(post.slug, stats)
      const engagementScore = calculatePostScore(metrics, post.date.start_date)
      const finalScore = (relevanceScore * 0.6) + (engagementScore * 0.4)

      return {
        ...post,
        recommendationScore: finalScore,
      }
    })

  scoredPosts.sort((a, b) => b.recommendationScore - a.recommendationScore)

  const categoryCounts: Record<string, number> = {}
  const recommended: typeof scoredPosts = []

  for (const post of scoredPosts) {
    if (recommended.length >= limit) break

    const cat = post.category?.[0] || 'Other'
    if ((categoryCounts[cat] || 0) < 2) {
      recommended.push(post)
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
    }
  }

  if (recommended.length < limit) {
    const remaining = scoredPosts.filter(p => !recommended.find(r => r.slug === p.slug))
    recommended.push(...remaining.slice(0, limit - recommended.length))
  }

  return recommended
}
