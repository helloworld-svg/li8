import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null,
  },
  getters:{
  },
  mutations: {
    token_it(state,data){
      state.token=data
    }
  },
  actions: {
  },
  modules: {
  }
})
