<template>
  <!-- 评论输入表单 -->
  <div class="form">
    <h3>
      发表评论
      <el-button
        v-show="this.realParentCommentId !== -1"
        class="m-small"
        size="mini"
        type="primary"
        @click="toSendParentId()"
        >取消回复
      </el-button>
    </h3>
    <el-form ref="formRef" :model="commentForm" size="small">
      <el-input
        v-model="commentForm.content"
        :class="'textarea'"
        :rows="5"
        :validate-event="false"
        maxlength="250"
        placeholder="发一条友善的评论"
        show-word-limit
        type="textarea"
      ></el-input>

      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item>
            <el-button size="medium" type="primary" @click="addComment"
              >发表评论</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { MessageBox, Message } from "element-ui";
import { addComment, delComment } from "../api/article/comment";
import router from "@/router";
export default {
  name: "CommentForm",
  props: {
    realParentCommentId: {
      // type: String,
      default: "-1",
    },
    firstParentCommentId: {
      default: "",
    },
  },
  data() {
    return {
      commentForm: {
        targetType: 1,
        content: "",
        articleId: null,
        parentId: this.realParentCommentId,
        firstParentId: this.firstParentCommentId,
      },
    };
  },
  methods: {
    //设计哈希函数
    //1>将字符串转成比较大的数字：hashCode
    //2>将大的数字hashCode压缩到数组范围
    hashFunc(str, size) {
      //1.定义hashCode变量
      var hashCode = 0;
      //2.霍纳算法，来计算 hashCode的值
      for (var i = 0; i < str.length; i++) {
        hashCode = 37 * hashCode + str.charCodeAt(i); //获取编码
      }
      //3.取余状态
      var index = (hashCode % size) + 1;
      return index;
    },
    //取消回复 向父组件传值 并设置评论父id
    toSendParentId() {
      this.$emit("parentEvent", "取消回复了");
      //console.log("取消")
      this.commentForm.parentCommentId = -1;
    },
    //添加评论
    addComment() {
      if (!sessionStorage.getItem("token")) {
        // to re-login
        MessageBox.confirm("还未登录,或登陆失效", "确认登录", {
          confirmButtonText: "登陆",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          router.push({
            path: "/login",
          });
        });
        return false;
      }

      if (this.commentForm.content == "") {
        //  alert("你还未发表评论");
        this.$message({
          message: "你还未发表评论",
          duration: 2 * 1000,
          type: "warning",
          offset: 100,
        });
        return false;
        // <el-alert title="你还没有发表评论" type="warning" show-icon></el-alert>;
      }
      addComment(this.commentForm).then((response) => {
        this.$message({
          type: "success",
          message: "评论成功!",
          offset: 130,
        });
        location.reload();
      });
    },
  },
  watch: {
    //监控props 但是好像没用额， 因为为在父类中没改动
    realParentCommentId: function (newVal) {
      this.commentForm.parentCommentId = newVal;
      console.log(JSON.stringify(this.commentForm));
    },
  },
  created() {
    if (this.$route.params.id) {
      this.commentForm.articleId = this.$route.params.id;
    }
  },
};
</script>

<style scoped>
.form h3 {
  margin: 5px;
  font-weight: 500 !important;
}
.form .m-small {
  margin-left: 5px;
  padding: 4px 5px;
}
.el-form .textarea {
  margin-top: 5px;
  margin-bottom: 15px;
}
.el-form textarea {
  padding: 6px 8px;
}
.el-form textarea,
.el-form input {
  color: black;
}
.el-form .el-form-item__label {
  padding-right: 3px;
}
</style>