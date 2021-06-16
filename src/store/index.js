import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    app_topsty:true,
    tokens:null,
  },
  getters:{
  },
  mutations: {
    app_top(state,data){
      if(data){
        state.app_topsty=true
      }else{
        state.app_topsty=false
      }
    },
    tokens_sty(state,data){
      state.tokens=data
    }
  },
  actions: {
  },
  modules: {
  }
})
