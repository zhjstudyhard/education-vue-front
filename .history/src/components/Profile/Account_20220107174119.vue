
<template>
  <el-form style="margin-top: 10px" size="small" label-width="65px">
    <el-form-item label="用户名" :required="true">
      <el-input v-model.trim="user.username" style="width: 35%" />
    </el-form-item>
    <el-form-item label="邮箱" :required="true">
      <el-input v-model.trim="user.email" style="width: 35%" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  // props: {
  //   user: {
  //     type: Object,
  //     default: () => {
  //       return {
  //         username: "",
  //         email: "",
  //       };
  //     },
  //   },
  // },
  methods: {
    submit() {
      this.$message({
        message: "用户信息更新成功",
        type: "success",
        duration: 5 * 1000,
      });
    },
  },
  created() {
    if (sessionStorage.getItem("userInfo")) {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      this.user = userInfo.user;
    }
  },
};
</script>
