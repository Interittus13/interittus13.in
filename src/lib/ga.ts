import { BetaAnalyticsDataClient } from '@google-analytics/data'
import path from 'path'
import fs from 'fs'

/**
 * GA4 Data API Service
 * 
 * Supports two authentication methods:
 * 1. Local JSON File: interittus-GA-key.json (Root directory, prioritized)
 * 2. Full JSON String: GA_SERVICE_ACCOUNT_KEY
 */

const propertyId = process.env.GA_PROPERTY_ID
const serviceAccountKey = process.env.GA_SERVICE_ACCOUNT_KEY
const keyFilePath = path.join(process.cwd(), 'interittus-GA-key.json')

let analyticsDataClient: BetaAnalyticsDataClient

if (fs.existsSync(keyFilePath)) {
  analyticsDataClient = new BetaAnalyticsDataClient({
    keyFilename: keyFilePath,
  })
} else if (serviceAccountKey) {
  try {
    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: JSON.parse(serviceAccountKey),
    })
  } catch (error) {
    // Silent fail in production
    analyticsDataClient = new BetaAnalyticsDataClient()
  }
} else {
  analyticsDataClient = new BetaAnalyticsDataClient()
}

export async function getGA4Metrics(dateRange = '30daysAgo') {
  const isAuthReady = fs.existsSync(keyFilePath) || !!serviceAccountKey

  if (!propertyId || !isAuthReady) {
    return { pageViews: 0, activeUsers: 0 }
  }

  try {
    // Set a strict timeout for the Google API call to prevent hanging
    const reportPromise = analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: dateRange, endDate: 'today' }],
      dimensions: [],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
    })

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('GA4 Request Timeout')), 10000)
    )

    const [response] = (await Promise.race([reportPromise, timeoutPromise])) as any

    const pageViews = parseInt(response.rows?.[0]?.metricValues?.[0]?.value || '0')
    const activeUsers = parseInt(response.rows?.[0]?.metricValues?.[1]?.value || '0')

    return { pageViews, activeUsers }
  } catch (error) {
    return { pageViews: 0, activeUsers: 0 }
  }
}

export async function getTotalPageViews() {
  // Fetch from the beginning of time (or property creation)
  return getGA4Metrics('2020-01-01')
}
