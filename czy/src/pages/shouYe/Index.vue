<template>
  <div class="shouye-con">
    <swiper :options="swiperOption" ref="swiper" style="height: 100%">
      <swiper-slide class="menu">
        <el-scrollbar>
          <nav-bar></nav-bar>
        </el-scrollbar>
      </swiper-slide>
      <swiper-slide class="content" id="shouYeContent">
        <el-row type="flex" justify="center">
          <el-col :xs="22" :sm="0" :offset="1">
            <i :class="menuClass" @click="menuSlot" style="z-index: 9999"></i>
            <el-divider></el-divider>
          </el-col>
        </el-row>
        <header-all></header-all>
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import HeaderAll from '../../components/header/HeaderAll'
  import NavBar from '../../components/NavBar'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    name: "shouye",
    components: {
      HeaderAll,
      swiper,
      swiperSlide,
      NavBar
    },
    data() {
      const self = this;
      return {
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
          touchStartPreventDefault : false,//不阻止默认事件，el-scrollbar能用
          on: {
            slideChangeTransitionEnd() {
              if (this.activeIndex == 0) {
                self.loading = self.$loading({
                  lock: true,
                  text: '点击阴影区域返回',
                  spinner: 'el-icon-s-home',
                  target: document.getElementById('shouYeContent'),
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                self.menuClass = 'el-icon-s-fold menu-header'
              } else {
                self.loading.close();
                self.menuClass = 'el-icon-s-unfold menu-header'
              }
            }
          }
        }
      }
    },
    methods: {
      //切换导航
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
