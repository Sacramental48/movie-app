import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/Home.vue')
    },
    {
        path: '/movie/:id',
        name: 'movie',
        component: () => import('../pages/movies.vue')
    },
    {
        path: '/tv/:id',
        name: 'tv',
        component: () => import('../pages/TVShow.vue')
    },
    {
        path: '/movie/card/:id',
        name: 'movieDetails',
        component: () => import('../pages/MovieDetails.vue')
    },
    {
        path: '/tv/card/:id',
        name: 'tvDetails',
        component: () => import('../pages/TVShowDetails.vue')
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.BASE_URL),
    routes,
    linkExactActiveClass: 'active',
    linkActiveClass: 'active'
})

export default router