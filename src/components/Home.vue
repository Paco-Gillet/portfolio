<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const resumeUrl = `${import.meta.env.BASE_URL}/my-resume.pdf`
</script>

<template>
<div class="pt-20 w-3/4 mx-auto flex justify-center gap-8">
  <div>
    <img src="@/assets/img/portait.jpg" alt="Portrait" class="h-80 min-w-80 rounded-4xl shadow-xl/25">
  </div>
  <div class="w-165">
    <p class="text-4xl font-medium mb-4 mt-10">{{ $t('presentation') }}</p>
    <p class="text-lg font-light whitespace-pre-line">{{ $t('pres_sentence') }}</p>
    <Button
        as="a"
        icon="pi pi-download"
        variant="outlined"
        class="mt-8"
        size="large"
        rounded
        :label="t('resume_dl')"
        :href="resumeUrl"
        download="CV_Paco_Gillet.pdf"
    />
  </div>
</div>
</template>

<style scoped>

</style>