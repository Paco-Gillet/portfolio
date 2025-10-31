<template>
  <el-container>
    <header>
      <div v-if="isMobile" class="d-flex justify-content-between p-3 mobile-header">
        <h1 style="margin: 0">Paco Gillet</h1>
        <div class="burger" :class="{ open: isMenuOpen }" @click="toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <el-menu
          :mode="isMobile ? '' : 'horizontal'"
          :class="{ close: !isMenuOpen && isMobile, 'justify-content-center': !isMobile }"
          :default-active="activeComponent"
          @select="onSelect">
        <el-menu-item index="home">Accueil</el-menu-item>
      </el-menu>
    </header>

    <el-main class="d-flex justify-content-center">
      <component :is="components[activeComponent]" />
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import Home from './Home.vue'

const components = {
  home: Home,
}
const activeComponent = ref('home')
const emit = defineEmits(['update'])

const isMobile = window.innerWidth <= 768;
const isMenuOpen = ref(false)

const onSelect = (key) => {
  activeComponent.value = key
  isMenuOpen.value = false
}

function toggle() {
  isMenuOpen.value = !isMenuOpen.value
  emit('update', isMenuOpen.value)
}
</script>

<style scoped>
.el-menu {
  transition: 0.5s ease;
  z-index: 2000;
}

.el-menu:not(.el-menu--horizontal) {
  border-right: none;
}

.el-menu.close {
  opacity: 0;
  transform: translate(100vw);
}

.burger {
  width: 30px;
  height: 22px;
  display: flex;
  margin: auto 10px auto;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  z-index: 1000;
}
.burger span {
  display: block;
  height: 4px;
  background: #000;
  border-radius: 2px;
  transition: 0.3s;
}
.burger.open span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}
.burger.open span:nth-child(2) {
  opacity: 0;
}
.burger.open span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

main {
  margin-top: 60px;
}
</style>
