import { NextResponse } from 'next/server'
import { getGA4Metrics } from '@/src/lib/ga'

export const revalidate = 21600 // Cache for 6 hours

export async function GET() {
  const { pageViews } = await getGA4Metrics('30daysAgo')
  return NextResponse.json({ pageViews })
}
