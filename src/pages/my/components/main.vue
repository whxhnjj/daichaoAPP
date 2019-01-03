<template>
  <div class="main">
    <ul>
      <div v-for="(item, index) in main" :key="index" v-if="item.id > 1">
        <a :href="item.url">
          <li>
            <span>
              <img class="icon" :src="item.img" alt="">{{item.name}}
              <img class="right-icon" src="~assets/images/right.png" alt="">
            </span>
          </li>
        </a>
      </div>
      <!--<li @click="CheckFeedbackClick">-->
        <!--<span>-->
          <!--<img class="icon" src="~assets/images/feedback.png" alt="">意见反馈-->
          <!--<img class="right-icon" src="~assets/images/right.png" alt="">-->
        <!--</span>-->
      <!--</li>-->
      <!--<router-link to="/setup">-->
        <!--<li class="mt-12">-->
          <!--<span>-->
            <!--<img class="icon" src="~assets/images/set.png" alt="">设置-->
            <!--<img class="right-icon" src="~assets/images/right.png" alt="">-->
          <!--</span>-->
        <!--</li>-->
      <!--</router-link>-->
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MyMain',
  data () {
    return {
      main: []
    }
  },
  methods: {
    CheckFeedbackClick () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/feedbackinfo', {
        phone: this.$store.state.phone,
        appkey: this.$route.params.appkey
      })
        .then(this.CheckFeedbackSucc)
    },
    CheckFeedbackSucc (res) {
      res = res.data
      if (res.code === 200) {
        if (res.show_type === 0) {
          this.$router.push({path: '/feedback'})
        } else if (res.show_type === 1) {
          this.$router.push({path: '/systemfeedback'})
        }
      }
    },
    PastUrl () {
      axios.post(this.GLOBAL.ajaxurl + 'api/v1/config', {
        appkey: this.$route.params.appkey
      })
        .then(this.PastUrlSucc)
    },
    PastUrlSucc (res) {
      res = res.data
      this.main = res.data.html
    }
  },
  mounted () {
    this.PastUrl()
  }
}
</script>

<style lang="stylus" scoped>
  li
    background white
    padding 0.32rem 0.38rem
    margin-top 1px
    span
      color #333333
      font-size 0.3rem
    .icon
      width 0.38rem
      margin-right 0.18rem
      vertical-align: text-top;
    .right-icon
      width 0.18rem
      float right
  .mt-12
    margin-top 0.24rem
</style>
