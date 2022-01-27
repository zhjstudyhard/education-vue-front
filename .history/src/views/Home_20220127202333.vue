<template>
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
        <!-- <span style="font-size: small;color: blue">创建时间：{{ blog.createTime.split(' ')[0] }}  </span>
        <span style="font-size: small;color: blue">  更新时间：{{ blog.updateTime.split(' ')[0] }}   </span> -->
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
      </div>
      <!-- <img :src=blog.firstPicture class="image " v-viewer="{movable: false}"> -->

      <!--      <div class="home-description-markdown-body" v-html="blog.descriptionMd"  v-viewer="{movable: false}"></div>-->
      <markdown-it-vue-light
        class="home-description-markdown-body"
        :content="article.description"
        v-viewer="{ movable: false }"
      />
      <div>
        <img
          :src="article.avatar"
          style="width: 40px; margin-top: 30px; border-radius: 50%"
        />
         <span style="font-size: 20px; color: blue">{{ article.userName }}</span>
      </div>
      
      <!--阅读全文按钮-->
      <div class="div-btn">
        <a
          class="color-btn"
          href="javascript:;"
          @click.prevent="toArticle(article.id)"
          >阅读全文</a
        >
      </div>
    </el-card>
    <div v-if="pageShow" class="home-page">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        background
        layout="prev, pager, next"
        @current-change="getData"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getArticlePage, getFontArticlePage } from "../api/article/article";
import { queryDictionaryAllPage } from "../api/dictionary/dictionary";
export default {
  name: "Home",
  data() {
    return {
      articles: [],
      types: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      pageShow: 0,
    };
  },
  methods: {
    //跳转到博客详情页
    toArticle(id) {
      this.$router.push(`/article/${id}`);
    },
    //分页获取文章
    getData(currentPage) {
      if (currentPage !== 1) {
        $("#waypoint").hide();
        $("#header-photo").hide();
      } else {
        $("#waypoint").show();
        $("#header-photo").show();
      }
      let data = { currentPage: currentPage };
      getFontArticlePage(data).then((response) => {
        // console.log("articels: ",response.data)
        this.articles = response.data.data;
        this.currentPage = response.data.current;
        this.total = response.data.total;
        this.pageSize = response.data.pageSize;
        this.pageShow = 1;
      });
      //改变页号后返回顶部
      this.scrollToTop();
    },
  },
  created() {
    this.getData(1);
  },

  mounted() {},
  watch: {},
};
</script>


<style scoped>
.home-container {
}

/*.home-description-markdown-body {*/
/*  text-align: left;*/
/*}*/
home-description-markdown-body {
  text-align: left !important;
}
.image {
  width: 100%;
  height: auto;
}

.home-main-column-middle-card {
  background-color: white;
  margin-bottom: 10px;
  padding: 20px 41px;
}
.home-title {
  text-align: center;
}
.home-page {
  text-align: center;
}

.home-title {
  margin-bottom: 5px;
}
.div-btn {
  text-align: center;
}
.blog-link:link,
.blog-link:visited {
  text-decoration: none;
  color: black;
}

.home-main-column-middle-card:hover {
  -webkit-box-shadow: #ccc 0px 10px 10px;
  -moz-box-shadow: #ccc 0px 10px 10px;
  box-shadow: #ccc 0px 10px 10px;
}

.home-page {
  text-align: center;
}

.color-btn {
  text-decoration-line: none;
  padding: 11px 20px;
  color: white;
  font-size: 13px;
  background: linear-gradient(to right, #56ccf2, #2f80ed);
  border-radius: 15px;
  min-width: 90px;
}

.div-btn {
  padding: 14px 5px 30px 5px;
  margin-top: 7px;
}
</style>