<template>
  <div class="app-container">
    <el-steps
      :active="3"
      process-status="wait"
      align-center
      style="margin-bottom: 40px;"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button type="primary" @click="publish">发布课程</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
    
    }
  },

  created() {
    console.log('publish created')
  },

  methods: {
    previous() {
      console.log('previous')
      this.$router.push({ path: '/course/chapter/1' })
    },

    publish() {
      console.log('publish')
      this.$router.push({ path: '/course/list' })
    },
  },
}
</script>
