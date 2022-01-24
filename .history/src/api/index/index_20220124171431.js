/*
 * @Author: your name
 * @Date: 2022-01-24 17:12:30
 * @LastEditTime: 2022-01-24 17:14:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\api\index\index.js
 */
import {get,post} from "../../axios";

export default {
    //查询热门课程和名师
  getIndexData() {
    return request({
      url: '/api/course/indexData',
      method: 'post'
    })
  }
}