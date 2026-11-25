<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import { useI18n } from 'vue-i18n'
import router from "@/router";


const darkMode = ref(false);
function toggleDarkMode() {
  const updateTheme = () => {
    document.documentElement.classList.toggle('dark-app', darkMode.value);
    localStorage.setItem('theme', darkMode.value ? 'dark-app' : 'light');
  };

  if (!document.startViewTransition) {
    // Fallback for old browsers
    updateTheme();
    return;
  }

  document.startViewTransition(updateTheme);
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark-app' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    darkMode.value = true;
    document.documentElement.classList.add('dark-app');
  }
});

const { locale } = useI18n()
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
</script>

<template>
  <header class="p-3 flex justify-between w-full">
    <div class="w-30">
      <img
          id="logo"
          src="@/assets/img/logo.png"
          alt="Logo"
          class="h-20 w-20 rounded-3xl shadow-xl/20 transition-transform duration-300 hover:scale-105 cursor-pointer"
          @click="router.push({name:'home'})"
      >
    </div>
    <nav>
      <div class="h-fit mt-auto mb-auto" :class="router.currentRoute.value.name == 'home' ? 'selected' : ''" @click="router.push({name:'home'})">{{ $t('home') }}</div>
      <div class="h-fit mt-auto mb-auto" :class="router.currentRoute.value.path != null ? router.currentRoute.value.path.toString().indexOf('projects') >= 0 ? 'selected' : '' : ''" @click="router.push({name:'projects'})">{{ $t('projects') }}</div>
    </nav>
    <div class="flex items-center gap-2 justify-end w-30">
      <ToggleSwitch
          v-model="darkMode"
          @change="toggleDarkMode"
          class="theme-toggler-switch"
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

  <main class="min-h-[calc(100vh-150px)] pb-12">
    <RouterView />
  </main>

  <footer class="bottom-0 w-full text-center p-2 z-10">
    ® 2026 Paco
  </footer>
</template>

<style scoped>
/* Hide temporarily the theme toggle button to prevent cursed animation */
.theme-toggler-switch {
  view-transition-name: theme-toggler;
}
:global(::view-transition-old(theme-toggler)) {
  display: none;
}
:global(::view-transition-new(theme-toggler)) {
  animation: none;
}

nav {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
}

nav > div {
  position: relative;
  padding: 0 1em;
  font-weight: 300;
  transition: font-weight var(--my-default-transition-duration) ease;
}

nav > div:hover {
  cursor: pointer;
  font-weight: 400;
}

nav > div::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--p-text-color);
  transition: width var(--my-default-transition-duration) ease, left var(--my-default-transition-duration) ease;
}

nav > div:hover::after {
  width: 80%;
  left: 10%;
}

nav > div.selected::after {
  width: 80%;
  left: 10%;
}
</style>
