<template>
  <div>
    <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        value1:'2019-06-20 08:40:52'
      }
    },
    created(){
      $("input[type=text]").each(function () {
        $(this).attr("disabled", false);
      });
    }
  }
</script>

<style scoped>

</style>
