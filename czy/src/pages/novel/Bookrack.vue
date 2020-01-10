<template>
  <!--书架-->
  <el-tabs type="border-card" style="margin-top: 20px;margin-right: 0px">
    <el-tab-pane label="笔趣阁">
      <div class="booksList" v-for="book in books" :key="book.novelName[1]" @click.self="toRead(book)">
        <el-image fit="cover" :src="book.coverSrc" class="page-lazyload-image" @click="toRead(book)"></el-image>
        <div class="book-all-tips" @click="toRead(book)">
          <p class="book-title">{{book.novelName[0]}}</p>
          <p class="book-lastChapter">阅读至：{{Substr(book.currentName) || '还没开始阅读'}}</p>
          <p class="book-newChapter">更新至：{{Substr(book.newest[0])}}</p>
        </div>
        <i class="el-icon-delete"
           @click="deleteBook(book)"
           style="position: absolute;right: 10px;top: 10px;color: darkgreen"></i>
      </div>
      <div class="booksList">
      </div>
    </el-tab-pane>
    <el-tab-pane label="我的小说网">
      <a href="http://chenzhenyu.top:9999/" target="_blank">我的小说网，无弹窗，无广告，不存储小说，仅供学习</a>
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
        checked: true,
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
        if (book.currentRead == null || book.currentRead == undefined || book.currentName == '还没开始阅读' || book.currentName == '' || book.currentRead == '') {
          //获取目录
          let str2 = '/wapbook-' + book.novelName[1].match(/-(\S*)/)[1];
          let str = str2.substring(0, str2.length - 1) + '_1/';
          console.log(str)
          let params = {chapter: str};
          this.$axios.post(this.$sIP2 + "/novel/chapters", params).then((res) => {
            if (res.data == 500) {
              this.$message.error('系统错误,请刷新重试');
            } else {
              this.setSourceId(res.data.chapters_url[0]);//章节链接
              this.$router.push('/novel/read');
            }
          });
        } else {
          this.setSourceId(book.currentRead);//章节链接
          this.$router.push('/novel/read')
        }

      },
      //过多字符串用省略号，返回结果
      Substr(str) {
        if (str == '' || str == null || str == undefined) {
          return null;
        }
        if (str.length > 45) {
          return str.substr(0, 42) + '...';
        } else {
          return str
        }
      },
      deleteBook(book) {
        console.log(book)
        this.$confirm('此操作将永久删除' + book.novelName[0] + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.books = this.books.filter(obj => obj.novelName[1] != book.novelName[1]);
          console.log(this.books)
          let myBooks = {"books": this.books, "fontSize": 18};
          myBooks = JSON.stringify(myBooks);
          localStorage.setItem("myBooks", myBooks);//以“myBooks”为名称存储书籍
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    created() {
      let books = JSON.parse(localStorage.getItem("myBooks")).books;
      this.books = books;
      //console.log(books)
    }
  }
</script>

<style scoped>
  .booksList {
    position: relative;
    height: 120px;
    padding: 10px 0px 0px;
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
    font-size: 14px;
    text-align: left;
    padding-left: 20px;
    color: #92465a;
  }

  .book-lastChapter {
    height: auto;
    font-size: 12px;
    text-align: left;
    padding-left: 20px;
    color: #92465a;
    line-height: 1rem;
    cursor: pointer;
  }

  .book-newChapter {
    height: auto;
    font-size: 12px;
    text-align: left;
    padding-left: 20px;
    color: #797700;
    line-height: 1rem;
    margin-top: 5px;
    cursor: pointer;
  }

  .el-tabs--border-card > .el-tabs__content {
    padding: 8px;
  }
</style>
