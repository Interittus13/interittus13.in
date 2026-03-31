import { fetchNotionPages, richTextToPlainText } from '../notion/fetchNotionDatabase'
import { Project } from '../../types'
import { ensureAbsoluteUrl } from '../utils/url'

/**
 * Fetch all projects from the DEDICATED Project database.
 * No type filter needed if the database is projects-only.
 */
export async function getProjects(): Promise<{
  employee: Project[]
  freelancer: Project[]
  openSource: Project[]
  other: Project[]
}> {
  const databaseId = process.env.NOTION_PROJECT_DATABASE_ID
  const pages = await fetchNotionPages(databaseId)

  const projects: Project[] = pages.map((page) => {
    const props = page.properties

    // Map to specific "Project" schema properties (handling case-insensitively for robustness)
    const name = richTextToPlainText(
      (props['project_name'] || props['Project_name'])?.type === 'title' 
        ? ((props['project_name'] || props['Project_name']) as any).title 
        : []
    )

    const description = richTextToPlainText(
      props['description']?.type === 'rich_text' ? (props['description'] as any).rich_text : []
    )

    // Link: Support 'url' or 'slug'
    const linkProp = (props['url'] || props['slug']) as any
    const rawLink = richTextToPlainText(
      linkProp?.type === 'url' ? [{ plain_text: linkProp.url }] : linkProp?.rich_text || []
    )
    const link = ensureAbsoluteUrl(rawLink)

    const tip = richTextToPlainText(
      props['tip']?.type === 'rich_text' ? (props['tip'] as any).rich_text : []
    )

    const tags = props['tags']?.type === 'multi_select'
      ? (props['tags'] as any).multi_select.map((s: any) => s.name)
      : []

    const category = props['category']?.type === 'select'
      ? (props['category'] as any).select?.name
      : 'Other'

    const spotlight = props['spotlight']?.type === 'checkbox'
      ? (props['spotlight'] as any).checkbox
      : false

    // Cover Image
    const coverFiles = props['cover']?.type === 'files'
      ? (props['cover'] as any).files
      : []
    const image = coverFiles.length > 0
      ? (coverFiles[0]?.file?.url ?? coverFiles[0]?.external?.url ?? undefined)
      : (page.cover as any)?.external?.url ?? (page.cover as any)?.file?.url ?? undefined

    // Logo Image
    const logoFiles = props['logo']?.type === 'files'
      ? (props['logo'] as any).files
      : []
    const logoUrl = logoFiles.length > 0
      ? (logoFiles[0]?.file?.url ?? logoFiles[0]?.external?.url ?? undefined)
      : image // Fallback to cover if logo is missing

    const logo = {
      light: logoUrl || "/static/images/portfolio/code.svg",
      dark: logoUrl || "/static/images/portfolio/code.svg",
    }

    return {
      name,
      description,
      link,
      image,
      logo,
      tip,
      tags,
      spotlight,
      category,
    } as any
  })

  return {
    employee: projects.filter((p: any) => p.category === 'Employee'),
    freelancer: projects.filter((p: any) => p.category === 'Freelancer'),
    openSource: projects.filter((p: any) => p.category === 'Open Source'),
    other: projects.filter((p: any) => p.category !== 'Employee' && p.category !== 'Open Source' && p.category !== 'Freelancer'),
  }
}
