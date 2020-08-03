//1.导入依赖
import Vue from "vue";
import Vuex from 'vuex'
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
    ]
  },
  mutations: {
    incrementCounter(state) {
      state.counter++;
    },
    decrementCounter(state) {
      state.counter--;
    }
  },
  actions: {},
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

