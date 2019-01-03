<template>
  <div>
    <textarea class="feedback" ref="feedback" placeholder="请留下您的意见反馈！"></textarea>
    <button @click="feedback" class="feedback-submit">提交</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FeedbackMain',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    feedback () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/feedback', {
        content: this.$refs.feedback.value,
        appkey: this.$route.params.appkey,
        phone: this.$store.state.phone,
        client: 'wechat'
      })
        .then(this.feedbackSucc)
    },
    feedbackSucc (res) {
      res = res.data
      if (res.code === 200) {
        this.msg = res.msg
        this.openBottom()
      } else {
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
  .feedback
    width 6.02rem
    height 3.2rem
    background #FFFFFF
    border-radius 0.08rem
    border 0.01rem solid #BBBBBB
    display block
    margin .62rem auto 0
    padding 0.32rem 0.34rem
  input::-webkit-input-placeholder
    color #999999
    font-size .24rem
    font-weight 400
    line-height .34rem
  .feedback-submit
    width 6.7rem
    height 1.0rem
    background rgba(255,152,0,1)
    box-shadow 0px 4px 8px 0px rgba(202,87,5,0.3)
    color #FFF
    display block
    border-radius 0.1rem
    margin 0.42rem auto
    line-height 1.0rem
    font-size 0.36rem
</style>
