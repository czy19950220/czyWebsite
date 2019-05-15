<template>
  <div>
    <froala :tag="'textarea'" :config="config" v-model="model"></froala>
  </div>
</template>

<script>


  export default {
    components: {

    },
    name: "Index",
    data() {
      return {
        config: {
          events: {
            'froalaEditor.initialized': function () {
              //console.log('initialized')
            }
          },
          language: 'zh_cn'
        },
        model: 'Edit Your Content Here!'
      }
    },
    computed: {},
    watch: {},
    methods: {},
    created() {

    }
  }
</script>

<style lang="scss">
  .index {
    height: 100%;
    width: 100%;
  }
</style>
