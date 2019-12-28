<template>
  <div id="app">
    <img src="./assets/logo.png">
    <FxcmRegister></FxcmRegister>
  </div>
</template>

<script>

import FxcmRegister
  from "./components/fxcm-register";
export default {
  name: 'App',
  components: {
    FxcmRegister
  }
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

html, body {
  margin: 0px;
  padding: 0px;
  background: rgba(239, 239, 239, 1);
}
</style>
