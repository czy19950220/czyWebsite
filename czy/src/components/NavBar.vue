<template>
  <el-scrollbar class="nav-bar">
    <el-image
      lazy
      class="user-header-photo"
      :src="user.photo"
      fit="contain">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <div class="user-info">
      <el-row>
        <el-col :span="18">
          <el-link :underline="false" type="primary">
            <i class="el-icon-user"></i>{{user.name}}
          </el-link>
          <br>
          <el-link :underline="false" type="warning">{{user.identity}}</el-link>
        </el-col>
        <el-col :span="6" style="line-height: 60px">
          <el-link :underline="false" type="primary" @click="logout()">
            <i class="el-icon-switch-button"></i>
          </el-link>
        </el-col>
      </el-row>
    </div>
    <el-divider></el-divider>
    <el-menu
      router
      :default-active="this.$route.path.toLowerCase()"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="rgb(48, 65, 86)"
      text-color="rgb(191, 203, 217)"
      active-text-color="rgb(64, 158, 255)">
      <el-menu-item index="/shouye/dashboard">
        <i class="el-icon-monitor"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <transition-group name="fadeLeft" tag="ul" class="list-group">
        <el-menu-item v-if="isCollapse"
                      :style="{animationDuration: +n*0.1+'s'}"
                      class="list-group-item"
                      v-for="n in 15"
                      :key="n"
                      index="/login">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
      </transition-group>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import 'vue2-animate/dist/vue2-animate.min.css'
  export default {
    name: "nav-bar",
    data() {
      return {

      }
    },
    computed: {
      user() {
        return this.$store.getters.users;
      },
      isCollapse(){
        return this.$store.getters.isCollapse;
      }

    },
    methods: {
      //登出
      logout() {
        // 清除token
        localStorage.removeItem("token");
        this.$store.dispatch("clearUsers");

        // 页面跳转
        this.$router.push("/login");
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created() {
    }
  }
</script>

<style scoped>

  .nav-bar {
    background-color: rgb(48, 65, 86);
  }

  .el-divider--horizontal {
    margin: 0px !important;
    background-color: #4e71c1;
  }

  .user-header-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 10px;
  }

  .user-info {
    display: inline-block;
    height: 50px;
    margin: 10px 0px;
    float: right;
    width: calc(100% - 70px);
  }

  .el-menu-item:hover {
    background-color: #263445 !important;
  }

  .el-submenu__title:hover {
    background-color: #3b4e65 !important;
  }

  .el-menu {
    border-right: 0px !important;
  }

  .el-menu-item.is-active {
    background-color: #263445 !important;
  }
</style>
