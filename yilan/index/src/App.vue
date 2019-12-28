<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/test" target="_blank">test</router-link>
    <router-link to="/hello">hahh</router-link>
    <TradePageMarket></TradePageMarket>
    <router-view/>
  </div>
</template>

<script>
import Test
  from "./components/Test";
import TradePageMarket
  from "../../trade-page/src/components/marketdata/TradePageMarket";
export default {
  name: 'App',
  components: {Test,TradePageMarket}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
