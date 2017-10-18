<template>
  <div class="medalpage">
    <head-top>小狼勋章</head-top>
    <div class="medalBox">
      <div class="medalImg">
        <img src="../images/xunzhang.png">
      </div>
      <div class="name">小岛</div>
      <div class="level">创业商家：二级代理</div>
      <div class="level">创业商家：二级代理</div>
      <div class="description">出示此电子勋章，即享受优惠商家的折扣！</div>
      <div class="goodsListLink">
        <router-link to="/goodsList/1">优惠商家列表</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    document.title = '小狼勋章';
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.medalpage {
  .medalBox {
    position: absolute;
    top: rem(100);
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #FFF;
    .medalImg {
      padding-top: rem(142);
      display: flex;
      justify-content: center;
      img {
        display: block;
        width: rem(390);
        height: rem(581);
      }
    }
    .name {
      color: #333333;
      font-size: rem(36);
      text-align: center;
      margin-top: rem(48);
    }
    .level {
      color: #333333;
      font-size: rem(30);
      text-align: center;
      margin-top: rem(20);
    }
    .description {
      color: #666666;
      font-size: rem(26);
      text-align: center;
      margin-top: rem(67);
    }
    .goodsListLink {
      text-align: center;
      margin-top: rem(28);
      display: flex;
      justify-content: center;
      a {
        color: #0e6aaf;
        font-size: rem(26);
      }
    }
  }
}
</style>
