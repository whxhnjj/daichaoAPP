<template>
  <div class="box">
    <div class="portrait">
      <img class="portrait-img" src="~assets/images/portrait.png" alt="">
      <!--<p class="account">{{phone}}</p>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  data () {
    return {
      phone: this.$store.state.phone
    }
  }
}
</script>

<style lang="stylus" scoped>
  .box
    width 100%
    height 3.92rem
    text-align center
    .portrait
      position relative
      left 50%
      top 50%
      transform translate(-50%, -50%)
      .portrait-img
        width 1.88rem
      .name
        height .5rem
        font-size .36rem
        font-weight 500
        color rgba(102,102,102,1)
        line-height .5rem
        margin .06rem 0
      .account
        color #666666
        font-size 0.36rem
        overflow hidden
</style>
