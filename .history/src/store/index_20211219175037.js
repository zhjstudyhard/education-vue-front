/*
 * @Author: your name
 * @Date: 2021-12-18 17:21:59
 * @LastEditTime: 2021-12-19 17:50:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem("token"),
        userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
        focusMode: false,
    },
    mutations: {
        //set
        SET_TOKEN: (state, token) => {
            state.token = token
            localStorage.setItem("token", token)
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
        },
        REMOVE_INFO: (state) => {
            state.token = ""
            state.userInfo = {}
            localStorage.setItem("token", "")
            sessionStorage.setItem("userInfo", JSON.stringify(''))
        }

    },
    getters: {
        //get
        getUser: state => {
            return state.userInfo
        }
    },
    actions: {},
    modules: {}
})