<!--
 * @Author: your name
 * @Date: 2022-01-09 16:26:08
 * @LastEditTime: 2022-01-09 17:37:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \education-vue-front\src\views\article\message.vue
-->
<template>
  <div class="link-message-container">
    <div class="container">
      <div class="space-right">
        <div class="space-right-top">
          <div class="title">
            <span>消息通知</span>
          </div>
        </div>
        <div class="reply-content">
          <div class="reply">
            <div class="reply-item"></div>
            <div class="basic-list-item">
              <div class="left-box">
                <a class="avatar"> </a>
              </div>
              <div class="center-box">
                <div class="line-1">
                  <span class="name-filed">
                    <a>赵浩杰</a>
                    <span>回复了我的评论</span>
                  </span>
                </div>
                <div class="line-2">

                </div>
                <div class="line-3"></div>
              </div>
            </div>
          </div>
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
.reply-content {
  padding: 10px;
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: calc(100% - 66px);
  overflow: hidden;
  overflow: hidden !important;
  overflow-anchor: none;
  -ms-overflow-style: none;
  touch-action: auto;
  -ms-touch-action: auto;
}
.reply {
  padding: 24px 16px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  margin-bottom: 10px;
  border-radius: 4px;
  height: 600px;
}
.reply-item {
  padding-top: 24px;
  padding-bottom: 24px;
  position: relative;
  cursor: pointer;
  background-color: #fff;
}
.basic-list-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}
.left-box {
  width: 60px;
  height: 46px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.avatar {
  display: block;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(//static.hdslb.com/images/member/noface.gif);
}
.center-box {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.line-1 {
  color: #505050;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-size: 14px;
  line-height: 15px;
  max-height: 4.285714285714286em;
}
.name-filed {
  color: #222;
  margin-right: 8px;
  font-weight: bold;
}
.a {
  -webkit-touch-callout: none;
  color: inherit;
  border: 0;
  outline: 0;
  text-decoration: none;
}
</style>
