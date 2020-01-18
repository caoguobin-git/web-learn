<template>
  <div class="news-row-container">
    <div class="news-row-tag" :title="news.country" style="width: 10%;overflow:hidden;display: inline-grid;font-weight: bold">{{news.country}}</div>
    <div class="news-row-tag" style="width: 12%;">
      <el-rate
        :value='news.important'
        disabled-void-color="silver"
        disabled
        :colors="colors">
      </el-rate>
    </div>
    <div class="news-row-tag1">{{news.content}}
    </div>
    <div class="news-row-tag" style="width: 14%;font-size: 12px">{{news.modifiedTime}}</div>
    <div class="news-row-tag" style="width: 11%">
      <span class="news-edit-btn" @click="editNews">编辑</span>
      <span style="cursor:pointer;color: rgba(237,53,53,1)" @click="deleteNews">删除</span></div>
  </div>
</template>

<script>
  export default {
    name: "NewsRow",
    props: ['news'],
    data() {
      return {
        value2: 4,
        colors: ['rgba(255,188,0,0.43)', 'rgb(255,188,0)', 'rgb(222,78,78)']
      }
    },
    methods: {
      editNews() {
        console.log('编辑');
        this.$emit('editNews',this.news.newsId)
      },
      deleteNews() {
        console.log('删除')
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$emit('deleteNews',this.news.newsId)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

        // this.$emit('deleteNews',this.news.newsId)
      }
    }
  }
</script>

<style scoped>
  .news-edit-btn {
    cursor: pointer;
    color: rgb(97, 162, 227)
  }

  .news-edit-btn:hover {
    color: rgb(53, 109, 254);
  }

  .news-row-container {
    width: 100%;
    border-bottom: 1px solid silver;
    height: 40px;
    line-height: 40px;

  }

  >>> .el-rate__icon.el-icon-star-on, >>> .el-rate__icon.el-icon-star-off {
    margin-right: 0px;
  }

  .news-row-tag {
    text-align: center;
    display: inline-block;
    height: 100%;
    /*white-space: pre;*/
    /*word-break: break-all;*/
    /*line-height: 18px;*/
    cursor: default;
  }

  .news-row-tag1 {
    display: inline-grid;
    height: 100%;
    text-indent: 28px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 45%;
    margin-right: 5%;
  }
</style>
