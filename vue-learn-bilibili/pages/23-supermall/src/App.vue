<template>
  <div id="app">
    <router-view/>

    <MainTabBar/>
  </div>
</template>

<script>

import TabBar from "components/common/tabbar/TabBar";
import MainTabBar from "./components/content/MainTabBar";
export default {
  name: 'App',
  components: {
    MainTabBar,
    TabBar
  }
}
</script>

<style>
@import "assets/css/base.css";

</style>
