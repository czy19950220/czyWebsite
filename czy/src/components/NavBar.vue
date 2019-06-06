<template>
  <el-menu
    router
    :default-active="this.$route.path.toLowerCase()"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="rgb(48, 65, 86)"
    text-color="rgb(191, 203, 217)"
    active-text-color="rgb(64, 158, 255)">
    <el-menu-item index="/dashboard">
      <i class="el-icon-monitor"></i>
      <span slot="title">Dashboard</span>
    </el-menu-item>
    <el-menu-item index="/login">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <i class="el-icon-document"></i>
      <span slot="title">导航三</span>
    </el-menu-item>
    <el-menu-item index="4" route="/login">
      <i class="el-icon-setting"></i>
      <span slot="title">导航四</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "nav-bar",
    data() {
      return {
        routeTo: {path: 'register', query: {plan: 'private'}}
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
  }
</script>

<style scoped>
  .el-menu-item:hover {
    background-color: #263445 !important;
  }

  .el-submenu__title:hover {
    background-color: #263445 !important;
  }
</style>
