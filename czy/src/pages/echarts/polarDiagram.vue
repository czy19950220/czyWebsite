<template>
  <div class="polar-con">
    <index-header></index-header>
    <v-chart :options="polar"/>
  </div>
</template>

<script>
  import IndexHeader from './IndexHeader'
  export default {
    components:{
      IndexHeader
    },
    name: "polar-diagram",
    data () {
      let data = []

      for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
      }

      return {
        polar: {
          title: {//标题组件，包含主标题和副标题
            text: '极坐标双数值轴',
          },
          legend: {//图例组件
            data: ['line']
          },
          polar: {//极坐标系，可以用于散点图和折线图。每个极坐标系拥有一个角度轴和一个半径轴
            center: ['50%', '50%']
          },
          tooltip: {//提示框组件。
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          angleAxis: {//极坐标系的角度轴。
            type: 'value',//'value' 数值轴，适用于连续数据。
            startAngle: 0
          },
          radiusAxis: {//极坐标系的径向轴。
            min: 0
          },
          series: [//系列列表。每个系列通过 type 决定自己的图表类型
            {
              coordinateSystem: 'polar',
              name: 'line',
              type: 'line',
              showSymbol: false,
              data: data
            }
          ],
          animationDuration: 1000
        }
      }
    }
  }
</script>

<style scoped>
  .polar-con{
    height: 400px;
    width: 600px;
  }
</style>
