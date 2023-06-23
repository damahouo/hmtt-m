import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'
Vue.use(Vuex)

const userTokenKye = 'token_Key'
export default new Vuex.Store({
  state: {
    // userToken: JSON.parse(localStorage.getItem(userTokenKye))
    userToken: getItem(userTokenKye)
  },
  mutations: {
    setuserToken(state, token) {
      // 将获取到的token存储到state仓库中
      state.userToken = token
      // 为了数据永久化，也将数据存入本地缓存中
      // localStorage.setItem(userTokenKye, JSON.stringify(token))
      setItem(userTokenKye, token)
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})
