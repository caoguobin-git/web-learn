<template>
  <div id="app">
<!--    <router-view></router-view>-->
    <TradePage></TradePage>
  </div>
</template>

<script>
import TradePage from "./components/trade-page/TradePage";
export default {
  name: 'App',
  components: {TradePage},
  mounted(){
    console.log($)
  }
}
</script>

<style>
</style>
