<template>
  <div class="shouye-con">
    <!-- drawer-content -->
    <slide
           right
           width="300"
           :burgerIcon="false"
           disableOutsideClick
           :isOpen="isOpen"
           @openMenu="handleOpenMenu"
           @closeMenu="handleCloseMenu">
      <nav-bar></nav-bar>
    </slide>
    <div slot="content" class="content" id="shouYeContent">
      <!--内容区域-->
      <!--头部-->
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="0" :offset="1">
          <i :class="menuClass" @click="menuSlot2()"></i>
          <el-divider></el-divider>
        </el-col>
      </el-row>
      <header-all></header-all>
      <!--主页部分-->
      <el-row style="height: 100%;overflow: hidden;">
        <el-col :xs="0" :sm="2">
          &nbsp;
        </el-col>
        <el-col :xs="0" :sm="5" style="height: 100%;overflow: hidden;">
          <nav-left></nav-left>
        </el-col>
        <el-col :xs="24" :sm="17" style="height: 100%;overflow: hidden;">
          <el-scrollbar class="page-component__scroll">
            <el-row>
              <el-col :xs="24" :sm="0">
                <nav-left></nav-left>
              </el-col>
            </el-row>
            <router-view></router-view>
          </el-scrollbar>
        </el-col>
        <el-col :xs="24" :sm="0" style="">
          &nbsp;
        </el-col>
      </el-row>
    </div>
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="150">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .22);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        UP
      </div>
    </el-backtop>
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100">
      <i class="el-icon-top"></i>
    </el-backtop>
  </div>
</template>

<script>
  import {Slide} from 'vue-burger-menu'
  import HeaderAll from '../../components/header/HeaderAll'
  import NavBar from '../../components/NavBar'
  import NavLeft from '../../components/NavLeft'

  export default {
    name: "index-two",
    components: {
      Slide,
      HeaderAll,
      NavBar,
      NavLeft
    },
    data() {
      const self = this;
      return {
        isOpen: false,
        menuClass: 'el-icon-s-unfold menu-header',//左侧导航栏的class
      }
    },
    methods: {
      handleOpenMenu() {
        console.log('打开')
      },
      handleCloseMenu() {
        console.log('关闭')
      },
      //切换导航
      menuSlot2() {
        //判断当前导航按钮的class来设置相应的样式
        if (this.menuClass == 'el-icon-s-fold menu-header') {
          this.isOpen = false;
          this.menuClass = 'el-icon-s-unfold menu-header'
        } else {
          this.isOpen = true;
          this.menuClass = 'el-icon-s-fold menu-header'
        }
      },
    },
    computed: {},
    mounted() {
      setTimeout(() => {
        this.isOpen = !this.isOpen
      }, 3000)
    }
  }
</script>

<style scoped>
  .el-divider--horizontal {
    margin: 0px !important;
  }

  .menu {
    width: 200px;
    background-color: rgb(48, 65, 86);
    color: #fff;
  }

  .content {
    width: 100%;
    height: 100%;
  }

  .shouye-con, shouye-swiper {
    height: 100%;
    width: 100%;
  }

  .menu-header {
    font-size: 32px;
    cursor: pointer;
    height: 100%;
    margin-top: 4px;
  }

  .menu-header:hover {
    color: rgb(191, 203, 217);
  }
</style>
