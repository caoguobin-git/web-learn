<template>
<div id="trade-page-footer">
  <el-row>
    <p>©2019 Duochuang 使用前必读 意见反馈 津ICP证030173号  津公网安备12000002000001号 </p>
  </el-row>
</div>
</template>

<script>
    export default {
        name: "TradePageFooter"
    }
</script>

<style scoped>
  #trade-page-footer{
    margin-top: 5px;
    text-align: center;
    background:black;
    height: 33.5px;
    line-height: 20px;
    opacity: 0.55;
  }
  .el-row,p{
    color: silver;
    line-height: 10px;
    font-size: 12px;
  }
</style>
