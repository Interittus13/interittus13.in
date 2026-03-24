import { NextResponse } from 'next/server'
import { getTotalPageViews } from '@/src/lib/ga'

export const revalidate = 86400 // Cache total views for 24 hours

export async function GET(request: Request) {
  const host = request.headers.get('host')
  const referer = request.headers.get('referer')
  
  if (!referer || !referer.includes(host || '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { pageViews } = await getTotalPageViews()
  return NextResponse.json({ pageViews })
}
