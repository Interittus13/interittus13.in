import { NextResponse } from 'next/server'
import { getGA4Metrics } from '@/src/lib/ga'

export const revalidate = 21600 // Cache for 6 hours

export async function GET(request: Request) {
  const host = request.headers.get('host')
  const referer = request.headers.get('referer')
  
  if (!referer || !referer.includes(host || '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { pageViews } = await getGA4Metrics('30daysAgo')
  return NextResponse.json({ pageViews })
}
