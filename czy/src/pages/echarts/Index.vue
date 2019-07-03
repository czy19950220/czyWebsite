<template>
  <el-tabs type="card" tab-position="top" :value ="$route.path.toLowerCase()" @tab-click="handleClick">
    <el-tab-pane label="柱状图" name="/czy/echarts-barchart">
    </el-tab-pane>
    <el-tab-pane label="极坐标" name="/czy/echarts-polardiagram">
    </el-tab-pane>
    <el-tab-pane label="极坐标" name="/czy/echarts-polardiagram2">
    </el-tab-pane>
  </el-tabs>
</template>

<script>

  export default {
    name: "echarts",
    data() {
      return {
        activeName: '/czy/echarts-barchart'
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab)
        this.activeName = tab.name;
        this.$router.push(tab.name)
        this.activeName = tab.name;
      }
    }
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
