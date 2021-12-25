/*
 * @Author: your name
 * @Date: 2021-12-18 17:21:59
 * @LastEditTime: 2021-12-25 15:18:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import About from "../views/About";
import Archives from "../views/Archives";
import Home from "../views/Home";
// import Blog from "../views/Blog";
import Friends from "../views/Friends";
import Category from "../views/Category";



Vue.use(VueRouter)
const routes = [
    {
        path: '/login',
        name: '登录',
        component: () => import('../views/login/login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: '注册',
        component: () => import('../views/login/register'),
        meta: {
            title: '注册'
        }
    },


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
                path: '/article/:id',
                name: '查看文章',
                component: () => import('../views/article'),
                meta: {
                    title: '查看文章'
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
                path: '/category/:type',
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

