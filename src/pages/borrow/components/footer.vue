<template>
  <div class="footer">
    <router-link to="/">
      <div class="footer-btn">
        <dl>
          <dt><img src="~assets/images/home.png" alt=""></dt>
          <dd>首页</dd>
        </dl>
      </div>
    </router-link>
    <router-link to="/borrow">
      <div class="footer-btn">
        <dl>
          <dt><img src="~assets/images/borrow-gl.png" alt=""></dt>
          <dd class="size-color">借钱</dd>
        </dl>
      </div>
    </router-link>
    <router-link to="/recommend">
      <div class="footer-btn">
        <dl>
          <dt><img src="~assets/images/recommend.png" alt=""></dt>
          <dd>推荐</dd>
        </dl>
      </div>
    </router-link>
    <router-link to="/my">
      <div class="footer-btn">
        <dl>
          <dt><img src="~assets/images/my.png" alt=""></dt>
          <dd>我的</dd>
        </dl>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BorrowFooter'
}
</script>

<style lang="stylus" scoped>
  .footer
    position fixed
    bottom 0
    width 100%
    height 0.98rem
    font-size 0
    box-shadow 0 0.04rem 0.2rem 0 rgba(198,198,198,0.18)
    .footer-btn
      display inline-block
      width 25%
      height 100%
      background #FFFFFF
      font-size 0.22rem
      text-align center
      color #666666
      .size-color
        color #FFA219
      dl
        display table
        margin 0 auto
        line-height 0.5rem
        img
          width 0.44rem
          margin-top 0.1rem
</style>
