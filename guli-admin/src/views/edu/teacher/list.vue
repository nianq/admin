<template>
  <div class="app-container">

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
    data(){
        return {
            list:null,
            pageSize:6,
            currentPage:1,
            total:0,
            teacherQuery:{}
        }
    },
    created(){
        this.getList();
    },
    methods :{
        getList(){
         
           let url = '/eduservice/teacher/teacherQueryPage/' + this.pageSize + '/' + this.currentPage
           this.postRequest(url,this.teacherQuery).then(respones=>{
             this.list = respones.data.list;
             this.total = respones.data.total;
           })
        },
        currentChange(currentChange){
            this.currentPage=currentChange
            this.getList()
        },
        sizeChange(pageSize){
           this.pageSize=pageSize
           this.getList()
        }
    }
}
</script>

