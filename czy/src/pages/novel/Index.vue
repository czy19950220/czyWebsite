<template>
  <div>
    <el-input placeholder="请输入内容" v-model="searchText" id="novel">
      <template slot="prepend">小说名：</template>
      <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
    </el-input>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>搜索结果</span>
      </div>
      <div v-for="(item,index) in searchData2" :key="index" class="text item">
        {{index}} : <span @click="searchGenre(searchData1[index][0])">{{item[0]}}</span>
        小说：<b @click="searchNovel(searchData1[index][1])">&lt;{{item[1]}}&gt;</b>
        作者：<span @click="searchAuthor(searchData1[index][2])">&lt;{{item[2]}}&gt;</span>
      </div>
    </el-card>

  </div>
</template>

<script>

  export default {
    components: {},
    name: "index",
    data() {
      return {
        searchText: '',//搜索内容
        searchData1: [],//搜索结果链接
        searchData2: [],//搜索结果
      }
    },
    methods: {
      //搜索小说
      search() {
        let params = {searchText: this.searchText};
        this.$axios.post(this.$sIP2 + "/novel/search", params).then((res) => {
          console.log(res.data);
          this.searchData1 = res.data.data;
          this.searchData2 = res.data.data2;
        });
      },
      //去小说类型
      searchGenre(url) {
        console.log(url);
      },
      //去查看小说
      searchNovel(url) {
        console.log(url);
      },
      //去查看坐着
      searchAuthor(url) {
        console.log(url);
      }
    },
    created() {

    },
    mounted(){

    }
  }
</script>

<style scoped>
  #novel {
    margin: auto;
    text-align: center;
  }

  .text {
    margin: 10px 5px;
  }

  .text:nth-last-child() {
    margin-bottom: 30px;
  }

  .text span, b {
    cursor: pointer;
  }

  .text span:hover, b:hover {
    color: #2b67ff;
  }
</style>
