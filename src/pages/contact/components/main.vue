<template>
<div>
  <div class="service">
    <div class="service-mor">
      <img class="kf-logo" src="~assets/images/kf-logo.png" />
    </div>
    <span class="service-info">您的专属客服 </span>
    <span class="service-wechat">微信号：202022020020 </span>
    <img class="cord" src="~assets/images/cord.jpg" />
  </div>
</div>
</template>
<script>
export default {
  name: 'ContactMain'
}
</script>
<style lang="stylus" scoped>
  .service
    width 90%
    height 7.62rem
    border-radius .24rem
    background #FFFFFF
    margin 1.48rem 5% 0 5%
    .service-mor
      width 1.56rem
      height 1.56rem
      background #FFFFFF
      border-radius 50%
      position absolute
      left 50%
      margin-left -0.78rem
      margin-top -0.76rem
      .kf-logo
        width 1.31rem
        height 1.31rem
        border-radius 100%
        margin 0.12rem
    .service-info
      display block
      text-align center
      color #666666
      width 100%
      float left
      height .5rem
      font-size .36rem
      margin-top 1.14rem
      font-weight 400
      line-height .5rem
      overflow hidden
    .service-wechat
      display block
      text-align center
      color #9C9C9C
      width 100%
      float left
      height .42rem
      font-size .30rem
      margin .16rem 0 .48rem 0
      font-weight 400
      line-height .42rem
    .cord
      width 4.32rem
      height 4.22rem
      display block
      margin 0 auto
      overflow hidden
</style>
