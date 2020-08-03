<template>
  <div id="app">
    <router-view/>
    <main-tab-bar/>
  </div>
</template>

<script>

import MainTabBar from "./components/tabbar/MainTabBar";

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    MainTabBar
  },
  methods: {
  }
}
</script>

<style>
@import "assets/css/base.css";

</style>
