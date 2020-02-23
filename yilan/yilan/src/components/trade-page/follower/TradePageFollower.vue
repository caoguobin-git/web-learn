<template>
<div>
  <router-link to="/trade/follower/open">跟随者开仓</router-link>
  <router-link to="/trade/follower/close">跟随者平仓</router-link>
  <router-view name="follower"></router-view>

  跟随者
</div>
</template>

<script>
    export default {
        name: "TradePageFollower"
    }
</script>

<style scoped>

</style>
