<template>
  <div class="index-con" style="padding-bottom: 70px;">
    <li v-for="n in 80" v-bind:class="[isblue==n ? big : '']" :key="n">{{n}}</li>
  </div>
</template>

<script>


  export default {
    components: {},
    name: "index",
    data() {
      return {
        isblue:5,
        big:'big'
      }
    },
    methods: {
    },
    created() {
      this.$axios.get(`${this.$sIP2}/novel/search`).then((res) => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style>
  .big{
    font-size: 100px;
  }
</style>
