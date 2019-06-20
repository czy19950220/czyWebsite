<template>
  <el-scrollbar class="nav-bar">
    <el-menu
      style="padding-bottom: 70px;"
      router
      :default-active="this.$route.path.toLowerCase()"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="/czy/dashboard">
        <i class="el-icon-monitor"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item-group>
        <template slot="title">学习杂记</template>
        <el-menu-item
          @click="addTag(tag)"
          class="list-group-item"
          v-for="(tag,index) in routePath"
          :key="index"
          :index="tag.tagRouter">
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
            tagName: '博客文章',
            tagRouter: '/czy/blog',
            breadcrumb: '博客文章'
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
    },
    methods: {
      //第一次加载时检查是否有标签
      fisrtLoadTag() {
        //通过对比路由添加标签
        let path = this.$route.path.toLowerCase();
        let arr = this.routePath, that = this;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].tagRouter == path) {
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
</style>
