<template>
  <div class="headerAll-con">
    <el-row type="flex" justify="center" style="margin: auto;">
      <!--导航等-->
      <el-col :xs="0" :sm="15" class="border-bottom">
        <el-row>
          <!--面包屑-->
          <el-col :xs="24" :sm="24">
            <el-breadcrumb separator="/" class="breadcrumb">
              <el-breadcrumb-item :to="{ path: '/shouye/dashboard' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <!--标签-->
          <el-col :xs="24" :sm="24" style="height: 32px;">
            <el-scrollbar>
              <el-tag>首页</el-tag>
              <el-tag
                :key="index"
                :class="tag.tagRouter == $route.path.toLowerCase()? 'is-active-tag':''"
                :type="tag.tagRouter == $route.path.toLowerCase()?'danger':'info'"
                :effect="tag.tagRouter == $route.path.toLowerCase() ?'dark':'plain'"
                v-for="(tag,index) in tagMenu"
                :closable="tag.closable"
                @click="tagMenuRouter(tag)"
                @close="handleClose(tag.tagName,tag.tagRouter)">
                {{tag.tagName}}
              </el-tag>
            </el-scrollbar>
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

  export default {
    name: "header-all",
    data() {
      return {
        tagClass: 'is-active-tag text-danger',
        menuClass: 'el-icon-s-unfold menu-header'
      }
    },
    computed: {
      user() {
        return this.$store.getters.users;
      },
      tagMenu() {
        return this.$store.getters.tagMenu;
      }
    },
    methods: {
      tagMenuRouter(tag) {
        this.$router.push(tag.tagRouter);
      },
      //关闭标签
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
        if (tagRouter != this.$route.path.toLowerCase()) {
          this.$store.dispatch('setTagMenu', arr);
          return;
        } else {
          this.$store.dispatch('setTagMenu', arr);
          this.$router.push(this.tagMenu[this.tagMenu.length - 1].tagRouter);
        }
      },
      //配置下拉事件
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
      logout() {
        // 清除token
        localStorage.removeItem("token");
        this.$store.dispatch("clearUsers");

        // 页面跳转
        this.$router.push("/login");
      },
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
        //console.log(this.$route.path.toLowerCase());
      }
    },
    mounted() {

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
    width: 30px;
    height: 30px;
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
</style>
