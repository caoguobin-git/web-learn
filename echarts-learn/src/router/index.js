import Vue from 'vue'
import VueRouter from "vue-router";


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:()=>import('../views/Home')
  },
  {
    path:'/profile',
    component:()=>import('../views/Profile')
  },
  {
    path:'/echarts',
    component:()=>import('../views/Echarts')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
