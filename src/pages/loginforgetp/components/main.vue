<template>
  <div>
    <div class="box">
      <div class="main">
        <span class="title">忘记密码</span>
        <input class="phone" type="number" ref="phone" :value=this.$store.state.phone placeholder="请输入手机号" />
        <div class="code">
          <input class="number" type="number" ref="code" value="" placeholder="请输入验证码" />
          <div v-show="show" @click="Verification" class="code-submit">获取验证码</div>
          <div v-show="!show" class="code-submit">{{count}} s</div>
        </div>
        <input class="password" type="password" ref="password" value="" placeholder="请输入密码" />
        <button @click="confirmBtn" class="button">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LoginForgetpMain',
  data () {
    return {
      show: true,
      count: '',
      timer: null,
      msg: ''
    }
  },
  methods: {
    Verification () {
      const TIME_COUNT = 30
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/user/reg_send', {
        phone: this.$store.state.phone,
        appkey: this.$route.params.appkey
      })
        .then(this.VerificationSucc)
    },
    VerificationSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.msg = res.msg
        this.openBottom()
      }
    },
    confirmBtn () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/user/register', {
        phone: this.$store.state.phone,
        appkey: this.$route.params.appkey,
        code: this.$refs.code.value,
        password: this.$refs.password.value
      })
        .then(this.confirmSucc)
    },
    confirmSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.$router.push({path: '/Logincord'})
      } else if (res.code === 404) {
        this.msg = res.msg
        this.openBottom()
      }
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
    height 3.9rem
    background url("~assets/images/bg-login.png") no-repeat
    background-size 100% 100%
    text-align center
    .main
      width 100%
      .title
        color #333333
        padding-top 1.7rem
        font-size .42rem
        font-weight 500
        height .6rem
        line-height .6rem
        font-family PingFangSC-Medium
        display block
        text-align left
        padding-left .4rem
      .code
        margin-top .3rem
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
        .code-submit
          width 30%
          float right
          height 1.08rem
          line-height 1.08rem
          font-size .3rem
          color #335EFE
          text-align right
          margin-right 5%
      .phone
        margin-top .46rem
        border 0.01rem solid #BBBBBB
        border-radius 0.08rem
        background #FFFFFF
        width 85%
        height 1.08rem
        padding-left .4rem
        font-size .34rem
        line-height 1.08rem
        outline none
        appearance none
        color #333333
      .password
        margin .3rem 0 .5rem
        border 0.01rem solid #BBBBBB
        border-radius 0.08rem
        background #FFFFFF
        width 85%
        height 1.08rem
        padding-left .4rem
        font-size .34rem
        line-height 1.08rem
        color #333333
      .button
        width 90%
        height 1rem
        background rgba(255,152,0,1)
        box-shadow 0px 2px 4px 0px rgba(202,87,5,0.3)
        border-radius .05rem
        opacity 0.9
        color #FFFFFF
        font-size .36rem
        font-weight 400
        line-height 1rem
</style>
