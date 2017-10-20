<template>
  <div class="gameAgentPage">
    <head-top v-if="$route.params.state == 1">创业推广大使</head-top>
    <div class="gameAgentBox">
      <div class="proxy" v-for="(item,index) of info">
        <div class="selectIcon" :class="{'current':type == index}" @click="type = index">
          <i class="icon"></i>
        </div>
        <div class="proxyText">
          <h2>小灰灰（XX元）</h2>
          <p v-for="(childItem,childIndex) of item">{{childIndex+1}}.{{childItem}}</p>
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
import {setDescription} from '@/api/user'
export default {
  data () {
    return {
      type:2,
      info:[]
    }
  },
  methods: {
    getWxPay(){
      let type;
      if(this.type === 2 || this.type === 3 || this.type === 4){
        if(this.type == 2){
          type = 91;
        }else if(this.type == 3){
          type = 92;
        }else if(this.type == 4){
          type = 93;
        }
        wxPay(type).then(
          data => {
            this.prompt('支付成功！');
            this.$router.push('/');
            console.log(data);
          },
          () => {
            this.prompt('支付失败');
          }
        );
      }else{
        this.prompt('请选择推广级别');
      }
    },
    pageData(){
      setDescription(55).then(
        data => {
          if(data.code == 200){
            this.info = data.data;
          }else{
            this.prompt(data.msg);
          }
        }
      );
    }
  },
  mounted() {
    document.title = '一般游戏代理';
    this.pageData();
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
