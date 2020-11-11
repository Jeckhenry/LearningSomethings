import Vue from 'vue';
import LRouter from './Lrouter';

Vue.use(LRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
    }
];

export default new LRouter({
    routes,
    mode: 'hash',
})