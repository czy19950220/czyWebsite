<template>
  <div class="index-con">
    <el-container>
      <el-aside width="auto"><nav-bar></nav-bar></el-aside>
      <el-container>
        <el-header><header-all></header-all></el-header>
        <el-main>

        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  import HeaderAll from '../../components/Header.vue'
  import NavBar from '../../components/NavBar.vue'

  export default {
    components: {
      HeaderAll,
      NavBar
    },
    name: "index",
    data() {
      return {
        routeTo: {path: 'register', query: {plan: 'private'}}
      }
    },
    methods: {

    },
    created(){

    }
  }
</script>

<style>
  .el-header{
    padding: 0;
  }
</style>
