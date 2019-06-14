<template>
  <el-scrollbar class="nav-bar">
    <el-menu
      style="padding-bottom: 70px;"
      router
      :default-active="this.$route.path.toLowerCase()"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="/shouye/dashboard">
        <i class="el-icon-monitor"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item
                    :style="{animationDuration: +n*0.1+'s'}"
                    class="list-group-item"
                    v-for="n in 15"
                    :key="n"
                    index="/login">
        <span slot="title">{{n}}</span>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  export default {
    name: "nav-left",
    data() {
      return {}
    },
    computed: {
      user() {
        return this.$store.getters.users;
      },
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
    max-width: 300px
  }
  .el-menu-item:hover {
    color: #409EFF !important;
  }

  .el-submenu__title:hover {
    color: #409EFF !important;
  }
  /*.el-menu-item.is-active {
    background-color: #ecf5ff !important;
  }*/
</style>
