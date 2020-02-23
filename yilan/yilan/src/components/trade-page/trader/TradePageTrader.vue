<template>
<div>
  <router-link to="/trade/trader/open">交易员开仓</router-link>
  <router-link to="/trade/trader/close">交易员平仓</router-link>
  <router-view name="trader"></router-view>

  交易员
</div>
</template>

<script>
    export default {
        name: "TradePageTrader"
    }
</script>

<style scoped>

</style>
