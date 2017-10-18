<template>
  <div class="chatWithPage">
    <head-top>交友聊天</head-top>
    <div class="chatWithBox">
      <div class="logo">
        <img src="../images/logo.png">
        <p>小狼科技</p>
      </div>
      <div class="qrCodeInfo">
        <div class="qrCodeBox">
          <img src="../images/bg.png" alt="">
        </div>
      </div>
      <div class="introduction">
        长按识别图中二维码（或扫一扫）
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    document.title = '交友聊天';
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.chatWithBox {
  position: absolute;
  top: rem(88);
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-image: url('../images/bg.png');
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: 100% auto;
  padding: 0px rem(40) rem(60) rem(40);
  overflow-y: auto;
  .logo {
    padding: rem(84) 0 0 0;
    text-align: center;
    img {
      width: rem(194);
      height: rem(194);
    }
    p {
      color: #200306;
      font-size: rem(40);
      margin-top: rem(10);
    }
  }
  .qrCodeInfo {
    display: flex;
    justify-content: center;
    margin-top: rem(98);
    .qrCodeBox {
      width: rem(470);
      height: rem(470);
      background-image: url('../images/erweima.png');
      background-position: 0 0;
      background-repeat: no-repeat;
      background-size: 100% auto;
      padding: rem(13);
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  .introduction {
    text-align: center;
    color: #200306;
    font-size: rem(30);
    margin-top: rem(30);
  }
}
</style>
