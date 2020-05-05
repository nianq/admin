<template>
  <div>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-bottom: 40px;"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="150px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder="示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" placeholder="课程简介" />
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select
          clearable
          v-model="courseInfo.teacherId"
          placeholder="请选择"
        >
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<
<script>
export default {
  data() {
    return {
      active: 0,
      courseInfo: {
        title: '',
        subjectId: '', //二级分类id
        subjectParentId: '', //一级分类id
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '/static/01.jpg',
        price: 0,
      },
      teacherList: [],
    }
  },
  mounted() {
    //初始化所有讲师
    this.teacherListAll()
  },
  methods: {
    saveOrUpdate() {
      this.postRequest(
        '/eduservice/course/addCourseInfo',
        this.courseInfo
      ).then((resp) => {
        if (resp.code == 20000) {
          let courseId = resp.data.courseId
          this.$router.push('/course/chapter/' + courseId)
        } else {
          this.$message.error('保存失败')
        }
      })
    },

    //获得所有讲师
    teacherListAll() {
      this.getRequest('/eduservice/teacher/findAllTeacher').then((resp) => {
        if (resp.code == 20000) {
          this.teacherList = resp.data.list
        } else {
          this.$message.error('获取讲师列表失败')
        }
      })
    },
  },
}
</script>
