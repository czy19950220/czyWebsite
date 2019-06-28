<template>
  <div class="login-con" style="background-image: url('../../assets/imgs/JS.jpeg') }">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" plain @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" plain @click.native.prevent="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  //axios.defaults.withCredentials=true;
  import jwtDecode from 'jwt-decode'

  export default {
    name: "index",
    data() {
      return {
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
      /**
      * 提交表单，返回错误类型或者正确参数，提示用户，存储token，分配到vuex中，最后跳转路由
      * @param formName 参数是表单名字
      * */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(`${this.$sIP2}/users`, this.ruleForm).then((res) => {
              //console.log(res.data)
              if (res.data == '用户不存在'|| res.data == '密码错误'|| res.data == 'err') {
                this.$message.error({
                  duration: 500,
                  showClose: true,
                  message: res.data,
                  type: 'error'
                })
              } else {
                //setCookie('ruleForm', JSON.stringify(this.ruleForm), 10000)
                //console.log(JSON.parse(getCookie('ruleForm')))
                this.userToken = res.data.token;
                //存储token
                localStorage.setItem("token", res.data.token);
                //解析token
                let users = jwtDecode(res.data.token);
                this.$store.dispatch('setisAuthenicated', !this.isEmpty(users));
                this.$store.dispatch('setUsers', users);
                //console.log(users)
                this.$message({
                  showClose: true,
                  message: '登录成功',
                  type: 'success'
                });
                this.$router.push('/czy');
              }
            })
          } else {
            this.$message.error('检查错误');
            //console.log('error submit!!');
            return false;
          }
        });

      },
      /**
       * 重置表单
       * @param formName 参数是表单名字
      * */
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      logout() {
        /*this.$axios.get(`${this.sIP}/users/token`,
          {
            headers: {Authorization: this.userToken}
          }
        ).then((res) => {
          console.log(res.data)
        });*/
        //clearUsers
        this.$store.dispatch('clearUsers')
        localStorage.removeItem('token')
        console.log(localStorage.token)
      },
      /*
      * 判断是否为空
      * */
      isEmpty(value) {
        return (
          value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        );
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
  .login-con {
    height: 100%;
    width: 100%;
    /*background-image: url("http://czy-15736873451.club:19680/public/images/JS.png");*/
    background-size: cover;
    background-position: 50% 50%;
  }

  .demo-ruleForm {
    min-width: 300px;
    max-width: 400px;
    margin: auto;
    padding-top: 200px;
    opacity: 0.7;
  }
</style>
