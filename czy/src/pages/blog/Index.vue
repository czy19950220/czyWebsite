<template>
  <div class="swiper-no-swiping" style="margin-bottom:100px">
    <br>
    <div class="index" :style="{width:theWidth+'%'}">
      <div v-if="edit">
        <froala :tag="'textarea'" :config="config" v-model="model"></froala>
      </div>
      <froalaView v-show="editView" v-model="model"></froalaView>
    </div>
    <el-divider><i class="el-icon-upload2"></i></el-divider>
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
        <el-form
          style="max-width: 500px"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="文章名" prop="blogNameInput">
            <el-input clearable maxlength="50" v-model="ruleForm.blogNameInput"></el-input>
          </el-form-item>
          <el-form-item label="标签栏" prop="blogNameTag">
            <el-input clearable maxlength="30" v-model="ruleForm.blogNameTag"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="init()">继续编辑</el-button>
            <el-button type="primary" @click="destroy()">预览文章</el-button>
            <el-button type="warning" @click="uploadHtml('ruleForm')">提交文章</el-button>
          </el-form-item>
        </el-form>

        <!--<el-slider
          :min="30"
          v-model="theWidth"
          show-input>
        </el-slider>-->
      </el-col>
      <el-col :span="2"></el-col>

    </el-row>

  </div>
</template>

<script>
  // Require Froala Editor js file.
  require('froala-editor/js/froala_editor.pkgd.min.js')
  // Require Froala Editor css files.
  require('froala-editor/css/froala_editor.pkgd.min.css')
  require('font-awesome/css/font-awesome.css')
  require('froala-editor/css/froala_style.min.css')
  require('froala-editor/js/languages/zh_cn')
  import Vue from 'vue'
  import VueFroala from 'vue-froala-wysiwyg'

  Vue.use(VueFroala)
  export default {
    name: "Index",
    data() {
      let self = this;
      return {
        ruleForm: {
          blogNameInput: '',//博客文章名
          blogNameTag: ''//标签
        },
        rules: {
          blogNameInput: [
            {required: true, message: '请输入文章名', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
          blogNameTag: [
            {required: true, message: '请输入标签，多个标签用||隔开', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
          ]
        },
        theWidth: 100,
        edit: false,
        editView: true,
        config: {
          fullPage: true,
          theme: 'royal',
          charCounterMax: 200000,
          imageUpload: true,
          imageUploadMethod: "POST",
          imageUploadParams: {
            id: 'my_editor'
          },
          imageManagerDeleteMethod: 'POST',
          imageUploadRemoteUrls: true,
          imageMaxSize: 1024 * 1024 * 100,
          //imageUploadURL: 'http://127.0.0.1:7001/blog/uploadimage/',
          imageUploadURL: self.$sIP2 + '/froala/upload_images',
          imageManagerDeleteURL: self.$sIP2 + '/froala/deleteImage',
          imageManagerLoadURL: self.$sIP2 + '/froala/listpic',
          fileUploadURL: self.$sIP2 + '/froala/uploadfile',
          fileAllowedTypes: ['*'],//文件类型
          fileMaxSize: 1024 * 1024 * 1024 * 100,       //文件上传大小最大10g
          videoMaxSize: 1024 * 1024 * 1024 * 100,
          videoUploadURL: self.$sIP2 + '/froala/uploadvideo',
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
      blogNum() {
        return this.$store.getters.blogNum;
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
      uploadHtml(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              html: this.model,
              id: this.$route.query.id,
              titleName: this.ruleForm.blogNameInput,
              uid: this.user.id,
              blogNameTag: this.ruleForm.blogNameTag
            };
            this.$axios.post(this.$sIP2 + "/froala/uploadHtml", params).then((res) => {
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
              } else {
                this.$message.error('异常错误');
              }
            })
          } else {
            this.$message.error('检查错误');
            return false;
          }
        });

      },
      //继续编辑
      init() {
        this.edit = true;
        this.editView = false;
      },
      //初始化编辑器
      initBlog() {
        console.log('this.$route.query.id',this.$route.query.id)
        let id =  this.$route.query.id || this.blogNum || 1;
        console.log(id)
        this.$axios.post(this.$sIP2 + "/froala/getHtml?id=" + id).then((res) => {
          this.model = res.data.result.getHtml;
          this.ruleForm.blogNameInput = res.data.result.blogName;//博客文章名
          this.ruleForm.blogNameTag = res.data.result.text;//标签
          //console.log(res.data.result.getHtml)
        })
      }
    },
    created() {
      this.initBlog();
      this.config.imageUploadURL += '?id=' + this.user.id;
      this.config.imageManagerDeleteURL += '?id=' + this.user.id;
      this.config.imageManagerLoadURL += '?id=' + this.user.id;
      this.config.fileUploadURL += '?id=' + this.user.id;
      this.config.videoUploadURL += '?id=' + this.user.id;
    },
    mounted() {

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
