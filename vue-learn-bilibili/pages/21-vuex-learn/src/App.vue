<template>
  <div id="app">
    <h2>{{$store.getters.greaterAgesCount}}</h2>
    <h2>{{$store.state.counter}}</h2>
    <button @click="addCount(1)">+</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(10)">+10</button>
    <button @click="addStudent">添加学生</button>
    <button @click="$store.commit('decrementCounter')">-</button>
    <p>{{$store.getters.greaterAges(age)}}</p>
    <hello-vuex />
  </div>
</template>

<script>
import HelloVuex from "./components/HelloVuex";
export default {
  name: 'App',
  data(){
    return {
      message:'我是APP组件',
      age:12
    }
  },
  components:{
    HelloVuex
  },
  methods:{
    increment(){
      this.$store.commit('incrementCounter',1)
    },
    addCount(val) {
      //普通的提交风格
      //this.$store.commit('incrementCounter', val)
      //特殊的提交风格
      this.$store.commit({
        type:'incrementCounter',
        val:val
      })

    },
    addStudent(){
      let student={
        id:115,
        name:'hello',
        age:32
      }
      this.$store.commit('insertStudent',student);
    }
  }
}
</script>

<style>

</style>
