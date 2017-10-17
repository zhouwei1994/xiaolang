<template>
  <div class="goodsListPage">
    <head-top v-if="$route.params.state == 1">优惠商家</head-top>
    <div class="goodsListBox">
      <div class="goodsList" v-for="(item,index) of goodsList" @click="$router.push('/goodsDetails');">
        <div class="content">
          <div class="goodsImg">
            <img src="#">
          </div>
          <div class="text">
            <h3>热爱时尚与艺术的你一定不愿热爱时尚与艺术的你一定不愿</h3>
            <p>#破界／bazaar150周年时尚艺术大展#不仅是百年时尚史的精彩回顾周年时尚艺术大展#不仅是百年时尚史的精彩回顾</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      goodsList:[
        1,1,1,1,1,1,1,1
      ]
    }
  },
  methods: {

  },
  mounted() {
    document.title = '优惠商家';
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.goodsListPage {
  .goodsListBox {
    background-color: #FFF;
    margin-top: rem(10);
    .goodsList {
      padding: 0 rem(26);
      .content {
         border-top: 1px solid #dfdfdf;
         display: flex;
         padding: rem(26) 0;
      }
      &:first-child .content{
        border-top: 0;
      }
      &:active {
        background-color: #f5f5f5;
      }
      .goodsImg {
        width: rem(208);
        height: rem(143);
        flex-shrink: 0;
        margin-right: rem(20);
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .text {
        width: rem(520);
        h3 {
          color: #333333;
          font-size: rem(34);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: rem(10);
        }
        p {
          color: #999999;
          font-size: rem(30);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
