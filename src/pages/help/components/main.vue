<template>
<div>
    <div class="main">
      <div class="box" v-for="(item, index) of main" :key="index">
          <div class="help-title">
            <img src="~assets/images/help-01.png" />{{item.category.name}}
          </div>
          <div @click="toggle(index)" :key="index" class="help-info"><span>Q：{{item.title}}</span>
            <img v-if="index==show" src="~assets/images/icon-bottom.png">
            <img v-else src="~assets/images/icon-top.png">
          </div>
          <transition>
            <div v-show="index==show" class="help-info-content" v-html="item.content.content"></div>
          </transition>
      </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelpMain',
  data () {
    return {
      main: [],
      show: -1
    }
  },
  methods: {
    getMianIofo () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/help/list', {
        appkey: this.$route.params.appkey
      })
        .then(this.getMianIofoSucc)
    },
    getMianIofoSucc (res) {
      res = res.data
      this.main = res.data
    },
    toggle (index) {
      if (index === this.show) {
        this.show = -1
      } else {
        this.show = index
      }
    }
  },
  mounted () {
    this.getMianIofo()
  }
}
</script>

<style lang="stylus" scoped>
  .box
    margin-top .22rem
    .help-title
      background #FFFFFF
      padding .3rem 4% .3rem 4%
      font-size .3rem
      width 92%
      color #FD9D11
      height .42rem
      line-height .42rem
      font-weight 500
    .help-title img
      width .48rem
      height .36rem
      margin-right .14rem
    .help-info
      padding 0 4%
      width 92%
      line-height 0.88rem
      height .88rem
      background rgba(255,255,255,1)
      border-bottom 0.01rem solid rgba(205,205,205,0.5)
    .help-info span
      display block
      float left
      color #333333
      font-size .3rem;
    .help-info img
      width .24rem
      overflow hidden
      height .2rem
      margin .3rem .3rem 0.1rem
      font-size .24rem
      color #999999
      float right
      margin-left .1rem
    .help-info-content
      padding .26rem 4% .26rem 4%
      background #F3F3F3
      font-size .26rem
      line-height .36rem
      color #666666
  .v-enter, .v-leave-to
    opacity 0
  .v-enter-active, .v-leave-active
    transition opacity .3s
</style>
