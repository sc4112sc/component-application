import { createRouter, createWebHistory } from 'vue-router';

import { tRoutes } from 'SElement';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/RouletteView.vue'),
        },
        {
            path: '/roulette',
            name: 'roulette',
            component: () => import('../views/RouletteView.vue'),
        },
        ...tRoutes
    ],
});

export default router;
