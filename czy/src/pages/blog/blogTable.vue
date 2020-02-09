<template>
  <div>
    <!--博客表格-->
    <el-table
      :border="true"
      resizable
      stripe
      :data="tableData.slice((currentPage4-1)*pageCon,currentPage4*pageCon).filter(data => !search
       || data.date.toLowerCase().includes(search.toLowerCase())
       || data.blogName.toLowerCase().includes(search.toLowerCase())
       || data.text.toLowerCase().includes(search.toLowerCase()))"
      @cell-click="toBlog"
      :cell-class-name="setCellClass"
      style="width: 90%;margin: auto;margin: 10px">
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
            class="blog-button"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit
          </el-button>
          <el-button
            class="blog-button"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
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
    <!--修改-->
    <el-dialog
      title="修改信息"
      :visible.sync="dialogFormVisible"
      center
      :modal="true"
      append-to-body>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="name">
          <el-input v-model="ruleForm.text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogFormVisible = false">取消</el-button>
          <el-button @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
        pageCon: 5, //每页几个
        dialogFormVisible: false,//编辑表格
        ruleForm: {
          name: '',
          text: '',
          blogID:''
        },
        rules: {
          name: [
            { required: true, message: '博客名称', trigger: 'blur' },
            { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
          text: [
            { required: true, message: '请输入标签，多个用||隔开', trigger: 'blur' },
            { min: 1, max: 3, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      user() {
        return this.$store.getters.users;
      },
    },
    methods: {
      /**
       * @param formName : 表格名
      * */
      //提交修改
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              name: this.ruleForm.name,
              text: this.ruleForm.text,
              blogID: this.ruleForm.blogID,
            }
            this.$axios.post(`${this.$sIP2}/froala/updateBlog`, params).then((res) => {
              //console.log(res.data)
              if (res.data == 200){
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.dialogFormVisible=false;
              }else if (res.data == -1){
                this.$message.error('修改失败');
              }else {
                this.$message.error('服务器异常错误');
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //编辑
      handleEdit(index, row) {
        this.dialogFormVisible=true;
        this.ruleForm.name=row.blogName;
        this.ruleForm.text=row.text;
        this.ruleForm.blogID=row.blogID;
        //console.log(index, row);
      },
      //删除
      /**
       * @param index :第几行
       * @param row :该行内人
      * */
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
      /**
       * @param row :改行内容
       * @param column :该列内容
      * */
      toBlog(row, column, cell, event) {
        if (column.property == 'blogName') {
          //console.log(row)
          this.$store.dispatch('setBlogNum', row.blogID);
          this.$router.push({path: 'blogdetail', query: {id: row.blogID}});
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
      //改变表格每页大小
      handleSizeChange(val) {
        this.pageCon = val;
        this.currentPage4 = 1;
        console.log(`每页 ${val} 条`);
      },
      //表格切页
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
      if(to.path == '/blogdetail'){
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
  .el-dialog{
    min-width: 310px;
  }
  .blog-button{
    margin: 2px auto;
    margin-left: 0px!important;
  }
</style>
