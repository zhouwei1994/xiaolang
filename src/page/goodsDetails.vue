<template>
  <div class="goodsDetailsPage">
    <head-top>优惠商家详情</head-top>
    <div class="goodsDetailsBox">
      <h3>热爱时尚与艺术的你一定不愿错过的BAZAAR 150周年大展</h3>
      <div class="timeSource">
        <span>2017-9-2</span>
        <span>随州小狼人</span>
      </div>
      <div class="content">
        <p>怡园酒庄（Grace Vineyard）位于距中国山西省 太原市以南40公里的太谷县。这里具有典型的大陆性 气候：四季分明，干旱、雨水少，且日照强烈，昼夜 温差大，是种植酿酒葡萄的理想地带。在著名波尔多 葡萄酒学者丹尼斯·博巴勒（Denis Boubals）的专业 协助下，香港企业家陈进强先生于1997年创立怡园酒 庄。</p>
        <img src="#">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
    document.title = '优惠商家详情';
  }
}
</script>
<style lang="scss" scoped>
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
      span:last-child {
        color: #5b7faa;
        margin-left: rem(40);
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
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
