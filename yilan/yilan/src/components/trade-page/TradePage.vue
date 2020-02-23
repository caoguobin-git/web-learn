<template>
  <div>
    111
    <TradePageTrader></TradePageTrader>
    <TradePageFollower></TradePageFollower>

  </div>
</template>

<script>
  import TradePageTrader from "./trader/TradePageTrader";
  import TradePageFollower from "./follower/TradePageFollower";

  export default {
    name: "TradePage",
    components: {TradePageFollower, TradePageTrader}
  }
</script>

<style scoped>

</style>
