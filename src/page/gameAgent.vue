<template>
  <div class="gameAgentPage">
    <head-top v-if="$route.params.state == 1">一般游戏代理</head-top>
    <div class="gameAgentBox">
      <div class="proxy">
        <div class="selectIcon" :class="{'current':type == 2}" @click="type = 2">
          <i class="icon"></i>
        </div>
        <div class="proxyText">
          <h2>二级代理（268元）</h2>
          <p>1.送268元面值的卡五星游戏金钻。</p>
          <p>2.绑定邀请码的下级用户购买金钻时，享其购买金额40%的返现。</p>
          <p>3.可以发展三级代理，享三级代理用户购买卡五星金钻金额10%的返现。</p>
          <p>4.获得小狼人勋章，具有线下合作商家的消费优惠价</p>
        </div>
      </div>
      <div class="proxy">
        <div class="selectIcon" :class="{'current':type == 3}" @click="type = 3">
          <i class="icon"></i>
        </div>
        <div class="proxyText">
          <h2>三级代理（88元）</h2>
          <p>1.送88元面值的卡五星游戏金钻。</p>
          <p>2.绑定邀请码的下级用户购买金钻时，享其购买金额30%的返现。</p>
          <p>3.获得小狼人勋章，具有线下合作商家的消费优惠价。</p>
        </div>
      </div>
    </div>
    <div class="publicBut">
      <button @click="getWxPay">去支付</button>
    </div>
  </div>
</template>
<script>
import {wxPay} from '@/api/wxPay';
export default {
  data () {
    return {
      type:2
    }
  },
  methods: {
    getWxPay(){
      if(this.type === 2 || this.type === 3){
        wxPay(this.type).then(
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
    }
  },
  mounted() {
    document.title = '一般游戏代理';
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
.gameAgentPage {
  .gameAgentBox {
    margin: rem(25);
    background-color: #FFF;
    padding: rem(42) rem(40);
    .proxy {
      display: flex;
      margin-top: rem(124);
      .selectIcon {
        margin-right: rem(40);
        i:after {
          content: '\e632';
          display: block;
          font-size: rem(44);
          color: #d5d5d5;
        }
      }
      .current {
        i:after {
          content: '\e692';
          color: #f39800;
        }
      }
      .proxyText {
        h2 {
          font-size: rem(30);
          color: #333333;
          font-weight: bold;
          margin-bottom: rem(30);
        }
        p {
          font-size: rem(24);
          color: #999999;
          line-height: rem(40);
        }
      }
      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
