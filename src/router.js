import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            // 主页
            // 路由路径
            path: '/',
            // 路由名称
            name: 'home',
            component: Home,
            redirect: '/index',
            // 子路由（二级路由）
            children: [
                {
                    // 主页
                    path: '/index',
                    name: 'index',
                    component: Index,
                },
                {
                    // 个人页面
                    path: '/personal/:id',
                    name: 'personal',
                    // 路由按需加载
                    // 1.
                    // component: resolve => require(['./pages/product.vue'],resolve),
                    // 2.
                    component: () => import('./pages/personal.vue')
                },
                {
                    // 个人页面
                    path: '/setting/:id',
                    name: 'setting',
                    component: () => import('./pages/setting.vue')
                }
            ]
        },
    ]
});