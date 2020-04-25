<template>
  <div class="app-container">
    
  <div>
      <!--查询表单-->
      <el-form class="demo-form-inline" :model="teacherQuery">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="讲师名称：">
             <el-input v-model="teacherQuery.name" placeholder="讲师名" style="width: 250px;"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="讲师头衔：">
            <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔" style="width: 250px;">
              <el-option :value="1" label="高级讲师"/>
              <el-option :value="2" label="首席讲师"/>
            </el-select>
          </el-form-item>
        </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
         <el-form-item label="添加时间：" >
          <el-date-picker
          v-model="teacherQuery.begin"
          type="date"
          placeholder="选择开始日期" style="width: 250px;" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>  
      </el-col>
      <el-col :span="8"> 
        <el-form-item label="结束时间：">
          <el-date-picker
          v-model="teacherQuery.end"
          type="date"
          placeholder="选择结束日期" style="width: 250px;" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      </el-col>
     
    </el-row>
   
      <el-button type="primary" icon="el-icon-search" @click="getList()" size="mini">查询</el-button>
      <el-button type="default" @click="resetData()" size="mini">清空</el-button>
    </el-form>
  </div>
    <div style="margin-top: 10px;">
         <!-- 表格 -->
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

        
      <el-table-column prop="name" label="名称"   align="center"/>

      <el-table-column label="头衔"  align="center">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历"  align="center" :show-overflow-tooltip='true'/>

      <el-table-column prop="gmtCreate" label="添加时间"  align="center"/>

      <el-table-column prop="sort" label="排序"  align="center" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            <router-link :to="'/teacher/edit/'+scope.row.id">
              <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
            </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="delteTeacher(scope.row)" style="margin-left: 10px;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  <!-- 分页 -->
    <el-pagination
    background
    layout='sizes, prev, pager, next, jumper, ->, total, slot'
    :total="total"  @current-change="currentChange" @size-change="sizeChange">
  </el-pagination>
    </div>
   
  </div>
</template>

<script>
export default {
  // data:{

  // },
  data() {
    return {
      loading:true,
      list: null,
      pageSize: 10,
      currentPage: 1,
      total: 0,
      teacherQuery: {
        name: "",
        level: "",
        begin: "",
        end: ""
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //列表查询
    getList() {
      let url =
        "/eduservice/teacher/teacherQueryPage/" +
        this.pageSize +
        "/" +
        this.currentPage;
        this.postRequest(url, this.teacherQuery).then(respones => {
        this.loading = false
        this.list = respones.data.list;
        this.total = respones.data.total;
      });
    },
    //页码改变时
    currentChange(currentChange) {
      this.currentPage = currentChange;
      this.getList();
    },
    //每页大小改变
    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getList();
    },
    //清空输入的值
    resetData() {
      this.teacherQuery ={}
      this.getList()
    },
    //删除讲师
    delteTeacher(data){
      this.$confirm('此操作将永久删除' + data.name + '讲师, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
            this.deleteRequest('/eduservice/teacher/' + data.id).then(resp=>{
              if(resp){
                this.getList()
              }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
};
</script>

