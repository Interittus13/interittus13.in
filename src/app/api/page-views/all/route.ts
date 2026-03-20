import { NextResponse } from 'next/server'
import { getTotalPageViews } from '@/src/lib/ga'

export const revalidate = 86400 // Cache total views for 24 hours

export async function GET() {
  const { pageViews } = await getTotalPageViews()
  return NextResponse.json({ pageViews })
}
