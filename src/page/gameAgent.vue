<template>
  <div class="gameAgentPage">
    <head-top v-if="$route.params.state == 1">一般游戏代理</head-top>
    <div class="gameAgentBox">
      <div class="proxy" v-for="(item,index) of info">
        <div class="selectIcon" :class="{'current':type === index}" @click="type = index">
          <i class="icon"></i>
        </div>
        <div class="proxyText">
          <h2>{{item.name}}（{{item.price}}元）</h2>
          <p v-for="(childItem,childIndex) of item.list">{{childIndex+1}}.{{childItem}}</p>
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
      type:'',
      info:[]
    }
  },
  methods: {
    getWxPay(){
      if(this.type === ''){
        this.prompt('请选择代理级别');
      }else{
        wxPay(this.info[this.type]).then(
          data => {
            this.prompt('支付成功！');
            this.$router.push('/');
          },
          data => {
            this.prompt(data);
          }
        );
      }
    },
    pageData(){
      setDescription(22).then(
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
