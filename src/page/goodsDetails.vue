<template>
  <div class="goodsDetailsPage">
    <head-top>优惠商家详情</head-top>
    <div class="goodsDetailsBox">
      <h3>热爱时尚与艺术的你一定不愿错过的BAZAAR 150周年大展</h3>
      <div class="timeSource">
        <!-- <span>2017-9-2</span> -->
        <span>随州小狼人</span>
      </div>
      <div class="content" v-html="goodsInfo"></div>
    </div>
  </div>
</template>
<script>
import {setGoodsInfo} from '@/api/user'
export default {
  data() {
    return {
      goodsInfo:{}
    }
  },
  methods: {
    pageData(){
      setGoodsInfo(this.$route.params.id).then(
        data => {
          if(data.code == 200){
            this.goodsInfo = data.data;
          }else{
            this.prompt(data.msg);
          }
        }
      );
    }
  },
  mounted() {
    document.title = '优惠商家详情';
    this.pageData();
  }
}
</script>
<style lang="scss">
@import 'src/style/mixin';
.goodsDetailsPage {
  .goodsDetailsBox {
    background-color: #FFF;
    padding: rem(20) rem(30);
    margin-top: rem(10);
    h3 {
      color: #333333;
      font-size: rem(40);
    }
    .timeSource {
      padding: rem(30) 0;
      display: flex;
      span {
        font-size: rem(28);
        color: #999999;
      }
      span:first-child {
        margin-right: rem(40);
      }
      span:last-child {
        color: #5b7faa;
      }
    }
    .content {
      color: #333333;
      font-size: rem(30);
      line-height: 170%;
      p {
        color: #333333;
        font-size: rem(30);
        line-height: 170%;
      }
      img {
        width: 100% !important;
        display: block;
      }
    }
  }
}
</style>
