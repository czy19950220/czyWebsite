<template>
  <el-scrollbar class="nav-bar">
    <!--头像-->
    <el-image
      class="user-header-photo"
      :src="user.photo"
      fit="contain">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <!--user信息-->
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
    <!--导航-->
    <el-menu
      background-color="#304156"
      text-color="#f39999"
      active-text-color="#409EFF"
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      unique-opened
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="主页" @click="$router.push('/dashboard')">
        <i class="el-icon-monitor"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <transition-group name="fadeLeft" tag="ul" class="list-group">
        <el-menu-item-group
          v-for="(tag,index) in routePath"
          v-if="isCollapse"
          :style="{animationDuration: +index*0.25+'s'}"
          class="list-group-item"
          :key="tag.tagName">
          <el-menu-item
            v-if="!tag.childrens"
            class="list-group-item"
            @click="addTag(tag)"
            :index="tag.tagName">
            <span slot="title">{{tag.tagName}}</span>
          </el-menu-item>
          <el-submenu
            :index="tag.tagName"
            v-else="tag.childrens">
            <template slot="title">
              <span slot="title">{{tag.tagName}}</span>
            </template>
            <el-menu-item
              v-for="(child,index) in tag.childrens"
              :key="child.tagName"
              @click="addTag(child)"
              :index="tag.tagName+'-'+child.tagName">
              {{child.tagName}}
            </el-menu-item>
          </el-submenu>
        </el-menu-item-group>
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
        defaultActive: '主页',
        routePath: [
          {
            closable: true,
            tagName: '小说',
            tagRouter: '/novel',
            breadcrumb: '小说',
            childrens: [
              {
                closable: true,
                tagName: '搜索',
                tagRouter: '/novel/search',
                breadcrumb: '搜索',
              },
              {
                closable: true,
                tagName: '小说详情',
                tagRouter: '/novel/detail',
                breadcrumb: '小说详情',
              },
              {
                closable: true,
                tagName: '小说阅读',
                tagRouter: '/novel/read',
                breadcrumb: '小说阅读',
              },
              {
                closable: true,
                tagName: '书架',
                tagRouter: '/novel/bookrack',
                breadcrumb: '书架',
              }
            ]
          },
          {
            closable: true,
            tagName: 'CANVAS',
            //tagRouter: '/flappybird',
            breadcrumb: '像素鸟',
            childrens: [
              {
                closable: true,
                tagName: '像素鸟',
                tagRouter: '/flappybird',
                breadcrumb: '像素鸟',
              }
            ]
          },
          {
            closable: true,
            tagName: '博文',
            //tagRouter: '/blog',
            breadcrumb: '博文',
            childrens: [
              {
                closable: true,
                tagName: '博文统计',
                tagRouter: '/blogtable',
                breadcrumb: '博文统计'
              },
              {
                closable: true,
                tagName: '博文编辑',
                tagRouter: '/blogdetail',
                breadcrumb: '博文编辑',
              }
            ]
          },
          {
            closable: true,
            tagName: 'echarts',
            //tagRouter: '/echarts',
            breadcrumb: 'ECHARTS',
            childrens: [
              {
                closable: true,
                tagName: 'Ebarchart',
                tagRouter: '/echarts/barchart',
                breadcrumb: 'Ebarchart'
              },
              {
                closable: true,
                tagName: 'Epolardiagram',
                tagRouter: '/echarts/polardiagram',
                breadcrumb: 'Epolardiagram'
              }
            ]
          },
        ]
      }
    },
    computed: {
      user() {
        return this.$store.getters.users;
      },
      isCollapse() {
        return this.$store.getters.isCollapse;
      },
      tagMenu() {
        return this.$store.getters.tagMenu;
      },
      blogID() {
        return this.$store.getters.blogNum;
      },

    },
    watch: {
      $route(to, from) {//监听路由变化，设置当前默认路由
        this.fisrtLoadTag()
        /*for (let i = 0; i < this.routePath.length; i++) {
          if (to.path.includes(this.routePath[i].tagRouter)) {
            this.defaultActive = this.routePath[i].tagName;
            //console.log(this.defaultActive);
            break;
          }else if(to.path.includes('echarts')&&this.routePath[i].tagRouter.includes('echarts')){
            //this.routePath[i].tagRouter = '/czy/echarts/polardiagram';
            console.log('this.routePath[i].tagName')
            console.log(this.routePath[i].tagName)
            this.defaultActive = this.routePath[i].tagName;
          } else {
            this.defaultActive = '主页'
          }
        }*/
      }
    },
    methods: {
      //第一次加载时检查是否有标签
      fisrtLoadTag() {
        //通过对比路由添加标签
        let path = this.$route.path.toLowerCase();
        let arr = this.routePath, that = this;
        //onsole.log(this.routePath)
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].childrens){
            for (let j= 0;j<arr[i].childrens.length;j++){
              if (path.includes(arr[i].childrens[j].tagRouter)) {
                //console.log(arr[i].tagRouter,path)
                this.defaultActive = this.routePath[i].tagName + '-'+this.routePath[i].childrens[j].tagName;
                //console.log(this.defaultActive)
                that.addTag(arr[i].childrens[j])
                break;
              }
            }
          }else if (path.includes(arr[i].tagRouter)) {
            //console.log(arr[i].tagRouter,path)
            this.defaultActive = this.routePath[i].tagName;
            console.log(this.defaultActive)
            that.addTag(arr[i])
            break;
          }
        }
      },
      //增加导航标签
      /**
       * @param tag 参数设置的是一个对象例如:{
          closable:false,
          tagName: 'Index',
          tagRouter: '/dashboard',
          breadcrumb: 'Index'
        }
       *通过对比tag.tagRouter来确定添加的标签
       * */
      addTag(tag) {
        let arr = this.tagMenu;
        let num = 0;
        let path = tag.tagRouter == '/blogdetail' ? `${tag.tagRouter}?id=${this.blogID}` : tag.tagRouter;
        //console.log('tag');
        //console.log(tag);
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
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
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

  .el-menu {
    border-right: 0px !important;
  }

  .el-menu-item.is-active {
    background-color: #263445 !important;
  }
</style>
