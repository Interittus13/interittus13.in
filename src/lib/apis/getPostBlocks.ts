import notion from '@/src/lib/notion/client'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { getSecureProxyUrl } from '../utils/secure-proxy'

/**
 * Traverses blocks and secures any file/image URLs with proxy tokens.
 */
function traverseAndSecureBlocks(blocks: BlockObjectResponse[]): BlockObjectResponse[] {
  return blocks.map((block: any) => {
    // Handle image type
    if (block.type === 'image') {
      const img = block.image
      if (img.type === 'external' && img.external.url) {
        img.external.url = getSecureProxyUrl(img.external.url)
      } else if (img.type === 'file' && img.file.url) {
        img.file.url = getSecureProxyUrl(img.file.url)
      }
    }
    
    // Handle video type
    if (block.type === 'video') {
      const vid = block.video
      if (vid.type === 'external' && vid.external.url) {
        vid.external.url = getSecureProxyUrl(vid.external.url)
      } else if (vid.type === 'file' && vid.file.url) {
        vid.file.url = getSecureProxyUrl(vid.file.url)
      }
    }

    // Handle file type
    if (block.type === 'file') {
      const file = block.file
      if (file.type === 'external' && file.external.url) {
        file.external.url = getSecureProxyUrl(file.external.url)
      } else if (file.type === 'file' && file.file.url) {
        file.file.url = getSecureProxyUrl(file.file.url)
      }
    }

    // Handle nested children
    if (block.__children && Array.isArray(block.__children)) {
      block.__children = traverseAndSecureBlocks(block.__children)
    }

    return block
  })
}

/**
 * Recursively fetch all child blocks for a page.
 * Notion API paginates and some block types (toggle, column_list, etc.) have child blocks.
 */
async function fetchBlocksRecursively(blockId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = []
  let cursor: string | undefined = undefined

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    })

    for (const block of response.results as BlockObjectResponse[]) {
      blocks.push(block)
      // Recursively fetch children for container-type blocks
      if (
        block.has_children &&
        [
          'toggle',
          'bulleted_list_item',
          'numbered_list_item',
          'quote',
          'callout',
          'column_list',
          'column',
          'synced_block',
          'template',
          'to_do',
          'table',
          'paragraph',
        ].includes(block.type)
      ) {
        const children = await fetchBlocksRecursively(block.id)
          ; (block as any).__children = children
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return blocks
}

/**
 * Fetch all blocks for a Notion page, recursively including nested children.
 */
export const getPostBlocks = async (pageId: string): Promise<BlockObjectResponse[] | null> => {
  if (!pageId || pageId === 'undefined') {
    return null
  }

  try {
    const blocks = await fetchBlocksRecursively(pageId)
    // Secure all file URLs before sending to client
    return traverseAndSecureBlocks(blocks)
  } catch (error) {
    return null
  }
}
