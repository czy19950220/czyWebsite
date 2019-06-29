<template>
  <div class="polar-con">
    <index-header></index-header>
    <v-chart :options="bar"/>
  </div>
</template>

<script>
  import getBar from './bar'
  import IndexHeader from './IndexHeader'
  export default {
    components:{
      IndexHeader
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
