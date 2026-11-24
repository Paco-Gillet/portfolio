import type { SkillItem } from '@/types/skill'

export const skills: SkillItem[] = [
  {
    id: 'java',
    shortTitleKey: 'skills_java_short',
    longTitleKey: 'skills_java_long',
    icon: 'pi pi-code',
    iconColor: 'text-amber-500',
    categoryKey: 'skills_cat_languages'
  },
  {
    id: 'vuejs',
    shortTitleKey: 'skills_vuejs_short',
    longTitleKey: 'skills_vuejs_long',
    icon: 'pi pi-desktop',
    iconColor: 'text-emerald-500',
    categoryKey: 'skills_cat_frontend'
  },
  {
    id: 'typescript',
    shortTitleKey: 'skills_typescript_short',
    longTitleKey: 'skills_typescript_long',
    icon: 'pi pi-file-edit',
    iconColor: 'text-sky-500',
    categoryKey: 'skills_cat_languages'
  },
  {
    id: 'symfony',
    shortTitleKey: 'skills_symfony_short',
    longTitleKey: 'skills_symfony_long',
    icon: 'pi pi-server',
    iconColor: 'text-violet-500',
    categoryKey: 'skills_cat_backend'
  },
  {
    id: 'php',
    shortTitleKey: 'skills_php_short',
    longTitleKey: 'skills_php_long',
    icon: 'pi pi-code',
    iconColor: 'text-indigo-500',
    categoryKey: 'skills_cat_languages'
  },
  {
    id: 'ai-agents',
    shortTitleKey: 'skills_ai_agents_short',
    longTitleKey: 'skills_ai_agents_long',
    icon: 'pi pi-microchip-ai',
    iconColor: 'text-purple-400',
    categoryKey: 'skills_cat_tools'
  },
  {
    id: 'fabric-neoforge',
    shortTitleKey: 'skills_fabric_neoforge_short',
    longTitleKey: 'skills_fabric_neoforge_long',
    icon: 'pi pi-box',
    iconColor: 'text-amber-600',
    categoryKey: 'skills_cat_modding'
  },
  {
    id: 'gui-ux',
    shortTitleKey: 'skills_gui_ux_short',
    longTitleKey: 'skills_gui_ux_long',
    icon: 'pi pi-palette',
    iconColor: 'text-pink-500',
    categoryKey: 'skills_cat_frontend'
  },
  {
    id: 'network-sync',
    shortTitleKey: 'skills_network_sync_short',
    longTitleKey: 'skills_network_sync_long',
    icon: 'pi pi-sync',
    iconColor: 'text-cyan-500',
    categoryKey: 'skills_cat_backend'
  },
  {
    id: 'rest-jwt',
    shortTitleKey: 'skills_rest_jwt_short',
    longTitleKey: 'skills_rest_jwt_long',
    icon: 'pi pi-lock',
    iconColor: 'text-rose-500',
    categoryKey: 'skills_cat_backend'
  },
  {
    id: 'tailwind',
    shortTitleKey: 'skills_tailwind_short',
    longTitleKey: 'skills_tailwind_long',
    icon: 'pi pi-sparkles',
    iconColor: 'text-teal-400',
    categoryKey: 'skills_cat_frontend'
  },
  {
    id: 'git',
    shortTitleKey: 'skills_git_short',
    longTitleKey: 'skills_git_long',
    icon: 'pi pi-github',
    iconColor: 'text-orange-500',
    categoryKey: 'skills_cat_tools'
  },
  {
    id: 'python',
    shortTitleKey: 'skills_python_short',
    longTitleKey: 'skills_python_long',
    icon: 'pi pi-code',
    iconColor: 'text-yellow-500',
    categoryKey: 'skills_cat_languages'
  },
  {
    id: 'sql-db',
    shortTitleKey: 'skills_sql_db_short',
    longTitleKey: 'skills_sql_db_long',
    icon: 'pi pi-database',
    iconColor: 'text-blue-500',
    categoryKey: 'skills_cat_backend'
  }
]

export const skillsMap = skills.reduce<Record<string, SkillItem>>((acc, skill) => {
  acc[skill.id] = skill
  return acc
}, {})

export function getSkillsByIds(ids: string[]): SkillItem[] {
  return ids.map(id => skillsMap[id]).filter((s): s is SkillItem => s !== undefined)
}
