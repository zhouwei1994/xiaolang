<template>
  <div class="myCenterPage">
    <div class="myCenterHead">
      <div class="superior">我的上级：{{userInfo.parentUsername}}</div>
      <div class="modify icon" @click="$router.push('/personalData')">
        &#xe620;
      </div>
      <div class="userInfoBox">
        <div class="userHead">
          <div class="userHeadBox">
            <img :src="'http://'+userInfo.avater">
          </div>
        </div>
        <p>{{userInfo.username}}</p>
        <div class="level" v-if="userInfo.level == 0">游戏代理：未注册</div>
        <div class="level" v-if="userInfo.level == 1">游戏代理：一般会员</div>
        <div class="level" v-if="userInfo.level == 2">游戏代理：二级游戏代理</div>
        <div class="level" v-if="userInfo.level == 3">游戏代理：三级游戏代理</div>
        <div class="level" v-if="userInfo.wolfLevel == 0">创业推广大使：非创业推广大使</div>
        <div class="level" v-if="userInfo.wolfLevel == 4">创业推广大使：小灰灰</div>
        <div class="level" v-if="userInfo.wolfLevel == 5">创业推广大使：灰太狼</div>
        <div class="level" v-if="userInfo.wolfLevel == 6">创业推广大使：红太狼</div> 
      </div>
    </div>

    <div class="statistics">
      <div class="incomeDisplay">
        <div class="incomeType" :class="{'current':incomeState == 1}" @click="incomeState = 1">
          <div class="child">总收益</div>
          <div class="child">{{incomeInfo.totalIncome}}</div>
          <div class="details incomeDisplay">
            <div class="incomeType">
              <div class="child">分享奖</div>
              <div class="child">{{incomeInfo.shareAward}}</div>
            </div>
            <div class="incomeType">
              <div class="child">直接奖</div>
              <div class="child">{{incomeInfo.directiveAward}}</div>
            </div>
            <div class="incomeType">
              <div class="child">间接奖</div>
              <div class="child">{{incomeInfo.indirectiveAward}}</div>
            </div>
          </div>
          <div class="arrow"></div>
        </div>
        <div class="incomeType" :class="{'current':incomeState == 2}" @click="incomeState = 2">
          <div class="child">已提现</div>
          <div class="child">{{incomeInfo.hasDraw}}</div>
          <div class="details incomeDisplay">
            <div class="incomeType">
              <div class="child">分享奖</div>
              <div class="child">{{incomeInfo.share}}</div>
            </div>
            <div class="incomeType">
              <div class="child">直接奖</div>
              <div class="child">{{incomeInfo.directive}}</div>
            </div>
            <div class="incomeType">
              <div class="child">间接奖</div>
              <div class="child">{{incomeInfo.indirective}}</div>
            </div>
          </div>
          <div class="arrow"></div>
        </div>
        <div class="incomeType" :class="{'current':incomeState == 3}" @click="incomeState = 3">
          <div class="child">未提现</div>
          <div class="child">{{incomeInfo.notDraw}}</div>
          <div class="details incomeDisplay">
            <div class="incomeType">
              <div class="child">分享奖</div>
              <div class="child">{{incomeInfo.unShare}}</div>
            </div>
            <div class="incomeType">
              <div class="child">直接奖</div>
              <div class="child">{{incomeInfo.unDirective}}</div>
            </div>
            <div class="incomeType">
              <div class="child">间接奖</div>
              <div class="child">{{incomeInfo.unIindirective}}</div>
            </div>
          </div>
          <div class="arrow"></div>
        </div>
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
       <div class="featuresList" @click="$router.push('/promotion')">
        <div class="leftContent">
          <i class="icon_img_8"></i>
          <span>我的推广</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList" @click="$router.push('/myCoyotes')">
        <div class="leftContent">
          <i class="icon_img_2"></i>
          <span>我的小狼</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList" @click="jump('https://h5.youzan.com/v2/goods/3np6pu783e5ut?reft=1508902912477&spm=f46859147&sf=wx_sm&from=singlemessage&isappinstalled=0')">
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
      <div class="featuresList" @click="$router.push('/gameAgent/1')">
        <div class="leftContent">
          <i class="icon_img_6"></i>
          <span>游戏代理申请</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList" @click="$router.push('/create/1')">
        <div class="leftContent">
          <i class="icon_img_7"></i>
          <span>创业推广大使</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList" @click="$router.push('/chatWith')">
        <div class="leftContent">
          <i class="icon_img_9"></i>
          <span>交友聊天</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList" @click="$router.push('/medal')">
        <div class="leftContent">
          <i class="icon_img_5"></i>
          <span>小狼勋章</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList" @click="$router.push('/service')">
        <div class="leftContent">
          <i class="icon_img_10"></i>
          <span>客服</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
      <div class="featuresList" @click="$router.push('/feedback')">
        <div class="leftContent">
          <i class="icon_img_11"></i>
          <span>投诉建议</span>
        </div>
        <div class="rightArrow icon">&#xe612;</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo,revenueObvious } from '@/api/user'
export default {
  data() {
    return {
      incomeState: 1,
      userInfo: {},
      incomeInfo:{
        "totalIncome": '--',
        "hasDraw": '--',
        "notDraw": '--',
        "shareAward": '--',
        "directiveAward": '--',
        "indirectiveAward": '--',
        "share": '--',
        "directive": '--',
        "indirective": '--',
        "unDirective":"--",
        "unIindirective":"--",
        "unShare":"--"
      }
    }
  },
  methods: {
    //页面数据
    pageData() {
      getUserInfo(this.$store.state.userInfo.userId).then(
        data => {
          if (data.code == 200) {
            this.userInfo = data.data;
          } else {
            this.prompt(data.msg);
          }
        }
      );
      revenueObvious().then(
        data => {
          if (data.code == 200) {
            this.incomeInfo = data.data;
          } else {
            this.prompt(data.msg);
          }
        }
      );
    },
    jump(url){
      window.location.href = url;
    }
  },
  mounted() {
    document.title = '个人中心';
    if (this.$store.state.userInfo.userId) {
      this.pageData();
    } else {
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
    background-color: #ffffff;
    width: 100%;
    height: rem(300);
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
      color: #afa2a3;
    }
    .userInfoBox {
      text-align: center;
      .userHead {
        display: flex;
        justify-content: center;
      }
      .userHeadBox {
        width: rem(136);
        height: rem(136);
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
        margin-top: rem(10);
        margin-bottom: rem(10);
      }
      .level {
        color: #0e6aaf;
        margin-top: rem(5);
        font-size: rem(16);
      }
    }
  }

  .statistics {
    height: rem(422);
    // height: rem(215);
    padding: rem(32) rem(45)  rem(10) rem(45);
    @include statistics();
  }

  .featuresBox {
    margin-top: rem(24);
    margin-bottom: rem(100);
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
          width: rem(40);
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
        .icon_img_8 {
          background-image: url(../images/me_icon_tuiguang.png)
        }
        .icon_img_9 {
          background-image: url(../images/me_icon_jiaoyouliaot.png)
        }
        .icon_img_10 {
          background-image: url(../images/me_icon_kefu.png)
        }
        .icon_img_11 {
          background-image: url(../images/fankui.png);
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
