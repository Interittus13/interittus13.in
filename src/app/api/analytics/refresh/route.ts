import { NextResponse } from 'next/server'
import { refreshAnalyticsCache } from '@/src/lib/ga'

/**
 * Secure Admin Refresh API
 * 
 * Logic:
 * 1. Checks Authorization header (Bearer token)
 * 2. Triggers GA4 Data API fetch and cache refresh
 * 3. Rate limiting is managed via TTL on the file-based cache itself
 */
export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization')
  
  // Security Check: ADMIN_SECRET must match
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    console.warn('Unauthorized analytics refresh attempt rejected.')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('Admin triggered analytics cache refresh...')
    const data = await refreshAnalyticsCache()
    
    return NextResponse.json({ 
      success: true, 
      postsUpdated: Object.keys(data.stats).length,
      timestamp: Date.now()
    })
  } catch (error) {
    console.error('Manual refresh failed:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to refresh analytics data from GA4' 
    }, { status: 500 })
  }
}

// Ensure crawlers don't hit this internally via some indexing glitch
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
