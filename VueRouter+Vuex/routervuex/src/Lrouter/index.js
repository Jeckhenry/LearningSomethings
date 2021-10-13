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
        children: [
            {
                path: '/about/child',
                name: 'child',
                component: {
                    render(h) {
                        return h('div', 'about children')
                    }
                },
            }
        ],
    }
];

export default new LRouter({
    routes,
    mode: 'hash',
})