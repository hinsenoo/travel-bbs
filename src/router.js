import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
import Login from './pages/login'

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
                    path: '/index',
                    name: 'index',
                    component: Index,
                },
            ]
        },
        {
            // 登录界面
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
});