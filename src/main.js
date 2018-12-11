// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueWechatTitle from 'vue-wechat-title'
import store from './store'
import global from './store/global'
import Toast from 'vue2-toast'
import 'assets/styles/reset.css'
import 'assets/styles/border.css'
import 'swiper/dist/css/swiper.css'
import 'vue2-toast/lib/toast.css'

Vue.config.productionTip = false
Vue.use(VueWechatTitle)
Vue.use(Toast, {
  type: 'bottom',
  duration: 2500,
  wordWrap: true,
  width: 'auto'
})
Vue.prototype.GLOBAL = global
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
