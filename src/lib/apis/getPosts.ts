import notion from '@/src/lib/notion/client'
import { TPost } from '../../types'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

/**
 * Extract plain text from Notion rich text array
 */
function richTextToPlainText(richText: any[]): string {
  return richText?.map((t: any) => t.plain_text).join('') ?? ''
}

/**
 * Fetch all published posts from the Notion database using the official API.
 */
export async function getPosts(): Promise<TPost[]> {
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!databaseId) {
    console.warn('NOTION_DATABASE_ID is not set. Returning empty posts array.')
    return []
  }

  const pages: PageObjectResponse[] = []
  let cursor: string | undefined = undefined

  // Paginate through all results
  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
    })
    pages.push(...(response.results as PageObjectResponse[]))
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  const posts: TPost[] = pages.map((page) => {
    const props = page.properties

    // title property
    const title = richTextToPlainText(
      props['title']?.type === 'title' ? (props['title'] as any).title : []
    )

    // slug property
    const slug = richTextToPlainText(
      props['slug']?.type === 'rich_text' ? (props['slug'] as any).rich_text : []
    )

    // summary property
    const summary = richTextToPlainText(
      props['summary']?.type === 'rich_text' ? (props['summary'] as any).rich_text : []
    )

    // status property (single select) — wrap in array for TPost compatibility
    const statusSelect = props['status']?.type === 'select'
      ? (props['status'] as any).select?.name
      : undefined
    const status: TPost['status'] = statusSelect ? [statusSelect] : ['Private']

    // tags property (multi-select)
    const tags: string[] = props['tags']?.type === 'multi_select'
      ? (props['tags'] as any).multi_select.map((s: any) => s.name)
      : []

    // category property (single select — wrapped in array for TPost compatibility)
    const categorySelect = props['category']?.type === 'select'
      ? (props['category'] as any).select?.name
      : undefined
    const category: string[] = categorySelect ? [categorySelect] : []

    // date property
    const dateStart = props['date']?.type === 'date'
      ? (props['date'] as any).date?.start
      : null
    const startDate = dateStart ?? page.created_time.split('T')[0]

    // thumbnail (files property)
    const thumbnailFiles = props['thumbnail']?.type === 'files'
      ? (props['thumbnail'] as any).files
      : []
    const thumbnail = thumbnailFiles.length > 0
      ? (thumbnailFiles[0]?.file?.url ?? thumbnailFiles[0]?.external?.url ?? undefined)
      : (page.cover as any)?.external?.url ?? (page.cover as any)?.file?.url ?? undefined

    return {
      id: page.id,
      title,
      slug: slug || page.id,
      summary,
      status,
      tags,
      category,
      date: { start_date: startDate },
      createdTime: page.created_time,
      fullWidth: false,
      thumbnail,
    } satisfies TPost
  })

  // Sort by date descending
  posts.sort((a, b) => {
    const da = new Date(a.date.start_date || a.createdTime).getTime()
    const db = new Date(b.date.start_date || b.createdTime).getTime()
    return db - da
  })

  return posts
}