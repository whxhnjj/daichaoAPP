<template>
  <div>
    <div class="tabfooter">
      <router-link :to="'/home/'+appkey" class="link" exact>
        <div class="tab home">首页</div>
      </router-link>
      <router-link :to="'/borrow/'+appkey" class="link" >
        <div class="tab borrow">借钱</div>
      </router-link>
      <!--<router-link :to="'/recommend/'+appkey" class="link">-->
        <!--<div class="tab recommend">推荐</div>-->
      <!--</router-link>-->
      <!--<router-link :to="'/my/'+appkey" class="link">-->
        <!--<div class="tab my">我的</div>-->
      <!--</router-link>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navfooter',
  data () {
    return {
      appkey: []
    }
  },
  mounted () {
    this.appkey = this.$route.params.appkey
  }
}
</script>

<style lang="stylus" scoped>
  .tabfooter
    position fixed
    bottom 0
    width 100%
    height 0.98rem
    font-size 0
    background #ffffff
    box-shadow 0 0.04rem 0.2rem 0 rgba(198,198,198,0.18)
    z-index 98
    .router-link-active .home
      background url("~assets/images/home-gl.png") no-repeat center 0.14rem
      background-size 0.44rem
    .router-link-active .borrow
      background url("~assets/images/borrow-gl.png") no-repeat center 0.14rem
      background-size 0.44rem
    .router-link-active .recommend
      background url("~assets/images/recommend-gl.png") no-repeat center 0.14rem
      background-size 0.44rem
    .router-link-active .my
      background url("~assets/images/my-gl.png") no-repeat center 0.14rem
      background-size 0.44rem
    .router-link-active .tab
      color #FFA219!important
    .tab
      float left
      width 50%
      height .98rem
      text-align center
      display block
      color #666666
      font-size  0.22rem
      line-height 1.5rem
    .home
      background url("~assets/images/borrow.png") no-repeat center 0.14rem
      background-size 0.44rem
    .borrow
      background url("~assets/images/borrow.png") no-repeat center 0.14rem
      background-size 0.44rem
    .recommend
      background url("~assets/images/recommend.png") no-repeat center 0.14rem
      background-size 0.44rem
    .my
      background url("~assets/images/my.png") no-repeat center 0.14rem
      background-size 0.44rem
</style>
