<template>
  <div class="notice-row-container">
    <div class="notice-row-tag" :title="notice.instrument" style="width: 10%;overflow:hidden;display: inline-grid;font-weight: bold">{{notice.instrument}}</div>
    <div class="notice-row-tag" style="width: 12%;">
      <el-rate
        :value='notice.important'
        disabled-void-color="silver"
        disabled
        :colors="colors">
      </el-rate>
    </div>
    <div class="notice-row-tag1">{{notice.content}}
    </div>
    <div class="notice-row-tag" style="width: 14%;font-size: 12px">{{new Date(notice.time).toLocaleString()}}</div>
    <div class="notice-row-tag" style="width: 11%">
      <span class="notice-edit-btn" @click="editNotice">编辑</span>
      <span style="cursor:pointer;color: rgba(237,53,53,1)" @click="deleteNotice">删除</span></div>
  </div>
</template>

<script>
  export default {
    name: "NoticeRow",
    props: ['notice'],
    data() {
      return {
        value2: 4,
        colors: ['rgba(255,188,0,0.43)', 'rgb(255,188,0)', 'rgb(222,78,78)']
      }
    },
    methods: {
      editNotice() {
        console.log('编辑');
        this.$emit('editNotice',this.notice.noticeId)
      },
      deleteNotice() {
        console.log('删除')
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$emit('deleteNotice',this.notice.noticeId)
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

        // this.$emit('deleteNotice',this.notice.noticeId)
      }
    }
  }
</script>

<style scoped>
  .notice-edit-btn {
    cursor: pointer;
    color: rgb(97, 162, 227)
  }

  .notice-edit-btn:hover {
    color: rgb(53, 109, 254);
  }

  .notice-row-container {
    width: 100%;
    border-bottom: 1px solid silver;
    height: 40px;
    line-height: 40px;

  }

  >>> .el-rate__icon.el-icon-star-on, >>> .el-rate__icon.el-icon-star-off {
    margin-right: 0px;
  }

  .notice-row-tag {
    text-align: center;
    display: inline-block;
    height: 100%;
    /*white-space: pre;*/
    /*word-break: break-all;*/
    /*line-height: 18px;*/
    cursor: default;
  }

  .notice-row-tag1 {
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
