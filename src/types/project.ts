import type { SkillItem } from '@/types/skill'

export interface ProjectItem {
  id: string
  routeName: string
  titleKey: string
  author: string
  descriptionKey: string
  period: string
  logo: string
  logoAltKey: string
  skills: SkillItem[]
  categoryKey?: string
  externalUrl?: string
  externalLabelKey?: string
}
