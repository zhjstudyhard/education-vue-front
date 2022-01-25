/*
 * @Author: your name
 * @Date: 2022-01-25 16:02:53
 * @LastEditTime: 2022-01-25 17:19:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\api\teacher\teacher.js
 */
import {get,post} from "../../axios";
export const getTeacherById =(data) => post(`/api/teacher/getTeacherById`,data);
export const getTeacherInfoIndexById =(data) => post(`/api/index/getTeacherInfoIndexById`,data);
export const pageListTeacher =(data) => post(`/api/teacher/pageListTeacher`,data);