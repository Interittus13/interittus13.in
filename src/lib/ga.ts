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

// Only instantiate client when credentials are present.
// Do NOT fall back to new BetaAnalyticsDataClient() with no credentials —
// that triggers a GCE metadata ping emitting MetadataLookupWarning at build time.
let analyticsDataClient: BetaAnalyticsDataClient | null = null

if (fs.existsSync(keyFilePath)) {
  analyticsDataClient = new BetaAnalyticsDataClient({ keyFilename: keyFilePath })
} else if (serviceAccountKey) {
  try {
    analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: JSON.parse(serviceAccountKey),
    })
  } catch {
    // Invalid JSON — leave client as null
  }
}

export async function getGA4Metrics(dateRange = '30daysAgo') {
  if (!propertyId || !analyticsDataClient) {
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

export async function getMetricsByPath(dateRange = '30daysAgo') {
  if (!propertyId || !analyticsDataClient) {
    return []
  }

  try {
    const reportPromise = analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: dateRange, endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
    })

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('GA4 Request Timeout')), 10000)
    )

    const [response] = (await Promise.race([reportPromise, timeoutPromise])) as any

    return (
      response.rows?.map((row: any) => ({
        path: row.dimensionValues?.[0]?.value,
        views: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || []
    )
  } catch (error) {
    return []
  }
}
