<template>
  <div class="index-con" style="padding-bottom: 70px;">
    asdasd
    <li v-for="n in 80">{{n}}</li>
  </div>
</template>

<script>


  export default {
    components: {},
    name: "index",
    data() {
      return {}
    },
    methods: {},
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
</style>
