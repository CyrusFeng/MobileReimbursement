import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    UA:-1, //是否企业微信
    userId:''
  },
  getters:{
    userId(state){
      if(state.userId===-1){
        state.userId = sessionStorage.getItem('userId')
      }
      return state.userId
    },
  },
  mutations: {
    setUA(state, param) {
      state.UA = param
    },
    setUserId(state, param) {
      state.userId = param
      sessionStorage.setItem('userId',param);
    },
  }
})

export default store