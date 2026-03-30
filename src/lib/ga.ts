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


const CACHE_FILE = path.join(process.cwd(), '.cache', 'analytics.json')
const CACHE_TTL = 3600 * 1000 // 1 hour

interface CachedData {
  timestamp: number
  data: Record<string, { totalViews: number; weeklyViews: number }>
}

async function getCachedAnalytics(): Promise<CachedData | null> {
  try {
    if (!fs.existsSync(path.dirname(CACHE_FILE))) {
      fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true })
      return null
    }
    if (fs.existsSync(CACHE_FILE)) {
      const content = fs.readFileSync(CACHE_FILE, 'utf-8')
      const parsed = JSON.parse(content) as CachedData
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        return parsed
      }
    }
  } catch (e) {
    console.error('Error reading analytics cache:', e)
  }
  return null
}

async function saveAnalyticsCache(data: Record<string, { totalViews: number; weeklyViews: number }>) {
  try {
    const cacheData: CachedData = {
      timestamp: Date.now(),
      data,
    }
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData))
  } catch (e) {
    console.error('Error saving analytics cache:', e)
  }
}

export async function fetchAllPostMetrics() {
  if (!propertyId || !analyticsDataClient) {
    return {}
  }

  const cached = await getCachedAnalytics()
  if (cached) return cached.data

  try {
    const fetchRange = async (startDate: string) => {
      const [response] = await analyticsDataClient!.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: {
              value: '^/posts/.*',
              matchType: 'FULL_REGEXP',
            },
          },
        },
      })
      
      const metrics: Record<string, number> = {}
      response.rows?.forEach((row: any) => {
        const path = row.dimensionValues?.[0]?.value || ''
        const views = parseInt(row.metricValues?.[0]?.value || '0')
        if (path) metrics[path] = views
      })
      return metrics
    }

    const [totalMetrics, weeklyMetrics] = await Promise.all([
      fetchRange('2020-01-01'),
      fetchRange('7daysAgo'),
    ])

    const allPaths = new Set([...Object.keys(totalMetrics), ...Object.keys(weeklyMetrics)])
    const results: Record<string, { totalViews: number; weeklyViews: number }> = {}

    allPaths.forEach((path) => {
      results[path] = {
        totalViews: totalMetrics[path] || 0,
        weeklyViews: weeklyMetrics[path] || 0,
      }
    })

    await saveAnalyticsCache(results)
    return results
  } catch (error) {
    console.error('GA4 All Metrics Fetch Error:', error)
    return {}
  }
}

export async function getGA4Metrics(dateRange = '30daysAgo') {
  if (!propertyId || !analyticsDataClient) {
    return { pageViews: 0, activeUsers: 0 }
  }

  try {
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
