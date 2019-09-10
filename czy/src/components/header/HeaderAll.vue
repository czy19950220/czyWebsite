<template>
  <div class="headerAll-con">
    <el-row type="flex" justify="center" style="margin: auto;">
      <!--导航等-->
      <el-col :xs="0" :sm="15" class="border-bottom">
        <el-row>
          <!--面包屑-->
          <el-col :xs="24" :sm="24">
            <el-breadcrumb separator="/" class="breadcrumb">
              <el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{breadcrumbName}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <!--标签-->
          <el-col class="swiper-no-swiping" :xs="24" :sm="24" style="height: 32px;">
            <swiper :options="swiperOption2">
              <swiper-slide class="text">
                <div class="content">
                  <el-tag
                    :key="index"
                    :class="$route.path.toLowerCase().includes(tag.tagRouter)? 'is-active-tag':''"
                    :type="$route.path.toLowerCase().includes(tag.tagRouter)?'danger':'info'"
                    :effect="$route.path.toLowerCase().includes(tag.tagRouter) ?'dark':'plain'"
                    v-for="(tag,index) in tagMenu"
                    :closable="tag.closable"
                    @click="tagMenuRouter(tag)"
                    @close="handleClose(tag.tagName,tag.tagRouter)">
                    {{tag.tagName}}
                  </el-tag>
                </div>
              </swiper-slide>
            </swiper>
          </el-col>
        </el-row>
      </el-col>
      <!--头像信息等-->
      <el-col :xs="0" :sm="5" class="user border-bottom">
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
  </div>
</template>

<script>
  import router from '../../router'
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    name: "header-all",
    data() {
      return {
        scrollTrackStyle: {
          backgroundColor: 'red'
        },
        scrollBarStyle: {
          color: 'black'
        },
        tagName: {},
        tagClass: 'is-active-tag text-danger',
        menuClass: 'el-icon-s-unfold menu-header',
        breadcrumbName: '',//面包屑
        swiperOption2: { //轮播
          direction: 'horizontal',
          slidesPerView: 'auto',
          freeMode: true,
          noSwiping: false,
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          mousewheel: true
        }
      }
    },
    computed: {
      user() {
        return this.$store.getters.users;
      },
      tagMenu() {
        return this.$store.getters.tagMenu;
      },
      blogID() {
        return this.$store.getters.blogID;
      },
      swiper() {
        return this.$refs.swiperHeader.swiper
      }
    },
    watch: {
      $route(to, from) {
        this.breadcrumb(this.$route.path.toLowerCase())
      }
    },
    methods: {
      //点击
      /**
       * 切换路由事件
       * @param tag 参数可以设置为是路由例如'/czy/dashboard'。这里已经循环加入了
       * */
      tagMenuRouter(tag) {
        console.log(tag)
        //mySwiper.slideNext();
        //this.swiper.slideNext();
        //console.log(tag.tagRouter)
        if (tag.tagRouter == '/blogdetail') {
          this.$router.push(tag.tagRouter + '?blogID=' + this.blogID);
        } else {
          this.$router.push(tag.tagRouter);
        }

      },
      //关闭标签
      /**
       * 通过对比tagRouter来确定关闭的是哪一个标签
       * @param tag 参数可以设置为tagMenu.tagName,暂时没用到
       * @param tagRouter 参数可以设置为tagMenu.tagRouter 例如'/czy/dashboard'
       */
      handleClose(tag, tagRouter) {
        //通过路由判断是否是当前页
        let arr = this.tagMenu;
        //去除当前关闭标签
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].tagRouter == tagRouter) {
            arr.splice(i, 1);
            break;
          }
        }
        //配置到vuex中，同时如果是当前页的路由就跳转到最后一个标签的路由
        if (!this.$route.path.toLowerCase().includes(tagRouter)) {
          //console.log(tagRouter,this.$route.path.toLowerCase())
          this.$store.dispatch('setTagMenu', arr);
          return;
        } else {
          this.$store.dispatch('setTagMenu', arr);
          this.$router.push(this.tagMenu[this.tagMenu.length - 1].tagRouter);
        }
      },
      //配置下拉事件，详情参数配置见elementUI
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
      /**
       * 清除当前存储的token，在vuex中配置users，最后跳转到登录界面
       * */
      logout() {
        // 清除token
        localStorage.removeItem("token");
        this.$store.dispatch("clearUsers");

        // 页面跳转
        this.$router.push("/login");
      },
      //暂时没用到
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
        //console.log(this.$route.path.toLowerCase());
      },
      //面包屑导航
      /**
       *通过对比当前路由决定当前面包屑
       * @param path 参数必须是当前路由的toLowerCase()==>this.$route.path.toLowerCase();
       * */
      breadcrumb(path) {
        //console.log(path)
        let menuArr = this.tagMenu;
        for (let i = 0; i < menuArr.length; i++) {
          if (path.includes(menuArr[i].tagRouter)) {
            //console.log(menuArr[i].breadcrumb)
            this.breadcrumbName = menuArr[i].breadcrumb
          }
          if (path.includes('echarts') && menuArr[i].tagRouter.includes('echarts')) {
            //console.log('menuArr[i].breadcrumb')
            //console.log(menuArr[i].breadcrumb)
            this.breadcrumbName = menuArr[i].breadcrumb
          }
        }
      }
    },
    created() {
      /**
       * 在加载完成后判断当前面包屑
       * 在完成路由切换的时候判断当前面包屑导航
       * */
      /*router.afterEach(() => {

      })*/
    },
    mounted() {
      this.breadcrumb(this.$route.path.toLowerCase())
    }
  }
</script>

<style scoped>
  .tag-menu, .el-tag {
    margin-right: 4px;
    cursor: pointer;
  }

  .is-active-tag {
    color: #fff !important;
  }

  .is-active-tag::before {
    content: '';
    background: #fff;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    margin-right: 2px;
  }

  .headerAll-con {
    width: 100%;
  }

  .border-bottom {
    border-bottom: 1px solid #dcdfe6
  }

  .breadcrumb {
    margin: 5px 0px;
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
    width: 36px;
    height: 36px;
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

  .text {
    height: 100%;
    overflow-y: hidden;
    width: auto;
  }

  .content {
    height: 100%;
    white-space: nowrap;
  }

  .el-tag--plain.el-tag--info{
    background-color: unset;
  }
</style>
