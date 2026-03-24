import { NextResponse } from 'next/server'
import { getPosts } from '@/src/lib/apis'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const posts = await getPosts()
    const post = posts.find((p) => p.slug === slug)

    if (!post || !post.thumbnail) {
      return new NextResponse('Not Found', { status: 404 })
    }

    // Notion S3 URLs expire after 1 hour. 
    // This proxy fetches a fresh one and pipes the image buffer to the crawler.
    const response = await fetch(post.thumbnail)
    
    if (!response.ok) {
      return new NextResponse('Failed to fetch from source', { status: response.status })
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const arrayBuffer = await response.arrayBuffer()

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('OG Image Proxy Error:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
