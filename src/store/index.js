import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let defaultPhone = ''
let defaultToken = ''
let defaultappkey = ''
try {
  if (localStorage.phone) {
    defaultPhone = localStorage.phone
  }
} catch (e) {}
try {
  if (localStorage.token) {
    defaultToken = localStorage.token
  }
} catch (e) {}
try {
  if (localStorage.appkey) {
    defaultappkey = localStorage.appkey
  }
} catch (e) {}

export default new Vuex.Store({
  state: {
    phone: defaultPhone,
    token: defaultToken,
    appkey: defaultappkey
  },
  mutations: {
    changePhone (state, phone) {
      state.phone = phone
      try {
        localStorage.phone = phone
      } catch (e) {}
    },
    Token (state, token) {
      state.token = token
      try {
        localStorage.token = token
      } catch (e) {}
    },
    appkey (state, appkey) {
      state.appkey = appkey
      try {
        localStorage.appkey = appkey
      } catch (e) {}
    }
  }
})
