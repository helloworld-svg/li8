import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'
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
router.beforeEach((to,from,next)=>{
    if(to.fullPath=='/'){
      store.commit('app_top',1)
    }
    if(to.fullPath=='/regi'){
      store.commit('app_top',0)
    }
    if(to.fullPath=='/rach'){
      store.commit('app_top',0)
    }
    next()
})
export default router
