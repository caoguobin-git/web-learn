//1.导入依赖
import Vue from "vue";
import Vuex from 'vuex'
import {INCREMENT} from "./mutation-types";
//2.安装插件
Vue.use(Vuex)

//3.创建对象
const store = new Vuex.Store({
  //保存状态
  state: {
    counter: 3,
    students: [
      {id: 110, name: 'why', age: 18},
      {id: 111, name: 'kobe', age: 21},
      {id: 112, name: 'likei', age: 20},
    ],
    info:{
      name:'kobe',
      age:40,
      height:1.88
    }
  },
  mutations: {
    [INCREMENT](state,val){
      state.info.name=val;
    },
    incrementCounter(state, payload) {
      console.log(payload)
      state.counter += payload.val;
    },
    decrementCounter(state) {
      state.counter--;
    },
    insertStudent(state,stu){
      state.students.push(stu)
    },
    updateInfo(state,info){
      state.info.name='Jordan'
      // //添加新的根属性
      // Vue.set(state,'infoTest',{text:'hello world'})
      // //删除原有属性
      // Vue.delete(state.info,name)
      // //修改原有根属性
      // state.info={time:'123123',name:'hello world'}
    }
  },
  actions: {
    //action中没有state，有默认的上下文context
    aUpdateInfo(context,payload){
      // console.log(payload.message)
      // setTimeout(()=>{
      //   context.commit('updateInfo');
      //   payload.success()
      // },1000)

      console.log(payload.message);
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          context.commit('updateInfo',payload.message);
          resolve('执行完毕了');
        },1000)
      })
    }
  },
  getters: {
    greaterAgesCount: (state, getters) => {
      return getters.greaterAges.length
    },
    greaterAges: (state) => age => state.students.filter(s => s.age >= age)

  },
  modules: {}

})

//4.导出对象
export default store;



//分离式写法
const moduleA={
  state:{},
  mutations:{},
  getters:{
    fullname(state){
      return state.name + '111';
    },
    fullname2(state,getters){
      return getters.fullname+'222';
    },
    //可以利用第三个参数传递rootState
    fullname3(state,getters,rootState){
      return getters.fullname2+rootState.counter;
    }
  },
  actions:{
    //这个context只是当前的上下文，只能修改调用muduleA中的mutations
    aUpdateName(context)  {
      context.commit('updateName','name11')
    }
  }
}

const moduleB={
  state:{},
  mutations:{},
  actions:{},
  getters:{}
}

const store = new Vuex.Store({
  modules:{
    a:moduleA,
    b:moduleB
  }
})
