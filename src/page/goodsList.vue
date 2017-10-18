<template>
  <div class="goodsListPage" v-load-more="loaderMore" type="1">
    <head-top v-if="$route.params.state == 1">优惠商家</head-top>
    <div class="goodsListBox">
      <div class="goodsList" v-for="(item,index) of goodsList" @click="$router.push('/goodsDetails/'+item.id);">
        <div class="content">
          <div class="goodsImg">
            <img :src="item.avater">
          </div>
          <div class="text">
            <h3>{{item.title}}</h3>
            <p>{{item.memo}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setGoodsList } from '@/api/user'
import { loadMore } from '@/components/common/mixin'
export default {
  data() {
    return {
      goodsList: [],
      pageNo: 1,
      pageSize: 7,
      preventRepeatReuqest: false
    }
  },
  mixins: [loadMore],
  methods: {
    //到达底部加载更多数据
    loaderMore() {
      if (this.preventRepeatReuqest) {
        return
      }
      this.preventRepeatReuqest = true;
      setGoodsList(1,this.pageNo, this.pageSize).then(
        data => {
          if (data.code == 200) {
            this.goodsList = this.goodsList.concat(data.data.list);
            this.preventRepeatReuqest = false;
            if (data.data.list.length < this.pageSize) {
              this.preventRepeatReuqest = true;
            } else {
              this.pageNo++;
            }
          } else if (data.code == 204) {
            this.prompt(data.msg);
            this.preventRepeatReuqest = true;
          } else {
            this.prompt(data.msg);
            this.preventRepeatReuqest = false;
          }
        },
        () => {
          this.preventRepeatReuqest = true;
        }
      );
    }
  },
  mounted() {
    document.title = '优惠商家';
    this.loaderMore();
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
      &:first-child .content {
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
