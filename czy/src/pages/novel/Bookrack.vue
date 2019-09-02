<template>
  <!--书架-->
  <el-tabs type="border-card">
    <el-tab-pane label="笔趣阁">
      <div class="booksList" v-for="book in books" :key="book.novelName[1]">
        <el-image fit="cover" :src="book.coverSrc" class="page-lazyload-image"></el-image>
        <div class="book-all-tips">
          <p class="book-title">{{book.novelName[0]}}</p>
          <p class="book-lastChapter">阅读至： {{book.lastReadChapter}}</p>
          <p class="book-newChapter">更新至： {{book.newest[0]}}</p>
        </div>
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
  export default {
    name: "bookrack",
    data() {
      return {
        books:[]
      }
    },
    created(){
      let books = JSON.parse(localStorage.getItem("myBooks")).books;
      this.books = books;
    }
  }
</script>

<style scoped>
  .booksList{
    height: 110px;
    width: calc(100% - 40px);
    padding: 15px 0px;
    border-bottom: 1px solid #9aec71;
    margin: auto;
    clear: both;
  }
  .booksList img{
    height: 100%;
    width: auto;
    float: left;
  }
  .page-lazyload-image{
    height: 100px;
    width: 80px;
    float: left;
  }
  .book-all-tips{
    float: left;
    width: calc(100% - 100px);
  }
  .book-title{
    height: 23px;
    font-size: 14px;
    text-align: left;
    padding-left: 20px;
    color: #92465a;
  }
  .book-lastChapter{
    height: auto;
    font-size: 14px;
    text-align: left;
    padding-left: 20px;
    color: #92465a;
    line-height: 1rem;
    cursor: pointer;
  }
  .book-newChapter{
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
