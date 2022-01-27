<!--
 * @Author: your name
 * @Date: 2021-10-21 16:13:44
 * @LastEditTime: 2022-01-27 22:02:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog-view\src\components\RightCard.vue
-->
<template>
  <div>
    <div
      style="
        width: 250px;
        padding: 0px 0px 0px 0px;
        text-align: center;
        margin-bottom: 10px;
      "
    >
      <el-button
        type="primary"
        icon="el-icon-edit"
        style="width: 250px; height: 50px"
        @click="writeArticle"
        >发布文章</el-button
      >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold; font-size: 16px">文章分类</span>
        </div>
        <div
          v-for="type in types"
          :key="type.dictionaryCode"
          class="text item"
          @click="queryMessage(type)"
        >
          {{ type.dictionaryValue }}
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold; font-size: 16px">文章热议</span>
        </div>
        <div
          v-for="article in articles"
          :key="article.id"
          class="text item"
          @click="updateRouter(article)"
        >
          <h2>
            {{ article.title }}
          </h2>
          <span style="font-size: small; color: blue"
            >创建时间：{{ article.gmtCreate }}
          </span>
          <span style="font-size: small; color: blue">
            更新时间：{{ article.gmtModified }}
          </span>
          <span style="font-size: small; color: blue">
            分类：{{ article.typeName }}</span
          >
        </div>
      </el-card>
    </div>
    <!-- <div class="card">
      <p style="margin-top: 0px">文章热议</p>
      <el-divider></el-divider>
      <div class="home-container">
        <el-card
          v-for="article in articles"
          :body-style="{ padding: '0px' }"
          class="home-main-column-middle-card"
          :key="article.id"
        >
          <div class="home-title">
            <h2>
              <router-link
                :to="{ name: 'article', params: { id: article.id } }"
                class="blog-link"
                >{{ article.title }}
              </router-link>
            </h2>
            <span style="font-size: small; color: blue"
              >创建时间：{{ article.gmtCreate }}
            </span>
            <span style="font-size: small; color: blue">
              更新时间：{{ article.gmtModified }}
            </span>
            <span style="font-size: small; color: blue">
              分类：{{ article.typeName }}</span
            >
            <!-- <span style="font-size: small;color: blue">  字数：{{ blog.words }}</span> -->
    <!-- </div>
        </el-card>
      </div> -->
  </div>
</template>

<script>
import { MessageBox, Message } from "element-ui";
import { queryCacheArticle } from "../api/article/article";
import { queryDictionaryAllPage } from "../api/dictionary/dictionary";
import store from "../store";
import router from "../router";
import EventBus from "@/api/EventBus.js";
export default {
  name: "RightCard",
  data() {
    return {
      runTime: 0,
      articles: [],
      types: {},
    };
  },
  methods: {
    writeArticle() {
      if (!sessionStorage.getItem("token")) {
        MessageBox.confirm("请登录", "确认登陆", {
          confirmButtonText: "重新登陆",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          store.commit("REMOVE_INFO");
          router.push({ path: "/login" });
        });
      } else {
        router.push({ path: "/writeArticle" });
      }
    },
    queryMessage(type) {
      EventBus.$emit("type", type.dictionaryCode);
      //  console.log("正在传值")
    },

    //查询文章热议
    getData() {
      let data = {};
      queryCacheArticle(data).then((response) => {
        this.articles = response.data;
      });
    },
    getTypes() {
      let data = { dictionaryType: "ARTICLE_CATEGORY" };
      queryDictionaryAllPage(data).then((response) => {
        console.log("types: ", response.data.data);
        this.types = response.data.data;
      });
    },
  },

  created() {
    this.getTypes();
    this.getData();
  },
  // mounted() {
  //   this.getRunTime();
  // },
};
</script>

<style scoped>
.card {
  width: 250px;
  /* height: 300px; */
  height: 200px;
  padding: 20px 0px 0px 0px;
  background-color: white;
  text-align: center;
}

.card:hover {
  -webkit-box-shadow: #ccc 0px 10px 10px;
  -moz-box-shadow: #ccc 0px 10px 10px;
  box-shadow: #ccc 0px 10px 10px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  cursor: pointer;
}
.item:hover {
  /* box-shadow:antiquewhite; */
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.479);
  border-radius: 3px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin-top: 10px;
  width: 250px;
}
</style>