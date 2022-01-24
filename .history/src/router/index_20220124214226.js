/*
 * @Author: your name
 * @Date: 2021-12-18 17:21:59
 * @LastEditTime: 2022-01-24 21:42:25
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
const routes = [{
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
            children: [{
                    path: '',
                    name: 'Home',
                    component: Home,
                    meta: {
                        title: '首页'
                    }
                },
                {
                    path: '/article/:id',
                    name: 'article',
                    component: () => import('../views/article'),
                    meta: {
                        title: '查看文章'
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
        {
            path: '/writeArticle',
            name: 'writeArticle',
            component: () => import('../views/article/ArticleEdit'),
            meta: {
                title: '发表文章'
            }
        },
        {
            path: '/articleEdit/:id',
            component: () => import('../views/article/ArticleEdit'),
            name: '文章编辑',
            meta: {
                title: '文章编辑'
            },
        },
        {
            path: '/messageList',
            component: () => import('../views/article/MessageList'),
            name: '消息通知',
            meta: {
                title: '消息通知'
            },
        },
        {
            path: '/profile/index',
            component: () => import('../components/profile/index'),
            name: 'Profile',
            meta: {
                title: 'Profile',
                icon: 'user',
                noCache: true
            }
        },
        {
            path: '/courseIndex',
            name: '课程界面',
            component: () => import('../views/coursePages/index'),
            meta: {
                title: '课程界面'
            },
            children: [{
                    path: '/teacher/:id',
                    name: '讲师信息',
                    component: import('../views/coursePages/teacher/_id'),
                    meta: {
                        title: '讲师信息'
                    }
                },

            ]
            // }, {
            //     path: '/teacher/:id',
            //     name: '课程界面',
            //     component: () => import('../views/coursePages/teacher/_id'),
            //     meta: {
            //         title: '课程界面'
            //     },
            // }

        ];

        const router = new VueRouter({
            mode: 'history',
            base: process.env.BASE_URL,
            routes,
            scrollBehavior(to, from, savedPosition) {
                if (savedPosition) {
                    return savedPosition
                } else {
                    return {
                        x: 0,
                        y: 0
                    }
                }
            }
        })

        export default router