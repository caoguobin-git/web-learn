<template>
  <div style="width: 98%;margin: auto">
    <el-menu default-active="2" mode="horizontal">
      <el-menu-item index="1">挂单</el-menu-item>
      <el-menu-item @click="followerTag='OpenPositions'" index="2">开仓</el-menu-item>
      <el-menu-item @click="followerTag='ClosedPositions'" index="3">平仓</el-menu-item>
      <el-menu-item index="4">历史</el-menu-item>
    </el-menu>
    <component :is="followerCurrentDisplay"></component>
  </div>
</template>

<script>
  import FollowerOpenPositions from "./FollowerOpenPositions";
  import FollowerClosedPositions from "./FollowerClosedPositions";

  export default {
    name: "TradePageFollowerDisplay",
    components: {FollowerClosedPositions, FollowerOpenPositions},
    data() {
      return {
        followerTag: 'OpenPositions'
      }
    },
    computed: {
      followerCurrentDisplay() {
        return 'Follower' + this.followerTag;
      }
    }

  }
</script>

<style scoped>
  div {
    margin: 0;
  }

  .el-menu-item {
    height: 25px;
    line-height: 20px;
    font-size: 14px;
    padding: 3px 5px;
  }
</style>
