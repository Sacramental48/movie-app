import { createRouter, createWebHistory } from 'vue-router'

const routes = []

const router = createRouter({
    history: createWebHistory(import.meta.BASE_URL),
    routes,
    linkExactActiveClass: 'active',
    linkActiveClass: 'active'
})

export default router