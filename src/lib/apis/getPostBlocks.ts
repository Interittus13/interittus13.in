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
    return blocks
  } catch (error) {
    return null
  }
}
