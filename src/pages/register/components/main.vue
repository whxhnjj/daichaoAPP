<template>
  <div>
    <div class="box">
      <div class="main">
        <span class="title">立即注册</span>
        <router-link to="/">
          <span class="tips"><i class="err">返回上一步</i></span>
        </router-link>
        <div class="code">
          <input class="number" type="number" ref="code" value="" placeholder="请输入验证码" />
          <div v-show="show" @click="Verification" class="code-submit">获取验证码</div>
          <div v-show="!show" class="code-submit">{{count}} s</div>
        </div>
        <input class="password" type="password" ref="password" value="" placeholder="请输入密码" />
        <div class="pro">
          <label><input type="checkbox" v-model="state" v-on:click="alocked()"><i>✓</i></label>
          <span class="xieyi">已阅读并同意<i><router-link to="/protocol">《用户注册协议》</router-link></i></span>
        </div>
        <button @click="registerBtn" class="button">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'RregisterMain',
  data () {
    return {
      show: true,
      count: '',
      timer: null,
      msg: '',
      state: true
    }
  },
  methods: {
    alocked: function () {
      this.state = !this.state
    },
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
    registerBtn () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/user/register', {
        phone: this.$store.state.phone,
        appkey: this.$route.params.appkey,
        code: this.$refs.code.value,
        password: this.$refs.password.value
      })
        .then(this.registerSucc)
    },
    registerSucc (res) {
      res = res.data
      if (!this.state) {
        this.$toast('请同意注册协议!')
        return
      }
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
    height 4.5rem
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
        height .6rem
        text-align left
        padding-left .4rem
        line-height  .6rem
        font-family PingFangSC-Medium
        display block
      .tips
        color #999999
        margin-top .12rem
        font-size .28rem
        font-weight 400
        height .4rem
        line-height  .4rem
        font-family PingFangSC-Medium
        display block
        text-align left
        padding-left .4rem
        .err
          color #FE9507
      .code
        margin-top .6rem
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
      .password
        margin-top .3rem
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
      .pro
        width 90%
        margin-top .26rem
        height .6rem
        margin-left .4rem
        text-align left
        label
          color #666666
          font-size .24rem
          cursor pointer
          float left
          width .6rem
          height .6rem
          line-height .6rem
          display block
          position relative
          margin-right .24rem
          i
            cursor pointer
            float left
            font-size .4rem
            font-weight 900
            font-style normal
            display inline-block
            width .6rem
            height .6rem
            text-align center
            line-height .6rem
            color #FFFFFF
            vertical-align middle
            border #E4E4E4 .01rem solid
            border-radius .1rem
        input[type="checkbox"]
          width .6rem
          height .6rem
          opacity 0
          position absolute
          left 0
        input[type="checkbox"]:checked + i
          color #FD9D11
        .xieyi
          line-height .6rem
          color #666666
          i
            color #FD9D11
            line-height .6rem
      .button
        width 90%
        height 1rem
        background rgba(255,152,0,1);
        box-shadow 0px 2px 4px 0px rgba(202,87,5,0.3);
        border-radius .05rem
        opacity 0.9
        margin-top .32rem
        color #FFFFFF
        font-size .36rem
        font-weight 400
        line-height 1rem
</style>
