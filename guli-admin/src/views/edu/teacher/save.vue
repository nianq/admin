<template>
    <div>
       <el-form label-width="120px">
        <el-form-item label="讲师名称">
          <el-input v-model="teacher.name"/>
        </el-form-item>
        <el-form-item label="讲师排序">
          <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
        </el-form-item>
        <el-form-item label="讲师头衔">
          <el-select v-model="teacher.level" clearable placeholder="请选择">
            <el-option :value="1" label="高级讲师"/>
            <el-option :value="2" label="首席讲师"/>
          </el-select>
        </el-form-item>
        <el-form-item label="讲师资历">
          <el-input v-model="teacher.career"/>
        </el-form-item>
        <el-form-item label="讲师简介">
          <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
        </el-form-item>
         <el-form-item label="讲师头像">
          <el-upload
            class="avatar-uploader"
            action="/eduoss/fileoss"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      
  
        <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">提交</el-button>
        </el-form-item>
      </el-form>
  
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        teacher:{
          name: '',
          sort: 0,
          level: 1,
          career: '',
          intro: '',
          avatar: ''
        },
        saveBtnDisabled:false, // 保存按钮是否禁用,
        //imageUrl: ''
      }
    },
    mounted() { //页面渲染之前执行
        this.init();
    },
    watch: {  //监听
        $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
        this.init()
        }
    },
    methods:{
        init() {
            //判断路径有id值,做修改
            if(this.$route.params && this.$route.params.id) {
                //从路径获取id值
                const id = this.$route.params.id
                //调用根据id查询的方法
                this.getInfo(id)
            } else { //路径没有id值，做添加
                //清空表单
                this.teacher = {}
            }
    },
        saveOrUpdate(){
            //判断修改还是添加
            //根据teacher是否有id
            if(!this.teacher.id) {
                //添加
                this.saveTeacher()
            } else {
                //修改
                this.updateTeacher()
            }
        },
        //根据讲师id查询的方法
        getInfo(id) {
            this.getRequest(`/eduservice/teacher/getTeacher/${id}`).then(resp => {
                 this.teacher = resp.data.list
            })
        },

        //添加讲师的方法
        saveTeacher() {
            this.postRequest('/eduservice/teacher/addTeacher',this.teacher).then(resp=>{
                if(resp){
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                     //回到列表页面 路由跳转
                    this.$router.push({path:'/teacher/list'})
                }
            })
        },
         //修改讲师的方法
        updateTeacher() {
            this.postRequest('/eduservice/teacher/updateTeacher',this.teacher).then(response => {
                //提示信息
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
                //回到列表页面 路由跳转
                this.$router.push({path:'/teacher/list'})
                })
        },
         handleAvatarSuccess(res, file) {
          this.imageUrl = res.data.url
          this.teacher.avatar = res.data.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
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
    border-color: #409EFF;
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
  