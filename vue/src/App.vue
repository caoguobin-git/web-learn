<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <Test/>
    <NavBar :numlist = 'numList'/>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld';
  import Test from './components/test/Test';
  import NavBar from "./components/navbar/NavBar";

  export default {
    name: 'App',
    data:function(){
      return {
        numList:[1,2,3]
      }
    },
    components: {
      HelloWorld, Test,NavBar
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
</style>
