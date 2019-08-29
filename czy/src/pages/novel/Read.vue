<template>
  <div class="read-con">
    <!--文章内容-->
    <p v-for="(text,index) in texts">{{text}}</p>
    <!--导航，上下章节，目录等-->
    <el-divider content-position="right"></el-divider>
    <el-row class="navigator">
      <el-col :span="6"><span>上一章</span></el-col>
      <el-col :span="6"><span @click="drawerRight()">目录</span></el-col>
      <el-col :span="6"><span>添加书架</span></el-col>
      <el-col :span="6"><span>下一章</span></el-col>
    </el-row>
    <!--侧栏抽屉，放目录-->
    <el-drawer
      title="目录"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <el-scrollbar style="height: 100%">
        <el-input-number v-model="num" @change="handleChange" :min="1" :max="chapterMax" label="描述文字"></el-input-number>
        <ul style="margin-bottom: 60px">
          <li v-for="(item,index) in chapters"
              @click="toChapter(chaptersUrl[index])"
              :key="chaptersUrl[index]"
              class="infinite-list-item">{{ item }}
          </li>
        </ul>
      </el-scrollbar>

    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "read",
    data() {
      return {
        chapter: '/wapbook-102958-167504924/',
        texts: ['没有加载出来，请重试'],
        navigator: [],//导航
        drawer: false,
        direction: 'rtl',
        chapters: [],//目录
        chaptersUrl: [],//目录链接
        chapterMax: 1,//最大值
        num: 1,//当前页
      }
    },
    computed: {
      sourceId() {
        return this.$store.getters.sourceId;
      }
    },
    watch: {
      sourceId: function (bf, af) {
        console.log(af);
        this.getText();
      }
    },
    methods: {
      //获取小说内容
      getText() {
        if (this.sourceId == '') {
          this.$message.error('没有指定章节');
          return
        } else {
          let params = {chapter: this.sourceId};
          this.$axios.post(this.$sIP2 + "/novel/read", params).then((res) => {
            //console.log(res.data);
            if (res.data == 500) {
              this.$message.error('系统错误');
            } else {
              //console.log(res.data)
              this.navigator = res.data.navigator;
              this.texts = res.data.text;
            }
          });
        }
      },
      handleClose(done) {
        done();
      },
      //获取目录
      getChapters(url) {
        url = url || '_1/';
        let str = this.navigator[1].substring(0, this.navigator[1].length - 1) + url;
        let params = {chapter: str};
        this.$axios.post(this.$sIP2 + "/novel/chapters", params).then((res) => {
          //console.log(res.data);
          if (res.data == 500) {
            this.$message.error('系统错误');
          } else {
            console.log(res.data)
            this.chapters = res.data.chapters;
            this.chaptersUrl = res.data.chapters_url;
            this.chapterMax = parseInt(res.data.chapters_max[res.data.chapters_max.length-1].toString().match(/_(\S*)/)[1]) || 1;
            console.log(this.chapterMax)
          }
        });
      },
      //去点击的章节
      toChapter(chapterUrl) {
        this.$store.dispatch('setSourceId', chapterUrl);
        console.log(chapterUrl)
      },
      drawerRight() {
        this.drawer = true;
        this.getChapters()
      },
      handleChange(val){
        console.log(` ${val}`);
        this.getChapters(`_${val}/`)
      }
    },
    created() {
      this.getText()
    }
  }
</script>

<style scoped>
  .read-con {
    margin-bottom: 100px;
  }

  .navigator {
    text-align: center;
  }

  .navigator span {
    cursor: pointer;
    color: #0058d2;
    font-size: 13px;
    text-decoration: initial;
  }

  .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: left;
    height: auto;
    min-height: 40px;
    background: #e8f3fe;
    margin: 4px;
    color: #7dbcfc;
    cursor: pointer;
    text-indent: 10px;
  }

  .infinite-list-item:hover {
    background-color: #dbe6fe;
  }
</style>
