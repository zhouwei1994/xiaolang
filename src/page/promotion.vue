<template>
  <div class="promotionPage">
    <head-top>我的推广</head-top>
    <div class="promotionBox">
      <img :src="imgInfo" alt="">
    </div>
  </div>
</template>
<script>
import { getMyPromotion } from "@/api/user";
export default {
  data(){
    return {
      imgInfo:''
    }
  },
  methods:{
    pageData(){
      getMyPromotion().then(
        data => {
          if(data.code == 200){
            this.imgInfo = data.data;
          }else{
            this.prompt(data.msg);
          }
        }
      );
    }
  },
  mounted() {
    document.title = '我的推广';
    this.pageData();
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.promotionBox {
  img {
    width: 100%;
  }
}
</style>
