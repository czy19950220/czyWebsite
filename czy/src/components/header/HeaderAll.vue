<template>
  <div class="headerAll-con">
    <el-row type="flex" justify="center" style="max-width: 1260px;margin: auto">
      <el-col :xs="0" :sm="10" >
        <el-menu :default-active="this.$route.path.toLowerCase()"
                 router
                 class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect">
          <el-menu-item index="/shouye">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">其他</template>
            <el-menu-item index="/shouye2">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">消息中心</el-menu-item>
        </el-menu>
        <el-divider></el-divider>
      </el-col>
      <el-col :xs="0" :sm="10" class="user">
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
        <el-divider></el-divider>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    name: "header-all",
    data() {
      return {
        menuClass: 'el-icon-s-unfold menu-header'
      }
    },
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
      //个人信息
      showInfoList() {
        // 个人信息
        console.log('个人信息', this.user)
        //this.$router.push("/infoshow");
      },
      //登出
      logout() {
        // 清除token
        localStorage.removeItem("token");
        this.$store.dispatch("clearUsers");

        // 页面跳转
        this.$router.push("/login");
      },
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
        //console.log(this.$route.path.toLowerCase());
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .headerAll-con{
    width: 100%;
  }

  .el-divider--horizontal {
    margin: 0px !important;
  }

  .user {
    line-height: 60px;
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
</style>
