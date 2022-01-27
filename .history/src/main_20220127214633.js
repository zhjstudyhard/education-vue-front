/*
 * @Author: your name
 * @Date: 2021-12-18 17:21:57
 * @LastEditTime: 2022-01-27 21:46:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\main.js
 */
//element-ui
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
//axios
import axios from 'axios'
//全局拦截
import "./axios"
//vue
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//jquery
import $ from 'jquery'
//v-viewer
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
//directive
import './util/directive.js'

//waypoints.js
import 'waypoints/lib/jquery.waypoints.min'

//markdown-it-vue-light (markdown-it的精简版 去掉流程图渲染)
import MarkdownItVueLight from 'markdown-it-vue/dist/markdown-it-vue-light.umd.min.js'
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
//加载到vue
Vue.prototype.$axios = axios
Vue.use(Element)
Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(Viewer)
Vue.use(MarkdownItVueLight)
///
import './assets/css/reset.css'
import './assets/css/theme.css'
import './assets/css/global.css'
import './assets/css/web.css'
// import './assets/css/base.css'
// import './assets/css/activity_tab.css'
// import './assets/css/bottom_rec.css'
// import './assets/css/nice_select.css'
// import './assets/css/order.css'
// import './assets/css/swiper-3.3.1.min.css'
// import "./assets/css/pages-weixinpay.css"
import EventBus from "@/api/EventBus.js";





const cubic = value => Math.pow(value, 3);
const easeInOutCubic = value => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
//滚动至页面顶部，使用 Element-ui 回到顶部 组件中的算法
Vue.prototype.scrollToTop = function () {
    const el = document.documentElement
    const beginTime = Date.now()
    const beginValue = el.scrollTop
    const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
    const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
            el.scrollTop = beginValue * (1 - easeInOutCubic(progress))
            rAF(frameFunc)
        } else {
            el.scrollTop = 0
        }
    }
    rAF(frameFunc)
}

new Vue({
    router,
    store,
    EventBus,
    render: h => h(App)
}).$mount('#app')
