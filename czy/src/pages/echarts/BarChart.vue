<template>
  <div class="polar-con">
    <v-chart :options="bar"/>
  </div>
</template>

<script>
  import getBar from './bar'
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
  .polar-con {
    height: 400px;
    width: 600px;
  }
</style>
