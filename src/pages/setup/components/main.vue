<template>
  <div class="main">
    <ul>
      <router-link to="/changepassword">
        <li>
          <span>
            修改密码 <img class="right-icon" src="~assets/images/right.png" alt="">
          </span>
        </li>
      </router-link>
    </ul>
    <button class="retreat" @click="retreat">退出登录</button>
    <transition>
    <div class="bt-model" v-if="ishow">
      <div class="show-model">
        <div class="text">您确定要退出登录？</div>
        <div class="close" @click="retreat">取消</div>
        <div @click="confirmBtn" class="confirm">确定</div>
      </div>
    </div>
    </transition>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'SetMain',
  data () {
    return {
      ishow: false,
      msg: ''
    }
  },
  methods: {
    retreat () {
      this.ishow = !this.ishow
    },
    confirmBtn () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/user/logout', {
        token: this.$store.state.token
      })
        .then(this.TokenSucc)
    },
    TokenSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.msg = res.msg
        this.openBottom()
        this.$router.push({path: '/'})
      } else {
        this.msg = res.msg
        this.openBottom()
        this.$router.push({path: '/'})
      }
    },
    openBottom () {
      this.$toast(this.msg)
    }
  }
}
</script>

<style lang="stylus" scoped>
  li
    background white
    padding 0.32rem 0.38rem
    margin-top 0.2rem
    span
      color #333333
      font-size 0.3rem
    .right-icon
      width 0.18rem
      float right
  .retreat
    width 90%
    height 1rem
    color #fff
    font-size 0.36rem
    margin 0 auto
    background rgba(255,152,0,1)
    box-shadow 0px 0.04rem 0.08rem 0px rgba(202,87,5,0.3)
    border-radius 0.1rem
    position fixed
    bottom 0.54rem
    left 0
    right 0
  .bt-model
    width 100%
    height 100%
    position fixed
    top 0
    left 0
    background rgba(0,0,0,0.3)
    .show-model
      width 5.4rem
      height 2.14rem
      background rgba(255,255,255,1)
      border-radius .2rem
      position absolute
      left 50%
      top 50%
      margin-top -1.07rem
      margin-left -2.7rem
      .text
        height 1.26rem
        text-align center
        line-height 1.26rem
        color #333333
        font-size .28rem
        font-weight 400
        border-bottom 0.02rem solid #E1E1E1
      .close
        height .86rem
        width 2.69rem
        float left
        color #FD9D11
        line-height .86rem
        font-size .28rem
        text-align center
        border-right 0.02rem solid #E1E1E1
      .confirm
        text-align center
        height .86rem
        width 2.69rem
        float right
        line-height .86rem
        color #666666
        font-size .28rem
  .v-enter, .v-leave-to
    opacity 0
  .v-enter-active, .v-leave-active
    transition opacity .2s
</style>
