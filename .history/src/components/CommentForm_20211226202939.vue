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
    <el-form ref="formRef" :model="commentForm" :rules="rules" size="small">
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
            <!-- v-throttle="[postForm, `click`, 30000]" -->
            <!-- @mouseenter.native="beforePost" -->
            <!-- 接口节流  -->
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
export default {
  name: "CommentForm",
  props: {
    realParentCommentId: {
      type: Number,
      default: "-1",
    },
    realParentCommentNickname: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      commentForm: {
        content: "",
        blogId: 0,
        parentId: this.realParentCommentId,
        // isAdminComment: -1,
        // parentCommentNickname: this.realParentCommentNickname
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
    // //失去焦点 自动获取qq昵称和头像 或者非qq设置随机头像
    // onInputBlur() {
    //   //判断是否是qq号码
    //   const _this = this
    //   var qq = this.commentForm.nickname
    //   if (!isNaN(Number(qq)) && qq.length > 4 && qq.length < 12) {
    //     this.$axios.get('https://api.usuuu.com/qq/' + qq).then(res => {
    //       if (res.data) {
    //         _this.commentForm.nickname = res.data.data.name
    //         _this.commentForm.avatar = res.data.data.avatar
    //         _this.commentForm.qq = res.data.data.qq
    //         //console.log(JSON.stringify(_this.commentForm))
    //         //console.log("哈哈哈哈哈")
    //       }
    //     })
    //   } else {
    //     //根据昵称随机头像
    //     var randomNum = this.hashFunc(this.commentForm.nickname, 20)
    //     this.commentForm.avatar = "https://cdn.jsdelivr.net/gh/yubifeng/blog-resource/bloghosting/2021/avatar/avatar" + randomNum + ".webp"
    //     //console.log(JSON.stringify(this.commentForm))
    //   }
    // },
    addComment() {
      if (this.commentForm.content == "") {
        //  alert("你还未发表评论");
        this.$message({
          message: '这是一条消息提示',
          duration: 30 * 1000,
          customClass: 'message-override'
        });
        // <el-alert title="你还没有发表评论" type="warning" show-icon></el-alert>;
      }
    },
    // beforePost() {

    // },

    //提交评论
    postForm() {
      //console.log(JSON.stringify(this.commentForm))
      //表单校验
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          console.log(JSON.stringify(this.commentForm));
          //判断是否为管理员(博主)
          if (this.commentForm.isAdminComment == 1) {
            this.commentForm.avatar =
              "https://cdn.jsdelivr.net/gh/yubifeng/blog-resource/bloghosting//website/static/websiteAvatar.webp";
          }
          const _this = this;
          this.$axios.post("/comment/add", this.commentForm).then((res) => {
            //console.log(res)
            if (res.data.code == 200) {
              _this.$alert("发送成功", "提示", {
                confirmButtonText: "确定",
                callback: (action) => {
                  //_this.$router.push("/blog/")
                  location.reload();
                },
              });
            } else {
            }
          });
        } else {
          alert("输入数据不合法，请检查");
          return false;
        }
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
    if (this.$route.params.blogId) {
      this.commentForm.blogId = this.$route.params.blogId;
    } else if (this.$route.path == "/about") {
      this.commentForm.blogId = 1;
    } else if (this.$route.path == "/friends") {
      this.commentForm.blogId = 11;
    } else {
      // alert("error")
      return false;
    }
    if (this.$store.getters.getUser) {
      if (
        this.$store.getters.getUser.role === "role_admin" ||
        this.$store.getters.getUser.role === "role_root"
      ) {
        this.commentForm.isAdminComment = 1;
      }
    }
  },
};
</script>

<style scoped>
.message-override {
  z-index: 10000;
}
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