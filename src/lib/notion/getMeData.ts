import { me } from '@/src/config/me'
import { getProjects } from '@/src/lib/apis/getProjects'

/**
 * Fetch dynamic data from Notion and merge with hardcoded me config.
 * Currently fetches: Projects.
 */
export async function getMeData() {
  try {
    const notionProjects = await getProjects()
    
    // Merge Notion projects with hardcoded static info
    return {
      ...me,
      projects: {
        employee: notionProjects.employee.length > 0 ? notionProjects.employee : me.projects.employee,
        freelancer: notionProjects.freelancer.length > 0 ? notionProjects.freelancer : me.projects.freelancer,
        openSource: notionProjects.openSource.length > 0 ? notionProjects.openSource : me.projects.openSource,
        other: notionProjects.other.length > 0 ? notionProjects.other : me.projects.other,
      },
    }
  } catch (error) {
    // Fallback to hardcoded data on error
    return me
  }
}
