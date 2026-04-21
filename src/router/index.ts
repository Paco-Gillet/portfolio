import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {name: 'home'}
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: {name: 'home'}
    },
    {
      path: '/home',
      name: 'home',
      redirect: {name: 'home'}
    },
    {
      path: '/home',
      name: 'home',
      component: ()=> import("@/components/Home.vue")
    },
    {
      path: '/projects',
      name: 'projects',
      component: ()=> import("@/components/Projects.vue")
    }
  ]
})

export default router
