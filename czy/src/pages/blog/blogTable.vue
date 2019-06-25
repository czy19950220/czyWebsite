<template>
  <div>
    <el-table
      :border="true"
      stripe
      :data="tableData.slice((currentPage4-1)*pageCon,currentPage4*pageCon).filter(data => !search
       || data.date.toLowerCase().includes(search.toLowerCase())
       || data.blogName.toLowerCase().includes(search.toLowerCase())
       || data.text.toLowerCase().includes(search.toLowerCase()))"
      @cell-click="toBlog"
      :cell-class-name="setCellClass"
      style="width: 90%;margin: auto;padding: 10px">
      <el-table-column
        label="时间"
        prop="date">
      </el-table-column>
      <el-table-column
        label="文章名"
        prop="blogName">
      </el-table-column>
      <el-table-column
        label="标签"
        prop="text">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageCon"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "blog-table",
    data() {
      return {
        tableData: [],
        search: '',
        currentPage4: 1,//当前页默认第一页
        total: 0, //总个数
        pageCon: 5 //每页几个
      }
    },
    computed: {
      user() {
        return this.$store.getters.users;
      },
    },
    methods: {
      //编辑
      handleEdit(index, row) {
        console.log(index, row);
      },
      //删除
      handleDelete(index, row) {
        //console.log(index, row);
        this.$confirm(`永久删除:${row.blogName}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {blogID: row.blogID}
          this.$axios.post(`${this.$sIP2}/froala/deleteBlog`, params).then((res) => {
            //console.log(res.data)
            if (res.data == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'info',
                message: '删除失败!'
              });
            }
            //console.log(res.data.result)
            this.tableInit();
          }).catch(err => {
            console.log(err)
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //初始化表格数据
      tableInit() {
        let params = {uid: this.user.id}
        this.$axios.post(`${this.$sIP2}/froala/getBlogs`, params).then((res) => {
          this.tableData = res.data.result;
          this.total = res.data.result.length;
          //console.log(res.data.result)
        }).catch(err => {
          console.log(err)
        })
      },
      //点击去博客
      toBlog(row, column, cell, event) {
        if (column.property == 'blogName') {
          //console.log(row)
          this.$router.push({path: 'blog', query: {blogID: row.blogID}});
        }
      },
      //设置单元格样式
      setCellClass(value) {
        if (value.column.property == "blogName") {
          return 'cellClass'
        } else {
          return ''
        }
      },
      handleSizeChange(val) {
        this.pageCon = val;
        this.currentPage4 = 1;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage4 = val;
        console.log(`当前页: ${val}`);
      }
    },
    created() {
      this.tableInit();
    },
    beforeRouteLeave(to, from, next) {
      // 设置下一个路由的 meta
      //console.log(to)
      if(to.path == '/czy/blog'){
        to.meta.keepAlive = false;  // 让 /czy/blog 不缓存，即刷新
      }
      next();
    }
  }
</script>

<style lang="scss">
  .block {
    margin: auto;
    text-align: center;
  }
</style>
