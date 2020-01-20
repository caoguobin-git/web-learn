<template>
  <a-row class="follower-info-row-container">
    <a-col :span="2" offset="2"><div class="follower-position-row-tag" style="border-left: 1px solid silver">100152245</div></a-col>
    <a-col :span="2"><div class="follower-position-row-tag">EUR/USD</div></a-col>
    <a-col :span="1"><div class="follower-position-row-tag">3000</div></a-col>
    <a-col :span="1"><div class="follower-position-row-tag">SELL</div></a-col>
    <a-col :span="2"><div class="follower-position-row-tag">1.5625</div></a-col>
    <a-col :span="2"><div class="follower-position-row-tag">1.5632</div></a-col>
    <a-col :span="2"><div class="follower-position-row-tag">5.23</div></a-col>
    <a-col :span="2"><div class="follower-position-row-tag">5.23</div></a-col>
    <a-col :span="2"><div class="follower-position-row-tag">-</div></a-col>
    <a-col :span="4"><div class="follower-position-row-tag" style="border-right: 1px solid silver">2020/1/16 14:32</div></a-col>
  </a-row>
</template>

<script>
  export default {
    name: "FollowerPositionRow"
  }
</script>

<style scoped>
  .follower-info-row-container {
    width: 100%;
  }

  .follower-position-row-tag {
    text-align: center;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    background: rgba(246, 246, 246, 1);

  }
</style>
