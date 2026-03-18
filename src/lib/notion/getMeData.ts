import { me } from '@/src/config/me'

export async function getMeData() {
  // Returns the hardcoded me config data.
  // To fetch data dynamically from Notion in future, use @notionhq/client here.
  return me
}
