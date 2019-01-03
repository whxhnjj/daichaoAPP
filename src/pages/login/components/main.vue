<template>
  <div class="box" v-show="show">
    <div class="main">
      <h3 class="title">输入手机号</h3>
      <p><input class="number" type="number" ref="number" v-model="num" value="" v-on:input ="inputFunc" maxlength="11" placeholder="请输入手机号" /></p>
      <button class="button" @click="clicklogin(num)">下一步</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LoginMain',
  data () {
    return {
      num: '',
      msg: '',
      show: false
    }
  },
  methods: {
    inputFunc () {
      if (this.num.length > 11) {
        this.num = this.num.replace(/^\d{11}$/)
        this.num = this.num.substring(0, 11)
        this.$toast('请输入正确的手机号码')
      }
    },
    clicklogin (phone) {
      this.$store.commit('changePhone', phone)
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/user/checkphone', {
        phone: this.num,
        appkey: this.$route.params.appkey
      })
        .then(this.getMainInfoSucc)
    },
    getMainInfoSucc (res) {
      res = res.data
      if (res.code === 200) {
        if (res.data.islogin === 0) {
          this.$router.push({path: '/Register'})
        } else if (res.data.islogin === 1) {
          this.$router.push({path: '/Logincord'})
        }
      } else {
        this.msg = res.msg
        this.openBottom()
      }
    },
    openBottom () {
      this.$toast(this.msg)
    },
    checkLogin () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/user/check_login', {
        token: this.$store.state.token
      })
        .then(function (res) {
          res = res.data
          if (res.code === 200) {
            this.$router.push({path: '/Home'})
          } else {
            this.show = true
          }
        }.bind(this))
    }
  },
  beforeMount () {
    this.checkLogin()
  }

}
</script>

<style lang="stylus" scoped>
  .box
    width 100%
    height 4rem
    background url("~assets/images/bg-login.png") no-repeat
    background-size 100% 100%
    text-align center
    .main
      width 100%
      .title
        text-align left
        padding-top 1.84rem
        font-size 0.42rem
        padding-left 0.4rem
      p
        margin-top 1.02rem
        .number
          width 85%
          height 1.08rem
          border 1px solid #BBBBBB
          outline none
          appearance none
          border-radius 0.08rem
          padding-left 0.4rem
      .button
        width 90%
        height 1rem
        border-radius 0.1rem
        color white
        font-size 0.36rem
        background #FF9800
        margin-top 0.72rem
</style>
