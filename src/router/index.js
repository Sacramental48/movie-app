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
        path: '/tv-show',
        name: 'tv-show',
        component: () => import('../pages/TVShow.vue')
    },
    {
        path: '/movies/:id',
        name: 'movieDetails',
        component: () => import('../pages/MovieDetails.vue')
    },
    {
        path: '/tvshow/:id',
        name: 'tvshow',
        component: () => import('../pages/TVShow.vue')
    },

]

const router = createRouter({
    history: createWebHistory(import.meta.BASE_URL),
    routes,
    linkExactActiveClass: 'active',
    linkActiveClass: 'active'
})

export default router