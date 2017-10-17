<template>
  <div class="myCenterPage">
    <div class="myCenterHead">
      <div class="superior">我的上级：{{userInfo.parentUsername}}</div>
      <div class="modify icon" @click="$router.push('/personalData')">
        &#xe620;
      </div>
      <div class="userInfoBox">
        <div class="userHeadBox">
          <img :src="'http://'+userInfo.avater">
        </div>
        <p>{{userInfo.username}}</p>
      </div>
    </div>
    <div class="featuresBox">
      <div class="featuresList" @click="$router.push('/income')">
        <div class="leftContent">
          <i class="icon_img_1"></i>
          <span>我的收益</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList" @click="$router.push('/coyotes')">
        <div class="leftContent">
          <i class="icon_img_2"></i>
          <span>我的小狼</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList">
        <div class="leftContent">
          <i class="icon_img_3"></i>
          <span>代理商城</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList" @click="$router.push('/goodsList/1')">
        <div class="leftContent">
          <i class="icon_img_4"></i>
          <span>优惠商家</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList">
        <div class="leftContent">
          <i class="icon_img_5"></i>
          <span>小狼勋章</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList" v-if="userInfo.level < 3" @click="$router.push('/gameAgent/1')">
        <div class="leftContent">
          <i class="icon_img_6"></i>
          <span>一般游戏代理</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList" v-if="userInfo.level < 4" @click="$router.push('/create/1')">
        <div class="leftContent">
          <i class="icon_img_7"></i>
          <span>创业商家代理</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo } from '@/api/user'
export default {
  data() {
    return {
      userInfo:{}
    }
  },
  methods: {
    //页面数据
    pageData() {
      getUserInfo(this.$store.state.userInfo.userId).then(
        data => {
          if (data.code == 200) {
            this.userInfo = data.data;
          }else {
            this.prompt(data.msg);
          }
        }
      );
    },
  },
  mounted() {
    document.title = '个人中心';
    if(this.$store.state.userInfo.userId){
      this.pageData();
    }else{
      this.$parent.judgment().then(
        () => {
          console.log(123);
          this.pageData();
        }
      );
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.myCenterPage {
  .myCenterHead {
    background-image: linear-gradient(0deg,#ffb300 0%,#ffe88c 100%),
    linear-gradient( #ffffff,#ffffff);
    width: 100%;
    height: rem(280);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .superior {
      position: absolute;
      left: rem(43);
      top: rem(50);
      font-size: rem(24);
      color: #666666;
    }
    .modify {
      position: absolute;
      right: rem(43);
      top: rem(40);
      font-size: rem(46);
      color: #FFF;
    }
    .userInfoBox {
      text-align: center;
      .userHeadBox {
        width: rem(144);
        height: rem(144);
        border: 2px solid #FFF;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        color: #333333;
        font-size: rem(28);
        margin-top: rem(17);
      }
    }
  }
  .featuresBox {
    margin-top: rem(24);
    .featuresList {
      height: rem(88);
      display: flex;
      justify-content: space-between;
      padding: rem(26) rem(44);
      background-color: #FFF;
      border-top: 1px solid #ebebeb;
      .leftContent {
        display: flex;
        i {
          display: block;
          width: rem(36);
          height: rem(36);
          background-position: center center;
          background-repeat: no-repeat;
          background-size: auto 100%;
          margin-right: rem(21);
        }
        span {
          font-size: rem(30);
          color: #666666;
          height: rem(36);
          line-height: rem(36);
        }
        .icon_img_1 {
          background-image: url(../images/me_icon_earnings.png)
        }
        .icon_img_2 {
          background-image: url(../images/me_icon_subordinate.png)
        }
        .icon_img_3 {
          background-image: url(../images/me_icon_-agency.png)
        }
        .icon_img_4 {
          background-image: url(../images/me_icon_discounts.png)
        }
        .icon_img_5 {
          background-image: url(../images/me_icon_medal.png)
        }
        .icon_img_6 {
          background-image: url(../images/me_icon_game.png)
        }
        .icon_img_7 {
          background-image: url(../images/me_icon_maker.png)
        }
      }
      .rightArrow {
        color: #b9adae;
        font-size: rem(40);
        height: rem(36);
        line-height: rem(36);
      }
      &:active {
        background-color: #f1f1f1;
      }
    }
  }
}
</style>
