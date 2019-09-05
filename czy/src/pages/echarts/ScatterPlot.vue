<template>
  <div class="chart-scatter">
    <v-chart
      class="chart-scatter"
      :options="scatter"
      :init-options="initOptions"
      autoresize
    />
  </div>
</template>

<script>
  import qs from 'qs'
  import scatter from './data/scatter'

  export default {
    name: "scatter-plot",
    data() {
      let options = qs.parse(location.search, {ignoreQueryPrefix: true})
      return {
        options,
        scatter,
        initOptions: {
          renderer: options.renderer || 'canvas'
        },
      }
    }
  }
</script>

<style scoped>
.chart-scatter{
  height: 75vw;
  width: 100%;
  min-width: 400px;
  max-height: 800px;
}
</style>
