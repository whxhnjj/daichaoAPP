<template>
  <div>
    <div class="box">
      <div class="main">
        <h3 class="title">输入密码</h3>
        <router-link to="/">
          <span class="tips"><i class="err">返回上一步</i></span>
        </router-link>
        <input class="phone" type="number" :value=this.$store.state.phone placeholder="请输入手机号" readonly />
        <div class="code">
          <input class="number" type="password" ref="password" value="" placeholder="请输入密码" />
        </div>
        <button @click="SignIn" class="button">登录</button>
        <router-link to="/loginforgetp">
          <span class="forget">忘记密码</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LoginCordMain',
  data () {
    return {
      msg: '',
      token: ''
    }
  },
  methods: {
    SignIn () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/user/login', {
        phone: this.$store.state.phone,
        password: this.$refs.password.value,
        appkey: this.$route.params.appkey
      })
        .then(function (res) {
          res = res.data
          if (res.code === 200) {
            this.token = res.data.token
            this.$store.commit('Token', this.token)
            this.$router.push({path: '/Home'})
          } else if (res.code === 400) {
            this.msg = res.msg
            this.openBottom()
          } else if (res.code === 404) {
            this.msg = res.msg
            this.openBottom()
          }
        }.bind(this))
    },
    openBottom () {
      this.$toast(this.msg)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .box
    width 100%
    height 4.7rem
    background url("~assets/images/bg-login.png") no-repeat
    background-size 100% 100%
    text-align center
    .main
      width 100%
      .title
        color #333333
        padding-top 1.84rem
        font-size .42rem
        font-weight 500
        padding-left .4rem;
        height .6rem
        line-height .6rem
        font-family PingFangSC-Medium
        display block
        text-align left
      .tips
        color #999999
        margin-top .12rem
        font-size .28rem
        font-weight 400
        height .4rem
        line-height .4rem
        font-family PingFangSC-Medium
        display block
        text-align left
        padding-left .4rem
        .err
          color #FE9507
      .phone
        margin-top .6rem
        background #FFFFFF
        width 85%
        height 1.08rem
        border 1px solid #BBBBBB
        outline none
        appearance none
        border-radius 0.08rem
        padding-left .4rem
        font-size .3rem
      .code
        margin-top .38rem
        border .01rem solid #BBBBBB
        border-radius .08rem
        background #FFFFFF
        width 90%
        height 1.08rem
        margin-left .4rem
        font-size .3rem
        .number
          width 60%
          height 1.07rem
          font-size .3rem
          margin-left 5%
          float left
          border none
        input::-webkit-input-placeholder
          color #B1B1B1
        input::-moz-placeholder
          color #B1B1B1
        input -moz-placeholder
          color #B1B1B1
        input:-ms-input-placeholder
          color #B1B1B1
        .code-submit
          width 30%
          float right
          height 1.08rem
          line-height 1.08rem
          font-size .3rem
          color #335EFE
          text-align right
          margin-right 5%
      .button
        width 90%
        height 1rem
        background rgba(255,152,0,1)
        box-shadow 0px 2px 4px 0px rgba(202,87,5,0.3)
        border-radius .05rem
        opacity 0.9
        margin-top .5rem
        color #FFFFFF
        font-size .36rem
        font-weight 400
        line-height 1rem
      .forget
        display block
        text-align right
        font-size .28rem
        font-weight 400
        color #999999
        height .4rem
        line-height .4rem
        margin-top .3rem
        margin-right .62rem
</style>
