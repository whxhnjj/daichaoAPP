<template>
  <div class="wrapper">
    <swiper :options="swiperOption" class="swiper-container">
      <swiper-slide v-for="item of BannerImg" :key="item.index">
        <img class="swiper-img" :src="item.img" @click="turnBtn(item.url)" alt="">
      </swiper-slide>
      <div class="swiper-pagination" v-if="arrbanner.length !== 1" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeSwiper',
  data () {
    return {
      BannerImg: [],
      arrbanner: ''
    }
  },
  computed: {
    swiperOption () {
      return {
        observer: true,
        observeParents: true,
        autoplay: 2000,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true
      }
    }
  },
  methods: {
    getHomeInfo () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/banner', {
        appkey: this.$route.params.appkey
      })
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 200) {
        var arr = []
        for (let i in res.data) {
          let o = {}
          o[i] = res.data[i]
          arr.push(o)
        }
        this.arrbanner = arr
        if (this.arrbanner.length === 1) {
          this.swiperOption.autoplay = 0
          this.swiperOption.loop = false
        }
        this.BannerImg = res.data
      }
    },
    turnBtn (DataUrl) {
      if (DataUrl !== '') {
        window.location.href = 'micang://blank?url=' + encodeURIComponent(DataUrl)
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    width 100%
    height 3.5rem
    overflow hidden
    .swiper-img
      width 100%
      height 3.5rem
      img
        height 3.5rem
</style>
