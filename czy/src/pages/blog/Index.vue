<template>
  <div class="index">
    <textarea></textarea>
  </div>
</template>

<script>
  import '../../../node_modules/froala-editor/node_modules/font-awesome/css/font-awesome.min.css'
  import '../../assets/froala/codemirror.min.css'
  import '../../assets/froala/froala_editor.pkgd.min.css'
  import '../../assets/froala/froala_style.min.css'
  import '../../assets/froala/codemirror.min'
  import '../../../node_modules/froala-editor/js/froala_editor.pkgd.min'
  import '../../../node_modules/froala-editor/js/languages/zh_cn'
  export default {
    name: "Index",
    data () {
      return {

      }
    },
    created() {
      $(function() { $('textarea').froalaEditor({
        language: 'zh_cn'
      }) });
    }
  }
</script>

<style scoped>

</style>
