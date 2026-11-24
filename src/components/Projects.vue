<script setup lang="ts">
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard.vue'
</script>

<template>
  <section class="max-w-4xl mx-auto px-4 pt-10 pb-16">
    <!-- Page Header -->
    <header class="mb-8 text-center sm:text-left">
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-(--text-primary) font-['Montserrat']">
        {{ $t('projects_page_title') }}
      </h1>
      <p class="text-base text-(--text-secondary) mt-2">
        {{ $t('projects_page_subtitle') }}
      </p>
    </header>

    <!-- Projects List -->
    <div class="flex flex-col gap-4">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </section>
</template>

<style scoped>
</style>
