<template>
  <div>
    <div class="header">
      <div class="box">
        <img class="logo" src="~assets/images/cplogo.png" />
        <span class="name">袋熊钱包</span>
        <span class="cry">无门槛，最快3分钟到账</span>
      </div>
    </div>
    <div class="bar">
      <div class="limit">
        <div class="tit">
          <i>额度</i>
          <span>(3000元～3.0万元)</span>
        </div>
        <div class="num">3000</div>
      </div>
      <div class="line"></div>
      <div class="time">
        <div class="tit">
          <i>期限</i>
          <span>(3~12月)</span>
        </div>
        <div class="num">12</div>
      </div>

      <div class="bar-last">
        <div class="last-left">
          <span class="last-title">每月还款</span>
          <i class="last-num">265元</i>
        </div>
        <div class="last-line"></div>
        <div class="last-center">
          <span class="last-title">月费率</span>
          <i class="last-num">0.9%</i>
        </div>
        <div class="last-line"></div>
        <div class="last-right">
          <span class="last-title">最快放款</span>
          <i class="last-num">3分钟</i>
        </div>
      </div>

      <div class="bar-hot">按日计息，随借随还</div>
    </div>
    <div class="content">
      <div class="content-title">
        <img src="~assets/images/dot-icon.png" />
        <span>申请条件</span>
      </div>
      <div class="content-info"><span>1.年龄18-40周岁</span><span>2.实名制手机号使用3个月</span></div>
      <div class="content-title">
        <img src="~assets/images/dot-icon.png" />
        <span>所需材料</span>
      </div>
      <div class="content-info"><span>身份证</span></div>
      <div class="content-title">
        <img src="~assets/images/dot-icon.png" />
        <span>申请流程</span>
      </div>
      <div class="flow">
        <div class="flow-box">
          <img src="~assets/images/flow01.png" />
          <span>身份认证</span>
        </div>
        <img class="flow-right" src="~assets/images/flow-right.png" />
        <div class="flow-box">
          <img src="~assets/images/flow02.png" />
          <span>个人信息</span>
        </div>
        <img class="flow-right" src="~assets/images/flow-right.png" />
        <div class="flow-box">
          <img src="~assets/images/flow03.png" />
          <span>审核通过</span>
        </div>
        <img class="flow-right" src="~assets/images/flow-right.png" />
        <div class="flow-box">
          <img src="~assets/images/flow04.png" />
          <span>等待放款</span>
        </div>
      </div>
      <button>立即申请</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detailsmain'
}
</script>

<style  lang="stylus" scoped>
  .header
    width 100%
    height 5.8rem
    background linear-gradient(90deg,rgba(253,167,37,1) 0%,rgba(255,152,0,1) 100%)
    box-shadow 0px 0.02rem 0.06rem0px rgba(202,87,5,0.26)
    float left
    .box
      width 2.56rem;
      margin 1.44rem auto .1rem
      .logo
        width 1rem
        height 1rem
        display block
        margin 0 auto
      .name
        color #FFFFFF
        display block
        text-align center
        font-size .32rem
        font-weight 500
        height .44rem
        margin .12rem 0 .1rem
        line-height .44rem
      .cry
        color #FFFFFF
        display block;
        text-align center
        font-size .24rem
        font-weight 500
  .bar
    width 5.64rem
    height 3.04rem
    padding .42rem .58rem .2rem .58rem
    background rgba(255,255,255,1);
    box-shadow 0px 0px 20px 2px rgba(220,220,220,0.43)
    border-radius 14px
    position absolute
    top 3.54rem
    left 50%
    margin-left -3.4rem
    .limit
      width 3.1rem
      float left
      .tit
        height .4rem
        float left
        overflow hidden
      .tit i
        color #333333
        font-size .28rem
        font-weight 500
        line-height .4rem
        float left
        display block
      .tit span
        color #777777
        display block
        font-size .28rem
        font-weight 400
        line-height .4rem
        float right
      .num
        font-size .6rem
        color #2176F3
        height .84rem
        line-height .84rem
        float left
        margin-top .12rem
    .line
      width .01rem
      height 1.18rem
      border .02rem solid
      float left
      margin .2rem .38rem 0 .38rem
      border-image linear-gradient(180deg, rgba(255,255,255,1), rgba(240,240,240,1), rgba(255,255,255,1)) 2 2
    .time
      width 1.7rem
      float right
      .tit
        height .4rem
        float left
        overflow hidden
      .tit i
        color #333333
        font-size .28rem
        font-weight 500
        line-height .4rem
        float left
        display block
      .tit span
        color #777777
        display block
        font-size .28rem
        font-weight 400
        line-height .4rem
        float right
      .num
        font-size .6rem
        color #333333
        height .84rem
        line-height .84rem
        float left
        margin-top .12rem
    .bar-last
      width 5.64rem
      height .94rem
      margin-top  0.12rem
      float left
      .last-left
        width 1.76rem
        float left
        .last-title
          width 1.12rem
          display block
          text-align center
          line-height .4rem
          height .4rem
          float left
          color #777777
          font-size .28rem
          font-weight 400
          margin-bottom 0.1rem
        .last-num
          width 100%
          display block
          line-height .44rem
          height .44rem
          float left
          color #333333
          font-weight 500
          font-size .32rem
      .last-center
        width 1.12rem
        float left
        padding 0 0.54rem
        .last-title
          width 1.12rem
          display block
          text-align center
          line-height .4rem
          height .4rem
          float left
          color #777777
          font-size .28rem
          font-weight 400
          margin-bottom 0.1rem
        .last-num
          width 100%
          display block
          line-height .44rem
          height .44rem
          float left
          color #333333
          font-weight 500
          font-size .32rem
      .last-right
        width 1.56rem
        float right
        .last-title
          width 100%
          display block
          line-height .4rem
          height .4rem
          float left
          color #777777
          font-size .28rem
          font-weight 400
          margin-bottom 0.1rem
          text-align right
        .last-num
          width 100%
          display block
          line-height .44rem
          height .44rem
          float left
          color #333333
          font-weight 500
          font-size .32rem
          text-align right
      .last-line
        width .01rem
        height .82rem
        border .02rem solid
        float left
        margin .07rem 0
        border-image linear-gradient(180deg, rgba(255,255,255,1), rgba(240,240,240,1), rgba(255,255,255,1)) 2 2
    .bar-hot
      width 100%
      color #CECECE
      float left
      font-size .24rem
      font-weight 400
      line-height .34rem
      height .34rem
      margin-top .26rem
      text-align center
  .content
    width 6.8rem
    padding-top 1.4rem
    margin 0 auto
    overflow hidden
    .content-title
      width 6.8rem
      margin .2rem 0
      float left
    .content-title img
      width .2rem
      height .2rem
      margin .12rem 0
      float left
    .content-title span
      display  block
      margin-left .12rem
      color  #333333
      font-size  .32rem
      font-weight  600
      float left
      height .44rem
      line-height .44rem
    .content-info
      float left
      font-size .28rem
      color #6E6E6E
      font-weight 400
      height .4rem
      line-height .4rem
    .content-info span
      margin-left .5rem;
    .flow
      width 6.7rem
      height .9rem
      margin 0 auto
      overflow hidden
      .flow-box
        width 1rem
        height .9rem
        float left
      .flow-box img
        width .4rem
        height .36rem
        display block
        margin 0 auto
      .flow-box span
        display block
        float left
        margin-top .19rem
        text-align center
        color  #666666
        font-size .24rem
        line-height .34rem
        font-weight 400
      .flow-right
        width .23rem
        height .4rem
        float left
        display block
        margin .25rem .27rem
    button
      width 6.7rem
      background #FD9D11
      border-radius 0.1rem
      height 1rem
      margin .46rem .05rem
      color #FFFFFF
      float left
      font-size .32rem
      line-height .1rem
      font-weight 400
</style>
