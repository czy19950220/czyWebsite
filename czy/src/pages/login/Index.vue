<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" show-password v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click.native.prevent="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    <el-button @click="token()">11111</el-button>
  </el-form>
</template>

<script>
  //axios.defaults.withCredentials=true;
  import {setCookie, getCookie, delCookie} from '../../assets/js/cookie'

  export default {
    name: "index",
    data() {
      return {
        sIP: 'http://czy-15736873451.club:11365',
        ruleForm: {
          username: 'czy',//用户名
          password: '123456',//密码
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur'}
          ]
        },
        userToken: ''
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(`${this.sIP}/users`, this.ruleForm).then((res) => {
              console.log(res.data)
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
                //setCookie('ruleForm', JSON.stringify(this.ruleForm), 10000)
                //console.log(JSON.parse(getCookie('ruleForm')))
                this.userToken = res.data.token;
                localStorage.setItem("token",res.data.token);
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
      },
      token() {
        this.$axios.get(`${this.sIP}/users/token`,
          {
            headers: {Authorization: this.userToken}
          }
        ).then((res) => {
          console.log(res.data)
        });
      }
    },
    mounted() {

      /*this.$axios.get(this.sIP + "/users/index").then((res) =>{
        console.log(res.data)
      });*/
    }
  }
</script>

<style scoped>

</style>
