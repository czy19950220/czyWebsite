<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="user">
      <el-input v-model="ruleForm.user" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pwd">
      <el-input type="password" show-password v-model="ruleForm.pwd" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import axios from 'axios'
  axios.defaults.withCredentials=true;
  import {setCookie, getCookie, delCookie} from '../../assets/js/cookie'

  export default {
    name: "index",
    data() {
      return {
        sIP: 'http://czy-15736873451.club:15914',
        ruleForm: {
          user: 'czy',//用户名
          pwd: '123456',//密码
        },
        rules: {
          user: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur'}
          ],
          pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get(`${this.sIP}/users?user=${this.ruleForm.user}&pwd=${this.ruleForm.pwd}`
            ).then((res) => {
              console.log(res)
              if (res.data == '用户不存在') {
                this.$message.error({
                  duration: 500,
                  showClose: true,
                  message: res.data,
                  type: 'error'
                })
              } else if (res.data == '密码错误') {
                this.$message.error({
                  duration: 500,
                  showClose: true,
                  message: res.data,
                  type: 'error'
                });
              } else if (res.data == 'err') {
                this.$message.error({
                  duration: 500,
                  showClose: true,
                  message: res.data,
                  type: 'error'
                });
              } else {
                setCookie('ruleForm', JSON.stringify(this.ruleForm), 10000)
                console.log(JSON.parse(getCookie('ruleForm')))
                this.$message({
                  showClose: true,
                  message: '登录成功',
                  type: 'success'
                });
              }
            })
          } else {
            this.$message.error('检查错误');
            //console.log('error submit!!');
            return false;
          }
        });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      /*axios.get(this.sIP + "/users/index").then((res) =>{
        console.log(res.data)
      });*/
    }
  }
</script>

<style scoped>

</style>
