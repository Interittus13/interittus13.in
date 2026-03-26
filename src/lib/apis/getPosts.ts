import { fetchNotionPages, richTextToPlainText } from '../notion/fetchNotionDatabase'
import { TPost } from '../../types'

/**
 * Extracts the URL from a Notion file object.
*/
const normalizeSignedUrl = (url?: string): string | undefined =>
  typeof url === 'string'
    ? url.replace(/\s+/g, '').replace(/&amp;/g, '&')
    : undefined

const getNotionImage = (file: any): string | undefined => {
  if (!file) return undefined

  // External images
  if (file.external?.url) {
    return normalizeSignedUrl(file.external.url)
  }

  // Notion-hosted images
  if (file.file?.url) {
    return normalizeSignedUrl(file.file.url)
  }

  return undefined
}

/**
 * Fetch all published posts from the Notion database using the official API.
 * Defaults to fetching items with type === 'Post'.
 */
export async function getPosts(): Promise<TPost[]> {
  const pages = await fetchNotionPages(process.env.NOTION_DATABASE_ID, 'Post')

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

    // status property (single select)
    const statusSelect = props['status']?.type === 'select'
      ? (props['status'] as any).select?.name
      : undefined
    const status: TPost['status'] = statusSelect ? [statusSelect] : ['Private']

    // tags property (multi-select)
    const tags: string[] = props['tags']?.type === 'multi_select'
      ? (props['tags'] as any).multi_select.map((s: any) => s.name)
      : []

    // category property (single select)
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
      ? getNotionImage(thumbnailFiles[0])
      : getNotionImage(page.cover)

    // SEO properties
    const seoTitle = richTextToPlainText(
      props['SEO Title']?.type === 'rich_text' ? (props['SEO Title'] as any).rich_text : []
    )
    const seoDescription = richTextToPlainText(
      props['SEO Description']?.type === 'rich_text' ? (props['SEO Description'] as any).rich_text : []
    )

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
      seoTitle,
      seoDescription,
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
