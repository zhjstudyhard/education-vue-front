/*
 * @Author: your name
 * @Date: 2021-11-30 16:53:27
 * @LastEditTime: 2021-12-21 20:15:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue-element-admin-master\src\api\userLogin.js
 */
import {get,post} from "../../axios";

export const login =(data) => post(`/api/userLogin/login`,data);
export const getUserInfo =() => post(`/api/permission/getUserInfo`);
// export function login(data) {
//   return request({
//     url: '/api/userLogin/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/api/permission/getUserInfo',
//     method: 'POST',
//     // params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/api/userLogin/logout',
//     method: 'post'
//   })
// }

