<template>
  <div class="main">
    <div class="mix">
      <ul>
        <li v-for="(item, index) in home" :key="index" @click="clickproa(item.position)">
          <img :src="item.url" />
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="hot">
      <p>
        <span><img class="hot-img" src="~assets/images/hot.png" alt=""></span>
        <span class="hot-size">热门贷款显示</span>
      </p>
    </div>
    <div v-for="(items, index) of main" :key="index">
      <div class="home-box" v-for="item of items" :key="item.id"  @click="ApplyBtn(item.urls)">
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
    <transition>
      <div class="screen-show-model" v-if="ishow">
        <div class="screen-model">
          <div class="title">
            <div class="title-name">请选择<img @click="modelisshow" src="~assets/images/close.png" /></div>
          </div>
          <div class="screen-list">
            <div v-for="(item, index) in list" :key="index" :class="{active:item.isActive}" @click="activeis(item)" class="screen-button">{{item.text}}</div>
          </div>
          <button @click="screenBtn" class="screen-submit">确定</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import axios from 'axios'
let page = 1
export default {
  name: 'HomeMain',
  data () {
    return {
      list: [
        { text: '不限金额', isActive: true, id: '' },
        { text: '3000元以下', isActive: false, id: '3000' },
        { text: '3000—5000', isActive: false, id: '3000-5000' },
        { text: '5000—1万', isActive: false, id: '5000-10000' },
        { text: '1万—2万', isActive: false, id: '10000-20000' },
        { text: '2万-3万', isActive: false, id: '20000-30000' },
        { text: '3万以上', isActive: false, id: '30000' }
      ],
      home: [],
      main: [],
      ishow: '',
      showtit: false,
      msg: '',
      loanKey: '',
      loading: false,
      ExternalUrl: ''
    }
  },
  methods: {
    clickproa (position) {
      sessionStorage.setItem('position', position)
      // if (position === 3 || position === 4) {
      //   // this.$router.push('/proa/' + this.$route.params.loanKey)
      //   const { href } = this.$router.resolve({
      //     path: '/proa/' + this.$route.params.loanKey
      //   })
      //   let jUrl = this.GLOBAL.ajaxurl + 'appv1/' + href
      //   window.location.href = 'micang://blank?url=' + encodeURIComponent(jUrl)
      // } else {
      //   // this.$router.push('/rate/' + this.$route.params.loanKey)
      //   const { href } = this.$router.resolve({
      //     path: '/rate/' + this.$route.params.loanKey
      //   })
      //   let jUrl = this.GLOBAL.ajaxurl + 'appv1/' + href
      //   window.location.href = 'micang://blank?url=' + encodeURIComponent(jUrl)
      // }
      if (position === 3) {
        const { href } = this.$router.resolve({
          path: '/proa/' + this.$route.params.loanKey
        })
        let jUrl = this.GLOBAL.ajaxurl + 'appv1/' + href
        window.location.href = 'micang://blank?url=' + encodeURIComponent(jUrl)
      } else if (position === 4) {
        const { href } = this.$router.resolve({
          path: '/proa1/' + this.$route.params.loanKey
        })
        let jUrl = this.GLOBAL.ajaxurl + 'appv1/' + href
        window.location.href = 'micang://blank?url=' + encodeURIComponent(jUrl)
      } else if (position === 5) {
        const { href } = this.$router.resolve({
          path: '/rate/' + this.$route.params.loanKey
        })
        let jUrl = this.GLOBAL.ajaxurl + 'appv1/' + href
        window.location.href = 'micang://blank?url=' + encodeURIComponent(jUrl)
      } else if (position === 6) {
        const { href } = this.$router.resolve({
          path: '/rate1/' + this.$route.params.loanKey
        })
        let jUrl = this.GLOBAL.ajaxurl + 'appv1/' + href
        window.location.href = 'micang://blank?url=' + encodeURIComponent(jUrl)
      }
    },
    roulebog () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/getscreen', {
        loanKey: this.$route.params.loanKey
      })
        .then(this.minlistSucc)
    },
    minlistSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.home = res.data.position_type[0].value
      }
    },
    modelisshow () {
      this.ishow = !this.ishow
    },
    activeis (data) {
      this.list.forEach(function (obj) {
        obj.isActive = false
      })
      data.isActive = !data.isActive
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/index', {
        loanKey: this.$route.params.loanKey,
        choose: data.id
      })
        .then(this.activeisSucc)
    },
    activeisSucc (res) {
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
      this.ExternalUrl = encodeURIComponent(url)
      window.location.href = 'micang://blank?url=' + this.ExternalUrl
    },
    screenBtn () {
      this.ishow = !this.ishow
    },
    getMainInfo () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/index', {
        page: page++,
        size: 5,
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
    this.showtit = false
    this.getMainInfo()
    this.roulebog()
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
  .mix
    padding .24rem .42rem 0 .42rem
    background #ffffff
    height 100%
    overflow hidden
    ul
      width 100%
      display flex
      justify-content space-between
    ul li
      float left
      width 25%
    ul li img
      width 1rem
      height 1rem
      margin 0 auto
      display block
      overflow hidden
    ul li span
      color #333333
      font-size .24rem
      line-height .6rem
      display block
      text-align center
  .hot
    padding 0.3rem 0.4rem
    .hot-img
      width 0.3rem
    .hot-size
      font-size 0.3rem
      color rgba(51,51,51,1)
      vertical-align middle
      margin-left 0.1rem
      font-weight 800
    .hot-screen
      font-size .24rem;
      color #CCCCCC
      vertical-align: middle;
      font-weight 400;
      float right
    .hot-screen img
      width .26rem
      height .28rem
      margin-left .1rem
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
          height .28rem
          margin-left .1rem
  .hot-business
    width 85%
    height 2.75rem
    box-shadow:0 0.04rem 0.2rem 0 rgba(198,198,198,0.18);
    border-radius 0.18rem
    margin 0 auto
    padding 0.3rem
    margin-bottom 0.3rem
    background #ffffff
    .bus-logo
      width 0.8rem
      height 0.8rem
      margin-right 0.14rem
    .bus-name
      font-size 0.3rem
      color #333333
      font-weight 800
    .apply_btn
      float right;
      color #ffffff
      background linear-gradient(90deg,rgba(253,167,37,1) 4%,rgba(255,152,0,1) 100%)
      box-shadow 0px 0.02rem 0.06rem 0px rgba(202,87,5,0.26)
      border-radius .26rem;
      padding 0.1rem 0.2rem
      font-size 0.24rem
    .bus-time
      margin-top 0.26rem
      ul
        display inline-block
        li
          line-height 0.5rem
      .interval
        width 0.5px
        height 0.6rem
        background #BFBFBF
        margin 0 0.32rem
        display inline-block
      .border-bottom
        width 100%
        height 0.5px
        margin-top 0.16rem
        background #BFBFBF
      .quota
        width 2.5rem
        .quota-money
          color #3574FA
          font-size 0.32rem
          font-weight 800
          float left
          display block
          line-height .75rem
        .quota-size
          color #999999
          font-size 0.24rem
      .icon
        width 0.24rem
        margin-right 0.1rem
      .tit
        width 0.96rem
        display inline-block
        font-size 0.24rem
        margin-right 0.2rem
        color #999999
      .num
        font-size 0.28rem
        font-weight 800
        color #333333
    .notice
      padding: 0.25rem 0;
      font-size 0.24rem
      color #666666
      .notice-right
        float right
  .seize
    width 100%
    height 1rem
  .screen-show-model
    width 100%
    height 100%
    background #ffd62c
    position fixed
    top 0
    left 0
    z-index 100
    .screen-model
      width 100%
      background:rgba(255,255,255,1)
      border-radius .16rem
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      img
        width 100%
      .title
        width 5.56rem
        height  .42rem
        overflow  hidden
      .title-name
        color  #333333
        font-size  .3rem
        font-weight 400
        letter-spacing 1px
        height  .42rem
        line-height  .42rem
        text-align  center
      .title-name img
        float  right
        width  .32rem
        display  block
        height  .32rem
      .screen-list
        width 5.56rem
        margin  .38rem 0 .26rem 0
        display  flex
        display  -webkit-flex
        justify-content  space-between
        flex-wrap wrap
        .screen-button
          width  2.36rem
          height  .84rem
          border-radius .1rem
          border  .02rem solid #E5E9EA
          text-align  center
          line-height  .88rem
          font-size .3rem
          font-weight  400
          color  #666666
          margin-bottom  .3rem
        .active{
          background #E5E9EA
          color #666666
          font-size .3rem
          }
      .screen-submit
        width:5.56rem
        height .88rem
        background rgba(255,152,0,1)
        box-shadow 0px 4px 8px 0px rgba(202,87,5,0.3)
        border-radius  .1rem
        font-size  .36rem
        color  #FFFFFF
        font-weight 400
        line-height  .88rem
        text-align  center
  .v-enter, .v-leave-to
    opacity 0
  .v-enter-active, .v-leave-active
    transition opacity .2s
  .notit
    text-align center
    font-size .36rem
    margin-top 1rem
    img
      width 4rem
  .loading
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background-color: rgba(0,0,0,.1);
    img
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
</style>
