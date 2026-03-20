import { NextResponse } from 'next/server'
import { getGA4Metrics } from '@/src/lib/ga'

export const revalidate = 21600

export async function GET() {
  const { activeUsers } = await getGA4Metrics('30daysAgo')
  return NextResponse.json({ usersViews: activeUsers })
}
