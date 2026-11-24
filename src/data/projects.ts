import type { ProjectItem } from '@/types/project'
import { getSkillsByIds } from '@/data/skills'
import pacpackLogo from '@/assets/img/projects/pacpack-quests.png'
import cefLogo from '@/assets/img/projects/consumer-electronic-fair.png'

export const projects: ProjectItem[] = [
  {
    id: 'pacpack-quests',
    routeName: 'pacpack-quests',
    titleKey: 'projects_pacpack_title',
    author: 'Paco',
    descriptionKey: 'projects_pacpack_desc',
    period: 'projects_pacpack_period',
    logo: pacpackLogo,
    logoAltKey: 'projects_pacpack_logo_alt',
    categoryKey: 'projects_category_modding',
    externalUrl: 'https://modrinth.com/project/NOcpXars',
    externalLabelKey: 'projects_view_on_modrinth',
    skills: getSkillsByIds(['java', 'fabric-neoforge', 'gui-ux', 'network-sync', 'ai-agents'])
  },
  {
    id: 'consumer-electronic-fair',
    routeName: 'consumer-electronic-fair',
    titleKey: 'projects_cef_title',
    author: 'Paco, Camilo, Valentin',
    descriptionKey: 'projects_cef_desc',
    period: '2025',
    logo: cefLogo,
    logoAltKey: 'projects_cef_logo_alt',
    categoryKey: 'projects_category_web',
    skills: getSkillsByIds(['vuejs', 'typescript', 'symfony', 'rest-jwt', 'tailwind'])
  }
]
