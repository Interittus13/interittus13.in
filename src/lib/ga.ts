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

interface PostStats {
  [eventName: string]: number
}

interface RollingStats {
  total: Record<string, PostStats>
  weekly: Record<string, PostStats>
}

interface CachedData {
  timestamp: number
  data: RollingStats
}

async function getCachedAnalytics(): Promise<CachedData | null> {
  try {
    if (!fs.existsSync(path.dirname(CACHE_FILE))) {
      fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true })
      return null
    }
    if (fs.existsSync(CACHE_FILE)) {
      const content = fs.readFileSync(CACHE_FILE, 'utf-8').trim()
      if (!content) return null

      try {
        const parsed = JSON.parse(content) as CachedData
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          return parsed
        }
      } catch (jsonErr) {
        console.error('Invalid analytics cache format, clearing:', jsonErr)
        return null
      }
    }
  } catch (e) {
    console.error('Error reading analytics cache:', e)
  }
  return null
}

async function saveAnalyticsCache(data: RollingStats) {
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

export async function fetchAllPostMetrics(forceRefresh = false): Promise<RollingStats> {
  const emptyStats: RollingStats = { total: {}, weekly: {} }

  if (!propertyId || !analyticsDataClient) {
    return emptyStats
  }

  if (!forceRefresh) {
    const cached = await getCachedAnalytics()
    if (cached) return cached.data
  }

  try {
    const fetchEventStats = async (startDate: string) => {
      const response = await analyticsDataClient!.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate, endDate: 'today' }],
        dimensions: [
          { name: 'pagePath' },
          { name: 'eventName' }
        ],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          andGroup: {
            expressions: [
              {
                filter: {
                  fieldName: 'pagePath',
                  stringFilter: {
                    value: '^/posts/.*',
                    matchType: 'FULL_REGEXP',
                  },
                },
              },
              {
                filter: {
                  fieldName: 'eventName',
                  inListFilter: {
                    values: [
                      'page_view',
                      'blog_view',
                      'scroll_depth_25',
                      'scroll_depth_50',
                      'scroll_depth_75',
                      'scroll_depth_100',
                      'blog_complete',
                      'time_spent_30',
                      'time_spent_60',
                      'time_spent_120'
                    ]
                  }
                }
              }
            ]
          }
        },
      })

      const metrics: Record<string, PostStats> = {}
      const rows = response[0].rows || []
      rows.forEach((row: any) => {
        const path = row.dimensionValues?.[0]?.value || ''
        const eventName = row.dimensionValues?.[1]?.value || ''
        const count = parseInt(row.metricValues?.[0]?.value || '0')

        if (path && eventName) {
          if (!metrics[path]) metrics[path] = {}
          metrics[path][eventName] = (metrics[path][eventName] || 0) + count
        }
      })
      return metrics
    }

    const [total, weekly] = await Promise.all([
      fetchEventStats('2020-01-01'),
      fetchEventStats('7daysAgo'),
    ])

    const results: RollingStats = { total, weekly }

    await saveAnalyticsCache(results)
    return results
  } catch (error) {
    console.error('GA4 All Metrics Fetch Error:', error)
    return emptyStats
  }
}

// Wrapper for manual/admin refresh that bypasses cache
export async function refreshAnalyticsCache(): Promise<RollingStats> {
  console.log('Refreshing analytics cache from GA4...')
  return await fetchAllPostMetrics(true)
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

export async function getTotalPageViews() {
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
