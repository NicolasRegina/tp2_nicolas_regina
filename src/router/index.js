import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // "Home" es la lista de recetas
      path: '/',
      name: 'home',
      component: () => import('../views/RecetasView.vue')
    },
    {
      path: '/agregar',
      name: 'agregar',
      component: () => import('../views/AgregarRecetaView.vue')
    },
    {
      path: '/editar/:id',
      name: 'editar',
      component: () => import('../views/EditarRecetaView.vue'),
      props: true
    },
    // Página 404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
