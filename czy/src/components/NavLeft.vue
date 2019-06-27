<template>
  <el-scrollbar class="nav-bar">
    <el-menu
      style="padding-bottom: 70px;"
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="主页">
        <i class="el-icon-monitor"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item-group>
        <template slot="title">学习杂记</template>
        <el-menu-item
          class="list-group-item"
          @click="addTag(tag)"
          v-for="(tag,index) in routePath"
          :key="index"
          :index="tag.tagName">
          <span slot="title">{{tag.tagName}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  export default {
    name: "nav-left",
    data() {
      return {
        defaultActive: '主页',
        routePath: [
          {
            closable: true,
            tagName: '小说',
            tagRouter: '/czy/novel',
            breadcrumb: '小说'
          },
          {
            closable: true,
            tagName: '像素鸟',
            tagRouter: '/czy/flappybird',
            breadcrumb: '像素鸟'
          },
          {
            closable: true,
            tagName: '博文编辑',
            tagRouter: '/czy/blogdetail',
            breadcrumb: '博文编辑'
          },
          {
            closable: true,
            tagName: '博文统计',
            tagRouter: '/czy/blogtable',
            breadcrumb: '博文统计'
          },
          {
            closable: true,
            tagName: 'echarts',
            tagRouter: '/czy/echarts',
            breadcrumb: 'echarts'
          }
        ]
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
    },
    watch: {
      $route(to, from) {//监听路由变化，设置当前默认路由
        for (let i = 0; i < this.routePath.length; i++) {
          if (to.path.includes(this.routePath[i].tagRouter)) {
            this.defaultActive = this.routePath[i].tagName;
            //console.log(this.defaultActive);
            break;
          } else {
            this.defaultActive = '主页'
          }
        }
      }
    },
    methods: {
      //第一次加载时检查是否有标签
      fisrtLoadTag() {
        //通过对比路由添加标签
        let path = this.$route.path.toLowerCase();
        let arr = this.routePath, that = this;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].tagRouter == path) {
            this.defaultActive = this.routePath[i].tagName;
            that.addTag(arr[i])
            return;
          }
        }
      },
      //增加导航标签
      /**
       * @param tag 参数设置的是一个对象例如:{
          closable:false,
          tagName: 'Index',
          tagRouter: '/czy/dashboard',
          breadcrumb: 'Index'
        }
       *通过对比tag.tagRouter来确定添加的标签
       * */
      addTag(tag) {
        let arr = this.tagMenu;
        let num = 0;
        let path = tag.tagRouter == '/czy/blogdetail' ? `${tag.tagRouter}?blogID=${this.blogID}` : tag.tagRouter;
        //console.log(path)
        this.$router.push(path);
        //先查询是否有该条信息
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].tagRouter == tag.tagRouter) {
            //console.log('已有')
            num = 1;
            break;
          }
        }
        //有？return ： 添加。
        if (num == 1) {
          return;
        } else {
          arr.push(tag)
          //console.log(tag)
          this.$store.dispatch('setTagMenu', arr);
        }
      },
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
      this.fisrtLoadTag();
    }
  }
</script>

<style scoped>
  .el-menu-item:hover {
    color: #409EFF !important;
  }

  .el-submenu__title:hover {
    color: #409EFF !important;
  }

  /*.el-menu-item.is-active {
    background-color: #ecf5ff !important;
  }*/
  .el-menu {
    border-right: solid 1px #ecbfbf !important;
  }
</style>
