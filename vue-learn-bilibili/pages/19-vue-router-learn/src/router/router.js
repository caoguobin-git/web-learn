//配置路由相关的信息
import VueRouter from "vue-router";
import Vue from 'vue'

//1.通过Vue.use(插件)，使用插件
Vue.use(VueRouter);

const Home = () => import('../components/Home')
const About = () => import('../components/About')
const User = () => import('../components/User')
const HomeNews = () => import('../components/HomeNews')
const HomeMessage = () => import('../components/HomeMessage')
const Profile = () => import('../components/Profile');

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        redirect: 'news'
      },
      {
        //子路由不需要加/
        path: 'news',
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      }
    ]
  },
  {
    path: '/about',
    component: About
  },
  //动态路由，可以匹配/user/*
  //使用params传递参数
  {
    path: '/user/:userId',
    component: User
  },
  //使用query的方式传递参数
  {
    path: '/profile',
    component: Profile,
  }
]

export default new VueRouter({
  //配置路由和组件之间的引用关系
  mode: 'history',
  routes,
  linkActiveClass: 'hello'
})

