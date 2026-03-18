import notion from '@/src/lib/notion/client'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

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
        (block.type === 'toggle' ||
          block.type === 'bulleted_list_item' ||
          block.type === 'numbered_list_item' ||
          block.type === 'quote' ||
          block.type === 'callout' ||
          block.type === 'column_list' ||
          block.type === 'column' ||
          block.type === 'synced_block' ||
          block.type === 'template' ||
          block.type === 'to_do' ||
          block.type === 'paragraph')
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
    console.warn('Invalid pageId provided to getPostBlocks.')
    return null
  }

  try {
    const blocks = await fetchBlocksRecursively(pageId)
    return blocks
  } catch (error) {
    console.error('Failed to fetch post blocks:', error)
    return null
  }
}
