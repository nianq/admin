<template>
    <div>
    <el-header class="homeHeader">
                <div class="title">哇哈哈</div>
                <div>
                    <el-button icon="el-icon-bell" type="text" style="margin-right: 8px;color: #000000;" size="normal"></el-button>
                    <el-dropdown class="userInfo">

                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="setting">设置</el-dropdown-item>
                            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>

        <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px">
  
    <el-menu @select="select">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item index="/edu/teacher/list">选项1</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    
    <el-main>
      <h1>首页</h1>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
       data() {
        return {
        }
      },
        computed: {
          
        },
        methods: {
          select(path){
            this.$router.push(path)
          }
        }
    }
</script>

<style>
   .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>