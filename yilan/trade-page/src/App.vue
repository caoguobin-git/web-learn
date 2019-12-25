<template>
  <div id="main-container">
    <TradePageHeader></TradePageHeader>
    <router-link to="/test">Go to test</router-link>
    <router-link to="/hello">Go to hello</router-link>
    <PageFirst></PageFirst>
    <router-view/>
  </div>
</template>

<script>
import PageFirst from "./components/PageFirst";
import TradePageHeader from "./components/header/TradePageHeader";
export default {
  name: 'App',
  components: {TradePageHeader, PageFirst}
}
</script>

<style>
  html,body{
    margin: 0px;
    padding: 0px;
  }
#main-container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  background: rgba(0,255,255,0.1);
}
</style>
