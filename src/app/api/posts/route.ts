import { NextResponse } from 'next/server'
import { getPosts } from '@/src/lib/apis'
import { filterPosts } from '@/src/lib/apis/filterPosts'
import { fetchAllPostMetrics } from '@/src/lib/ga'
import { enrichPostsWithAnalytics } from '@/src/lib/analytics'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursor = parseInt(searchParams.get('cursor') || '0', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const category = searchParams.get('category')
  const tag = searchParams.get('tag')

  try {
    const allPosts = await getPosts()
    const stats = await fetchAllPostMetrics()
    let filteredPosts = enrichPostsWithAnalytics(filterPosts(allPosts), stats.total, stats.weekly)
    
    if (category) {
      filteredPosts = filteredPosts.filter(post => (post.category || []).includes(category))
    }
    
    if (tag) {
      filteredPosts = filteredPosts.filter(post => (post.tags || []).includes(tag))
    }
    
    const paginatedPosts = filteredPosts.slice(cursor, cursor + limit)
    const nextCursor = cursor + limit < filteredPosts.length ? cursor + limit : null

    return NextResponse.json({
      posts: paginatedPosts,
      nextCursor,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
