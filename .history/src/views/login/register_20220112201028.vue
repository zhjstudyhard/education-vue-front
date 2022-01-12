<template>
  <div class="login-container">
    <el-form
      ref="formRegister"
      :model="formRegister"
      :rules="rules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登 录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-user"></i>
        </span>
        <el-input
          ref="username"
          v-model="formRegister.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="formRegister.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          auto-complete="new-password"
        />
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-view"></i>
        </span>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <span class="svg-container">
          <i class="el-icon-lock"></i>
        </span>
        <el-input
          :key="passwordType"
          ref="checkPassword"
          v-model="formRegister.checkPassword"
          :type="passwordType"
          placeholder="再次输入密码"
          name="checkPassword"
          tabindex="2"
          autocomplete="on"
          auto-complete="new-password"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-view"></i>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 50%"
          @click.native.prevent="addUser"
          >提交</el-button
        >
        <el-button style="width: 48%" @click="cancle"
          >取消<i class="el-icon-arrow-right el-icon--right"></i
        ></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "../../util/validate";
import { encrypt } from "../../util/rsaEncrypt";
import { login, getUserInfo } from "../../api/login/userLogin";
export default {
  data() {
    let checkUserName = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("用户名不能为空!"));
      } else {
        cb(); // 将判断传递给后面
      }
    };
    let checkPassword = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("密码不能为空!"));
      } else {
        cb();
      }
    };
    let checkPasswordAgain = (rule, value, cb) => {
      if (!value) {
        return cb(new Error("再次输入密码不能为空!"));
      } else if (value !== this.formRegister.password) {
        return cb(new Error("两次输入密码不一致!"));
      } else {
        cb();
      }
    };
    return {
      formRegister: {
        username: "",
        password: "",
        checkPassword: "",
      },
      rules: {
        username: [{ validator: checkUserName, trigger: "blur" }],
        password: [{ validator: checkPassword, trigger: "blur" }],
        checkPassword: [{ validator: checkPasswordAgain, trigger: "blur" }],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
    };
  },
  methods: {
    cancle() {
      this.formRegister = {};
      this.passwordType = "";
      this.showPwd();
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }

      let e = document.getElementsByClassName("el-icon-view")[0];
      let e2 = document.getElementsByClassName("el-icon-view")[1];
      this.passwordType == ""
        ? e.setAttribute("style", "color: #409EFF")
        : e.setAttribute("style", "color: #c0c4cc");
      this.passwordType == ""
        ? e2.setAttribute("style", "color: #409EFF")
        : e2.setAttribute("style", "color: #c0c4cc");
      //   this.$nextTick(() => {
      //     this.$refs.password.focus();
      //   });
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },

    // 用户注册
    addUser() {
      let user = this.formRegister;
      let formData = {
        name: user.name,
        password: user.password,
      };
      // 表单验证
      this.$refs["formRegister"].validate((valid) => {
        if (valid) {
          this.$http
            .post("/api/register", formData)
            .then((res) => {
              console.dir(res.data);
              if (res.data.error) {
                this.$message.error(res.data.error);
                return false;
              } else {
                this.$router.push("/login");
              }
            })
            .catch((err) => {
              this.$message.error(`${err.message}`);
            });
        } else {
          this.$message.error("表单验证失败!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  height: 100%;
  // min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
