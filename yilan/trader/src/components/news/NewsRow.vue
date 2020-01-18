<template>
  <div>
    <a-row type="flex" align="middle" class="news-row">
      <a-col class="news-row-col" style="font-size: 14px" :title="news.country" span="3">{{news.country}}</a-col>
      <a-col class="news-row-col" span="3">
        <a-rate style="font-size: 16px" :style="{color:starColor}" :value="news.important" disabled></a-rate>
      </a-col>
      <a-col class="news-row-col" style="text-align: left;text-indent: 24px" span="9">{{news.content}}</a-col>
      <a-col class="news-row-col" span="5">{{news.modifiedTime}}</a-col>
      <a-col class="news-row-col" span="4">
        <a-button type="primary" @click="editNews" style="font-size: 12px" size="small">编辑</a-button>&nbsp;&nbsp;<a-popconfirm
        title="确定要删除此条新闻吗?"
        @confirm="deleteNews"
        @cancel="cancelDeleteNews"
        okText="确定"
        cancelText="取消"
      >
        <a-button type="danger" style="font-size: 12px" size="small">删除</a-button>
      </a-popconfirm>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: "NewsRow",
    props: ['news'],
    data() {
      return {
        value2: 4,
      }
    },
    methods: {

      editNews() {
        console.log('编辑');
        this.$emit('editNews', this.news.newsId)
      },
      cancelDeleteNews() {

      },
      deleteNews() {
        console.log('删除')
        this.$emit('deleteNews', this.news.newsId)
      }
    },
    computed: {
      starColor() {
        console.log(this.news.important)
        return this.news.important < 3 ? 'rgba(255,188,0,0.43)' : (this.news.important < 4 ? 'rgb(255,188,0)' : 'rgb(222,78,78)');
      }
    }
  }
</script>

<style scoped>
  .news-row {
    border-bottom: 1px solid silver;
    max-height: 40px;
    min-height: 40px;


    text-align: center;
    overflow: hidden;
    word-break: break-all;
    /*height: 40px;*/
    white-space: nowrap;
    cursor: default;
    transition: all .5s ease-out;
  }

  .news-row:hover {
    max-height: 2000px;
    overflow: hidden;
    word-break: normal;
    /*height: 40px;*/
    white-space: pre-line;
  }

  .news-row-col {
    overflow: hidden;
  }

  .news-row-col:hover {
    overflow: hidden;
    word-break: normal;
    /*height: 40px;*/
    white-space: pre-line;
  }
</style>
