<template>
  <div class="swiper-no-swiping" style="margin-bottom:100px">
    <br>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
        <el-button @click="init()">继续编辑</el-button>
        <el-button type="primary" @click="destroy()">预览文章</el-button>
        <el-button type="warning" @click="uploadHtml()">提交文章</el-button>
        <el-slider
          :min="30"
          v-model="theWidth"
          show-input>
        </el-slider>
      </el-col>
      <el-col :span="2"></el-col>

    </el-row>
    <br>
    <div class="index" :style="{width:theWidth+'%'}">
      <div v-if="edit">
        <froala :tag="'textarea'" :config="config" v-model="model"></froala>
      </div>
      <froalaView v-show="editView" v-model="model"></froalaView>
    </div>
  </div>
</template>

<script>

  export default {
    components: {},
    name: "Index",
    data() {
      return {
        sIP: 'http://47.103.42.176:19680',
        sIP2: 'http://czy-study.club:19680',
        theWidth: 100,
        edit: false,
        editView: true,
        config: {
          fullPage: true,
          theme: 'royal',
          imageUpload: true,
          imageUploadMethod: "POST",
          imageUploadParams: {
            id: 'my_editor'
          },
          imageManagerDeleteMethod: 'POST',
          imageUploadRemoteUrls: true,
          imageMaxSize: 1024 * 1024 * 100,
          //imageUploadURL: 'http://127.0.0.1:7001/blog/uploadimage/',
          imageUploadURL: 'http://czy-study.club:19680/froala/upload_images',
          imageManagerDeleteURL: 'http://czy-study.club:19680/froala/deleteImage',
          imageManagerLoadURL: 'http://czy-study.club:19680/froala/listpic',
          fileUploadURL: 'http://czy-study.club:19680/froala/uploadfile',
          fileAllowedTypes: ['*'],//文件类型
          fileMaxSize: 1024 * 1024 * 1024 * 100,       //文件上传大小最大10g
          videoMaxSize: 1024 * 1024 * 1024 * 100,
          videoUploadURL: 'http://czy-study.club:19680/froala/uploadvideo',
          events: {
            'froalaEditor.initialized': function () {
              //console.log('initialized')
            },
          },
          toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertAudio', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
          toolbarButtonsMD: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
          toolbarButtonsSM: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'embedly', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'spellChecker', 'help', 'html', '|', 'undo', 'redo'],
          language: 'zh_cn'
        },
        model: '',
      }
    },
    computed: {
      user() {
        return this.$store.getters.users;
      },
    },
    watch: {},
    methods: {
      //预览文章
      destroy() {
        this.edit = false;
        this.editView = true;
      },
      //提交文章代码
      uploadHtml() {
        var params = {
          html: this.model,
          blogID: this.$route.query.blogID,
          titleName: 'youxi',
          uid: this.user.id
        };
        this.$axios.post(this.sIP2 + "/froala/uploadHtml", params).then((res) => {
          console.log(res.data)
          if (res.data == '1') {
            this.$message({
              message: '更新成功',
              duration: 500,
              type: 'success',
              showClose: true
            });
          } else if (res.data == '2') {
            this.$message({
              message: '添加成功',
              duration: 500,
              type: 'success',
              showClose: true
            });
          }
        })
      },
      //继续编辑
      init() {
        this.edit = true;
        this.editView = false;
      },
      //初始化编辑器
      initBlog() {
        let blogID = this.$route.query.blogID;
        this.$axios.post(this.sIP2 + "/froala/getHtml?blogID=" + blogID).then((res) => {
          this.model = res.data.result.getHtml;
          //console.log(res.data.result.getHtml)
        })
      }
    },
    created() {
      this.config.imageUploadURL += '?id=' + this.user.id;
      this.config.imageUploadURL += '?id=' + this.user.id;
      this.config.imageManagerDeleteURL += '?id=' + this.user.id;
      this.config.imageManagerLoadURL += '?id=' + this.user.id;
      this.config.fileUploadURL += '?id=' + this.user.id;
      this.config.videoUploadURL += '?id=' + this.user.id;
    }
    ,
    mounted() {
      this.initBlog();
    }
  }
</script>

<style lang="scss">
  .index {
    margin: auto;
    height: 100%;
  }

  .fr-wrapper > div:first-child {
    display: none !important;
  }

  canvas {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
  }

  .fr-box.fr-fullscreen {
    left: unset !important;
  }
</style>
