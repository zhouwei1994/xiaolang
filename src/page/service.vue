<template>
  <div class="servicePage">
    <head-top>客服</head-top>
    <div class="serviceBox">
      <div class="serviceList" v-for="(item,index) of info[2]">
        {{item}}
      </div>
    </div>
  </div>
</template>
<script>
import {setDescription} from '@/api/user'
export default {
  data(){
    return {
      info:[]
    }
  },
  methods:{
    pageData(){
      setDescription(8888).then(
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
    document.title = '客服';
    this.pageData();
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.servicePage {
  .serviceBox {
    position: absolute;
    top: rem(100);
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FFF;
    padding: 0px rem(25);
    .serviceList {
      padding: rem(45) rem(51);
      border-bottom: 1px solid #dfdfdf;
      color: #333333;
      font-size: rem(30);
    }
  }
}
</style>
