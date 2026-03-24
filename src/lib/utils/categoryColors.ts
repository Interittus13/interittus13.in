/**
 * Simple utility to map category names to Tailwind CSS color classes.
 * This replaces the complex and opaque Colors/getColorClassByName system.
 */

const CATEGORY_COLOR_MAP: Record<string, string> = {
  DevOps: 'text-orange-500',
  Cloud: 'text-blue-500',
  Infrastructure: 'text-emerald-500',
  Azure: 'text-cyan-500',
  AWS: 'text-amber-500',
  Kubernetes: 'text-indigo-500',
  Terraform: 'text-purple-500',
  Docker: 'text-blue-400',
  SRE: 'text-emerald-500',
  Security: 'text-rose-500',
  Monitoring: 'text-rose-400',
  Automation: 'text-violet-500',
  Linux: 'text-zinc-600 dark:text-zinc-400',
  Personal: 'text-zinc-500',
  Other: 'text-zinc-400',
}

const CATEGORY_BG_MAP: Record<string, string> = {
  DevOps: 'bg-orange-500',
  Cloud: 'bg-blue-500',
  Infrastructure: 'bg-emerald-500',
  Azure: 'bg-cyan-500',
  AWS: 'bg-amber-500',
  Kubernetes: 'bg-indigo-500',
  Terraform: 'bg-purple-500',
  Docker: 'bg-blue-400',
  SRE: 'bg-emerald-500',
  Security: 'bg-rose-500',
  Monitoring: 'bg-rose-400',
  Automation: 'bg-violet-500',
  Other: 'bg-zinc-400',
}

const TEXT_COLORS = [
  'text-orange-500',
  'text-blue-500',
  'text-emerald-500',
  'text-cyan-500',
  'text-amber-500',
  'text-indigo-500',
  'text-purple-500',
  'text-rose-500',
  'text-violet-500',
]

const BG_COLORS = [
  'bg-orange-500',
  'bg-blue-500',
  'bg-emerald-500',
  'bg-cyan-500',
  'bg-amber-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-rose-500',
  'bg-violet-500',
]

const getSimpleHash = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash)
}

export const getCategoryTextColor = (category: string = 'Other'): string => {
  if (CATEGORY_COLOR_MAP[category]) return CATEGORY_COLOR_MAP[category]
  return TEXT_COLORS[getSimpleHash(category) % TEXT_COLORS.length]
}

export const getCategoryBgColor = (category: string = 'Other'): string => {
  if (CATEGORY_BG_MAP[category]) return CATEGORY_BG_MAP[category]
  return BG_COLORS[getSimpleHash(category) % BG_COLORS.length]
}
