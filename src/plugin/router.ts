import {createRouter, createWebHashHistory} from 'vue-router';
// 引入路由

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        name: "首页",
        path: '/',
        redirect: '/home',
    }, {
        name: "主页",
        path: '/home',
        component: () => import('@/pages/home/index.vue')
    }, {
        name: "规则",
        path: '/rule',
        component: () => import('@/pages/rule/index.vue')
    }, {
        name: "设置",
        path: '/setting',
        component: () => import('@/pages/setting/index.vue')
    }]
});

export default router;
