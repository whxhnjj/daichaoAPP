<template>
  <div class="main" style="padding-top: 1rem; ">
    <div class="herder">
      <div @click="modelisshow" ><i v-if="ishow" class="on">{{sumname}}</i><i v-else>{{sumname}}</i><img  v-if="ishow" src="~assets/images/icon-v.png" /><img v-else src="~assets/images/icon-v-i.png" /></div>
      <div @click="modemonshow"><i v-if="monshow" class="on">{{typename}}</i><i v-else>{{typename}}</i><img  v-if="monshow" src="~assets/images/icon-v.png"><img v-else src="~assets/images/icon-v-i.png" /></div>
    </div>
    <transition>
      <div class="min-show" v-if="ishow">
        <ul>
          <li v-for="(item, index) in list" :key="index" v-bind:class="{ active: index == sumIndex }" @click="sumclike(item,index)">{{item.name}}</li>
        </ul>
        <div class="bg-color" @click="modelisshow"></div>
      </div>
      <div class="min-show" v-if="monshow">
        <ul>
          <li v-for="(item, index) in mon" :key="index" v-bind:class="{ active: index == typeIndex }" @click="typeclike(item,index)">{{item.name}}</li>
        </ul>
        <div class="bg-color" @click="modemonshow"></div>
      </div>
    </transition>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <!-- <div class="newxin" v-if="down">
          <img src="~assets/images/loading.gif" />
        </div> -->
        <div v-show="down" class="top-tip" style="text-align:center;margin-bottom: .2rem;">
          <span class="refresh-hook" style="color: #AAA;">下拉刷新</span>
        </div>
        <div v-for="(items, index) of main" :key="index">
          <!-- 卡片开始 -->
          <div class="home-box" v-for="item of items" :key="item.id"   @click="ApplyBtn(item.urls)">
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
        <div v-show="showloading" class="bottom-tip" style="text-align:center;">
          <span class="loading-hook" style="color: #AAA;">上拉加载更多产品...</span>
        </div>
        <div v-show="showtit" class="bottom-tip" style="text-align:center;">
          <span class="loading-hook" style="color: #AAA;">已经全部加载完毕</span>
        </div>
      </div>
    </div>
    <div v-show="showtoast">
      <p class="notit"><img src="~assets/images/61542708710.jpg" alt=""></p>
    </div>
    <div v-show="loading" class="loading">
      <img class="loading-img" src="~assets/images/loading.gif" alt="">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
let page = 1
export default {
  inject: ['reload'],
  name: 'BorrowMain',
  data () {
    return {
      main: [],
      list: [],
      mon: [],
      msg: '',
      showtit: false,
      ishow: false,
      monshow: false,
      loading: false,
      sumIndex: 0,
      showtoast: false,
      typeIndex: 0,
      sumname: '金额不限',
      typename: '所有贷款类型',
      sum: '',
      type: '',
      showloading: true,
      down: false
    }
  },
  methods: {
    minlist () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getscreen', {
        appkey: this.$route.params.appkey
      })
        .then(this.minlistSucc)
    },
    minlistSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.list = res.data.screen
        this.mon = res.data.position_type[1].value
      }
    },
    modelisshow () {
      this.ishow = !this.ishow
      if (this.monshow === true) {
        this.monshow = false
      }
    },
    modemonshow () {
      this.monshow = !this.monshow
      if (this.ishow === true) {
        this.ishow = false
      }
    },
    sumclike (data, index) {
      this.loading = true
      this.sumIndex = index
      this.sum = data.screen_id
      this.sumname = data.name
      this.ishow = !this.ishow
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getList', {
        appkey: this.$route.params.appkey,
        choose: this.sum,
        position: this.type
      })
        .then(this.sumSucc)
    },
    sumSucc (res) {
      res = res.data
      this.loading = false
      if (res.code === 200) {
        this.main = [res.data.data]
        if (JSON.stringify(res.data) === '{}') {
          this.showtoast = true
          this.showtit = false
          this.showloading = false
          return
        }
        var lets = this.main.length - 1
        if (this.main[lets].length < 7) {
          this.showtit = false
          this.showloading = false
          this.showtoast = false
        } else {
          this.showloading = true
        }
      }
    },
    typeclike (data, index) {
      this.loading = true
      this.typeIndex = index
      this.typename = data.name
      this.type = data.position
      this.monshow = !this.monshow
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getList', {
        appkey: this.$route.params.appkey,
        choose: this.sum,
        position: this.type
      })
        .then(this.typeSucc)
    },
    typeSucc (res) {
      res = res.data
      this.loading = false
      if (res.code === 200) {
        this.main = [res.data.data]
        if (JSON.stringify(res.data) === '{}') {
          this.showtoast = true
          this.showtit = false
          this.showloading = false
          return
        }
        var lets = this.main.length - 1
        if (this.main[lets].length < 7) {
          this.showtit = false
          this.showloading = false
          this.showtoast = false
        } else {
          this.showloading = true
        }
      }
    },
    ApplyBtn (url) {
      window.location.href = 'micang://blank?url=' + encodeURIComponent(url)
    },
    getMainInfo () {
      this.loading = true
      this.showtit = false
      this.showloading = false
      this.showtoast = false
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getList', {
        page: page++,
        size: 7,
        appkey: this.$route.params.appkey
      })
        .then(this.getMainInfoSucc)
    },
    getMainInfoSucc (res) {
      res = res.data
      this.loading = false
      if (res.code === 200) {
        this.main.push(res.data.data)
        if (JSON.stringify(res.data) === '{}') {
          this.showtoast = true
          this.showtit = false
          this.showloading = false
          return
        }
        var lets = this.main.length - 1
        if (this.main[lets].length < 7) {
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
        scrollX: this.scrollX,
        scrollY: this.scrollY
      })
      this.scroll.on('scroll', pos => {
        this.scroll.hasVerticalScroll = true
        if (pos.y > 50) {
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
            var lets = this.main.length - 1
            if (this.main[lets].length < 7) {
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
    setTimeout(() => {
      this.BS()
    }, 20)
    this.showtit = true
    this.minlist()
    this.getMainInfo()
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
    scrollY: {
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
      default: true
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: true
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
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/styles/varibles.styl'
    .herder
      width 100%
      height .9rem
      background #FFFFFF
      position fixed
      top 0
      left 0
      z-index 100
      div
        width 50%
        height  .9rem
        line-height .9rem
        float left
        text-align center
        color #666666
        font-size .26rem
        .on
          color $color
        img
          width .21rem
          height .15rem
          margin-left .2rem
    .min-show
      width 100%
      height 100%
      position fixed
      top 0
      left 0
      background:rgba(0,0,0,0.2);
      z-index 99
      .bg-color
        width 100%
        height 100%
        position absolute
        z-index 100
        left 0
      ul
        padding .25rem 5%
        position fixed
        width 90%
        z-index 101
        top .9rem
        background #FFFFFF
        overflow hidden
        li
          width 30%
          height .6rem
          background #CCCCCC
          color #ffffff
          line-height .6rem
          float left
          margin-left 3%
          text-align center
          font-size .26rem
          margin-bottom .3rem
          border-radius .1rem
        .active
          background $background
    .wrapper
      width 100%
      height 100%
      position absolute
      overflow hidden
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
        position absolute
        left 50%
        top 50%
        width 3rem
        -webkit-transform translate(-50%,-50%)
        -moz-transform translate(-50%,-50%)
        transform translate(-50%, -50%)
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
  .v-enter, .v-leave-to
    opacity 0
  .v-enter-active, .v-leave-active
    transition opacity .2s
</style>
