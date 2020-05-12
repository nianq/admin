<template>
  <div class="loginStyle">
    <el-form class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item>
        <el-input
          size="normal"
          type="text"
          auto-complete="off"
          v-model="loginForm.username"
          placeholder="请输入用户名"
        >
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-input
          size="normal"
          type="password"
          auto-complete="off"
          v-model="loginForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-button
        size="normal"
        type="primary"
        style="width: 100%;"
        @click="submitLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loading: false,
      loginForm: {
        username: 'admin',
        password: '123',
      },
    }
  },
  methods: {
    submitLogin() {
      let path = this.$route.query.redirect
      this.$router.replace(path == '/' || path == undefined ? '/home' : path)
    },
  },
}
</script>

<style scope>
/* .loginStyle {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/6.jpg');
  background-size: 100% 100%;
  height: 100%;
  background-size: cover;
} */

.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #505458;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
</style>
