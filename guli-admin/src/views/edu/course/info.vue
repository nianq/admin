<template>
  <div>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>

    <el-form label-width="150px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder="示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" maxlength="50" show-word-limit></el-input>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数" />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
        <el-input v-model="courseInfo.description" placeholder="课程简介" />
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元" /> 元
      </el-form-item>

      <el-form-item label="课程分类">
        <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类" @change="subjectLevelOneChanged">
          <el-option v-for="subject in subjectOneList" :key="subject.id" :label="subject.title" :value="subject.id" />
        </el-select>

        <el-select v-model="courseInfo.subjectId" placeholder="二级分类" style="margin-left:10px">
          <el-option v-for="subject in subjectTwoList" :key="subject.id" :label="subject.title" :value="subject.id" />
        </el-select>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select clearable v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option v-for="teacher in teacherList" :key="teacher.id" :label="teacher.name" :value="teacher.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="课程封面">
        <el-upload class="avatar-uploader" action="/eduoss/fileoss" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="courseInfo.cover" :src="courseInfo.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

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
        cover: '',
        price: 0,
      },
      teacherList: [],  //所有的讲师
      subjectOneList:[],  //一级分类
      subjectTwoList:[], //二级分类
      imageUrl:''
    }
  },
  mounted() {
    //初始化所有讲师
    this.teacherListAll()
    //初始化一级分类
    this.getOneSubject()
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
    //获得所有一级
    getOneSubject(){
      this.getRequest('/eduservice/subject/getAllSubject').then(resp=>{
        this.subjectOneList = resp.data.list;
      })
    },
    //点击某个一级分类，触发change，显示对应二级分类
    subjectLevelOneChanged(value){
        console.log(value)
        //value就是一级分类id值
        for (let index = 0; index < this.subjectOneList.length; index++) {
          //每个一级分类
         let subjectOne =  this.subjectOneList[index];
         //判断：所有一级分类id 和 点击一级分类id是否一样
          if(value === subjectOne.id){
              this.subjectTwoList = subjectOne.children
              //把二级分类id值清空
              this.courseInfo.subjectId = ''
          }
        }
    },
        //上传之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或者png格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //删除成功
      handleAvatarSuccess(res, file) {
          this.courseInfo.cover = res.data.url
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

