<!--
 * @Author: your name
 * @Date: 2022-01-09 16:26:08
 * @LastEditTime: 2022-01-09 16:57:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\views\article\message.vue
-->
<template>
  <div class="link-message-container">
    <div class="container">
      <div class="space-right">
        <div class="space-right-top">
          <div class="title"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.link-message-container {
  width: 100%;
}
.container {
  height: calc(100vh - 56px);
  margin: 0 auto;
  max-width: 1143px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
}
.space-right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.5);
}
.space-right-top {
  padding: 10px 10px 0;
  z-index: 11;
}
.title {
  height: 42px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  -ms-flex-negative: 0;
  flex-shrink: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 15px;
  color: #666;
  border-radius: 4px;
}
</style>
