<template>
  <div class="wrapper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item of BannerImg" :key="item.index">
        <img class="swiper-img" :src="item.img" @click="turnBtn(item.url)" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeSwiper',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 2000,
        autoplayDisableOnInteraction: false,
        loop: true
      },
      BannerImg: []
    }
  },
  methods: {
    getHomeInfo () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/banner', {
        loanKey: this.$route.params.loanKey
      })
        .then(this.getHomeInfoSucc)
        .catch(this.getHomeInfoErr)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 200) {
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
    overflow hidden
    width 100%
    height 0
    padding-bottom 40%
    .swiper-img
      width 100%
      height 100%
</style>
