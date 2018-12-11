<template>
  <div>
    <div class="about-logo">
      <img src=""/>
    </div>
    <span class="version">*** v.1.0.0</span>
    <div class="about-content">
      <h4><i></i>产品介绍</h4>
      <p>***是一款依托移动互联网线上信用借款APP产品，主要解决年轻人日常小额消费借款需求。具有随借随用随还的灵活便捷性，提供满足500--10000元额度，“7-30天”灵活周期的信用借款服务。好钱包借用手机客户端的便捷，从申请借款到还款全流程人性化线上操作，借用互联网大数据及智能审批系统，一键申请，快速审批，即刻到账。当你需要用钱时，就像打开自己的钱包用钱那么简单顺畅。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutMain'
}
</script>

<style lang="stylus" scoped>
  .about-logo
    width 1.6rem
    height 1.6rem
    background #FFFFFF
    box-shadow0 0.04rem 0.12rem 0 rgba(172,172,172,0.23)
    border-radius.22rem
    margin .52rem auto .18rem
  .version
    width 100%
    display block
    text-align center
    font-size .28rem
    line-height .4rem
    font-weight 400
    color #C0C0C0
  .about-content
    width 6.79rem
    height 100%
    overflow hidden
    margin .64rem auto 0
    h4
      display block
      height .56rem
      color: #4A4A4A
      font-size .4rem
      line-height .56rem
      font-weight 500
      text-indent .24rem
      i
        width .34rem
        height .34rem
        background rgba(255,152,0,1)
        box-shadow 0px 4px 8px 0px rgba(202,87,5,0.3)
        float left
        margin .11rem 0
    p
      margin-top .16rem
      color #4A4A4A
      font-size .28rem
      line-height .64rem
      font-weight 400
</style>
