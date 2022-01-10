/*
 * @Author: your name
 * @Date: 2022-01-08 19:39:01
 * @LastEditTime: 2022-01-10 14:43:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\api\article\message.js
 */
import {get,post} from "../../axios";

export const queryMessageCount =() => post(`/api/message/queryMessageCount`);
export const queryMessagePage =(data) => post(`/api/message/queryMessagePage`,data);
export const delMessagePage =(data) => post(`/api/message/delMessagePage`,data);
