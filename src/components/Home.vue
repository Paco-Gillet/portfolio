<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { skills } from '@/data/skills'
import { useTranslate } from '@/utils/i18n'

const { t } = useI18n()
const { translate } = useTranslate()
const resumeUrl = `${import.meta.env.BASE_URL}my-resume.pdf`
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 pt-12 sm:pt-20 pb-16">
    <!-- Presentation Section -->
    <section class="flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-12">
      <div class="shrink-0">
        <img
          src="@/assets/img/portrait.jpg"
          alt="Portrait"
          class="h-64 w-64 sm:h-80 sm:w-80 rounded-4xl shadow-xl/25 object-cover"
        />
      </div>

      <div class="flex-1 text-center md:text-left max-w-xl">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-(--text-primary) font-['Montserrat'] mb-4 mt-2 sm:mt-8">
          {{ $t('presentation') }}
        </h1>
        <p class="text-base sm:text-lg font-light text-(--text-secondary) whitespace-pre-line leading-relaxed">
          {{ $t('pres_sentence') }}
        </p>
        <Button
          as="a"
          icon="pi pi-download"
          variant="outlined"
          class="mt-8 cursor-pointer hover:border-emerald-500 hover:text-emerald-500"
          size="large"
          rounded
          :label="t('resume_dl')"
          :href="resumeUrl"
          download="CV_Paco_Gillet.pdf"
        />
      </div>
    </section>

    <!-- Key Skills Section directly below presentation (sober: colored icon + short title) -->
    <section class="mt-16 sm:mt-24 pt-10 border-t border-zinc-500/15">
      <div class="text-center sm:text-left mb-6">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-(--text-primary) font-['Montserrat'] flex items-center justify-center sm:justify-start gap-2.5">
          <i class="pi pi-bolt text-emerald-500"></i>
          <span>{{ $t('home_skills_title') }}</span>
        </h2>
        <p class="text-sm text-(--text-secondary) mt-1.5">
          {{ $t('home_skills_subtitle') }}
        </p>
      </div>

      <!-- Skills Badges: clean, sober pills with colored icon and short title -->
      <div class="flex flex-wrap items-center justify-center sm:justify-start gap-3">
        <span
          v-for="skill in skills"
          :key="skill.id"
          class="project-tag px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 transition-transform duration-200 hover:scale-105"
        >
          <i :class="[skill.icon, skill.iconColor || 'text-emerald-500', 'text-sm']"></i>
          <span class="text-(--text-primary)">{{ translate(skill.shortTitleKey) }}</span>
        </span>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>