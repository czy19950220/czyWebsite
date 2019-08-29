<template>
  <div class="cover">
    <el-card :body-style="{ padding: '0px' }">
      <el-image class="cover-image"
                :src="novelDetail.coverSrc"></el-image>
      <div class="block_txt">
        <h2>{{novelDetail.block.novelName[0]}}</h2>
        <p>{{novelDetail.block.author[0]}}</p>
        <p>{{novelDetail.block.classify[0]}}</p>
        <p>{{novelDetail.block.state}}</p>
        <p>{{novelDetail.block.update}}</p>
        <p @click="toChapter(novelDetail.block.newest[1])">{{novelDetail.block.newest[0]}}</p>
      </div>
    </el-card>
    <el-card shadow="hover" class="intro_info">
      {{novelDetail.intro_info}}
    </el-card>
    <el-card shadow="hover">
      <ul>
        <li v-for="(item,index) in novelDetail.chapters[0]"
            @click="toChapter(novelDetail.chapters[1][index])"
            :key="index"
            class="infinite-list-item">{{ item }}
        </li>
      </ul>
    </el-card>
    <el-card shadow="hover">
      <h4>本站不存储小说，只是学习爬虫，如有侵权，请联系删除。</h4>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "detail",
    data() {
      return {
        novelDetail: {
          intro_info: '',//简介
          block: {//书籍信息
            novelName: [],
            author: [],
            classify: [],
            state: '',
            update: '',
            newest: []
          },
          chapters: []
        }
      }
    },
    computed: {
      novelUrl() {
        return this.$store.getters.novelUrl;
      }
    },
    watch: {
      novelUrl: function (bf, af) {
        this.getNovelDetail();
      }
    },
    methods: {
      //获取小说详情
      getNovelDetail() {
        if (this.novelUrl == '') {
          this.$message.error('没有指定小说名');
          return
        }
        let params = {novelUrl: this.novelUrl};
        this.$axios.post(this.$sIP2 + "/novel/detail", params).then((res) => {
          //console.log(res.data);
          if (res.data == 500) {
            this.$message.error('系统错误');
          } else {
            this.novelDetail = res.data;
          }
        });
      },
      //去阅读当前章节
      toChapter(chapter) {
        let params = {chapter: chapter};
        this.$store.dispatch('setSourceId',chapter);
        this.$router.push('/novel/read');
        /*this.$axios.post(this.$sIP2 + "/novel/read", params).then((res) => {
          //console.log(res.data);
          if (res.data == 500) {
            this.$message.error('系统错误');
          } else {
            console.log(res.data)
          }
        });*/
      }
    },
    created() {
      if (this.novelUrl == '') {
        this.$message.error('没有指定小说名');
      } else {
        this.getNovelDetail()
      }
    },
    mounted() {

    }

  }
</script>

<style scoped>
  .cover {
    padding-bottom: 100px;
  }

  h2 {
    font-size: 16px;
    text-indent: 10px;
    height: auto;
  }

  .cover p {
    text-indent: 10px;
    height: auto;
    font-size: 14px;
    cursor: pointer;
  }

  .cover p:hover {
    color: #1e88e5;
  }

  .cover-image {
    float: left;
    height: 100px;
    width: 85px;
    padding-top: 10px;
    padding-bottom: 5px;
    padding-right: 10px;
    padding-left: 10px;
    border: 1px solid #DEDEDE;
  }

  .block_txt {
    float: left
  }

  .intro_info {
    padding-left: 2px;
    text-indent: 2em;
    color: #999;
    font: 16px/1.5 'microsoft yahei';
  }

  .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: left;
    height: 50px;
    background: #e8f3fe;
    margin: 10px;
    color: #7dbcfc;
    cursor: pointer;
    text-indent: 2em;
  }
</style>
