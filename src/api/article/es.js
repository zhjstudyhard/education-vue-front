/*
 * @Author: your name
 * @Date: 2022-01-12 14:51:24
 * @LastEditTime: 2022-01-12 15:03:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\api\article\es.js
 */
import {get,post} from "../../axios";

export const esSearch =(keyWords) => post(`/api/es/esSearch`,keyWords);
