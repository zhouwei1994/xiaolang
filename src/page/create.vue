<template>
  <div class="createPage">
    <head-top v-if="$route.params.state == 1">创业商家代理</head-top>
    <div class="createBox">
      <div class="createTitle">
        <span>支付</span>
      </div>
      <div class="price">
        ¥688
      </div>
    </div>
    <div class="publicBut">
      <button @click="getWxPay">去支付</button>
    </div>
    <div class="description">
      <p>创业商家代理:</p>
      <p>1.直接成为卡五星游戏三级代理，绑定其游戏邀请码的用户购买金钻时，享其购买金额的30%返现。</p>
      <p>2.成为小狼微商平台的直接代理，享代理价。</p>
      <p>3.发展一个注册会员奖励20元，直接发展一个创业商家代理奖励288元，间接发展一个创业商家代理奖励30元。</p>
      <p>4.获得小狼人勋章，具有线下合作商家的消费优惠价。</p>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getWxPay(){
      wxPay(1).then(
        data => {
          this.prompt('支付成功！');
          this.$router.push('/');
          console.log(data);
        },
        () => {
          this.prompt('支付失败');
        }
      );
    }
  },
  mounted() {
    document.title = '创业商家代理';
    if(!this.$store.state.userInfo.userId){
      this.$parent.judgment().then(
        () => {
          console.log(123);
        }
      );
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.createPage {
  .createBox {
    margin: rem(26) rem(20);
    padding: rem(42) rem(40) rem(58) rem(40);
    background-color: #FFF;
    .createTitle {
      width: rem(220);
      height: 1px;
      position: relative;
      margin: 0 auto;
      background-color: #f39800;
      margin-top: rem(20);
      span {
        position: absolute;
        top: 0px;
        left: 50%;
        padding: 0px rem(25);
        transform: translateX(-50%) translateY(-50%);
        background-color: #FFF;
        font-size: rem(30);
        color: #f39800;
      }
    }
    .price {
      margin-top: rem(75);
      text-align: center;
      font-size: rem(60);
      color: #333333;
    }
  }
  .description {
    margin-top: rem(58);
    padding: 0 rem(80);
    p {
      font-size: rem(24);
      color: #666666;
      line-height: 200%;
    }
  }
}
</style>
