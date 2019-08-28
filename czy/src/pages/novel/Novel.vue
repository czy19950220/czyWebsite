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
        name: "novel"
    }
</script>

<style scoped>

</style>
