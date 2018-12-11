<template>
  <div class="error">
    <img src="~assets/images/404.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'error'
}
</script>

<style lang="stylus" scoped>
  .error
    img
      width 100%
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
</style>
