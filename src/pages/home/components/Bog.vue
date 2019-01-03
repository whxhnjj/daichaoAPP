<template>
  <div class="box">
    <div class="tip border-bottom" >
      <swiper :options="swiperOption" class="swiper-no-swiping">
        <swiper-slide v-for="(item, index) in text" :key="index">
          <div>{{item.name}}</div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Bog',
  data () {
    return {
      swiperOption: {
        autoplay: 2000,
        direction: 'vertical',
        height: window.innerHeight,
        loop: true
      },
      text: ''
    }
  },
  methods: {
    getMainInfo () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/winningData', {
        appkey: this.$route.params.appkey
      })
        .then(function (res) {
          res = res.data
          if (res.code === 200) {
            this.text = res.data
          }
        }.bind(this))
    }
  },
  mounted () {
    this.getMainInfo()
  }
}
</script>

<style lang="stylus" scoped>
  .box
    width 100%
    height 100%
    padding-top 3.5rem
    overflow hidden
    background #FFFFFF
    .tip
      width 100%
      height .6rem
      line-height .6rem
      text-align center
      font-size .24rem
      color #999999
      overflow hidden
      z-index 99
      position relative
</style>
