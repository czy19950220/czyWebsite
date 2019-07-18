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
      this.$axios.post(`${this.$sIP2}/novel/search`, this.ruleForm).then((res) => {
        console.log(res.data)
        /*let reader = new FileReader();
        reader.readAsText(data, "GBK");
        reader.onload = function (e) {
          console.log(reader.result);
        };*/
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style>
</style>
