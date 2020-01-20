<template>
  <a-row type="flex" align="middle" class="notice-row">
    <a-col span="3">
      <div class="notice-row-tag" style="font-weight: bolder">{{notice.currency}}</div>
    </a-col>
    <a-col span="14">
      <a-tooltip>
        <template slot="title">
          {{notice.content}}
        </template>
        <div class="notice-row-tag"
             style="text-align:left;text-indent:24px;width: 90%;margin:auto;overflow: hidden;height: 40px">
          {{notice.content}}
        </div>
      </a-tooltip>

    </a-col>
    <a-col span="7">
      <div class="notice-row-tag">{{notice.modifiedTime}}</div>
    </a-col>
  </a-row>
</template>

<script>
  export default {
    name: "TradePageNoticeRow",
    props: ['notice']
  }
</script>

<style scoped>
  .notice-row-tag {
    text-align: center;
  }

  .notice-row {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid silver;
  }

  .notice-row:hover {
    cursor: default;
  }
</style>
