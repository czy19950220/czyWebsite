<template>
  <el-tabs
    style="margin: 10px"
    type="card" tab-position="top"
    :value="$route.path.toLowerCase()"
    @tab-click="handleClick">
    <el-tab-pane label="折线图" name="/echarts/line">
    </el-tab-pane>
    <el-tab-pane label="柱状图" name="/echarts/barchart">
    </el-tab-pane>
    <el-tab-pane label="极坐标" name="/echarts/polardiagram">
    </el-tab-pane>
    <el-tab-pane label="饼状图" name="/echarts/piechart">
    </el-tab-pane>
    <el-tab-pane label="散点图" name="/echarts/scatterplot">
    </el-tab-pane>
    <el-tab-pane label="地图" name="/echarts/map">
    </el-tab-pane>
    <el-tab-pane label="能力图" name="/echarts/radar">
    </el-tab-pane>
    <router-view/>
  </el-tabs>
</template>

<script>

  export default {
    name: "echarts",
    data() {
      return {
        activeName: '/echartsbarchart'
      };
    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab)
        this.activeName = tab.name;
        this.$router.push(tab.name)
        this.activeName = tab.name;
      }
    },
    created(){
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
    height: 400px;
  }
</style>
