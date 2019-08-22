<template>
  <div class="shouye-con">
    <swiper :options="swiperOption" ref="swiper" style="height: 100%">
      <!--左侧导航-->
      <swiper-slide class="menu">
        <nav-bar></nav-bar>
      </swiper-slide>
      <!--内容区域-->
      <swiper-slide class="content" id="shouYeContent">
        <!--头部-->
        <el-row type="flex" justify="center">
          <el-col :xs="22" :sm="0" :offset="1">
            <i :class="menuClass" @click="menuSlot"></i>
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
              <!--导航-->
              <el-row>
                <el-col :xs="24" :sm="0">
                  <nav-left></nav-left>
                </el-col>
              </el-row>
              <!--内容-->
              <el-row>
                <transition
                  enter-active-class="animated slideInLeft"
                  leave-active-class="animated slideOutRight"
                >
                  <el-col :xs="24" v-if="changeRoute"
                          style="animation-duration: 0.5s">
                    <keep-alive>
                      <router-view
                        :key="$route.path"
                        style="margin-top: 20px;margin-left: 4px;margin-right: 10px;"
                        v-if="$route.meta.keepAlive">
                        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
                      </router-view>
                    </keep-alive>
                    <router-view
                      :key="$route.path"
                      style="margin-top: 20px;margin-left: 4px;margin-right: 10px;"
                      v-if="!$route.meta.keepAlive">
                      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
                    </router-view>
                  </el-col>
                </transition>

              </el-row>

            </el-scrollbar>
          </el-col>
          <el-col :xs="24" :sm="0" style="">
            &nbsp;
          </el-col>
        </el-row>

      </swiper-slide>
    </swiper>
    <!--返回顶部-->
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
  import HeaderAll from '../../components/header/HeaderAll'
  import NavBar from '../../components/NavBar'
  import NavLeft from '../../components/NavLeft'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'vue2-animate/dist/vue2-animate.min.css'

  export default {
    name: "czy",
    components: {
      HeaderAll,
      swiper,
      swiperSlide,
      NavBar,
      NavLeft
    },
    data() {
      const self = this;
      return {
        changeRoute: false,//切换路由动画
        loading: this.$loading({
          lock: true,
          text: '',
          spinner: 'el-icon-s-home',
          target: document.getElementById('shouYeContent'),
          background: 'rgba(0, 0, 0, 0.7)'
        }),//加载
        menuClass: 'el-icon-s-unfold menu-header',//左侧导航栏的class
        swiperOption: {
          initialSlide: 1,
          resistanceRatio: 0,
          slidesPerView: 'auto',
          slideToClickedSlide: true,
          preventClicks: false,//默认true
          preventClicksPropagation: true,
          noSwiping: true,
          touchStartPreventDefault: false,//不阻止默认事件，el-scrollbar能用
          on: {
            slideChangeTransitionEnd() {
              if (this.activeIndex == 0) {
                self.$store.dispatch('setIsCollapse', true);
                self.loading = self.$loading({
                  lock: true,
                  text: '点击阴影区域返回',
                  spinner: 'el-icon-s-home',
                  target: document.getElementById('shouYeContent'),
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                self.menuClass = 'el-icon-s-fold menu-header'
              } else {
                self.$store.dispatch('setIsCollapse', false);
                self.loading.close();
                self.menuClass = 'el-icon-s-unfold menu-header'
              }
            }
          }
        }
      }
    },
    watch: {
      $route(to, from) {
        this.changeRoute = false;
        setTimeout(() => {
          this.changeRoute = true;
        }, 300)
        //console.log(to.path);
      }
    },
    methods: {
      //切换导航
      /**
       * 通过判断class来控制左侧的导航是否出现
       * */
      menuSlot() {
        //判断当前导航按钮的class来设置相应的样式
        if (this.menuClass == 'el-icon-s-fold menu-header') {
          this.swiper.slideNext();
          this.menuClass = 'el-icon-s-unfold menu-header'
        } else {
          this.swiper.slidePrev();
          this.menuClass = 'el-icon-s-fold menu-header'
        }
      },
    },
    computed: {
      swiper() {
        return this.$refs.swiper.swiper
      }
    },
    mounted() {
      this.loading.close()
    },
    created() {
      setTimeout(()=>{
        this.changeRoute = true;
      },300);

    }
  }
</script>

<style scoped>
  .el-divider--horizontal {
    margin: 0px !important;
  }

  .menu {
    min-width: 180px;
    width: 20%;
    max-width: 320px;
    background-color: #fff;
    color: #fff;
  }

  .content {
    width: 100%;
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
