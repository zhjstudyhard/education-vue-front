<template>
  <div class="blog-detail">
    <div class="mblog">
      <div class="home-title">
        <h2>{{ article.title }}</h2>
        <span style="font-size: small; color: blue"
          >创建时间：{{ article.gmtCreate }}
        </span>
        <span style="font-size: small; color: blue">
          更新时间：{{ article.gmtModified }}
        </span>
        <span style="font-size: small; color: blue">
          分类：{{ article.typeName }}</span
        >
        <!-- <span style="font-size: small;color: blue"> 字数：{{ blog.words }}</span> -->
      </div>

      <el-link v-if="ownBlog" icon="el-icon-edit">
        <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }">
          编辑
        </router-link>
      </el-link>

      <!--      <div class="markdown-body" v-html="blog.content" v-viewer="{movable: false}"></div>-->
      <markdown-it-vue-light
        class="md-body"
        :content="article.content"
        v-viewer="{ movable: false }"
      />
    </div>
    <div>
      <Comment></Comment>
    </div>
  </div>
</template>

<script>
import { queryDictionaryAllPage } from "../api/dictionary/dictionary";
import { getArticleById } from "../api/article/article";
import Comment from "@/components/Comment";

export default {
  name: "Article",
  components: { Comment },
  data() {
    return {
      types: [],
      article: {
        id: "",
        title: "",
        content: "",
        gmtCreate: "",
        gmtModified: "",
        typeName: "",
        // words: 0,
        views: 0,
      },
      ownBlog: false,
    };
  },
  methods: {
    getTypes() {
      let data = { dictionaryType: "ARTICLE_CATEGORY" };
      queryDictionaryAllPage(data).then((response) => {
        this.types = response.data.data;
      });
    },
    getArticle() {
      if (this.$route.params && this.$route.params.id) {
        let data = { id: this.$route.params.id };
        getArticleById(data).then((response) => {
          this.article = response.data;
        });
      }
    },
  },
  created() {
    this.getTypes();
    this.getArticle();
  },
};
</script>

<style scoped>
.mblog {
  min-height: 600px;

  padding: 5px 35px 5px 35px;
  text-align: center;
}

.home-title {
  margin-bottom: 40px;
}

.md-body {
  text-align: left;
}

.blog-detail {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
}

.author-message {
  text-align: left;
  background-color: honeydew;
  padding: 10px 5px 10px 5px;
  font-size: 14px;
}

.el-divider {
  margin: 1rem 0 !important;
}
.code {
  background-color: #333333;
}
</style>