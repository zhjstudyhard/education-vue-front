/*
 * @Author: your name
 * @Date: 2022-01-25 19:19:55
 * @LastEditTime: 2022-01-26 16:47:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\api\index\course.js
 */
import {get,post} from "../../axios";
export const pageListCourse =(data) => post(`/api/course/pageListCourse`,data);
export const findByCourseId =(data) => post(`/api/course/findByCourseId`,data);
export const getVideoPlayAuth =(data) => post(`/api/video/getVideoPlayAuth`,data);