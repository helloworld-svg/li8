import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/reset.css'
Vue.config.productionTip = false

import server from '../axios_box/index'
Vue.prototype.$https = server

import element from '../element ui/node_modules/element-ui'
import '../element ui/node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(element)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
