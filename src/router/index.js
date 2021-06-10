import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/regi',
    name: 'regi',
    component: () => import('../views/regi/regi.vue')
  },
  {
    path: '/rach',
    name: 'rach',
    component: () => import('../views/rach/Rach.vue')
  },
  
  
]

const router = new VueRouter({
  routes
})

export default router
