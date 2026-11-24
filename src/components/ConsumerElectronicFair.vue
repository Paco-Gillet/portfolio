<script setup lang="ts">
import { computed } from 'vue'
import { projects } from '@/data/projects'
import ProjectDetailLayout from '@/components/ProjectDetailLayout.vue'
import { useTranslate } from '@/utils/i18n'

const project = computed(() => projects.find(p => p.id === 'consumer-electronic-fair'))
const { translate } = useTranslate()
</script>

<template>
  <ProjectDetailLayout v-if="project" :project="project">
    <template #highlight>
      <div class="text-base sm:text-lg font-medium text-emerald-600 dark:text-emerald-400 italic border-l-4 border-emerald-500 pl-4 py-1 leading-snug">
        "{{ $t('projects_cef_tagline') }}"
      </div>
    </template>

    <div class="space-y-6">
      <p class="text-base text-(--text-secondary) leading-relaxed">
        {{ $t('projects_cef_details_p1') }}
      </p>

      <!-- Centralized Skills list: sober colored icon + long title -->
      <div class="pt-4 border-t border-zinc-500/15 space-y-3">
        <h3 class="text-base sm:text-lg font-bold text-(--text-primary) font-['Montserrat'] flex items-center gap-2">
          <i class="pi pi-check-circle text-emerald-500"></i>
          <span>{{ $t('projects_skills_acquired_title') }}</span>
        </h3>
        <div class="flex flex-wrap gap-2.5">
          <span
            v-for="skill in project?.skills"
            :key="skill.id"
            class="project-tag px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2"
          >
            <i :class="[skill.icon, skill.iconColor || 'text-emerald-500', 'text-xs']"></i>
            <span class="text-(--text-primary)">{{ translate(skill.longTitleKey) }}</span>
          </span>
        </div>
      </div>
    </div>
  </ProjectDetailLayout>
</template>

<style scoped>
</style>
