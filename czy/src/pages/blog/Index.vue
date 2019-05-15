<template>
  <div id="bodyid">
    <froala :tag="'textarea'" :config="config" v-model="model"></froala>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data () {
      const self = this;
      return {
        config: {
          placeholderText: "编辑内容",
          language: 'zh_cn',
          events: {
            'froalaEditor.initialized': function () {
              //console.log('initialized')
            }
          },
        },
        model: ''
      }
    },
    created() {
    }
  }
</script>

<style scoped>

</style>
