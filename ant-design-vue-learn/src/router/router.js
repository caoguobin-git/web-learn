import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Buttons = () => import('views/Buttons')
const Icons = () => import('views/Icons')

const routes = [
  {
    path: '/',
    redirect: '/buttons'
  },
  {
    path: '/buttons',
    name: 'Buttons',
    component: Buttons
  },
  {
    path: '/icons',
    name: 'Icons',
    component: Icons
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
