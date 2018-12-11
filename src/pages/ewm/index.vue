<template>
  <div class="box">
    <div class="screen-model">
      <img src="https://lm.app.tongyufintech.com/bjtyewm.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ewmindex',
  methods: {
    loading () {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
    }
  },
  mounted () {
    this.loading()
  }
}
</script>

<style lang="stylus" scoped>
  .box
    width 100%
    height 100%
    background #ffd62c
    position absolute
    .screen-model
      width 100%
      background #ffd62c
      border-radius .16rem
      overflow hidden
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      img
        width 100%
</style>
