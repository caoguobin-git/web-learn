<template>
  <div class="follower-account-main-container">
    <div class="follower-account-title-container" style="width: 1500px"><div class="follower-account-title-tag" style="width: 8%">账号</div><div class="follower-account-title-tag" style="width: 7%">余额</div><div class="follower-account-title-tag" style="width: 6%">净值</div><div class="follower-account-title-tag" style="width: 4%">总盈/亏</div><div class="follower-account-title-tag" style="width: 5%">当日盈/亏</div><div class="follower-account-title-tag" style="width: 7%">占用保证金</div><div class="follower-account-title-tag" style="width: 7%">可用保证金</div><div class="follower-account-title-tag" style="width: 12%">可用保证金百分比</div><div class="follower-account-title-tag" style="width: 7%">占用维持保证金</div><div class="follower-account-title-tag" style="width: 7%">可用维持保证金</div><div class="follower-account-title-tag" style="width: 12%">可用维持保证金百分比</div><div class="follower-account-title-tag" style="width: 5%">补仓</div>
    </div>
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
.follower-account-main-container{
  height: 95%;
  width: 100%;
  margin: auto;
  overflow: hidden;
}

.follower-account-main-container:hover {
  overflow-x: scroll;
}

.follower-account-title-tag{
  display: inline-block;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  background: rgba(246,249,252,1);
  padding: 6px 3px;
  border-right: 2px solid white;
}
.follower-account-title-container {
  border-top: 1px solid rgba(112,189,199,1);
}
</style>
