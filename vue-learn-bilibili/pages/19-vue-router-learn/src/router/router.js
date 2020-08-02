//配置路由相关的信息
import VueRouter
  from "vue-router";
import Vue
  from 'vue'

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
    meta: {
      title: '首页'
    },
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
    component: About,
    meta: {
      title: '关于'
    }
  },
  //动态路由，可以匹配/user/*
  //使用params传递参数
  {
    path: '/user/:userId',
    component: User,
    meta: {
      title: '用户'
    }
  },
  //使用query的方式传递参数
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '档案'
    }
  }
]

const router = new VueRouter({
  //配置路由和组件之间的引用关系
  mode: 'history',
  routes,
  linkActiveClass: 'hello'
})

//添加全局导航守卫
router.beforeEach((to, from, next) => {
  //从from跳转到to
  //只取第一级组件的名称
  document.title = to.matched[0].meta.title;
  console.log('前置守卫')
  //放行请求，类似filter放行
  next()
})

router.afterEach((to,from)=>{
  //to：跳转完成后的路由
  console.log('后置守卫')
  //from：跳转之前的路由
})

export default router;
