<script setup lang="ts">
import {onMounted, ref, watch, computed} from "vue";
import { useI18n } from 'vue-i18n'
import router from "@/router";


const darkMode = ref(false);
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  darkMode.value = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', darkMode.value ? 'dark' : 'light');
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    darkMode.value = true;
    document.documentElement.classList.add('dark');
  }
});

const { t, locale } = useI18n()
const languages = ref([
  { name: 'Français', code: 'fr', flagCode: 'fr' },
  { name: 'English', code: 'en', flagCode: 'gb' }
]);
const selectedLanguage = ref(languages.value.find(lang => lang.code === locale.value));

watch(selectedLanguage, (newLang) => {
  if (newLang) {
    locale.value = newLang.code;
    localStorage.setItem('user-locale', newLang.code);
  }
});

const items = computed(() => [
  {
    label: t('home'),
    icon: 'pi pi-home'
  },
  {
    label: t('projects'),
    icon: 'pi pi-search',
    items: [
      {
        label: 'TBC',
        icon: 'pi pi-clock'
      }
    ]
  }
]);
</script>

<template>
  <header class="p-3 flex justify-between w-screen">
    <div>
      <img src="@/assets/logo.jpg" alt="Logo" class="h-20 w-20 rounded-3xl">
    </div>
    <nav>
      <div class="h-fit mt-auto mb-auto" @click="router.push({name:'home'})">{{ $t('home') }}</div>
      <div class="h-fit mt-auto mb-auto" @click="router.push({name:'projects'})">{{ $t('projects') }}</div>
    </nav>
    <div class="flex items-center gap-2">
      <ToggleSwitch
          v-model="darkMode"
          @change="toggleDarkMode"
      >
        <template #handle="{ checked }">
          <i v-if="checked" class="pi pi-moon text-xs" />
          <i v-else class="pi pi-sun text-xs" />
        </template>
      </ToggleSwitch>
      <Select
          v-model="selectedLanguage"
          :options="languages"
          optionLabel="name"
          class="w-auto! border-none! shadow-none! bg-transparent! flex items-center justify-center pr-2"
          :pt="{
              label: { class: '!p-1 !pr-0' },
              dropdown: { class: '!w-6' }
          }"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex items-center justify-center">
            <span :class="`fi fi-${slotProps.value.flagCode} text-xl rounded-sm`"></span>
          </div>
        </template>
        <template #option="slotProps">
          <div class="flex items-center gap-2">
            <span :class="`fi fi-${slotProps.option.flagCode}`"></span>
            <span class="text-sm">{{ slotProps.option.name }}</span>
          </div>
        </template>
      </Select>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>
