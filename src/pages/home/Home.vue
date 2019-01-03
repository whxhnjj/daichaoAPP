<template>
  <div>
    <div class="wrapper" id="wra" ref="wrapper">
      <div class="conten">
        <div v-show="down" class="top-tip" style="text-align:center;">
          <span class="refresh-hook" style="line-height: .8rem;color: #AAA;">下拉刷新</span>
        </div>
      <HomeSwiper></HomeSwiper>
      <Bog></Bog>
      <HomeMail :main="main" :showtoast='showtoast' :loading="loading"></HomeMail>
      <div style="height: .6rem;"></div>
      <div v-show="showloading" class="bottom-tip" style="text-align:center;">
        <span class="loading-hook" style="line-height: .8rem;color: #AAA;">上拉加载更多产品...</span>
      </div>
      <div v-show="showtit" class="bottom-tip" style="text-align:center;">
        <span class="loading-hook" style="line-height: .8rem;color: #AAA;">已经全部加载完毕</span>
      </div>
    <!--<Navfooter></Navfooter>-->
      </div>
    </div>
      <div class="loading" v-show="loading">
        <img class="loading-img" src="~assets/images/loading.gif" alt="">
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import HomeSwiper from './components/swiper'
import Bog from './components/Bog'
import HomeMail from './components/main'
import Navfooter from '../Navfooter/Navfooter'
let page = 1
export default {
  inject: ['reload'],
  name: 'Home',
  components: {
    HomeSwiper,
    Bog,
    HomeMail,
    Navfooter
  },
  data () {
    return {
      main: [],
      showloading: true,
      showtit: false,
      loading: '',
      down: false,
      showtoast: '',
      up: true,
      pulldownTip: {
        text: '下拉刷新',
        rotate: ''
      }
    }
  },
  methods: {
    getMainInfo () {
      this.loading = true
      this.showtit = false
      this.showloading = false
      this.showtoast = false
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/index', {
        page: page++,
        size: 5,
        appkey: this.$route.params.appkey
      })
        .then(this.getMainInfoSucc)
    },
    getMainInfoSucc (res) {
      this.showloading = false
      this.loading = false
      res = res.data
      if (res.code === 200) {
        this.main.push(res.data.data)
        if (JSON.stringify(res.data) === '{}') {
          this.showtoast = true
          this.showtit = false
          this.showloading = false
          return
        }
        var lets = this.main.length - 1
        if (this.main[lets].length <= 5) {
          this.showtit = false
          this.showtoast = false
          this.showloading = false
        } else {
          this.showloading = true
        }
        this.$nextTick(() => {
          if (!this.scroll) {
          } else {
            this.scroll.refresh()
          }
        })
      }
    },
    openBottom () {
      this.$toast(this.msg)
    },
    BS () {
      if (!this.$refs.wrapper) {
        return
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX
      })
      this.scroll.on('scroll', pos => {
        this.scroll.hasVerticalScroll = true
        if (pos.y > 50) {
          this.pulldownTip.text = '放手刷新'
          this.down = true
        } else {
          this.down = false
        }
      })
      this.scroll.on('touchEnd', pos => {
        if (pos.y > 50) {
          this.down = false
          this.reload()
        }
        if (this.scroll.maxScrollY > pos.y + 10) {
          if (this.showloading === true) {
            var lets = this.main.length - 1
            if (this.main[lets].length < 5) {
              this.showtit = true
            } else {
              this.getMainInfo()
            }
          } else {
            this.showtit = true
          }
        }
      })
    }
  },
  mounted () {
    this.getMainInfo()
    setTimeout(() => {
      this.BS()
    }, 20)
  },
  watch: {
    data () {
      setTimeout(() => {
        this.BS()
      }, this.refreshDelay)
    }
  },
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 3
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  beforeDestroy () {
    page = 1
  },
  created () {}
}
</script>
<style scoped>
  .wrapper{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
  }
  .loading{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background-color: rgba(0,0,0,.1);
  }
  .loading-img{
    position: absolute;
    left: 50%;
    top: 50%;
    width: .8rem;
    height: .8rem;
    transform: translate(-50%, -50%);
  }
</style>
