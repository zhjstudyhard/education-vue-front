import Vue from 'vue'
import VueRouter from 'vue-router'
import About from "../views/About";
import Archives from "../views/Archives";
import Home from "../views/Home";
import Blog from "../views/Blog";
import Friends from "../views/Friends";
import Category from "../views/Category";



Vue.use(VueRouter)
const routes = [

    {
        path: '/',
        name: 'Index',

        // 懒加载
        component: () => import('../views/Index.vue'),
        redirect: 'Home',
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
                meta: {
                    title: '首页'
                }
            },
            {
                path: '/blog/:blogId',
                name: 'Blog',
                component: Blog,
                meta: {
                    title: '博客'
                }
            },
            {
                path: '/archives',
                name: 'Archives',
                component: Archives,
                meta: {
                    title: '归档'
                }
            },
            {
                path: '/about',
                name: 'About',
                component: About,
                meta: {
                    title: '关于我'
                }
            },
            {
                path: '/friends',
                name: 'Friends',
                component: Friends,
                meat: {
                    title: '友链'
                }
            },
            {
                path: '/category/:name',
                name: 'Category',
                component: Category,
                meta: {
                    title: '分类'
                }
            },


        ]

    },


];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router

