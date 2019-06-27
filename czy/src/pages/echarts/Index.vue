<template>
  <div class="echart-con">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "echarts",
  }
</script>

<style scoped>
  /**
   * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
   * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
   */
  .echart-con {
    width: 100%;
    height: 100%;
  }
</style>
