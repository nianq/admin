<template>
  <div>
    <el-tag>
      <i class="el-icon-download" />
      <el-link type="primary" href="'https://gongj.oss-cn-beijing.aliyuncs.com/课程分类.xlsx'">点击下载模版</el-link>
    </el-tag>

    <el-upload class="upload-demo" action="/eduservice/subject/addSubjcet" :on-change="handleChange" :on-success="fileUploadSuccess" :before-upload="beforeUpload" :on-error="fileUploadError" :file-list="fileList" ref="upload" accept="application/vnd.ms-excel">
      <el-button size="small" type="primary" style="margin-top: 10px;">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    }
  },
  mounted() {},
  methods: {
    // 文件大小超出
    beforeUpload(file) {
      let isLt2M = true
      isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        this.fileList = []
      }

      var tmg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = tmg == 'xls' || tmg == 'xlsx'
      if (!extension) {
        this.$message.error('只能上传后缀是.xlsx或.xls的文件')
        this.fileList = []
      }
      return isLt2M && extension
    },
    //文件状态改变时
    handleChange(file, fileList) {
      console.log('状态改变时')
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]
      }
    },
    fileUploadSuccess(response, file, fileList) {
      console.log('开始调用接口')
      if (response.code != 20000) {
        this.$message({
          type: 'error',
          message: '添加课程分类失败',
        })
        this.$refs.upload.clearFiles()
      } else {
        this.$message({
          type: 'success',
          message: '添加课程分类成功',
        })
        //跳转课程分类列表
        //路由跳转
        this.$router.push({ path: '/subject/list' })
      }
    },
    //上传失败
    fileUploadError() {
      this.loading = false
      this.$message({
        type: 'error',
        message: '添加课程分类失败',
      })
    },
  },
}
</script>
