<template>
  <keep-alive>
    <router-view
      :key="$route.path"
      style="margin-top: 20px;margin-left: 4px;margin-right: 10px;"
      v-if="$route.meta.keepAlive">
      <!-- 这里是会被缓存的视图组件，比如 Home！ -->
    </router-view>
  </keep-alive>
</template>

<script>
  export default {
    name: "novel",
    created(){
      let myBooks = localStorage.getItem("myBooks");
      if (myBooks==null || myBooks=='' || myBooks==undefined){
        let myBooks2={"books":[],"fontSize":18};
        myBooks2=JSON.stringify(myBooks2);
        localStorage.setItem("myBooks",myBooks2);//以“myBooks”为名称存储书籍
      }
      let aa=JSON.parse(localStorage.getItem("myBooks"))
      console.log(aa)
    }
  }
</script>

<style scoped>

</style>
