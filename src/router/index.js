import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import TasksView from '../views/TasksView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'inicio',
      component: DashboardView,
    },
    {
      path: '/tareas',
      name: 'tareas',
      component: TasksView,
    },
    {
      path: '/acerca',
      name: 'acerca',
      component: AboutView,
    },
  ],
})

export default router
