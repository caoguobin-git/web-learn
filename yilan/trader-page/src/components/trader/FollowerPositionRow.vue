<template>
  <div class="follower-info-row-container">
    <div class="follower-position-row-tag" style="width: 12.5%">100152245</div><div class="follower-position-row-tag" style="width: 9.6%">EUR/USD</div><div class="follower-position-row-tag" style="width: 6.7%">3000</div><div class="follower-position-row-tag" style="width: 6%">SELL</div><div class="follower-position-row-tag" style="width: 10.2%">1.5625</div><div class="follower-position-row-tag" style="width: 9.5%">1.5632</div><div class="follower-position-row-tag" style="width: 13%">5.23</div><div class="follower-position-row-tag" style="width: 12%">5.23</div><div class="follower-position-row-tag" style="width: 6.8%">-</div><div class="follower-position-row-tag" style="width: 12%">2020/1/16 14:32</div>
  </div>
</template>

<script>
  export default {
    name: "FollowerPositionRow"
  }
</script>

<style scoped>
  .follower-info-row-container {
    width: 82%;
    margin-left: 8.2%;
    background: rgba(246,246,246,1);
    border-bottom: 1px solid silver;
    border-left: 1px solid silver;
    border-right: 1px solid silver;
  }

  .follower-position-row-tag {
    display: inline-grid;
    text-align: center;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }
</style>
