import { NotionAPI } from "notion-client"

export async function getPostBlocks(id: string) {
  const api = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER,
    authToken: process.env.NOTION_TOKEN_V2
  })
  const pageBlock = await api.getPage(id)
  return pageBlock
}
