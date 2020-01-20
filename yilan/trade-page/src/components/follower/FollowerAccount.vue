<template>
  <div class="follower-account-main-container">
    <a-row class="follower-account-title-container" :gutter="2" style="width: 1500px">
      <a-col span="2" ><div class="follower-account-title-tag" >账号</div></a-col>
      <a-col span="2" ><div class="follower-account-title-tag" >余额</div></a-col>
      <a-col span="2" ><div class="follower-account-title-tag" >净值</div></a-col>
      <a-col span="2" ><div class="follower-account-title-tag" >总盈/亏</div></a-col>
      <a-col span="2" ><div class="follower-account-title-tag" >当日盈/亏</div></a-col>
      <a-col span="2" ><div class="follower-account-title-tag" >占用保证金</div></a-col>
      <a-col span="2" ><div class="follower-account-title-tag" >可用保证金</div></a-col>
      <a-col span="2" ><div class="follower-account-title-tag" >可用保证金(%)</div></a-col>
      <a-col span="2" ><div class="follower-account-title-tag" >占用维持保证金</div></a-col>
      <a-col span="2" ><div class="follower-account-title-tag" >维持保证金</div></a-col>
      <a-col span="2" ><div class="follower-account-title-tag" >维持保证金(%)</div></a-col>
      <a-col span="2" ><div class="follower-account-title-tag" >补仓</div></a-col>
    </a-row>
    <div class="follower-account-container" style="width: 1500px">
      <FollowerAccountRow :account="datas.account"></FollowerAccountRow>
    </div>
  </div>
</template>

<script>
  import FollowerAccountRow from "./FollowerAccountRow";

  export default {
    name: "FollowerAccount",
    components: {FollowerAccountRow},
    props: ['datas'],
  }
</script>

<style scoped>
  .follower-account-main-container {
    height: 95%;
    width: 100%;
    margin: auto;
    overflow: hidden;
  }

  .follower-account-main-container:hover {
    overflow-x: scroll;
  }

  .follower-account-title-tag {
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    background: rgba(246, 249, 252, 1);
    padding: 6px 3px;
  }

  .follower-account-title-container {
    border-top: 1px solid rgba(112, 189, 199, 1);
  }
</style>
