<template>
  <div class="gameAgentPage">
    <head-top v-if="$route.params.state == 1">创业推广大使</head-top>
    <div class="gameAgentBox">
      <div class="proxy">
        <div class="selectIcon" :class="{'current':type == 2}" @click="type = 2">
          <i class="icon"></i>
        </div>
        <div class="proxyText">
          <h2>小灰灰（XX元）</h2>
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
          <h2>灰太狼（XX元）</h2>
          <p>1.送88元面值的卡五星游戏金钻。</p>
          <p>2.绑定邀请码的下级用户购买金钻时，享其购买金额30%的返现。</p>
          <p>3.获得小狼人勋章，具有线下合作商家的消费优惠价。</p>
        </div>
      </div>
      <div class="proxy">
        <div class="selectIcon" :class="{'current':type == 4}" @click="type = 4">
          <i class="icon"></i>
        </div>
        <div class="proxyText">
          <h2>红太狼（XX元）</h2>
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

</style>
