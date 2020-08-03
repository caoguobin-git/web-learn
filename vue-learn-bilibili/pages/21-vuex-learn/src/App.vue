<template>
  <div id="app">
    <h2>{{$store.getters.greaterAgesCount}}</h2>
    <h2>{{$store.state.counter}}</h2>
    <button @click="updateInfo">修改信息</button>
    <button @click="addCount(1)">+</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(10)">+10</button>
    <button @click="addStudent">添加学生</button>
    <button @click="$store.commit('decrementCounter')">-</button>
    <p>{{$store.getters.greaterAges(age)}}</p>

    <div>{{$store.state.info}}</div>
    <hello-vuex />
  </div>
</template>

<script>
import HelloVuex from "./components/HelloVuex";
import {INCREMENT} from "./store/mutation-types";

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
      this.$store.commit(INCREMENT,1)
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
    },
    updateInfo(){
      this.$store.dispatch('aUpdateInfo',{
        message:'我是参数'
      }).then((data)=>{
        console.log('执行成功了',data)
      })
    }
  }
}

//modules 的设置
// const moduleA={
//   state:{},
//   mutations:{},
//   actions:{},
//   getters:{}
// }
//
// const moduleB={
//   state:{},
//   mutations:{},
//   actions:{},
//   getters:{}
// }
//
// const store = new Vuex.Store({
//   modules:{
//     a:moduleA,
//     b:moduleB
//   }
// })
// store.state.a //moduleA的状态
// store.state.b //moduleB的状态

</script>

<style>

</style>
