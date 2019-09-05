<template>
  <!--柱状图-->
  <div class="bar-con">
    <v-chart class="bar-con" :options="bar" autoresize/>
  </div>
</template>

<script>
  import getBar from './data/bar'
  export default {
    components:{
    },
    name: "bar-chart",
    data() {
      return {
        bar:getBar()
      }
    }
  }
</script>

<style scoped>
  .bar-con {
    width: 100%;
    height: 45vw;
    max-height: 800px;
  }
</style>
