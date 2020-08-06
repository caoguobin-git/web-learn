<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>

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
  z-index: 9;
}
</style>
