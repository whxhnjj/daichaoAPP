<template>
  <div class="main">
    <div class="title">
      <div @click="high">
        额度高
        <img class="icon" :src="IconUrl" alt="">
      </div>
      <div @click="long">
        期限长
        <img class="icon" :src="IconUrls" alt="">
      </div>
    </div>
    <div class="wrapper" ref="wrapper">
      <div class="conten">
        <div v-show="down" class="top-tip" style="text-align:center;">
          <span class="refresh-hook" style="line-height: .8rem;color: #AAA;">下拉刷新</span>
        </div>
        <div v-for="(items, index) of Main" :key="index">
          <!-- 卡片开始 -->
          <div class="home-box" v-for="item of items" :key="item.id" @click="ApplyBtn(item.urls)">
            <div class="home-container">
              <img :src="item.logo"  alt="" />
              <div class="home-list">
                <div class="top-list">
                  <h5>{{item.title}}</h5>
                  <!-- <div class="num-tit"><i>{{item.hit}}</i>已放款</div> -->
                </div>
                <div class="moneylist">
                  <div class="num-tit">周期{{item.during}}天</div>
                  <div class="moneyDiv">
                    <p class="money">￥{{item.limit}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="homefoot">
              <p style="margin-right:0.06rem" v-for="(d,i) in item.label" :key="i">{{d}}</p>
              <span class="already"><i>{{item.hit}}</i><span>人已放款</span></span>
            </div>
          </div>
          <!-- 卡片结束 -->
        </div>
        <div style="height: 1.1rem;"></div>
        <div v-show="showtitbox">
          <p class="notit"><img src="~assets/images/61542708710.jpg" alt=""></p>
        </div>
        <div v-show="showloading" class="bottom-tip" style="text-align:center;">
          <span class="loading-hook" style="line-height: .8rem;color: #AAA;">上拉加载更多产品...</span>
        </div>
        <div v-show="showtit" class="bottom-tip" style="text-align:center;">
          <span class="loading-hook" style="line-height: .8rem;color: #AAA;">已经全部加载完毕</span>
        </div>
      </div>
    </div>
    <div v-show="loading" class="loading">
      <img class="loading-img" src="~assets/images/loading.gif" alt="">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import proaicon from '../../assets/images/proa-icon.png'
import up from '../../assets/images/up.png'
import down from '../../assets/images/down.png'
let page = 1
export default {
  inject: ['reload'],
  name: 'rate1',
  data () {
    return {
      Main: [],
      older: '',
      showtit: false,
      loading: false,
      IconUrl: proaicon,
      IconUrls: proaicon,
      down: false,
      showloading: '',
      showtitbox: false
    }
  },
  methods: {
    ApplyBtn (urls) {
      window.location.href = 'micang://blank?url=' + encodeURIComponent(urls)
    },
    getMainInfo () {
      this.loading = true
      this.showtit = false
      this.showtitbox = false
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getList', {
        position: sessionStorage.getItem('position'),
        appkey: this.$route.params.appkey,
        size: 8,
        page: page++
      })
        .then(function (res) {
          res = res.data
          this.loading = false
          if (res.code === 200) {
            this.Main.push(res.data.data)
            if (JSON.stringify(res.data) === '{}') {
              this.showtitbox = true
              this.showtit = false
              this.showloading = false
              var mleng = this.Main.length - 2
              if (this.Main[mleng].length === 8) {
                this.showtitbox = false
                this.showtit = true
              }
              return
            }
            var lets = this.Main.length - 1
            if (this.Main[lets].length <= 8) {
              this.showtitbox = false
              this.showtit = false
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
            this.$nextTick(() => {
              if (!this.scroll) {
              } else {
                this.scroll.refresh()
              }
            })
          }
        }.bind(this))
    },
    high () {
      this.IconUrls = proaicon
      this.order = (this.order === '11' ? '12' : '11')
      if (this.order === '11') {
        this.IconUrl = up
      } else if (this.order === '12') {
        this.IconUrl = down
      } else {
        this.IconUrl = proaicon
      }
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getList', {
        position: 6,
        appkey: this.$route.params.appkey,
        order: this.order
      })
        .then(this.getMainInfoSucc)
    },
    long () {
      this.IconUrl = proaicon
      this.order = (this.order === '32' ? '31' : '32')
      if (this.order === '31') {
        this.IconUrls = down
      } else if (this.order === '32') {
        this.IconUrls = up
      } else {
        this.IconUrls = proaicon
      }
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getList', {
        position: 6,
        appkey: this.$route.params.appkey,
        order: this.order
      })
        .then(this.getMainInfoSucc)
    },
    getMainInfoSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.Main = [res.data.data]
      }
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
          // this.pulldownTip.text = '放手刷新'
          this.down = true
        } else {
          this.down = false
        }
      })
      this.scroll.on('touchEnd', pos => {
        if (pos.y > 50) {
          this.reload()
          this.down = false
        }
        if (this.scroll.maxScrollY > pos.y + 10) {
          if (this.showloading === true) {
            var lets = this.Main.length - 1
            if (this.Main[lets].length <= 8) {
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
    this.showtit = true
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
      default: true
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: true
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
  created () {
    // var self = this
    // window.onscroll = function () {
    //   var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    //   var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    //   var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    //   if (scrollTop + windowHeight === scrollHeight) {
    //     self.loading = true
    //     setTimeout(function () {
    //       self.loading = false
    //       self.getMainInfo()
    //     }, 1000)
    //   }
    //   if (scrollTop < -100) {
    //     window.location.reload()
    //   }
    // }
  },
  beforeDestroy () {
    page = 1
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/styles/varibles.styl'
  .title
    width 100%
    height .88rem
    margin-bottom .2rem
    background #FFFFFF
    .icon
      width: .15rem;
      margin-top: -.06rem;
    div
      width 50%
      height .88rem
      line-height .88rem
      text-align center
      font-size .26rem
      color #666666
      float left
  .wrapper
    width 100%
    height 100%
    position fixed
    overflow hidden
    left 0
    right 0
    .home-box
      margin 0 .25rem
      height 100%
      background #ffffff
      background-size .17rem .34rem
      padding .2rem .18rem .18rem .16rem
      overflow hidden
      box-shadow 0 0.04rem 0.2rem 0 rgba(198,198,198,0.18)
      border-radius 0.1rem
      margin-bottom 0.2rem
      .home-container
        display flex
        margin-bottom .14rem
        flex-direction row
        img
          height 1.1rem
          float left
          display block
          margin-right .22rem
          border-radius .2rem
        .home-list
          width 100%
          float left
        .top-list
          width 100%
          height .42rem
          margin-bottom .09rem
          margin-top .1rem
          h5
            width 50%
            color #333333
            font-size .32rem
            height .42rem
            line-height .42rem
            font-weight bold
            text-align left
            float left
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
        .moneylist
          display flex
          .num-tit
            width 34%
            height .42rem
            line-height .42rem
            font-size .28rem
            color #666
            display inline-block
          .moneyDiv
            width 66%
            color #FF9019
            font-size .4rem
            display inline-block
            margin-top -.26rem
            font-weight 700
            p
              text-align right
      .homefoot
        width 100%
        p
          display inline-block
          font-size .22rem
          color #666666
          background #EDEDED
          border-radius .08rem
          padding .06rem .1rem
        .already
          float right
          font-size .24rem
          margin-top .05rem
          i
            color #37A8FD
          span
            color #333
  .seize
    width 100%
    height 1.25rem
  .notit
    text-align center
    font-size .36rem
    margin-top 1rem
    img
      width 4rem
  .loading
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index 998
    background-color rgba(0,0,0,.1)
    .loading-img
      position absolute
      left 50%
      top 50%
      width .8rem
      height .8rem
      -webkit-transform translate(-50%,-50%)
      -moz-transform translate(-50%,-50%)
      transform translate(-50%, -50%)
</style>
