<template>
  <header id='headBox'>
    <div class="head">
      <div class="goBack icon" @click="$router.go(-1)">&#xe603;</div>
      <slot></slot>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </header>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
$headHeight:rem(88);
#headBox {
  height: $headHeight;
  .head {
    font-size: rem(36);
    text-align: center;
    background-color: #FFF;
    color: #333333;
    position: fixed;
    width: 100%;
    left: 0px;
    top: 0px;
    height: $headHeight;
    line-height: $headHeight;
    z-index: 10;
    .goBack {
      position: absolute;
      left: 0;
      width: rem(88);
      font-size: rem(44);
      color: #323136;
    }
    .right {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 rem(30);
      font-size: rem(30);
      color: #323136;
      height: $headHeight;
      line-height: $headHeight;
    }
  }
}
</style>
