<template>
  <div class="incomePage" v-load-more="loaderMore" type="1">
    <head-top>我的收益</head-top>
    <div class="incomeBox">
      <div class="rule">
        <span>说明规则</span>
      </div>
      <div class="incomeDisplay">
        <div class="incomeType" :class="{'current':incomeState == 1}" @click="incomeState = 1">
          <div class="child">总收益</div>
          <div class="child">500</div>
          <div class="details incomeDisplay">
            <div class="incomeType">
              <div class="child">分享奖</div>
              <div class="child">500</div>
            </div>
            <div class="incomeType">
              <div class="child">直接奖</div>
              <div class="child">500</div>
            </div>
            <div class="incomeType">
              <div class="child">间接奖</div>
              <div class="child">500</div>
            </div>
          </div>
          <div class="arrow"></div>
        </div>
        <div class="incomeType" :class="{'current':incomeState == 2}" @click="incomeState = 2">
          <div class="child">已提现</div>
          <div class="child">500</div>
          <div class="details incomeDisplay">
            <div class="incomeType">
              <div class="child">分享奖</div>
              <div class="child">20</div>
            </div>
            <div class="incomeType">
              <div class="child">直接奖</div>
              <div class="child">288</div>
            </div>
            <div class="incomeType">
              <div class="child">间接奖</div>
              <div class="child">500</div>
            </div>
          </div>
          <div class="arrow"></div>
        </div>
        <div class="incomeType" :class="{'current':incomeState == 3}" @click="incomeState = 3">
          <div class="child">未提现</div>
          <div class="child">500</div>
        </div>
      </div>
      <div class="withdraw" @click="$router.push('/withdraw')">
        提现
      </div>
    </div>
    <div class="expenditureTitle">
      收支明细
    </div>
    <div class="expenditureBox">
      <div class="expenditureList" v-for="(item,index) of waterList">
        <div class="titleTime">
          <h3>{{item.title}}</h3>
          <p>{{item.orderDate}}</p>
        </div>
        <div class="money">
          <span v-if="item.type == 1">+</span>
          <span v-if="item.type == 2">-</span>
          <span>{{item.fee}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFlowingWater } from '@/api/user'
import { loadMore } from '@/components/common/mixin'
export default {
  data() {
    return {
      incomeState: 1,
      waterList: [],
      pageNo: 1,
      pageSize: 7,
      preventRepeatReuqest: false
    }
  },
  mixins: [loadMore],
  methods: {
    //页面数据
    pageData() {

    },
    //到达底部加载更多数据
    loaderMore() {
      if (this.preventRepeatReuqest) {
        return
      }
      this.preventRepeatReuqest = true;
      getFlowingWater(this.pageNo, this.pageSize).then(
        data => {
          if (data.code == 200) {
            this.waterList = this.waterList.concat(data.data.list);
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
    document.title = '我的收益';
    if (this.$store.state.userInfo.userId) {
      this.pageData();
      this.loaderMore();
    } else {
      this.$router.push('/registered/0');
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.incomePage {
  .incomeBox {
    background-image: linear-gradient(141deg, #50e1ff 0%, #4daefe 100%),
    linear-gradient( #ffffff, #ffffff);
    padding: 0 rem(45);
    height: rem(550);
    position: relative;
    .rule {
      padding: rem(24) 0;
      display: flex;
      justify-content: flex-end;
      span {
        font-size: rem(28);
        color: #fefefe;
      }
    }
    .incomeDisplay {
      width: 100%;
      display: flex;
      background-color: #FFF;
      .incomeType {
        flex: 1;
        text-align: center;
        color: #333333;
        font-size: rem(28);
        border-left: 1px solid #ebebeb;
        position: relative;
        .child {
          height: rem(88);
          line-height: rem(88);
        }
        .child:first-child {
          border-bottom: 1px solid #ebebeb;
        }
        .arrow {
          position: absolute;
          bottom: -0.6rem;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-bottom: rem(22) solid #FFF;
          border-left: rem(15) solid transparent;
          border-right: rem(15) solid transparent;
          display: none;
        }
        .details {
          position: absolute;
          top: calc(100% + 0.6rem);
          width: calc(300% + 3px);
          display: none;
          left: -1px;
        }
        &:nth-child(2) {
          .details {
            left: calc(-100% - 2px);
          }
        }
      }
      .current {
        >.child {
          color: #f39800;
        }
        .details {
          display: flex;
        }
        .arrow {
          display: block;
        }
      }
    }
    .withdraw {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%) translateY(50%);
      background-color: #5fe4ff;
      width: rem(268);
      height: rem(78);
      text-align: center;
      line-height: rem(78);
      font-size: rem(36);
      color: #ffffff;
      border-radius: 4px 4px 4px 4px;
    }
  }
  .expenditureTitle {
    padding: rem(39) rem(47) rem(30) rem(47);
    font-size: rem(28);
    color: #333333;
  }
  .expenditureBox {
    background-color: #FFF;
    padding: 0 rem(30);
    .expenditureList {
      display: flex;
      padding: rem(20) 0;
      border-bottom: 1px solid #ebebeb;
      justify-content: space-between;
      .titleTime {
        h3 {
          color: #999999;
          font-size: rem(26);
        }
        p {
          color: #999999;
          font-size: rem(20);
        }
      }
      .money {
        display: flex;
        align-items: center;
        span {
          color: #ff7a00;
          font-size: rem(30);
        }
      }
    }
  }
}
</style>
