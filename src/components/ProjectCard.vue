<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTranslate } from '@/utils/i18n'
import type { ProjectItem } from '@/types/project'

const props = defineProps<{
  project: ProjectItem
}>()

const router = useRouter()
const { translate } = useTranslate()

function navigateToProject() {
  router.push({ name: props.project.routeName })
}
</script>

<template>
  <div
    class="project-card project-card-interactive group relative rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    role="button"
    tabindex="0"
    @click="navigateToProject"
    @keydown.enter.prevent="navigateToProject"
    @keydown.space.prevent="navigateToProject"
  >
    <!-- Left Logo section -->
    <div class="w-18 h-18 sm:w-22 sm:h-22 shrink-0 rounded-xl overflow-hidden bg-zinc-500/10 border border-zinc-500/20 flex items-center justify-center">
      <img
        :src="project.logo"
        :alt="translate(project.logoAltKey)"
        class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>

    <!-- Right Content section -->
    <div class="flex-1 min-w-0 flex flex-col justify-between">
      <!-- Header row: title/author on the left, period in top-right -->
      <div>
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h2 class="text-lg sm:text-xl font-bold tracking-tight text-(--text-primary) group-hover:text-emerald-500 transition-colors truncate">
              {{ translate(project.titleKey) }}
            </h2>
            <div class="text-xs sm:text-sm text-(--text-secondary) font-normal flex items-center gap-1.5 mt-0.5">
              <span>{{ $t('projects_by_author') }} {{ translate(project.author) }}</span>
              <template v-if="project.categoryKey">
                <span>•</span>
                <span>{{ translate(project.categoryKey) }}</span>
              </template>
            </div>
          </div>

          <!-- Top-right corner: Dev period / year -->
          <div
            class="shrink-0 flex items-center gap-1.5 text-xs text-(--text-secondary) font-medium px-2.5 py-1 rounded-md bg-zinc-500/10 border border-zinc-500/15"
            :title="translate(project.period)"
          >
            <i class="pi pi-calendar text-[11px] opacity-75"></i>
            <span>{{ translate(project.period) }}</span>
          </div>
        </div>

        <!-- Description -->
        <p class="text-sm text-(--text-secondary) mt-2 leading-relaxed line-clamp-2">
          {{ translate(project.descriptionKey) }}
        </p>
      </div>

      <!-- Skills bottom row: colored icon + short title (sober and compact) -->
      <div class="flex flex-wrap items-center gap-2 mt-3 pt-1">
        <span
          v-for="skill in project.skills"
          :key="skill.id"
          class="project-tag flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
        >
          <i :class="[skill.icon, skill.iconColor || 'text-emerald-500', 'text-[11px]']"></i>
          <span>{{ translate(skill.shortTitleKey) }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Utility for 2-line clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
