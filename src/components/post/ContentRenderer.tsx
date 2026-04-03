'use client'

import React from 'react'
import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { NotionBlockRenderer } from './NotionBlockRenderer'

interface ContentRendererProps {
  blocks: BlockObjectResponse[] | null
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return (
      <div className="py-20 text-center text-zinc-400 font-medium italic">
        Content is currently unavailable or being synchronized...
      </div>
    )
  }

  return (
    <div className="notion-content">
      <NotionBlockRenderer blocks={blocks} isRoot={true} />
    </div>
  )
}

export default ContentRenderer
