import { Client } from '@notionhq/client'
import { REVALIDATE } from '@/src/config/blog'

// Singleton Notion client using the official API
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  fetch: (url: string | URL, init: RequestInit | undefined) => {
    return globalThis.fetch(url, {
      ...init,
      next: { revalidate: REVALIDATE } as any,
    })
  },
})

export default notion
