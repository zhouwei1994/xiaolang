<template>
  <div>
    <div class="searchBox">
      <div class="searchBut" v-show="searchState" @click="getFocus">
        <i class="icon">&#xe604;</i>
        搜索
      </div>
      <form v-show="!searchState" @submit.prevent="checkUser">
        <input ref="searchInput" type="text" v-model="searchVal" @blur="setBlur" placeholder="请输入商品关键字">
      </form>
    </div>
    <div class="goodsListBox">
      <div class="goodsList" v-for="(item,index) of goodsList" @click="$router.push('/goodsInfo/'+item.id);">
        <div class="content">
          <div class="goodsImg">
            <img :src="item.avater">
          </div>
          <div class="text">
            <h3>{{item.title}}</h3>
            <p>价格：￥{{item.price}}</p>
            <p>月销量：{{item.sales}}件</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchState: true,
      searchVal: "",
      goodsList: [
        {
          avater:'http://img14.360buyimg.com//n0/jfs/t6040/215/8121726492/353140/430b7c0a/59859394Nabbd69aa.jpg',
          title:'酷耶i5四核/8G内存/GTX1060独显/台式机电脑主机家用办公网伽大型游戏绝地求生吃鸡 电脑主机+GTX650独显',
          price:2788,
          sales:0,
          id:1
        },
        {
          avater:'https://img13.360buyimg.com/n1/s450x450_jfs/t5953/352/8752531957/443747/c7fb09a2/598a7546Nb2ec1942.jpg',
          title:'NB F80 液晶电脑显示器支架 桌面架 万向电脑旋转伸缩架 免打孔工作台支架 17-27英寸',
          price:270,
          sales:0,
          id:2
        },
        {
          avater:'https://img14.360buyimg.com/n1/jfs/t4222/156/1977476420/30595/82304026/58ca2e2aN0873e3bd.jpg',
          title:'雷诺塔HDMI转VGA转接线 白色',
          price:50,
          sales:0,
          id:3
        },
      ],
      pageNo: 1,
      pageSize: 7,
      preventRepeatReuqest: false
    };
  },
  methods: {
    //点击搜索获取焦点
    getFocus() {
      this.searchState = false;
      setTimeout(() => {
        this.$refs.searchInput.focus();
      }, 10);
    },
    //失去焦点时如果值为空显示搜索
    setBlur() {
      if (this.searchVal == "") {
        this.searchState = true;
      }
    },
    checkUser() {
      alert(this.searchVal);
      return false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.searchBox {
  padding: rem(13) rem(31);
  > * {
    background-color: #fff;
    border-radius: rem(10);
    height: rem(73);
    line-height: rem(73);
  }
  .searchBut {
    text-align: center;
    color: #aaaaaa;
    font-size: rem(32);
    i {
      margin-right: rem(14);
      color: #aaaaaa;
      font-size: rem(36);
    }
  }
  form {
    display: block;
    input {
      width: 100%;
      height: rem(73);
      line-height: rem(73);
      padding: 0 rem(20);
      display: block;
    }
  }
}
.goodsListBox {
  background-color: #fff;
  .goodsList {
    padding: 0 rem(26);
    .content {
      border-top: 1px solid #dfdfdf;
      display: flex;
      padding: rem(26) 0;
      justify-content: space-between;
    }
    &:first-child .content {
      border-top: 0;
    }
    &:active {
      background-color: #f5f5f5;
    }
    .goodsImg {
      width: rem(208);
      height: rem(166);
      flex-shrink: 0;
      margin-right: rem(20);
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .text {
      width: calc(100% - 4.56rem);
      h3 {
        color: #333333;
        font-size: rem(34);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: rem(5);
      }
      p {
        color: #999999;
        font-size: rem(30);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        line-height: rem(60);
      }
    }
  }
}
</style>
