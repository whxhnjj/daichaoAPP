<template>
  <div class="main">
    <div class="herder">
      <div @click="modelisshow" ><i v-if="ishow" class="on">金额不限</i><i v-else>金额不限</i><img  v-if="ishow" src="~assets/images/icon-v.png" /><img v-else src="~assets/images/icon-v-i.png" /></div>
      <div @click="modemonshow"><i v-if="monshow" class="on">所有贷款类型</i><i v-else>所有贷款类型</i><img  v-if="monshow" src="~assets/images/icon-v.png"><img v-else src="~assets/images/icon-v-i.png" /></div>
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
    <div v-for="(items, index) of main" :key="index">
      <div class="home-box" v-for="(item, index) of items" :key="index" @click="ApplyBtn(item.urls)">
          <img :src="item.logo"  alt="" />
          <div class="home-list">
            <div class="top-list">
              <h5>{{item.title}}</h5>
              <div class="num-tit"><i>{{item.hit}}</i>已放款</div>
            </div>
            <div class="top-line">
              <span class="tit">额度范围（元）</span>
              <span class="num">{{item.loan_limit}}</span>
            </div>
            <div class="center-line">
              <span class="tit">贷款周期（天）</span>
              <span class="num">{{item.loan_during}}</span>
            </div>
            <div class="right-line">
              <span class="tit">参考利率</span>
              <span class="num">{{item.loan_rate}}%</span>
            </div>
          </div>
      </div>
    </div>
    <div v-show="showtit">
      <p class="notit"><img src="~assets/images/61542708710.jpg" alt=""></p>
    </div>
    <div v-show="loading" class="loading">
      <img src="~assets/images/loading.gif" alt="">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
let page = 1
export default {
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
      typeIndex: 0,
      sum: '',
      type: ''
    }
  },
  methods: {
    minlist () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getscreen', {
        loanKey: this.$route.params.loanKey
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
      this.sumIndex = index
      this.sum = data.screen_id
      this.ishow = !this.ishow
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getList', {
        loanKey: this.$route.params.loanKey,
        choose: this.sum,
        position: this.type
      })
        .then(this.sumSucc)
    },
    sumSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.main = [res.data.data]
        this.showtit = false
      }
      if (JSON.stringify(res.data) === '{}') {
        this.showtit = true
      }
    },
    typeclike (data, index) {
      this.typeIndex = index
      this.type = data.position
      this.monshow = !this.monshow
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getList', {
        loanKey: this.$route.params.loanKey,
        choose: this.sum,
        position: this.type
      })
        .then(this.typeSucc)
    },
    typeSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.main = [res.data.data]
        this.showtit = false
      }
      if (JSON.stringify(res.data) === '{}') {
        this.showtit = true
      }
    },
    ApplyBtn (url) {
      window.location.href = 'micang://blank?url=' + encodeURIComponent(url)
    },
    getMainInfo () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getList', {
        page: page++,
        loanKey: this.$route.params.loanKey
      })
        .then(this.getMainInfoSucc)
    },
    getMainInfoSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.main.push(res.data.data)
      }
      if (JSON.stringify(res.data) === '{}') {
        this.msg = res.msg
        this.openBottom()
      }
      if (JSON.stringify(res.data) !== '{}') {
        this.showtit = false
      }
    },
    openBottom () {
      this.$toast(this.msg)
    }
  },
  mounted () {
    this.showtit = true
    this.minlist()
    this.getMainInfo()
  },
  created () {
    var self = this
    window.onscroll = function () {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if (scrollTop + windowHeight === scrollHeight) {
        self.loading = true
        setTimeout(function () {
          self.loading = false
          self.getMainInfo()
        }, 1000)
      }
      if (scrollTop < -100) {
        window.location.reload()
      }
    }
  },
  beforeDestroy () {
    page = 1
  }
}
</script>

<style lang="stylus" scoped>
  .main
    margin-top 1.3rem
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
          color #FD9D11
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
          background #FD9D11
    .home-box
      margin 0 .25rem;
      height 100%
      background #ffffff url("~assets/images/flow-right.png") no-repeat 96% center
      background-size .17rem .34rem
      padding .3rem .4rem .3rem .2rem
      overflow hidden
      box-shadow:0 0.04rem 0.2rem 0 rgba(198,198,198,0.18);
      border-radius 0.18rem
      margin-bottom 0.3rem
      img
        width 1.4rem
        height 1.4rem
        float left
        display block
        margin-right .1rem
      .home-list
        width 4.6rem;
        float left
        .top-list
          width 100%;
          height .42rem;
          margin-bottom .2rem;
          h5
            width 2.1rem
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
          .num-tit
            height .42rem;
            line-height .42rem
            font-size .24rem
            color #999999
            float right
            text-align right
            i
              color #FF6800
        .top-line
          width 100%
          height .36rem
          margin-bottom .1rem
          .tit
            font-size .24rem
            color #999999
            line-height .36rem
          .num
            color #FF6800
            font-size .26rem
            line-height .36rem
        .center-line
          width 55%
          height .36rem
          float left
          overflow hidden
          .tit
            font-size .24rem
            color #999999
            line-height .36rem
          .num
            color #333333
            font-size .28rem
            line-height .36rem
        .right-line
          width 45%
          height .34rem
          display block
          float right
          text-align right
          .tit
            font-size .24rem
            color #999999
            line-height .34rem
          .num
            color #333333
            font-size .26rem
            line-height .34rem
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
      img
        position absolute
        left 50%
        top 50%
        transform translate(-50%, -50%)
  .v-enter, .v-leave-to
    opacity 0
  .v-enter-active, .v-leave-active
    transition opacity .2s
</style>
