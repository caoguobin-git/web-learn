<template>
  <div id="app">
    <h2>{{$store.getters.greaterAgesCount}}</h2>
    <h2>{{$store.state.counter}}</h2>
    <button @click="increment">+</button>
    <button @click="$store.commit('decrementCounter')">-</button>
    <p>{{$store.getters.greaterAges(21)}}</p>
    <hello-vuex />
  </div>
</template>

<script>
import HelloVuex from "./components/HelloVuex";
export default {
  name: 'App',
  data(){
    return {
      message:'我是APP组件'
    }
  },
  components:{
    HelloVuex
  },
  methods:{
    increment(){
      this.$store.commit('incrementCounter')
    }
  }
}
</script>

<style>

</style>
