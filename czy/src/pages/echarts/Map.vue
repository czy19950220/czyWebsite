<template>
  <div class="chart-map">
    <v-chart
      :options="map"
      :init-options="initOptions"
      ref="map"
      autoresize
    />
  </div>
</template>

<script>
  import map from './data/map'
  import chinaMap from './data/china.json'
  import qs from 'qs'
  import ECharts from 'vue-echarts'
  ECharts.registerMap('china', chinaMap)

  export default {
    name: "map",
    data() {
      let options = qs.parse(location.search, {ignoreQueryPrefix: true})
      return {
        options,
        map,
        initOptions: {
          renderer: options.renderer || 'canvas'
        },
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .chart-map {
    height: 55vw;
    width: 100%;
    max-height: 800px;
  }
</style>
