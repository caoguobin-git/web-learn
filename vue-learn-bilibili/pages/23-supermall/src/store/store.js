//store.js配置文件
//1.导入依赖
import Vue from "vue";
import Vuex from 'vuex'
//2.安装插件
Vue.use(Vuex)

//3.创建对象
const store= new Vuex.Store({
  //保存状态
  state:{
    counter:1000
  },
  mutations:{
    //定义方法
    increment(){

    }

  },
  actions:{

  },
  getters:{

  },
  modules:{

  }

})

//4.导出对象
export default store;