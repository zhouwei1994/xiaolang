<template>
  <div class="promotionPage">
    <head-top>我的推广</head-top>
    <div class="promotionBox">
      <div class="title">
        小狼科技，一个玩游戏，享生活，共创业的平台
      </div>
      <div class="content">
        <div class="gift">
          <p>
            <span>20元</span>&nbsp;&nbsp;&nbsp;现金奖励，您注册，我就送！</p>
          <p>
            <span>N*20元</span>&nbsp;&nbsp;&nbsp;现金奖励，您分享，我也送送送！</p>
        </div>
        <div class="welfare">
          <p>注册会员：</p>
          <p>1.可得20元现金奖励。</p>
          <p>2.可推广获利，成功推荐1个会员获20元奖励，成功推荐一个创业商家代理获288元奖励，间接推荐一个创业商家代理获30元奖励。</p>
          <p>3.获得小狼人勋章，享小狼线下合作商家优惠。</p>
        </div>
        <div class="welfare">
          <p>创业商家代理：</p>
          <p>1.享注册会员所有权益。</p>
          <p>2.直接晋升为小狼卡五星游戏三级代理，享绑定游戏邀请码玩家购买金钻的30%的收益提成。</p>
          <p>3.成为小狼微商的代理人</p>
        </div>
      </div>
      <div class="qrCodeInfo">
        <div class="userBox">
          <div class="qrCodeBox">
            <img src="../images/bg.png" alt="">
          </div>
          <p>小岛</p>
        </div>
        <div class="text">
          <p>1.识别二维码或扫一扫，关注公众号。</p>
          <p>2.进入公众号，点击“游戏下载”，安装。</p>
          <p>3.在游戏APP上绑定邀请码_______。</p>
          <p>4.进入公众号，注册成会员。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    document.title = '我的推广';
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.promotionBox {
  position: absolute;
  top: rem(88);
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-image: url('../images/bg.png');
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100% auto;
  padding: 0px 0 rem(20) 0;
  overflow-y: auto;
  .title {
    height: rem(260);
    background-image: url('../images/promotionTitle.png');
    background-position: center rem(-30);
    background-repeat: no-repeat;
    background-size: 100% auto;
    padding: rem(170) 0 0 rem(160);
    color: #1c0405;
    font-size: rem(22);
    margin: 0px rem(40);
  }
  .content {
    padding: 0px rem(120);
    .gift {
      p {
        color: #1c0405;
        font-size: rem(26);
        span {
          font-size: rem(34);
        }
      }
      p:first-child {
        text-indent: 1rem;
      }
    }
    .welfare {
      margin-top: rem(56);
      p {
        color: #1c0405;
        font-size: rem(22);
        line-height: 180%;
      }
    }
  }
  .qrCodeInfo {
    margin-top: rem(52);
    display: flex;
    background-image: url('../images/position.png');
    background-position: rem(40) bottom;
    background-repeat: no-repeat;
    background-size: auto 40%;
    padding: 0 rem(60) rem(20) rem(60);
    .userBox {
      flex-shrink: 0;
      margin-right: rem(25);
      .qrCodeBox {
        width: rem(220);
        height: rem(220);
        background-image: url('../images/erweima.png');
        background-position: 0 0;
        background-repeat: no-repeat;
        background-size: 100% auto;
        padding: rem(7);
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      p {
        color: #ffffff;
        font-size: rem(29);
        text-align: center;
        margin-top: rem(5);
      }
    }

    .text {
      p {
        color: #1c0405;
        font-size: rem(16);
        margin-top: rem(10);
      }
    }
  }
}
</style>
