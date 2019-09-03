<template>
  <!--书架-->
  <el-tabs type="border-card">
    <el-tab-pane label="笔趣阁">
      <div class="booksList" v-for="book in books" :key="book.novelName[1]" @click="toRead(book)">
        <el-image fit="cover" :src="book.coverSrc" class="page-lazyload-image"></el-image>
        <div class="book-all-tips">
          <p class="book-title">{{book.novelName[0]}}</p>
          <p class="book-lastChapter">阅读至： {{book.currentName || '还没开始阅读'}}</p>
          <p class="book-newChapter">更新至： {{book.newest[0]}}</p>
        </div>
      </div>
      <div class="booksList">

      </div>
    </el-tab-pane>
    <el-tab-pane label="黑岩">
      开发中
    </el-tab-pane>
    <el-tab-pane label="未开发">未开发</el-tab-pane>
    <el-tab-pane label="未开发2">未开发2</el-tab-pane>
  </el-tabs>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "bookrack",
    data() {
      return {
        books: []
      }
    },
    computed: {
      currentRead() {
        return this.$store.getters.currentRead;
      },
      novelUrl() {
        return this.$store.getters.novelUrl;
      },
    },
    methods: {
      ...mapActions([
        'setSourceId',
        'setNovelUrl',
      ]),
      //去阅读
      toRead(book) {
        //console.log(book)
        this.setNovelUrl(book.novelName[1]);//小说链接
        //查看‘章节链接’是否为空,如果为空是没读，所以需要获取目录拿到第一章的链接
        if (book.currentRead == null || book.currentRead == undefined || book.currentRead == '还没开始阅读' || book.currentRead == '') {
          //获取目录
          let str2='/wapbook-'+ book.novelName[1].match(/-(\S*)/)[1];
          let str = str2.substring(0, book.novelName[1].length - 1) + '_1/';
          let params = {chapter: str};
          this.$axios.post(this.$sIP2 + "/novel/chapters", params).then((res) => {
            if (res.data == 500) {
              this.$message.error('系统错误,请刷新重试');
            } else {
              this.setSourceId(res.data.chapters_url[0]);//章节链接
              this.$router.push('/novel/read');
            }
          });
        }else {
          this.setSourceId(book.currentRead);//章节链接
          this.$router.push('/novel/read')
        }

      }
    },
    created() {
      let books = JSON.parse(localStorage.getItem("myBooks")).books;
      this.books = books;
    }
  }
</script>

<style scoped>
  .booksList {
    height: 110px;
    width: calc(100% - 40px);
    padding: 15px 0px;
    border-bottom: 1px solid #9aec71;
    margin: auto;
    clear: both;
    cursor: pointer;
  }

  .booksList img {
    height: 100%;
    width: auto;
    float: left;
  }

  .page-lazyload-image {
    height: 100px;
    width: 80px;
    float: left;
  }

  .book-all-tips {
    float: left;
    width: calc(100% - 100px);
  }

  .book-title {
    height: 23px;
    font-size: 14px;
    text-align: left;
    padding-left: 20px;
    color: #92465a;
  }

  .book-lastChapter {
    height: auto;
    font-size: 14px;
    text-align: left;
    padding-left: 20px;
    color: #92465a;
    line-height: 1rem;
    cursor: pointer;
  }

  .book-newChapter {
    height: auto;
    font-size: 14px;
    text-align: left;
    padding-left: 20px;
    color: #797700;
    line-height: 1rem;
    margin-top: 10px;
    cursor: pointer;
  }
</style>
