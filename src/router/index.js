import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/Home.vue')
    },
    {
        path: '/:catchAll(.*)',
        redirect: { name: 'PageNotFound', params: {} },
    },
    {
        path: '/:contentType/:id',
        name: 'contentDetails',
        component: () => import('../pages/CardList.vue'),
        beforeEnter: (to, from, next) => {
            const allowedContentTypes = ['movie', 'tv', 'search_result'];
            if (allowedContentTypes.includes(to.params.contentType)) {
                next();
            } else {
                next({ name: 'PageNotFound' });
            }
        }
    },
    {
        path: '/:contentCardType/card/:id',
        name: 'contentCardDetails',
        component: () => import('../pages/CardContentType.vue'),
        beforeEnter: (to, from, next) => {
            const allowedContentCardTypes = ['movie', 'tv'];
            if (allowedContentCardTypes.includes(to.params.contentCardType)) {
                next();
            } else {
                next({ name: 'PageNotFound' });
            }
        }
    },
    {
        path: '/PageNotFound',
        name: 'PageNotFound',
        component: () => import('../pages/PageNotFound.vue')
    }
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