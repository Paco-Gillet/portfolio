import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/Home.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/components/Projects.vue')
    },
    {
      path: '/projects/pacpack-quests',
      name: 'pacpack-quests',
      component: () => import('@/components/PacPackQuests.vue')
    },
    {
      path: '/projects/consumer-electronic-fair',
      name: 'consumer-electronic-fair',
      component: () => import('@/components/ConsumerElectronicFair.vue')
    },
    // Fallback route for unknown paths - must be last
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' }
    }
  ]
})

export default router
