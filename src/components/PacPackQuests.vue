<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {projects} from '@/data/projects'
import ProjectDetailLayout from '@/components/ProjectDetailLayout.vue'
import type {ModrinthProject} from '@/types/modrinth'
import {renderMarkdown} from '@/utils/markdown'
import {useTranslate} from '@/utils/i18n'

const { locale } = useI18n()
const { translate } = useTranslate()
const project = computed(() => projects.find(p => p.id === 'pacpack-quests'))

const modrinthData = ref<ModrinthProject | null>(null)
const isLoading = ref(true)
const fetchError = ref(false)

const formattedUpdatedDate = computed(() => {
  if (!modrinthData.value?.updated) return ''
  try {
    const date = new Date(modrinthData.value.updated)
    return new Intl.DateTimeFormat(locale.value === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  } catch {
    return modrinthData.value.updated
  }
})

const renderedBody = computed(() => {
  if (!modrinthData.value?.body) return ''
  return renderMarkdown(modrinthData.value.body)
})

onMounted(async () => {
  try {
    const response = await fetch('https://api.modrinth.com/v2/project/NOcpXars', {
      headers: {
        'Accept': 'application/json'
      }
    })
    if (!response.ok) {
      console.error(`Failed to fetch Modrinth project: ${response.status} ${response.statusText}`)
      fetchError.value = true
      return
    }
    modrinthData.value = await response.json()
  } catch (err) {
    console.error('Error fetching Modrinth project data:', err)
    fetchError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <ProjectDetailLayout v-if="project" :project="project">
    <!-- Header Meta: Live Modrinth Stats (with Last Updated Date) -->
    <template #header-meta>
      <div v-if="modrinthData" class="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 pt-2 border-t border-zinc-500/15 text-xs text-(--text-secondary)">
        <span class="flex items-center gap-1.5" :title="`${modrinthData.downloads} ${$t('projects_modrinth_stats_downloads')}`">
          <i class="pi pi-download text-emerald-500"></i>
          <span class="font-semibold text-(--text-primary)">{{ modrinthData.downloads.toLocaleString() }}</span>
          <span>{{ $t('projects_modrinth_stats_downloads') }}</span>
        </span>

        <span class="flex items-center gap-1.5" :title="`${modrinthData.followers} ${$t('projects_modrinth_stats_followers')}`">
          <i class="pi pi-heart text-rose-500"></i>
          <span class="font-semibold text-(--text-primary)">{{ modrinthData.followers }}</span>
          <span>{{ $t('projects_modrinth_stats_followers') }}</span>
        </span>

        <!-- Last Updated Date -->
        <span v-if="formattedUpdatedDate" class="flex items-center gap-1.5" :title="$t('projects_last_updated')">
          <i class="pi pi-history text-cyan-500"></i>
          <span>{{ $t('projects_last_updated') }} : <strong class="text-(--text-primary)">{{ formattedUpdatedDate }}</strong></span>
        </span>
      </div>
    </template>

    <!-- Tagline Highlight -->
    <template #highlight>
      <blockquote class="text-base sm:text-lg font-medium text-emerald-600 dark:text-emerald-400 italic border-l-4 border-emerald-500 pl-4 py-1 leading-snug">
        "{{ $t('projects_pacpack_tagline') }}"
      </blockquote>
    </template>

    <!-- Section 1: Technical Portfolio Overview -->
    <section class="space-y-6">
      <div class="space-y-3">
        <h2 class="text-xl sm:text-2xl font-bold text-(--text-primary) font-['Montserrat'] flex items-center gap-2">
          <i class="pi pi-code text-emerald-500"></i>
          <span>{{ $t('projects_tech_overview_title') }}</span>
        </h2>
        <p class="text-base text-(--text-secondary) leading-relaxed">
          {{ $t('projects_pacpack_tech_intro') }}
        </p>
      </div>

      <!-- Technical Pillars Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div class="p-4 rounded-xl border border-zinc-500/20 bg-zinc-500/5 space-y-2">
          <div class="flex items-center gap-2 text-emerald-500 font-semibold text-sm">
            <i class="pi pi-desktop"></i>
            <span>{{ $t('projects_pacpack_tech_gui') }}</span>
          </div>
          <p class="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
            {{ $t('projects_pacpack_tech_gui_desc') }}
          </p>
        </div>

        <div class="p-4 rounded-xl border border-zinc-500/20 bg-zinc-500/5 space-y-2">
          <div class="flex items-center gap-2 text-cyan-500 font-semibold text-sm">
            <i class="pi pi-sync"></i>
            <span>{{ $t('projects_pacpack_tech_network') }}</span>
          </div>
          <p class="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
            {{ $t('projects_pacpack_tech_network_desc') }}
          </p>
        </div>

        <div class="p-4 rounded-xl border border-zinc-500/20 bg-zinc-500/5 space-y-2">
          <div class="flex items-center gap-2 text-violet-500 font-semibold text-sm">
            <i class="pi pi-microchip-ai"></i>
            <span>{{ $t('projects_pacpack_tech_ai') }}</span>
          </div>
          <p class="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
            {{ $t('projects_pacpack_tech_ai_desc') }}
          </p>
        </div>
      </div>

      <!-- Acquired & Reinforced Competencies: sober colored icon + long title -->
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
    </section>

    <!-- Section 2: Modrinth Public Documentation & Markdown Body -->
    <section class="mt-8 pt-8 border-t border-zinc-500/20 space-y-4">
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-xl sm:text-2xl font-bold text-(--text-primary) font-['Montserrat'] flex items-center gap-2">
          <i class="pi pi-book text-emerald-500"></i>
          <a
              :href="project.externalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-emerald-500 transition-colors inline-flex items-center gap-2 group/title"
          >
            <span>{{ $t('projects_modrinth_doc_title') }}</span>
            <i class="pi pi-external-link text-sm opacity-60 group-hover/title:opacity-100"></i>
          </a>
        </h2>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="py-8 flex items-center justify-center gap-3 text-sm text-(--text-secondary)">
        <i class="pi pi-spin pi-spinner text-xl text-emerald-500"></i>
        <span>{{ $t('projects_loading') }}</span>
      </div>

      <!-- Dynamic Modrinth Description Body rendered with marked -->
      <article
        v-else-if="renderedBody"
        class="modrinth-body space-y-4"
        v-html="renderedBody"
      />

      <!-- Fallback if offline / API failed -->
      <p v-else class="text-base text-(--text-secondary) leading-relaxed">
        {{ $t('projects_pacpack_details_p1') }}
      </p>
    </section>

    <!-- Section 3: In-game Gallery Previews from Modrinth API -->
    <template #extra>
      <section v-if="modrinthData && modrinthData.gallery.length > 0" class="mt-8 pt-6 border-t border-zinc-500/20">
        <h3 class="text-xl font-bold mb-4 text-(--text-primary) font-['Montserrat'] flex items-center gap-2">
          <i class="pi pi-images text-emerald-500"></i>
          <span>{{ $t('projects_gallery_title') }}</span>
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="item in modrinthData.gallery"
            :key="item.url"
            class="group/item overflow-hidden rounded-xl border border-zinc-500/20 bg-zinc-500/5"
          >
            <a :href="item.raw_url" target="_blank" rel="noopener noreferrer" class="block aspect-video overflow-hidden">
              <img
                :src="item.url"
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover/item:scale-105"
                loading="lazy"
              />
            </a>
            <div class="p-3">
              <h4 class="text-sm font-semibold text-(--text-primary)">{{ item.title }}</h4>
              <p class="text-xs text-(--text-secondary) mt-1 line-clamp-2">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </template>
  </ProjectDetailLayout>
</template>

<style scoped>
:deep(.modrinth-body h2) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--text-primary);
  font-family: 'Montserrat', sans-serif;
}

:deep(.modrinth-body h3) {
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text-primary);
  font-family: 'Montserrat', sans-serif;
}

:deep(.modrinth-body h4) {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-primary);
}

:deep(.modrinth-body p) {
  line-height: 1.625;
  color: var(--text-secondary);
}

:deep(.modrinth-body ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  color: var(--text-secondary);
}

:deep(.modrinth-body li) {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

:deep(.modrinth-body a) {
  color: #10b981;
}

:deep(.modrinth-body a:hover) {
  text-decoration: underline;
}

:deep(.modrinth-body figure img) {
  width: 100%;
  border-radius: 0.75rem;
}
</style>
