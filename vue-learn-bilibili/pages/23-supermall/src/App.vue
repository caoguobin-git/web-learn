<template>
  <div id="app">
    <router-view/>

    <div  class="main-tab-bar" >
      <MainTabBar />
    </div>
  </div>
</template>

<script>

import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}
</script>

<style>
@import "assets/css/base.css";
.main-tab-bar{
  position: absolute;
  z-index: 999;
}
</style>
