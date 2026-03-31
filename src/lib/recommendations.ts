import { TPost } from '../types'
import { calculatePostScore, PostEngagementMetrics } from './analytics'

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
    .filter(post => post.slug !== currentPost.slug) // Avoid recommending self
    .map(post => {
      // 1. Relevance Score Calculation
      let relevanceScore = 0
      
      // Category Match (+3 points)
      if (post.category?.[0] === currentPost.category?.[0]) relevanceScore += 3
      
      // Tag Overlap (+1 point each)
      const commonTags = post.tags?.filter(tag => currentPost.tags?.includes(tag)) || []
      relevanceScore += commonTags.length * 1

      // Title Similarity (+0.5 point each matching word)
      const postTitleWords = post.title.toLowerCase().split(/\s+/).filter(w => w.length > 3)
      const matchingWords = postTitleWords.filter(w => currentTitleWords.includes(w))
      relevanceScore += matchingWords.length * 0.5

      // 2. Engagement Score Calculation
      const path = `/posts/${post.slug}`
      const pStats = stats[path] || {}
      
      const metrics: PostEngagementMetrics = {
        views: pStats['blog_view'] || pStats['page_view'] || 0,
        scroll_50: pStats['scroll_depth_50'] || 0,
        scroll_75: pStats['scroll_depth_75'] || 0,
        completions: pStats['blog_complete'] || 0,
        time_spent: pStats['time_spent'] || 0,
      }

      const engagementScore = calculatePostScore(metrics, post.date.start_date)

      // 3. Normalized Final Weighted Score (60/40)
      const finalScore = (relevanceScore * 0.6) + (engagementScore * 0.4)

      return {
        ...post,
        recommendationScore: finalScore,
        engagementScore: engagementScore, // For debugging and UI labels
      }
    })

  // Sort by Recommendation Score descending
  scoredPosts.sort((a, b) => b.recommendationScore - a.recommendationScore)

  // Diversity Control: Max 2 posts per category
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

  // Fallback: If for some reason we don't have enough posts (very diverse categories), 
  // fill with remaining top scores regardless of diversity.
  if (recommended.length < limit) {
    const remaining = scoredPosts.filter(p => !recommended.find(r => r.slug === p.slug))
    recommended.push(...remaining.slice(0, limit - recommended.length))
  }

  return recommended
}
