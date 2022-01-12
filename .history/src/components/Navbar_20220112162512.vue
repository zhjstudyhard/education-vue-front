<template>
  <div class="blog-navbar" :class="{ transparent: $route.name === 'Home' }">
    <router-link style="text-decoration-line: none; color: white" to="/">
      <h3
        :class="{
          'm-mobile-show': mobileHide,
          active: $route.name === 'About',
        }"
        class="ui header item m-blue"
        style="display: inline; padding: 20px 20px 20px 60px"
      >
        橘白学习平台
      </h3>
    </router-link>

    <router-link
      :class="{ 'm-mobile-show': mobileHide, active: $route.name === 'Index' }"
      class="item"
      style="text-decoration-line: none; color: white; padding: 20px"
      to="/"
    >
      首页
    </router-link>

    <el-dropdown trigger="click" @mousedown.native="getTypes">
      <span
        class="el-dropdown-link item"
        style="
          text-decoration-line: none;
          color: white;
          font-size: 16px;
          padding: 20px;
        "
      >
        分类<i
          class="el-icon-arrow-down el-icon--right"
          style="padding-top: 0"
        ></i>
      </span>

      <el-dropdown-menu
        slot="dropdown"
        style="background-color: #333333; padding: 20px"
      >
        <el-dropdown-item
          v-for="(type, index) in types"
          :key="index"
          @click.native="categoryRoute(type.dictionaryCode)"
          style="color: white"
        >
          {{ type.dictionaryValue }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="message" @click="queryClick" style="cursor: pointer">
      <el-badge :value="messageCount" class="item" :hidden="hiddenBadge">
        消息
      </el-badge>
    </div>
    <!-- <router-link
      :class="{
        'm-mobile-show': mobileHide,
        active: $route.name === '消息通知',
      }"
      class="item"
      style="text-decoration-line: none; color: white; padding: 20px"
      to="/messageList"
    >
      <el-badge :value="messageCount" class="item" :hidden="hiddenBadge">
        消息
      </el-badge>
    </router-link> -->
    <!-- <router-link
      :class="{
        'm-mobile-show': mobileHide,
        active: $route.name === 'Archives',
      }"
      class="item"
      style="text-decoration-line: none; color: white; padding: 20px"
      to="/archives"
    >
      归档
    </router-link>

    <router-link
      :class="{
        'm-mobile-show': mobileHide,
        active: $route.name === 'Friends',
      }"
      class="item"
      style="text-decoration-line: none; color: white; padding: 20px"
      to="/friends"
    >
      友链
    </router-link>
    <router-link
      :class="{ 'm-mobile-show': mobileHide, active: $route.name === 'About' }"
      class="item"
      style="text-decoration-line: none; color: white; padding: 20px"
      to="/about"
    >
      关于我
    </router-link> -->

    <!--自带防抖-->
    <el-autocomplete
      v-model="queryString"
      :fetch-suggestions="debounceQuery"
      class="right item m-search"
      placeholder="请输入内容"
      popper-class="m-search-item"
      style="margin-left: 500px"
      suffix-icon="el-icon-search"
      @select="handleSelect"
    >
      <i slot="suffix" class="search icon el-input__icon"></i>
      <template slot-scope="{ item }">
        <div v-html="item.title"></div>
        <div v-html="item.description"></div>
        <span class="content" v-html="content"></span>
      </template>
    </el-autocomplete>

    <router-link
      v-if="!isShow"
      style="
        text-decoration-line: none;
        color: white;
        padding: 15px;
        margin-left: 970px;
      "
      to="/login"
    >
      登录
    </router-link>

    <router-link
      v-if="!isShow"
      style="
        text-decoration-line: none;
        color: white;
        center
        margin-left: 1350px;
      "
      to="/register"
    >
      注册
    </router-link>
    <div class="right-menu" v-if="isShow">
      <!-- <el-container v-if="isShow"> -->
      <el-header>
        <div class="header-avatar">
          <el-avatar size="medium" :src="avatar"></el-avatar>
          <el-dropdown>
            <div style="margin-top: 5px">
              <span class="el-dropdown-link" style="color: white">
                {{ user.username }}
                <!-- 赵浩杰 -->
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/profile/index">我的主页</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/messageList">我的消息</router-link>
                </el-dropdown-item>
                <el-dropdown-item @click.native="logout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </div>
          </el-dropdown>
        </div>
      </el-header>
    </div>
  </div>
</template>

<script>
import { queryDictionaryAllPage } from "../api/dictionary/dictionary";
import { queryMessageCount } from "../api/article/message";
import { esSearch } from "../api/article/es";
import { logout } from "../api/login/userLogin";
import { MessageBox, Message } from "element-ui";
export default {
  name: "Navbar",
  data() {
    return {
      types: {},
      input: "",
      queryString: "",
      queryResult: [],
      timer: null,
      mobileHide: false,
      ifShowInput: false,
      isShow: false,
      avatar: "",
      user: [],
      messageCount: 0,
      hiddenBadge: true,
      flag: false,
    };
  },
  methods: {
    queryClick() {
      if (this.flag) {
        this.$router.push(`/messageList`);
      } else {
        // to re-login
        MessageBox.confirm("请登录", "确认登陆", {
          confirmButtonText: "登陆",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$store.commit("REMOVE_INFO");
          this.$router.push({
            path: "/login",
          });
        });
      }
    },
    //用固话登出
    logout() {
      logout().then((response) => {
        this.$store.commit("REMOVE_INFO");
        //刷新页面
        if (this.$route.path === "/") {
          location.reload();
        } else {
          // console.log("path: ",this.$route.path)
          this.$router.push(`/`);
          location.reload();
        }
      });
    },

    //查询数据
    debounceQuery(queryString, callback) {
      this.querySearchAsync(queryString, callback);
      // this.timer && clearTimeout(this.timer);
      // this.timer = setTimeout(
      //   () => this.querySearchAsync(queryString, callback),
      //   1000
      // );
    },
    querySearchAsync(queryString, callback) {
      if (queryString == null || queryString.trim() === "") {
        return;
      }
      let keyWords = { queryString: queryString };
      esSearch(keyWords).then((response) => {
        this.queryResult = response.data;
        if (this.queryResult.length === 0) {
          this.queryResult.push({ title: "无相关搜索结果" });
        }
        callback(this.queryResult);
      });

      // const _this = this;
      // this.$axios
      //   .get("/search?queryString=" + queryString)
      //   .then((res) => {
      //     _this.queryResult = res.data.data;
      //     if (_this.queryResult.length === 0) {
      //       _this.queryResult.push({ title: "无相关搜索结果" });
      //     }

      //     console.log(_this.queryResult);
      //     callback(_this.queryResult);
      //   })
      //   .catch(() => {
      //     _this.msgError("请求失败");
      //   });
    },
    //点击选择时执行的方法
    handleSelect(item) {
      if (item.id) {
        this.$router.push(`/article/${item.id}`);
        // this.$router.push(`/blog/${item.id}`);
      }
    },
    //文章分类跳转
    categoryRoute(type) {
      this.$router.push(`/category/${type}`);
    },

    getTypes() {
      let data = { dictionaryType: "ARTICLE_CATEGORY" };
      queryDictionaryAllPage(data).then((response) => {
        this.types = response.data.data;
      });
    },
    //WebSocket即时消息通知
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage;

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage;

      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage;

      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage;

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload;
    },
    setErrorMessage() {
      console.log(
        "WebSocket连接发生错误   状态码：" + this.websocket.readyState
      );
    },
    setOnopenMessage() {
      console.log("WebSocket连接成功    状态码：" + this.websocket.readyState);
    },
    setOnmessageMessage(event) {
      // 根据服务器推送的消息做自己的业务处理
      console.log("服务端返回：" + event.data);
      if (event.data == 0) {
        this.hiddenBadge = true;
      } else {
        this.hiddenBadge = false;
      }
      this.messageCount = event.data;
    },
    setOncloseMessage() {
      console.log("WebSocket连接关闭    状态码：" + this.websocket.readyState);
    },
    onbeforeunload() {
      this.closeWebSocket();
    },
    closeWebSocket() {
      this.websocket.close();
    },
  },
  mounted() {
    // if (this.getIsPhone()) {
    //   this.mobileHide = true;
    // }
    // WebSocket
    if (this.flag) {
      if ("WebSocket" in window) {
        this.websocket = new WebSocket(
          "ws://localhost:8089/webSocket/" + this.user.id
        );
        this.initWebSocket();
      } else {
        alert("当前浏览器 Not support websocket");
      }
    }
  },
  // beforeDestroy() {
  //   this.onbeforeunload();
  // },
  created() {
    if (sessionStorage.getItem("token")) {
      this.isShow = true;
      this.flag = true;
      queryMessageCount().then((response) => {
        this.messageCount = response.data;
        if (this.messageCount > 0) {
          this.hiddenBadge = false;
        }
      });
    }
    if (sessionStorage.getItem("userInfo")) {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.avatar = userInfo.avatar;
      this.user = userInfo.user;
    }
  },
};
</script>

<style scoped>
/deep/ .el-popper .popper__arrow::after {
  content: none !important;
}

/deep/ .popper__arrow {
  display: none !important;
}

.el-dropdown-link {
  outline-style: none !important;
  outline-color: unset !important;
  height: 100%;
  cursor: pointer;
}

.el-dropdown-menu {
  margin: 20px 0 0 0 !important;
  padding: 0 !important;
  border: 0 !important;
  /* background: #1b1c1d !important; */
  background: white;
}

.el-dropdown-menu__item {
  padding: 0px 15px 0px 15px !important;
}

.el-dropdown-menu__item:hover {
  background-color: #399BDD !important;
}

.el-menu-demo {
  border-bottom-color: #ffffff !important;
}

.blog-navbar {
  height: 50px;
  padding-top: 20px;
  background-color: #333333;
  margin-left: auto !important;
  margin-right: auto !important;
}

.m-search {
  min-width: 220px;
  padding: 0 !important;
  margin-top: -5px;
}

.m-search input {
  color: rgba(255, 255, 255, 0.9);
  border: 0px !important;
  background-color: inherit;
}

.m-search i {
  color: rgba(255, 255, 255, 0.9) !important;
}

.m-search-item {
  min-width: 350px !important;
}

.m-search-item li {
  line-height: normal !important;
  padding: 8px 10px !important;
  width: 1000px;
}

.m-search-item li .title {
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.87);
}

.m-search-item li .content {
  text-overflow: ellipsis;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
}

.m-mobile-hide {
  display: none !important;
}

.m-mobile-show {
  padding: 0px 1px 0px 1px;
  margin: 20px 1px 0px 1px;
}
/deep/ .el-autocomplete {
  position: absolute;
  right: 200px;
}
.right-menu {
  float: right;
  margin-top: 0px;
}
.header-avatar {
  float: right;
  width: 100px;
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
}

.el-dropdown-link {
  cursor: pointer;
}
.message {
  float: right;
  margin-right: 30px;
  padding-top: 0px;
  text-decoration-line: none;
  color: white;
}
/* .right-menu {
  float: right;
  height: 100%;
  line-height: 50px;
  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  } */
/* } */
</style>

