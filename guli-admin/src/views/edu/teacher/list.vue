<template>
  <div class="app-container">
    
<!--查询表单-->
    <el-form class="demo-form-inline" :model="teacherQuery">
        <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
        <el-col :span="8">
          <el-form-item label="讲师名称：">
          <el-input v-model="teacherQuery.name" placeholder="讲师名"/>
        </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="讲师头衔：">
          <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
            <el-option :value="1" label="高级讲师"/>
            <el-option :value="2" label="首席讲师"/>
          </el-select>
      </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" class="row-bg" justify="space-around">
      <el-col :span="8">
         <el-form-item label="添加时间：">
          <el-date-picker
            v-model="teacherQuery.begin"
            type="datetime"
            placeholder="选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
          />
      </el-form-item>  
      </el-col>
      <el-col :span="8"> 
        <el-form-item label="结束时间：">
        <el-date-picker
          v-model="teacherQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      </el-col>
     
    </el-row>
     

      

     
     
   
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
<!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
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
</template>

<script>
export default {
  // data:{

  // },
  data() {
    return {
      list: null,
      pageSize: 6,
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
  created() {
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
    resetData() {}
  }
};
</script>

