import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'home',
    component:()=>import('views/home/Home')
  },
  {
    path:'/category',
    name:'category',
    component:()=>import('views/category/Category')
  },
  {
    path:'/cart',
    name:'cart',
    component:()=>import('views/cart/Cart')
  },
  {
    path:'/profile',
    name:'profile',
    component:()=>import('views/profile/Profile')
  },
  {
    path:'/detail',
    name:'detail',
    component:()=>import('views/detail/Detail')

  }
]


const router = new VueRouter({
  mode:'history',
  routes
})

router.beforeEach((to, from, next) => {
  //let instance = to.matched[0].instances;
  //console.log(instance)
  //document.title='hello world'
  next()
})

router.afterEach((to,from)=>{
  //console.log(to.matched[0].instances)
})



export default router;
