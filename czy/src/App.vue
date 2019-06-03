<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import './assets/css/basic.css';//引入格式化样式
  import jwtDecode from 'jwt-decode'

  export default {
    name: 'App',
    methods: {
      isEmpty(value) {
        return (
          value === undefined ||
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        );
      }
    },
    created() {
      if (localStorage.token) {
        //console.log(1111)
        let users = jwtDecode(localStorage.token);
        this.$store.dispatch('setisAuthenicated',!this.isEmpty(users));
        this.$store.dispatch('setUsers',users);
      }
    }
  }
</script>

<style>

</style>
