import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/Home.vue')
    },
    {
        path: '/:contentType/:id',
        name: 'contentDetails',
        component: () => import('../pages/CardList.vue')
    },
    {
        path: '/:contentCardType/card/:id',
        name: 'contentCardDetails',
        component: () => import('../pages/CardContentType.vue')
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.BASE_URL),
    routes,
    linkExactActiveClass: 'active',
    linkActiveClass: 'active',

    scrollBehavior (to, from, savedPosition) {
        return { top: 0 }
    }
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'MovieApp';
    next();
});

export default router