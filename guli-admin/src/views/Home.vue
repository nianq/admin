<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">杂七杂八</div>
        <div>
          <el-button
            icon="el-icon-bell"
            type="text"
            style="margin-right: 8px;color: #000000;"
            size="normal"
          ></el-button>
          <el-dropdown class="userInfo">
            <span class="el-dropdown-link">
              gongjie
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
              <el-dropdown-item command="setting">设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided
                >注销登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router>
            <el-submenu
              v-for="(item, index) in this.$router.options.routes"
              v-if="!item.hidden"
              :key="index"
              :index="index + ''"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                :index="child.path"
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
                v-if="!child.hidden"
                >{{ child.name }}</el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <div
            class="homeWelcome"
            v-if="this.$router.currentRoute.path == '/home'"
          >
            欢迎来到
          </div>
          <router-view class="homeRouterView" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    d(index) {
      console.log(index)
      this.$router.push(index)
    },
  },
}
</script>

<style scoped>
.homeRouterView {
  margin-top: 10px;
}

.homeWelcome {
  text-align: center;
  font-size: 30px;
  font-family: 华文行楷;
  color: #409eff;
  padding-top: 50px;
}

.homeHeader {
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  box-sizing: border-box;
}

.homeHeader .title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #ffffff;
}

.homeHeader .userInfo {
  cursor: pointer;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
