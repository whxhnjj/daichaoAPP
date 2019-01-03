<template>
<div>
  <div class="box">
    <ul>
      <li>
        <span>原密码</span>
        <input type="password" ref="oldpw" value="" placeholder="请输入原密码"/>
      </li>
      <li>
        <span>新密码</span>
        <input type="password" ref="newpw" value="" placeholder="请输入新密码"/>
      </li>
      <li>
        <span>确认密码</span>
        <input type="password" ref="conpw" value="" placeholder="请再次确认新密码"/>
      </li>
    </ul>
  </div>
  <button @click="changepassword" class="password-submit">修改</button>
  <div class="bt-model" v-if="ishow">
    <div class="show-model">
      <div class="text">您确定要退出登录？</div>
      <div class="close" @click="changepassword">取消</div>
      <div @click="confirmBtn" class="confirm">确定</div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'ChangePasswordMain',
  data () {
    return {
      ishow: false,
      msg: ''
    }
  },
  methods: {
    changepassword () {
      if (this.$refs.oldpw.value === '') {
        this.msg = '原密码不能为空'
        this.openBottom()
        return false
      } else if (this.$refs.newpw.value === '') {
        this.msg = '新密码不能为空'
        this.openBottom()
        return false
      } else if (this.$refs.conpw.value !== this.$refs.newpw.value) {
        this.msg = '两次密码不一致'
        this.openBottom()
        return false
      } else {
        this.ishow = !this.ishow
      }
    },
    confirmBtn () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/user/password', {
        phone: this.$store.state.phone,
        oldpassword: this.$refs.oldpw.value,
        password: this.$refs.newpw.value,
        password_confirm: this.$refs.conpw.value,
        appkey: this.$route.params.appkey,
        token: this.$store.state.token
      })
        .then(this.changeSucc)
    },
    changeSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.$router.push({path: '/'})
        this.msg = res.msg
        this.openBottom()
      } else if (res.code === 404) {
        this.msg = res.msg
        this.openBottom()
        this.ishow = false
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
    margin-top .2rem
    width 100%
    height 100%
    overflow hidden
    background #FFFFFF
  .box li
    width 92%
    margin-left 4%
    padding-right 4%
    height .88rem
    border-bottom 0.01rem solid rgba(238,238,238,1)
    float left
  .box li span
    display block
    height .88rem
    line-height .88rem
    font-size .3rem
    color #333333
    width 25%
    font-weight 400
    float left
  .box li input
    width 75%
    border none
    height .79rem
    line-height .88rem
    font-size .24rem
    font-weight 400
    float right
    overflow hidden
  .password-submit
    width 90%
    margin .92rem 5%
    height 1.0rem
    background rgba(255,152,0,1)
    box-shadow 0px 4px 8px 0px rgba(202,87,5,0.3)
    border-radius .1rem
    opacity 0.9
    font-size .36rem
    line-height 1.0rem
    display block
    color #FFFFFF
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
</style>
