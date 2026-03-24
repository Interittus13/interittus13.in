import notion from '@/src/lib/notion/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

/**
 * Fetch all pages from the Notion database with a specific type filter.
 */
export async function fetchNotionPages(databaseId?: string, type?: string): Promise<PageObjectResponse[]> {
  const finalDatabaseId = databaseId || process.env.NOTION_DATABASE_ID
  if (!finalDatabaseId) {
    return []
  }

  const pages: PageObjectResponse[] = []
  let cursor: string | undefined = undefined

  try {
    do {
      const response = await notion.databases.query({
        database_id: finalDatabaseId,
        start_cursor: cursor,
        page_size: 100,
        filter: type ? {
          property: 'type',
          select: {
            equals: type,
          },
        } : undefined,
      })
      pages.push(...(response.results as PageObjectResponse[]))
      cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
    } while (cursor)
  } catch (error) {
    return []
  }

  return pages
}

/**
 * Helper to extract plain text from Notion rich text array
 */
export function richTextToPlainText(richText: any[]): string {
  return richText?.map((t: any) => t.plain_text).join('') ?? ''
}
