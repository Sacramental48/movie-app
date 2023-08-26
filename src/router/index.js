import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../pages/Home.vue')
    },
    {
        path: '/movies/:id',
        name: 'movies',
        component: () => import('../pages/movies.vue')
    },
    {
        path: '/tv-show/:id',
        name: 'tv-show',
        component: () => import('../pages/TVShow.vue')
    },
    {
        path: '/movies/card/:id',
        name: 'movieDetails',
        component: () => import('../pages/MovieDetails.vue')
    },
    {
        path: '/tv-show/card/:id',
        name: 'tvshow',
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