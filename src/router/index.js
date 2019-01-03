import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home/:appkey',
      name: 'home',
      component: () => import('@/pages/home/Home'),
      meta: {
        title: '首页'
      }
    }, {
      path: '/borrow/:appkey',
      name: 'borrow',
      component: () => import('@/pages/borrow/Borrow'),
      meta: {
        title: '借钱'
      }
    }, {
      path: '/recommend/:appkey',
      name: 'recommend',
      component: () => import('@/pages/recommend/Recommend'),
      meta: {
        title: '推荐'
      }
    }, {
      path: '/my/:appkey',
      name: 'my',
      component: () => import('@/pages/my/My'),
      meta: {
        title: '我的'
      }
    }, {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about/About'),
      meta: {
        title: '关于我们'
      }
    }, {
      path: '/details',
      name: 'details',
      component: () => import('@/pages/details/Details'),
      meta: {
        title: '借款详情'
      }
    }, {
      path: '/help',
      name: 'help',
      component: () => import('@/pages/help/Help'),
      meta: {
        title: '帮助中心'
      }
    }, {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/contact/Contact'),
      meta: {
        title: '联系客服'
      }
    }, {
      path: '/Extension',
      name: 'Extension',
      component: () => import('@/pages/Extension/Extension'),
      meta: {
        title: '立即申请'
      }
    }, {
      path: '/proa/:appkey',
      name: 'proa',
      component: () => import('@/pages/boxpro/proa'),
      meta: {
        title: '最新口子'
      }
    }, {
      path: '/proa1/:appkey',
      name: 'proa1',
      component: () => import('@/pages/boxpro/proa1'),
      meta: {
        title: '快速小额贷款'
      }
    }, {
      path: '/rate/:appkey',
      name: 'rate',
      component: () => import('@/pages/boxpro/rate'),
      meta: {
        title: '大额秒批'
      }
    }, {
      path: '/rate1/:appkey',
      name: 'rate1',
      component: () => import('@/pages/boxpro/rate1'),
      meta: {
        title: '一定下款'
      }
    }, {
      path: '/ewm',
      name: 'ewmindex',
      component: () => import('@/pages/ewm/index'),
      meta: {
        title: '关注',
        allowBack: false
      }
    }, {
      path: '/error',
      component: () => import('@/pages/error/error'),
      meta: {
        title: '404'
      }
    }, {
      path: '*',
      redirect: '/error'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
