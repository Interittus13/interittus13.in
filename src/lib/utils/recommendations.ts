import { TPost } from '@/src/types'

/**
 * Recommends posts based on a hybrid of:
 * 1. Category similarity (highest weight)
 * 2. Tag overlap
 * 3. Global popularity (views)
 */
export function getRecommendedPosts(
  currentPost: TPost,
  allPosts: TPost[],
  limit = 3
): TPost[] {
  const filteredPosts = allPosts.filter(p => p.slug !== currentPost.slug)

  const scoredPosts = filteredPosts.map(post => {
    let score = 0

    // 1. Category match (+10)
    if (post.category && currentPost.category && post.category[0] === currentPost.category[0]) {
      score += 10
    }

    // 2. Tag overlap (+5 per match)
    if (post.tags && currentPost.tags) {
      const commonTags = post.tags.filter(tag => currentPost.tags!.includes(tag))
      score += commonTags.length * 5
    }

    // 3. Popularity weight (0-10 based on views rank in similarity set)
    // Actually simpler: just views per 100 as a small boost
    score += (post.metrics?.totalViews || 0) / 100

    return { post, score }
  })

  // Sort by score descending
  scoredPosts.sort((a, b) => b.score - a.score)

  return scoredPosts.slice(0, limit).map(p => p.post)
}
