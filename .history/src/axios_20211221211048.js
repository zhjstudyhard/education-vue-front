/*
 * @Author: your name
 * @Date: 2021-10-21 16:13:44
 * @LastEditTime: 2021-12-21 21:10:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog-view\src\axios.js
 */
import axios from 'axios'
import Element from "element-ui";
import store from "./store";
import router from "./router";

axios.defaults.baseURL = "http://localhost:8089/"
//请求拦截
axios.interceptors.request.use(config => {
    //console.log("前置拦截")


    // if (!config.url.includes("usuuu.com")) {
    //如果有token，统一带上
    const token = window.localStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.Authorization = `${token}`;
    }

    // identification存在，可以统一设置请求头
    // const identification = window.localStorage.getItem('identification')

    // if (identification && !(config.url.startsWith('http://') || config.url.startsWith('https://'))) {
    //     config.headers.identification = identification
    // }

    // }

    return config
})
//响应拦截
axios.interceptors.response.use(response => {
        //更新token
        if (response.headers['authorization']) {
            store.commit("SET_TOKEN", response.headers['authorization']);
        }
        const res = response.data;
        // const identification = response.headers.identification
        // if (identification) {
        //     //保存身份标识到localStorage
        //     window.localStorage.setItem('identification', identification)
        // }
        // 当结果的code是否为200的情况
        if (res.code !== 20000) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            } else if (res.code === 401) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: '重新登陆',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.commit('REMOVE_INFO');
                    router.push({
                        path: '/login'
                    });
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
        // if (res.code === 20000) {
        //     return res
        // } else {
        //     //弹窗异常信息
        //     Element.Message({
        //         message: response.data.msg,
        //         type: 'error',
        //         duration: 2 * 1000
        //     })
        //     // 直接拒绝往下面返回结果信息
        //     return Promise.reject(response.data.msg)
        // }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
        // console.log('err' + error) // for debug
        // if (error.response.data) {
        //     error.message = error.response.data.msg
        // }
        // // 根据请求状态觉得是否登录或者提示其他
        // if (error.response.status === 401 || error.response.status === 500) {
        //     store.commit('REMOVE_INFO');
        //     router.push({
        //         path: '/login'
        //     });
        //     error.message = '请重新登录';
        // }
        // if (error.response.status === 403) {
        //     error.message = '权限不足，无法访问';
        // }
        // Element.Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 3 * 1000
        // })
        // return Promise.reject(error)
    })

/**
 * 封装get方法
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    });
}

/**
 * 封装post方法
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            })
    });
}