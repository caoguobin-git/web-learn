<template>
  <div id="app">
    <img src="./assets/logo.png">
    <component :is="currentPage"></component>
    <div style="position: absolute;bottom: 0px;width: 100%">
      <span class="switch-tag"  @click="currentPage='HelloWorld'">主页</span>
      <span class="switch-tag" >内容</span>
      <span class="switch-tag" @click="currentPage='Mine'">我的</span>
    </div>
  </div>
</template>

<script>
import Mine from "./components/Mine";
import HelloWorld from "./components/HelloWorld";
export default {
  components:{
    Mine,HelloWorld
  },
  name: 'App',
  data(){
    return{
      currentPage:'Mine'
    }
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

.switch-tag{
  display: inline-block;
  width: 30%;
  border: 1px solid black;
}
</style>
