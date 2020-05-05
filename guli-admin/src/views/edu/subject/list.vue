<template>
  <div>
    <el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText">
</el-input>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      ref="tree"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button size="mini" type="text" @click="uploadSubject"/>
            修改
          </el-button>
          <el-button size="mini" type="text"@click="deleteSubject(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title',
      },
      filterText: '',
    }
  },
   watch: {
      filterText(val) {
        console.log('watch')
        console.log(val)
        this.$refs.tree.filter(val);
      }
    },
  mounted() {
    this.allSubject()
  },
  methods: {
    allSubject() {
      this.getRequest('/eduservice/subject/getAllSubject').then((resp) => {
        if (resp) {
          this.data = resp.data.list
        }
      })
    },
    uploadSubject(){

    },
    deleteSubject(){
      console.log('dd')
    },
     filterNode(value, data) {
       console.log(value)
        if (!value) return true;
        return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
      }
  }
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
