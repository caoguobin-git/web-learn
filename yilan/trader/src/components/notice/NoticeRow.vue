<template>
  <a-row type="flex" align="middle" class="notice-row-container">
    <a-col span="3">
      <div class="notice-row-tag" style="line-height: 40px;height: 40px;font-weight: bolder">{{notice.currency}}</div>
    </a-col>
    <a-col span="12">
      <div class="notice-row-tag" style="text-align: left;height: 40px;overflow: hidden">
        <a-tooltip placement="topLeft">
          <template slot="title">
            <p>{{notice.content}}</p>
          </template>
          <p style="height: 40px;text-indent: 24px">{{notice.content}}</p>
        </a-tooltip>
      </div>
    </a-col>
    <a-col span="5">
      <div class="notice-row-tag" style="line-height: 40px;height: 40px">{{notice.modifiedTime}}</div>
    </a-col>
    <a-col span="4" style="text-align: center">

      <a-col span="12" style="text-align: right"><a-button type="primary" @click="editNotice" style="font-size: 12px" size="small">编辑</a-button></a-col>
      <a-col span="11" offset="1" style="text-align: left"><a-popconfirm
        title="确定要删除此条交易提醒吗?"
        @confirm="deleteNotice"
        @cancel="cancelDeleteNotice"
        okText="确定"
        cancelText="取消">
        <a-button type="danger" style="font-size: 12px" size="small">删除</a-button>
      </a-popconfirm></a-col>
    </a-col>
  </a-row>
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
      cancelDeleteNotice() {

      },
      editNotice() {
        console.log('编辑');
        this.$emit('editNotice', this.notice.noticeId)
      },
      deleteNotice() {
        console.log('删除')
        this.$emit('deleteNotice', this.notice.noticeId)
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
    height: 50px;
    cursor: default;
    padding: 5px 0px;
    box-sizing: border-box;
    /*border: 1px solid black;*/
    border-bottom: 1px solid silver;
    /*height: 40px;*/
  }


  .notice-row-tag {
    text-align: center;
    height: 40px;
    width: 100%;
    overflow: hidden;
    white-space: pre-line;
    word-break: break-all;;
  }
</style>
