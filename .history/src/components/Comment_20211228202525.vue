<template>
  <!--评论列表-->
  <div class="comment-body">
    <!--评论表单-->
    <CommentForm
      v-if="parentId === -1"
      :realParentCommentId="-1"
      @parentEvent="toClick"
    ></CommentForm>
    <h3 class="ui-dividing-header">{{ commentCount }} 条评论</h3>
    <h3 v-if="commentCount === 0" class="ui-header">发表你的意见！</h3>
    <!--评论内容-->
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <!--父评论内容--用户名 头像 内容-->
      <span :id="`comment-${comment.id}`" class="anchor"></span>
      <div class="image-avatar">
        <img :src="comment.avatar" style="width: 40px; border-radius: 50%" />
      </div>
      <div class="content">
        {{ comment.username }}
        <!-- <a :href="comment.website!=''&&comment.website!=null?comment.website:null" class="nickname" rel="external nofollow noopener"
           target="_blank">{{ comment.nickname }}</a> -->
        <el-tag
          v-if="comment.articleUser == 1"
          class="label"
          effect="dark"
          size="mini"
          type="info"
          >博主</el-tag
        >
        <span class="date">{{ comment.gmtCreate }}</span>
        <el-button size="mini" type="primary" @click="setReply(comment.id)"
          >回复</el-button
        >
        <div class="text" v-html="comment.content"></div>
      </div>
      <!--子评论-->
      <div v-if="comment.replyComments.length > 0" class="comments">
        <div
          v-for="reply in comment.replyComments"
          :key="reply.id"
          class="comment"
        >
          <span :id="`comment-${reply.id}`" class="anchor"></span>
          <div class="image-avatar">
            <img :src="reply.avatar" style="width: 40px; border-radius: 50%" />
          </div>
          <div class="content">
            {{ reply.username }}
            <el-tag
              v-if="reply.articleUser == 1"
              class="label"
              effect="dark"
              size="mini"
              type="info"
              >博主</el-tag
            >
            <span class="date">{{ reply.gmtCreate }}</span>
            <div class="text">
              <div style="display: inline" v-html="reply.content"></div>
            </div>
            <div class="actions">
              <el-button
                size="mini"
                type="primary"
                @click="setChildrenReply(reply.id)"
                >回复</el-button
              >
            </div>
          </div>
          <!--评论表单-->
          <CommentForm
            v-if="parentId === reply.id"
            :realParentCommentId="comment.id"
            @parentEvent="toClick"
          />
        </div>
      </div>
      <!--评论表单-->
      <CommentForm
        v-if="parentId === comment.id"
        :realParentCommentId="comment.id"
        @parentEvent="toClick"
      />
    </div>
  </div>
</template>

<script>
import CommentForm from "@/components/CommentForm";
import { queryComment } from "@/api/article/comment";
export default {
  name: "Comment",
  components: { CommentForm },
  data() {
    return {
      commentCount: 0,
      comments: [],
      parentId: -1,
      articleId: "",
    };
  },
  methods: {
    //设置回复的父亲id
    setReply(id) {
      this.parentId = id;
    },
    //设置回复的父亲id
    setChildrenReply(id) {
      this.parentId = id;
    },
    //接受子组件信息，将评论表单归位
    toClick(msg) {
      //console.log(msg)
      this.parentId = -1;
    },
    //获取评论
    getComments() {
      if (this.$route.params.id) {
        this.articleId = this.$route.params.id;
      }
      let data = { articleId: this.articleId };
      queryComment(data).then((response) => {
        this.comments = response.data.data;
        this.commentCount = this.comments.length;
      });
      // this.$axios.get("/comment/" + this.blogId).then((res) => {
      //   this.comments = res.data.data;
      //   this.commentCount = this.comments.length;
      //   // for (var i in this.comments) {
      //   //   this.commentCount =
      //   //     this.commentCount + this.comments[i].replyComments.length;
      //   // }
      // });
    },
  },
  created() {
    this.getComments();
  },
};
</script>

<style scoped>
.comment-body {
  padding: 5px 35px 15px 22px;
}
.comment {
  padding-right: 2em !important;
  padding-left: 1em !important;
  margin: 7px 0px 0px;
  padding-top: 7px;
}
.comments {
  padding: 42px 0px 24px 31.5px;
  margin: -28px 0px -10px 17.5px;
  border-left: 1px #ccc solid;
}
.content {
  margin-left: 0px;
  display: inline-block;
  width: auto;
  vertical-align: top;
}
.image-avatar {
  display: inline-block;
  width: 49px;
  vertical-align: top;
}
.label {
  margin-left: 5px;
}
.nickname {
  font-weight: bolder;
  font-size: 14px;
  color: #000;
  text-decoration-line: none;
}
.comment .el-button {
  margin-left: 5px;
  padding: 4px 5px;
}
.text {
  white-space: pre-wrap !important;
  margin: 7px 0px;
  line-height: 1.5;
  font-size: 14px;
}
.date {
  color: gray;
  font-size: 10px;
  margin-left: 5px;
}
.anchor {
  height: 55px;
  margin-top: -55px;
  visibility: hidden;
}
</style>