<template>
  <div class="withdrawPage">
    <head-top>提现</head-top>
    <div class="accountTitle">
      请填写银行卡信息
    </div>
    <div class="account">
      <div class="inputBox">
        <input type="text" placeholder="请输入开户名" v-model="bankUser">
      </div>
      <div class="inputBox">
        <input type="text" placeholder="请输入开户行" v-model="bankType">
      </div>
      <div class="inputBox">
        <input type="number" placeholder="请输入银行卡账号" v-model="bankAccount">
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
        可提现金额：￥{{canBeRaised | decimal}}，费率：{{ratio}}
      </div>
    </div>
    <div class="publicBut">
      <button @click="submit">提交</button>
    </div>
    <div class="description">
      <p>提现说明：</p>
      <p v-for="(item,index) of info[0].list">{{item}}</p>
    </div>
    <div class="mask" v-show="windowState"></div>
    <div class="withdrawWindow" v-show="windowState">
      <div class="title">
        提现密码
      </div>
      <div class="content">
        <input type="password" placeholder="请输入提现密码" v-model="password">
      </div>
      <div class="operating">
        <button @click="windowState = false">取消</button>
        <button @click="getWithdraw">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import { canBeRaisedApi, withdrawApi, setDescription,bindBank,getBank,getRatio } from "@/api/user";
export default {
  data() {
    return {
      withdraw: "",
      bankUser:'',
      bankType:'',
      bankAccount:'',
      canBeRaised:'',
      password:"",
      bankId:'',
      colse: false,
      windowState: false,
      info: [{ list: [] }],
      ratio:0
    };
  },
  watch: {
    withdraw(val) {
      var value = val.replace(/[^0-9.]/g,'');
      if (value < 0) {
        this.withdraw = Math.abs(value);
        this.colse = true;
      }else {
        this.withdraw = value;
        this.colse = true;
      }
    }
  },
  methods: {
    //获取可提现金额
    setCanBeRaised() {
      canBeRaisedApi().then(data => {
        if (data.code == 200) {
          this.canBeRaised = data.data;
        } else {
          this.prompt(data.msg);
        }
      });
      setDescription(4444).then(data => {
        if (data.code == 200) {
          this.info = data.data;
        } else {
          this.prompt(data.msg);
        }
      });
      getBank().then(data => {
        if (data.code == 200) {
          this.bankUser = data.data.bankUser ? data.data.bankUser : '';
          this.bankType = data.data.bankType ? data.data.bankType : '';
          this.bankAccount = data.data.bankAccount ? data.data.bankAccount : '';
        }
      });
      getRatio().then(data => {
        if (data.code == 200) {
          this.ratio = data.data;
        }else{
          this.prompt(data.msg);
        }
      });
    },
    submit(){
      if(this.bankUser == ''){
        this.prompt('请输入开户名');
      }else if(this.bankType == ''){
        this.prompt('请输入开户行');
      }else if(this.bankType == ''){
        this.prompt('请输入银行账号');
      }else if (this.withdraw == "") {
        this.prompt("请输入提现金额");
      } else if (parseFloat(this.withdraw) > parseFloat(this.canBeRaised)) {
        this.prompt("超出可提现金额");
      }else{
        bindBank(this.bankUser,this.bankType,this.bankAccount).then(data => {
          if (data.code == 200) {
            this.bankId = data.data;
            this.windowState = true;
          } else {
            this.prompt(data.msg);
          }
        });
      }
    },
    //提现
    getWithdraw() {
      if (this.password == "") {
        this.prompt("请输入提现密码");
      }else {
        withdrawApi(this.withdraw,this.bankId,this.password ,3).then(data => {
          if (data.code == 200) {
            this.prompt("申请提现成功！");
            this.windowState = false;
            this.$router.push('/income');
          } else {
            this.prompt(data.msg);
          }
        });
      }
    }
  },
  mounted() {
    document.title = "提现";
    if (this.$store.state.userInfo.userId) {
      this.setCanBeRaised();
    } else if(this.$store.state.userInfoState){
      this.$parent.judgment().then(data => {
        if(data){
          this.setCanBeRaised();
        }else{
          this.$router.push('/registered');
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.withdrawPage {
  .accountTitle {
    padding: rem(28) rem(51) rem(14) rem(51);
    color: #333333;
    font-size: rem(30);
  }
  .account {
    margin: 0px rem(21);
    padding: rem(20) rem(29);
    background-color: #fff;
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
        content: "\e632";
        display: block;
        font-size: rem(44);
        color: #d5d5d5;
      }
    }
    .current {
      i:after {
        content: "\e692";
        color: #f39800;
      }
    }
    .inputBox {
      border-bottom: 1px solid #dadada;
      input {
        width: 100%;
        height: rem(80);
        line-height: rem(80);
      }
    }
  }
  .withdrawInfo {
    margin: rem(26);
    padding: rem(30);
    border-radius: rem(5);
    background-color: #fff;
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
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.withdrawWindow {
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: #fff;
  z-index: 101;
  transform: translateX(-50%) translateY(-50%);
  width: 90%;
  border-radius: rem(10);
  overflow: hidden;
  .title {
    text-align: center;
    padding: rem(30);
    font-size: rem(36);
    border-bottom: 1px solid #e5e5e5;
    color: #666666;
  }
  .content {
    padding: rem(60);
    input {
      width: 100%;
      border: 1px solid #ebebeb;
      height: rem(90);
      padding: 0 rem(20);
      box-sizing: border-box;
    }
  }
  .operating {
    border-top: 1px solid #e5e5e5;
    display: flex;
    button {
      flex: 1;
      height: rem(110);
      font-size: rem(36);
      background-color: transparent;
    }
    button:first-child {
      border-right: 1px solid #e5e5e5;
      color: #999999;
    }
    button:last-child {
      color: #f39800;
    }
  }
}
</style>
