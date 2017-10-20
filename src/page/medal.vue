<template>
  <div class="medalpage">
    <head-top>小狼勋章</head-top>
    <div class="medalBox">
      <div class="medalImg">
        <img src="../images/xunzhang.png">
      </div>
      <div class="name">{{userInfo.username}}</div>
      <div class="level" v-if="userInfo.level == 0">游戏代理：未注册</div>
      <div class="level" v-if="userInfo.level == 1">游戏代理：一般会员</div>
      <div class="level" v-if="userInfo.level == 2">游戏代理：二级游戏代理</div>
      <div class="level" v-if="userInfo.level == 3">游戏代理：三级游戏代理</div>
      <div class="level" v-if="userInfo.wolfLevel == 0">创业推广大使：非创业推广大使</div>
      <div class="level" v-if="userInfo.wolfLevel == 4">创业推广大使：小灰灰</div>
      <div class="level" v-if="userInfo.wolfLevel == 5">创业推广大使：灰太狼</div>
      <div class="level" v-if="userInfo.wolfLevel == 6">创业推广大使：红太狼</div>
      <div class="description">出示此电子勋章，即享受优惠商家的折扣！</div>
      <div class="goodsListLink">
        <router-link to="/goodsList/1">优惠商家列表</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from "@/api/user";
export default {
  data() {
    return {
      userInfo: []
    };
  },
  methods: {
    pageData() {
      getUserInfo(this.$store.state.userInfo.userId).then(data => {
        if (data.code == 200) {
          this.userInfo = data.data;
        } else {
          this.prompt(data.msg);
        }
      });
    }
  },
  mounted() {
    document.title = "小狼勋章";
    this.pageData();
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.medalpage {
  .medalBox {
    position: absolute;
    top: rem(100);
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
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
