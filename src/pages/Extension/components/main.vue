<template>
  <div>
    <div class="bg-image">
      <img class="banner" src="~assets/images/p-banner.png" />
      <a class="button" href="#">立即体验</a>
      <span>不查证信息，身份证即可申请，3分钟放款！</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main'
}
</script>

<style lang="stylus" scoped>
  .bg-image
    width 100%
    height 100%
    background #FF9601 url("~assets/images/p-bg.png") no-repeat center
    background-size 100%
    position fixed
    left 0
    top 0
    .banner
      width 5.6rem
      height 7.28rem
      position absolute
      left 50%
      margin-left -2.8rem
      top 1.84rem
    .button
      width 3.4rem
      height 1rem
      background url("~assets/images/button.png") no-repeat center
      background-size 100%
      text-align center
      line-height 1rem
      display block
      font-size.56rem
      color #FFF
      text-decoration none
      position absolute
      left 50%
      margin-left -1.7rem
      top 10rem
    span
      width 100%
      text-align center
      display block
      position absolute
      top 11.4rem
      font-size .3rem
      line-height .4rem
      color #FFFFFF
</style>
