import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let defaultPhone = ''
let defaultToken = ''
let defaultLoanKey = ''
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
  if (localStorage.loankey) {
    defaultLoanKey = localStorage.loankey
  }
} catch (e) {}

export default new Vuex.Store({
  state: {
    phone: defaultPhone,
    token: defaultToken,
    loanKey: defaultLoanKey
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
    LoanKey (state, loankey) {
      state.loankey = loankey
      try {
        localStorage.loankey = loankey
      } catch (e) {}
    }
  }
})
