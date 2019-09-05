<template>
  <!--饼形图-->
  <div class="chart-pie">
    <v-chart
      class="chart-pie"
      :options="pie"
      :init-options="initOptions"
      ref="pie"
      autoresize
    />
  </div>
</template>

<script>
  import qs from 'qs'
  import pie from './data/pie'

  export default {
    name: "pie-chart",
    data() {
      let options = qs.parse(location.search, {ignoreQueryPrefix: true})
      return {
        options,
        pie,
        initOptions: {
          renderer: options.renderer || 'canvas'
        },
      }
    }
  }
</script>

<style scoped>
.chart-pie{
  width: 100%;
  height: 75vw;
  max-height: 800px;
}
</style>
