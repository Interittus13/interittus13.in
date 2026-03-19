import { Client } from '@notionhq/client'

// Singleton Notion client using the official API
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  fetch: globalThis.fetch,
})

export default notion
