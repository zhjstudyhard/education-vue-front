<template>
  <div class="ui top segment" style="text-align: center">
    <h2 class="m-text-500">分类 {{ type }} 下的文章</h2>
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
      <markdown-it-vue-light
        class="home-description-markdown-body"
        :content="article.description"
        v-viewer="{ movable: false }"
      />
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
import { getArticlePage,getFontArticlePage } from "../api/article/article";
export default {
  name: "Category",
  data() {
    return {
      articles: [],
      types: [],
      currentPage: 1,
      total: 0,
      pageSize: 5,
      pageShow: 0,
      type: "",
    };
  },

  methods: {
    getData(currentPage) {
      let data = { currentPage: currentPage, type: this.type };
      getFontArticlePage(data).then((response) => {
        this.articles = response.data.data;
        this.currentPage = response.data.current;
        this.total = response.data.total;
        this.pageSize = response.data.pageSize;
        this.pageShow = 1;
      });
    },
  },

  watch: {
    $route(to, from) {
      this.type = this.$route.params.type;
      this.getData(1);
    },
  },
  created() {
    this.type = this.$route.params.type;
    this.getData(1);
  },
};
</script>

<style scoped>
.home-container {
}

.home-description-markdown-body {
  text-align: left;
}

.image {
  width: 100%;
  height: auto;
}

.home-main-column-middle-card {
  background-color: white;
  margin-bottom: 40px;

  padding: 20px 41px;
  text-align: center;
}

.home-title {
  margin-bottom: 20px;
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
</style>