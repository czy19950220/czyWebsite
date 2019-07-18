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
        //console.log(res.data.result)
        let reader = new FileReader();
        let str1 = onload.readAsText(res.data.result,["utf-8"]);
        let str2 = onload.readAsText(res.data.result,["GBK"]);
        console.log(str1)
        console.log(str2)
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
