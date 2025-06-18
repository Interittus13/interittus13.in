import { NotionAPI } from "notion-client"

export const getPostBlocks = async (id: string) => {
  const api = new NotionAPI()
  const recordMap = await api.getPage(id)
  return recordMap
}
