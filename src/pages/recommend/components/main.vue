<template>
  <div>
    <div class="box" v-for="(items, index) of RecommendMain" :key="index">
      <div class="list" @click="ApplyBtn(item.id)" v-for="(item, index) of items" :key="index">
        <div class="list-left">
          <img class="img" :src="item.logo" alt="" />
          <span class="name">{{item.title}}</span>
        </div>
        <div class="list-right border-left">
          <div class="num border-bottom">{{item.limit}}元</div>
          <span class="num-left">贷款周期<i>{{item.during}}天</i></span>
          <span class="num-right">日费率<i>{{item.rate}}%</i></span>
        </div>
      </div>
    </div>
    <div v-show="showtit">
      <p class="notit"><img src="~assets/images/61542708710.jpg" alt=""></p>
    </div>
    <div v-show="loading" class="loading">
      <img src="~assets/images/loading.gif" alt="">
    </div>
    <div class="seize"></div>
  </div>
</template>

<script>
import axios from 'axios'
let page = 1
export default {
  name: 'RecommendMain',
  data () {
    return {
      RecommendMain: [],
      msg: '',
      showtit: false,
      loading: false
    }
  },
  methods: {
    ApplyBtn (id) {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/hit', {
        appkey: this.$route.params.appkey,
        product_id: id,
        client: 'wechat',
        openid: sessionStorage.getItem('openid')
      })
        .then(this.ApplyBtnSucc)
    },
    ApplyBtnSucc (res) {
      res = res.data
      window.location.href = res.data
    },
    getRecommendInfo () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/product/recomend', {
        page: page++,
        size: 10,
        appkey: this.$route.params.appkey
      })
        .then(this.getRecommendInfoSucc)
    },
    getRecommendInfoSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.RecommendMain.push(res.data.data)
      }
      if (JSON.stringify(res.data) === '{}') {
        this.msg = res.msg
        this.openBottom()
      }
    },
    openBottom () {
      this.$toast(this.msg)
    }
  },
  mounted () {
    this.getRecommendInfo()
  },
  created () {
    let self = this
    window.onscroll = function () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if (scrollTop + windowHeight === scrollHeight) {
        self.loading = true
        setTimeout(function () {
          self.loading = false
          self.getRecommendInfo()
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
  .box
    width 100%
    .list
      width 90%
      height 1.6rem
      background #FFFFFF
      margin .25rem 5% 0 5%
      box-shadow 0 .04rem .2rem 0 rgba(198,198,198,0.18)
      border-radius .08rem
      .list-left
        width 20%
        height 1.6rem
        float left
        .img
          width .6rem
          height .6rem
          display block
          margin .3rem auto 0
        .name
          text-align center
          line-height .44rem
          font-size .24rem
          display block
          color #333333
      .list-right
        width 79%
        float right
        .num
          text-align center
          line-height .8rem
          color #FF6800
          font-size .32rem
        .num-left
          display block
          float left
          width 50%
          text-align center
          line-height .76rem
          font-size .24rem
          color #999999
        .num-left i
          color #424242
          margin-left .1rem
        .num-right
          display block
          float right
          width 50%
          text-align center
          line-height .76rem
          font-size .24rem
          color #999999
        .num-right i
          color #424242
          margin-left .1rem
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
