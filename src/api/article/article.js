/*
 * @Author: your name
 * @Date: 2021-12-18 18:29:26
 * @LastEditTime: 2021-12-18 19:46:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\api\article.js
 */
import {get,post} from "../../axios";

export const getArticlePage =(data) => post(`/api/article/getArticlePage`,data);
export const getArticleById =(data) => post(`/api/article/getArticleById`,data);
