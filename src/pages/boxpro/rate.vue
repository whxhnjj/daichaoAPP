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
    <div v-for="(items, index) of Main" :key="index">
      <div class="home-box" v-for="(item, index) of items" :key="index">
        <div @click="ApplyBtn(item.urls)">
          <img class="borrow-logo" :src="item.logo" alt="">
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
import proaicon from '../../assets/images/proa-icon.png'
import up from '../../assets/images/up.png'
import down from '../../assets/images/down.png'
let page = 1
export default {
  name: 'rate',
  data () {
    return {
      Main: [],
      older: '',
      showtit: false,
      loading: false,
      IconUrl: proaicon,
      IconUrls: proaicon
    }
  },
  methods: {
    ApplyBtn (urls) {
      window.location.href = 'micang://blank?url=' + encodeURIComponent(urls)
    },
    getMainInfo () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getList', {
        position: 5,
        loanKey: this.$route.params.loanKey,
        page: page++
      })
        .then(function (res) {
          res = res.data
          if (res.code === 200) {
            this.Main.push(res.data.data)
          }
          if (JSON.stringify(res.data) === '{}') {
            this.$toast(res.msg)
          }
          if (JSON.stringify(res.data) !== '{}') {
            this.showtit = false
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
        position: 5,
        loanKey: this.$route.params.loanKey,
        order: this.order
      })
        .then(this.getMainInfoSucc)
    },
    long () {
      this.IconUrl = proaicon
      this.order = (this.order === '31' ? '32' : '31')
      if (this.order === '31') {
        this.IconUrls = down
      } else if (this.order === '32') {
        this.IconUrls = up
      } else {
        this.IconUrls = proaicon
      }
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getList', {
        position: 5,
        loanKey: this.$route.params.loanKey,
        order: this.order
      })
        .then(this.getMainInfoSucc)
    },
    getMainInfoSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.Main = [res.data.data]
      }
    }
  },
  mounted () {
    this.showtit = true
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
  .title
    width 100%
    height .88rem
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
  .home-box
    margin .25rem .25rem 0 .25rem
    height 100%
    background #ffffff url("~assets/images/flow-right.png") no-repeat 97% center
    background-size .17rem .34rem
    padding .3rem .5rem .3rem .2rem
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
      width 4.5rem;
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
          width 50%
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
</style>
