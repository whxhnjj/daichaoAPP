<template>
  <div>
    <div class="box">
      <div class="info-left">
        <img src="~assets/images/user.png" />
        <div class="content">
          <p>提问：{{main.content}}</p>
          <span>{{main.create_time}}</span>
        </div>
      </div>
      <div class="info-right" v-show="show">
        <img src="~assets/images/user.png" />
        <div class="content">
          <p>回答：{{main.deal_mission}}</p>
          <span>{{main.deal_time}}</span>
        </div>
      </div>
      <p class="ct" v-show="show"><button class="Again" @click="AgainFeedbackClick" type="button">重新反馈</button></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SystemFeedbackMain',
  data () {
    return {
      show: false,
      main: []
    }
  },
  methods: {
    SystemFeedback () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/feedbackinfo', {
        phone: this.$store.state.phone,
        appkey: this.$route.params.appkey
      })
        .then(this.SystemFeedbackSucc)
    },
    SystemFeedbackSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.main = res.data
        if (res.data.status === 0) {
          this.show = false
        } else if (res.data.status === 1) {
          this.show = true
        }
      }
    },
    AgainFeedbackClick () {
      this.$router.push({path: '/feedback'})
    }
  },
  mounted () {
    this.SystemFeedback()
  }
}
</script>

<style lang="stylus" scoped>
  .box
    width 96%
    margin .66rem 2%
    .info-left
      width 100%
      margin-bottom .3rem
      float left
    .info-left img
      width .66rem
      height .58rem
      display block
      float left
      margin-right .14rem
    .info-left .content
      width 4.28rem
      float left
      background rgba(255,255,255,1)
      box-shadow 0 -0.01rem 0 0 rgba(205,205,205,0.5)
      border-radius 0.06rem
      border 0.01rem solid #E5E5E5
      padding .24rem .3rem .34rem .3rem
    .info-left .content p
      width 4.28rem
      color #333333
      font-size .3rem
      font-weight 400
      line-height .42rem
      display block
    .info-left .content span
      width 4.28rem
      display block
      font-size .18rem
      font-weight 400
      height .26rem
      line-height .26rem
      margin-top .15rem
      color #666666
      text-align left
    .info-right
      width 100%
      margin-bottom .3rem
      float right
    .info-right img
      width .66rem
      height .58rem
      display block
      float right
    .info-right .content
      margin-right .14rem
      width 4.28rem
      float right
      background rgba(255,255,255,1)
      box-shadow0 -0.01rem 0 0 rgba(205,205,205,0.5)
      border-radius 0.06rem
      border 0.01rem solid #E5E5E5
      padding .24rem .3rem .34rem .3rem
    .info-right .content p
      width 4.28rem
      color #333333
      font-size .3rem
      font-weight 400
      line-height .42rem
      display block
    .info-right .content span
      width 4.28rem
      display block
      font-size .18rem
      font-weight 400
      height .26rem
      line-height .26rem
      margin-top .15rem
      color #666666
      text-align right
    .ct
      text-align center
      .Again
        width 2.6rem
        height .8rem
        background #FF9800
        border-radius 0.1rem
        font-size 0.34rem
        color #ffffff
</style>
