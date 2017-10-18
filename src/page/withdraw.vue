<template>
  <div class="withdrawPage">
    <head-top>提现</head-top>
    <div class="accountTitle">
      请选择提现账号
    </div>
    <div class="account">
      <div class="accountList">
        <span>微信</span>
        <i class="icon"></i>
      </div>
      <div class="accountList current">
        <span>支付宝</span>
        <i class="icon"></i>
      </div>
      <div class="inputBox">
        <input type="text" placeholder="请输入支付宝账号">
      </div>
    </div>
    <div class="withdrawInfo">
      <div class="withdrawDescription">
        提现金额
      </div>
      <div class="withdrawInput">
        <div class="symbol">
          <span>￥</span>
        </div>
        <input type="text" v-model="withdraw">
        <div class="emptied" v-show="colse" @click="">
          <i class="icon">&#xe641;</i>
        </div>
      </div>
      <div class="totalAmount">
        可提现金额：￥{{canBeRaised | decimal}}
      </div>
    </div>
    <div class="publicBut">
      <button @click="getWithdraw">保存</button>
    </div>
    <div class="description">
      <p>提现奖金说明：</p>
      <p>1.成功申请成为创业商家代理，才能提现奖金。</p>
      <p>2.每推荐成功1个创业商家代理，才能取出10个分享奖励的现金。</p>
      <p>3.提现申请后，第二日到账微信零钱。</p>
    </div>
  </div>
</template>
<script>
import { canBeRaisedApi, withdrawApi } from '@/api/user'
export default {
  data() {
    return {
      withdraw: '',
      canBeRaised: 0,
      colse: false
    }
  },
  watch: {
    withdraw(val) {
      var value = parseFloat(val);
      if (value === 0 || value.toString() === 'NaN') {
        this.withdraw = '';
        this.colse = false;
      } else if (value < 0) {
        this.withdraw = Math.abs(value);
        this.colse = true;
      } else {
        this.withdraw = value;
        this.colse = true;
      }
    }
  },
  methods: {
    //获取可提现金额
    setCanBeRaised() {
      canBeRaisedApi().then(
        data => {
          if (data.code == 200) {
            this.canBeRaised = data.data;
          } else {
            this.prompt(data.msg);
          }
        }
      );
    },
    //提现
    getWithdraw() {
      if (this.withdraw == '') {
        this.prompt('请输入提现金额');
      } else if (parseFloat(this.withdraw) > parseFloat(this.canBeRaised)) {
        this.prompt('超出可提现金额');
      } else {
        withdrawApi(this.withdraw).then(
          data => {
            if (data.code == 200) {
              this.prompt('申请提现成功！');
            } else {
              this.prompt(data.msg);
            }
          }
        );
      }
    }
  },
  mounted() {
    document.title = '提现';
    if (this.$store.state.userInfo.userId) {
      this.setCanBeRaised();
    } else {
      this.$router.push('/registered/0');
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.withdrawPage {
  .accountTitle {
    padding: rem(28) rem(51) rem(14) rem(51);
    color: #333333;
    font-size: rem(30);
  }
  .account {
    margin: 0px rem(21);
    padding: rem(20) rem(29);
    background-color: #FFF;
    border-radius: rem(5);

    .accountList {
      display: flex;
      justify-content: space-between;
      padding: rem(20) 0;
      span {
        color: #333333;
        font-size: rem(30);
      }
      i:after {
        content: '\e632';
        display: block;
        font-size: rem(44);
        color: #d5d5d5;
      }
    }
    .current {
      i:after {
        content: '\e692';
        color: #f39800;
      }
    }
    .inputBox {
      border-bottom: 1px solid #dadada;
      input {
        height: rem(80);
        line-height: rem(80);
      }
    }
  }
  .withdrawInfo {
    margin: rem(26);
    padding: rem(30);
    border-radius: rem(5);
    background-color: #FFF;
    .withdrawDescription {
      font-size: rem(30);
      color: #333333;
    }
    .withdrawInput {
      margin-top: rem(20);
      border-bottom: 1px solid #dadada;
      display: flex;
      padding: rem(20) 0;

      input {
        font-size: rem(60);
        flex: 1;
        width: 100%;
      }
      .symbol {
        display: flex;
        align-items: flex-end;
        margin-right: rem(16);
        span {
          font-size: rem(50);
        }
      }
      .emptied {
        display: flex;
        align-items: center;
        margin-left: rem(16);
        i {
          font-size: rem(40);
          color: #cacaca;
        }
      }
    }
    .totalAmount {
      padding-top: rem(17);
      font-size: rem(28);
      color: #999999;
    }
  }
  .description {
    padding: rem(60) rem(80);
    font-size: rem(24);
    color: #666666;
    line-height: 200%;
  }
}
</style>
