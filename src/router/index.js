import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/movies'
    },
    {
        path: '/movies',
        name: 'movies',
        component: () => import('../pages/movies.vue')
    },
    {
        path: '/:genre/:page',
        name: 'genre-page',
        component: () => import('../pages/Genres.vue')
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.BASE_URL),
    routes,
    linkExactActiveClass: 'active',
    linkActiveClass: 'active'
})

export default router