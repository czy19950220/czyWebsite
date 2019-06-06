<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class='logo-container'>
        {{this.$route.path}}
      </el-col>
      <el-col :span='18' class="user">
        <div class="userinfo">
          <img :src="user.photo" class='avatar' alt="">
          <div class='welcome'>
            <p class='name comename'>欢迎</p>
            <p class='name avatarname'>{{user.name}}</p>
          </div>
          <span class='username'>
            <el-dropdown
              @command='setDialogInfo'>
                <span class="el-dropdown-link">
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='info' icon="el-icon-user-solid">个人信息</el-dropdown-item>
                    <el-dropdown-item command='logout' icon="el-icon-switch-button">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
         </span>
        </div>
      </el-col>

    </el-row>

  </header>
</template>
<script>
  export default {
    name: "Header",
    computed: {
      user() {
        return this.$store.getters.users;
      }
    },
    methods: {
      setDialogInfo(cmditem) {
        if (!cmditem) {
          console.log("test");
          this.$message("菜单选项缺少command属性");
          return;
        }
        switch (cmditem) {
          case "info":
            this.showInfoList();
            break;
          case "logout":
            this.logout();
            break;
        }
      },
      showInfoList() {
        // 个人信息
        console.log('个人信息',this.user)
        //this.$router.push("/infoshow");
      },
      logout() {
        // 清除token
        localStorage.removeItem("token");
        this.$store.dispatch("clearUsers");

        // 页面跳转
        this.$router.push("/login");
      }
    }
  };
</script>

<style scoped>
  .head-nav {
    width: 100%;
    height: 40px;
    padding-top: 5px;
    padding-bottom: 5px;
    background: #324057;
    color: #fff;
    border-bottom: 1px solid #1f2d3d;
  }

  .logo-container {
    line-height: 40px;
    padding-left: 5px;
  }

  .logo {
    height: 30px;
    width: 30px;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
    border-radius: 50%;
  }

  .title {
    vertical-align: middle;
    font-size: 20px;
    font-family: "Microsoft YaHei";
    letter-spacing: 3px;
  }

  .user {
    line-height: 40px;
    text-align: right;
    float: right;
    padding-right: 10px;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
  }

  .welcome {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 0 5px;
  }

  .name {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }

  .comename {
    font-size: 12px;
  }

  .avatarname {
    color: #409eff;
    font-weight: bolder;
  }

  .username {
    cursor: pointer;
    margin-right: 5px;
  }

  .el-dropdown {
    color: #fff;
  }
</style>
