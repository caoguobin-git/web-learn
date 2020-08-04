import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
const baseUrl = 'http://152.136.185.210:8000/api/z8';
//这种情况使用的是全局的变量
//const dataUrl = '/home/data';
//const poetryUrl = 'http://poetry.rainbase.cn/poetry/random';
//const jdUrl = 'http://localhost:8888/prod/键盘/1';
//
//Axios.defaults.baseURL = "http://152.136.185.210:8000/api/z8";
//Axios.defaults.timeout = 5000;
//Axios.defaults.headers.post['Content-Type'] = 'application/x-www.form-urlencoded';
////拼接query
//Axios({
//  method: 'get',
//  url: dataUrl + '?type=pop&page=1'
//}).then(data => {
//  console.log(data)
//})
//
////对象传递query
//Axios({
//  url: dataUrl,
//  params: {
//    type: 'pop',
//    page: 1
//  }
//}).then(res => {
//  console.log(res)
//})
//
//Axios.get(poetryUrl).then(data=>console.log(data))
//Axios.get(jdUrl).then(res=>{
//  console.log(res);
//})
////axios发送并发请求，对多个请求进行合并
//Axios.all([
//  Axios.get(poetryUrl),
//  Axios({
//    url:dataUrl,
//    params:{
//      type:'pop',
//      page:1
//    }
//  })
//]).then(results=>{
//  console.log(results)
//})
//
////axios发送并发请求，对多个请求进行合并
//Axios.all([
//  Axios.get(poetryUrl),
//  Axios({
//    url:dataUrl,
//    params:{
//      type:'pop',
//      page:1
//    }
//  })
//]).then(Axios.spread((res1,res2)=>{
//  console.log(res1);
//  console.log(res2)
//}))
//
//
////axios发送并发请求，对多个请求进行合并
//Axios.all([
//  Axios.get(poetryUrl),
//  Axios({
//    url:dataUrl,
//    params:{
//      type:'pop',
//      page:1
//    }
//  })
//]).then(res => {
//  console.log('hello',res)
//})

//创建实例使用Axios
//const homeAxios = Axios.create({
//  baseURL:'http://152.136.185.210:8000/api/z8',
//  timeout:5000
//})
//
//homeAxios({
//  url:'/home/data',
//  params:{
//    type:'pop',
//    page:1
//  }
//}).then(res=>{
//  console.log(res)
//})
//
//const poetryAxios = Axios.create({
//  baseURL:'http://poetry.rainbase.cn',
//  timeout:300
//})
//
//poetryAxios({
//  url:'/poetry/random'
//}).then(res=>{
//  console.log(res)
//})

////封装网络请求模块
//import {request} from "../network/request";
//
//request({
//  url:'/home/data',
//  params:{
//    type:'pop',
//    page:1
//  }
//},res=>{
//  console.log(res)
//},err=>{
//  console.log(err)
//})


////封装网络请求模块
//import {request} from "../network/request";
//
//request({
//  baseConfig: {
//    url: '/home/data',
//    params: {
//      type: 'pop',
//      page: 1
//    }
//  },
//  success(res) {
//    console.log(res);
//  },
//  failure(err) {
//    console.log(err);
//  }
//})

//利用Promise实现


//封装网络请求模块
import {request} from "../network/request";

request({
  url: '/home/data',
  params: {
    type: 'pop',
    page: 1
  }
}).then(res=>{
  console.log(res)
}).catch(err=>{
  console.log(err)
})

