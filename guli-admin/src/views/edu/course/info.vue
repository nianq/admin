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

      <el-form-item label="总课时" label-width="150px">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
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

      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类"
          @change="subjectLevelOneChanged"
        >
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>

        <el-select
          v-model="courseInfo.subjectId"
          placeholder="二级分类"
          style="margin-left:10px"
        >
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
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

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <tinymce-editor
          :id="editorId"
          ref="editor"
          v-model="courseInfo.description"
          @input="handleInput"
          @onClick="handleClick"
          @handleImgUpload="imgUpload"
        />
      </el-form-item>

      <el-form-item label="课程封面">
        <el-upload
          class="avatar-uploader"
          action="/eduoss/fileoss"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="courseInfo.cover" :src="courseInfo.cover" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import TinymceEditor from '@/components/Tinymce/TinymceEditor'

export default {
  //声明组件
  components: { TinymceEditor },
  data() {
    return {
      active: 0,
      message: '我经常被生活锤得心灰意冷，可我从来都没放弃过。',
      editorId: 'editor',
      courseInfo: {
        title: '',
        subjectId: '', //二级分类id
        subjectParentId: '', //一级分类id
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '',
        price: 0,
        ThreesubjectId: '', //三级分类id
      },
      teacherList: [], //所有的讲师
      subjectOneList: [], //一级分类
      subjectTwoList: [], //二级分类
      //subjectThreeList: [], //三级分类
      courseId: '',
    }
  },
  mounted() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      //调用根据id查询课程的方法
      this.getInfo()
    } else {
      //初始化所有讲师
      this.teacherListAll()
      //初始化一级分类
      this.getOneSubject()
    }
  },
  methods: {
    //获得课程信息
    getInfo() {
      this.getRequest('/eduservice/course/getCourseInfo/' + this.courseId).then(
        (resp) => {
          this.courseInfo = resp.data.row
          //初始化所有讲师
          this.teacherListAll()
        }
      )
      //1 查询所有的分类，包含一级和二级、三级
      this.getRequest('/eduservice/subject/getAllSubject').then((resp) => {
        //2 获取所有一级分类
        this.subjectOneList = resp.data.list
        //3 把所有的一级分类数组进行遍历，
        for (var i = 0; i < this.subjectOneList.length; i++) {
          //获取每个一级分类
          let subjectOne = this.subjectOneList[i]
          if (subjectOne.id == this.courseInfo.subjectParentId) {
            //获取一级分类所有的二级分类
            this.subjectTwoList = subjectOne.children
          }
        }
      })
    },
    //保存或者修改
    saveOrUpdate() {
      //判断添加还是修改
      if (!this.courseInfo.id) {
        //添加
        this.addCourse()
      } else {
        this.updateCourse()
      }
    },
    //添加课程
    addCourse() {
      this.postRequest(
        '/eduservice/course/addCourseInfo',
        this.courseInfo
      ).then((resp) => {
        if (resp) {
          let courseId = resp.data.courseId
          this.$message({
            type: 'success',
            message: '添加课程信息成功!',
          })
          this.$router.push('/course/chapter/' + courseId)
        }
      })
    },
    //修改课程
    updateCourse() {
      this.postRequest(
        '/eduservice/course/updateCourseInfo',
        this.courseInfo
      ).then((resp) => {
        if (resp) {
          this.$message({
            type: 'success',
            message: '修改课程信息成功!',
          })
          this.$router.push('/course/chapter/' + this.courseId)
        }
      })
    },
    //获得所有讲师
    teacherListAll() {
      this.getRequest('/eduservice/teacher/findAllTeacher').then((resp) => {
        this.teacherList = resp.data.list
      })
    },
    //获得所有一级
    getOneSubject() {
      this.getRequest('/eduservice/subject/getAllSubject').then((resp) => {
        this.subjectOneList = resp.data.list
      })
    },
    //点击某个一级分类，触发change，显示对应二级分类
    subjectLevelOneChanged(value) {
      console.log(value)
      //value就是一级分类id值
      for (let index = 0; index < this.subjectOneList.length; index++) {
        //每个一级分类
        let subjectOne = this.subjectOneList[index]
        //判断：所有一级分类id 和 点击一级分类id是否一样
        if (value === subjectOne.id) {
          this.subjectTwoList = subjectOne.children
          //把二级分类id值清空
          this.courseInfo.subjectId = ''
        }
      }
    },
    //上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或者png格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    //删除成功
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url
    },

    // 输入事件
    handleInput(value) {
      console.log(value)
    },
    // 点击事件
    handleClick(e, editor) {
      console.log(e, editor)
    },
    // 上传图片
    imgUpload(blobInfo, success, failure) {
      const imgBase64 = `data:${
        blobInfo.blob().type
      };base64,${blobInfo.base64()}`
      success(imgBase64)
    },
  },
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
