<<<<<<< HEAD
import { NotionAPI } from 'notion-client'
import { idToUuid } from 'notion-utils'
import getAllPageIds from './getAllPageIds'
import { getPageProperties } from './getPageProperties'
import { TPost } from '../../types'

export async function getPosts() {
  let id = process.env.NOTION_PAGE_ID as string
  const api = new NotionAPI()

  const response = await api.getPage(id)

  id = idToUuid(id)
  const collection = Object.values(response.collection)[0]?.value
  const block = response.block

  const schema = collection?.schema

  const rawMetadata = block[id].value

  // Check Type
  if (
    rawMetadata?.type !== 'collection_view_page' &&
    rawMetadata?.type !== 'collection_view'
  ) {
    return []
  } else {
    // Construct Data
    const pageIds = getAllPageIds(response)
    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i]
      const properties = (await getPageProperties(id, block, schema)) || null
      // Add fullwidth, createdtime to properties
      properties.createdTime = new Date(
        block[id].value?.created_time
      ).toString()
      properties.fullWidth =
        (block[id].value?.format as any)?.page_full_width ?? false

      data.push(properties)
    }

    // Sort by date
    data.sort((a: any, b: any) => {
      const dateA: any = new Date(a?.date?.start_date || a.createdTime)
      const dateB: any = new Date(b?.date?.start_date || b.createdTime)
      return dateB - dateA
    })

    return data as TPost[]
  }
}
=======
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"
import getAllPageIds from "./getAllPageIds"
import { getPageProperties } from "./getPageProperties"
import { TPost } from "../../types"
import { CONFIG } from "../../../config/blog"

/**
 * Type guard to check if an object is a valid TPost
 */
const isValidPost = (post: unknown): post is TPost => {
  if (!post || typeof post !== "object") return false
  const p = post as TPost

  return (
    typeof p.id === "string" &&
    typeof p.slug === "string" &&
    typeof p.title === "string" &&
    typeof p.createdTime === "string" &&
    typeof p.fullWidth === "boolean" &&
    p.date?.start_date &&
    typeof p.date.start_date === "string" &&
    Array.isArray(p.status) &&
    p.status.every(s => s === "Public" || s === "Private")
  )
}

export const getPosts = async (): Promise<TPost[]> => {
  try {
    const api = new NotionAPI()
    const pageId = idToUuid(CONFIG.NOTION_PAGE_ID)

    const response = await api.getPage(pageId)
    const block = response.block ?? {}
    const collection = Object.values(response.collection ?? {})[0]?.value
    const schema = collection?.schema

    const rawMetadata = block[pageId]?.value
    const isCollectionView =
      rawMetadata?.type === "collection_view" ||
      rawMetadata?.type === "collection_view_page"

    if (!isCollectionView) return []

    const pageIds = getAllPageIds(response)

    const posts = await Promise.all(
      pageIds.map(async (id) => {
        try {
          const properties = await getPageProperties(id, block, schema)
          if (!properties) return null

          const createdTime = block[id]?.value?.created_time
          const fullWidth = Boolean(block[id]?.value?.format?.page_full_width)

          const enriched: TPost = {
            ...properties,
            id,
            createdTime: new Date(createdTime).toISOString(),
            fullWidth,
          }

          return isValidPost(enriched) ? enriched : null
        } catch (err) {
          console.warn(`[getPosts] Failed to process page ${id}:`, err)
          return null
        }
      })
    )

    return posts
      .filter((p): p is TPost => p !== null)
      .sort((a, b) => {
        const dateA = new Date(a.date?.start_date ?? a.createdTime).getTime()
        const dateB = new Date(b.date?.start_date ?? b.createdTime).getTime()
        return dateB - dateA
      })

  } catch (err) {
    console.error("[getPosts] Failed:", err)
    return []
  }
}
>>>>>>> d9a87f57ecf39d0c8edfc5a86eb2e6075acbfe03
