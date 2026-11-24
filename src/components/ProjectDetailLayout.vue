<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTranslate } from '@/utils/i18n'
import type { ProjectItem } from '@/types/project'

defineProps<{
  project: ProjectItem
}>()

const router = useRouter()
const { translate } = useTranslate()

function goBack() {
  router.push({ name: 'projects' })
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 pt-8 pb-16">
    <!-- Top Bar with Back Button and External Link -->
    <div class="mb-6 flex items-center justify-between gap-4">
      <Button
        variant="text"
        icon="pi pi-arrow-left"
        :label="$t('projects_back_button')"
        class="p-0! text-sm! text-(--text-secondary) hover:text-emerald-500 cursor-pointer"
        @click="goBack"
      />

      <Button
        v-if="project.externalUrl"
        as="a"
        :href="project.externalUrl"
        target="_blank"
        rel="noopener noreferrer"
        icon="pi pi-external-link"
        variant="outlined"
        size="small"
        rounded
        :label="translate(project.externalLabelKey) || $t('projects_view_details')"
        class="text-xs! cursor-pointer hover:border-emerald-500 hover:text-emerald-500"
      />
    </div>

    <!-- Project Header Banner (static card, no skill badges in header) -->
    <header class="project-card rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <!-- Logo -->
      <component
        :is="project.externalUrl ? 'a' : 'div'"
        :href="project.externalUrl"
        :target="project.externalUrl ? '_blank' : undefined"
        :rel="project.externalUrl ? 'noopener noreferrer' : undefined"
        class="w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-zinc-500/10 border border-zinc-500/20 flex items-center justify-center transition-transform hover:scale-105"
        :title="project.externalUrl ? (translate(project.externalLabelKey) || $t('projects_view_details')) : undefined"
      >
        <img
          :src="project.logo"
          :alt="translate(project.logoAltKey)"
          class="w-full h-full object-contain"
        />
      </component>

      <div class="flex-1 text-center sm:text-left min-w-0">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <!-- Title (clickable with link if externalUrl exists) -->
          <h1 class="text-2xl sm:text-3xl font-extrabold text-(--text-primary) font-['Montserrat'] truncate">
            <a
              v-if="project.externalUrl"
              :href="project.externalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-emerald-500 transition-colors inline-flex items-center gap-2 group/title"
              :title="translate(project.externalLabelKey) || $t('projects_view_details')"
            >
              <span>{{ translate(project.titleKey) }}</span>
              <i class="pi pi-external-link text-sm opacity-60 group-hover/title:opacity-100"></i>
            </a>
            <span v-else>{{ translate(project.titleKey) }}</span>
          </h1>

          <div class="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-(--text-secondary) font-medium px-2.5 py-1 rounded-md bg-zinc-500/10 border border-zinc-500/15 w-fit mx-auto sm:mx-0 shrink-0">
            <i class="pi pi-calendar text-[11px] opacity-75"></i>
            <span>{{ translate(project.period) }}</span>
          </div>
        </div>

        <p class="text-sm text-(--text-secondary) mt-1">
          {{ $t('projects_by_author') }} {{ translate(project.author) }}
          <span v-if="project.categoryKey"> • {{ translate(project.categoryKey) }}</span>
        </p>

        <!-- Optional Header Stats / Actions Slot -->
        <slot name="header-meta" />
      </div>
    </header>

    <!-- Main Content Container (static card, does NOT move or elevate on hover) -->
    <main class="project-card rounded-2xl p-6 sm:p-8 space-y-6">
      <!-- Highlight quote slot -->
      <slot name="highlight" />

      <!-- Body content slot -->
      <slot />

      <!-- Extra content slot (e.g., gallery, live demo, etc.) -->
      <slot name="extra" />
    </main>
  </div>
</template>

<style scoped>
</style>
