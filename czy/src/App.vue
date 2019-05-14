<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import './assets/css/basic.css';//引入格式化样式

  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
