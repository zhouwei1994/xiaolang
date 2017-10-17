<template>
  <div class="verifyPhonePage">
    <head-top>修改手机号</head-top>
    <div v-if="step == 1">
      <div class="phoneInfo">
        <div class="title">您的原手机号码为：</div>
        <div class="phone">{{$route.params.phone}}</div>
        <p>我们已向您发送短信验证码，30分钟内输入有效</p>
      </div>
      <div class="inputBox">
        <input type="text" v-model="oldCode" placeholder="请输入验证码">
        <button @click="setCode">{{codeText}}</button>
      </div>
      <div class="but">
        <button @click="verifyPhone">下一步</button>
      </div>
    </div>
    <div v-if="step == 2" class="newPhone">
      <div class="inputBox">
        <input type="text" v-model="newPhone" placeholder="请输入新手机号">
      </div>
      <div class="inputBox newInputBox">
        <input type="text" v-model="newCode" placeholder="请输入验证码">
        <button @click="setNewCode">{{newCodeText}}</button>
      </div>
      <div class="but">
        <button @click="getNewPhone">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
import { myCode, validate,newphoneApi } from '@/api/user'
var clear;
var newClear;
export default {
  data() {
    return {
      step: 1,
      //
      oldCode: '',
      //发送验证码文字
      codeText: '获取验证码',
      readonly: false,
      //新手机验证码文字
      newCodeText: '获取验证码',
      newReadonly: false,
      newPhone: '',
      newCode: ''
    }
  },
  methods: {
    //旧手机验证码按钮文字状态
    getOldCodeState() {
      const _this = this;
      this.readonly = true;
      this.codeText = '60S后重新获取';
      var s = 60;
      clear = setInterval(() => {
        s--;
        _this.codeText = s + 'S后重新获取';
        if (s == 0) {
          clearInterval(clear);
          _this.codeText = "获取验证码";
          _this.readonly = false;
        }
      }, 1000);
    },
    //新手机验证码按钮文字状态
    getNewCodeState() {
      const _this = this;
      this.newReadonly = true;
      this.newCodeText = '60S后重新获取';
      var s = 60;
      newClear = setInterval(() => {
        s--;
        _this.newCodeText = s + 'S后重新获取';
        if (s == 0) {
          clearInterval(newClear);
          _this.newCodeText = "获取验证码";
          _this.newReadonly = false;
        }
      }, 1000);
    },
    //获取验证码
    setCode() {
      var _this = this;
      if (_this.readonly) {
        this.prompt('验证码已发送');
      } else if (this.$route.params.phone && !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.$route.params.phone)) {
        this.prompt('获取手机号失败，请重新尝试');
      } else {
        myCode(_this.$route.params.phone).then(
          data => {
            if (data.code == 200) {
              _this.getOldCodeState();
            } else {
              _this.prompt(data.msg);
            }
          }
        )
      }
    },
    //验证手机
    verifyPhone() {
      var _this = this;
      if (!this.$route.params.phone && !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
        this.prompt('获取手机号失败，请重新尝试');
      } else if (this.oldCode == ''){
        this.prompt('请输入验证码');
      } else {
        validate(this.$route.params.phone, this.oldCode).then(
          data => {
            if (data.code == 200) {
              _this.step = 2;
            } else {
              _this.prompt(data.msg);
            }
          }
        );
      }
    },
    //获取新手机验证码
    setNewCode() {
      var _this = this;
      if (_this.newReadonly) {
        this.prompt('验证码已发送');
      } else if (this.newPhone == '') {
        this.prompt('请输入新手机号码');
      }else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.newPhone)){
        this.prompt('新手机号码格式不正确');
      } else {
        myCode(_this.newPhone).then(
          data => {
            if (data.code == 200) {
              _this.getNewCodeState();
            } else {
              _this.prompt(data.msg);
            }
          }
        )
      }
    },
    //新手机号码验证
    getNewPhone(){
      var _this = this;
      if (this.newPhone == '') {
        this.prompt('请输入新手机号码');
      }else if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.newPhone)){
        this.prompt('新手机号码格式不正确');
      } else if (this.newCode == ''){
        this.prompt('请输入验证码');
      } else {
        newphoneApi(this.newPhone, this.newCode).then(
          data => {
            if (data.code == 200) {
              _this.$router.push('/personalData');
            } else {
              _this.prompt(data.msg);
            }
          }
        );
      }
    }
  },
  mounted() {
    document.title = '修改手机号';
    if (this.$store.state.userInfo.userId) {
      this.setCode();
    } else {
      this.$router.push('/registered/0');
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.verifyPhonePage {
  .phoneInfo {
    padding: rem(43) rem(54);
    margin-bottom: rem(40);
    .title {
      font-size: rem(30);
      color: #999999;
    }
    .phone {
      padding: rem(47) 0;
      text-align: center;
      font-size: rem(46);
      color: #f39800;
    }
    p {
      font-size: rem(30);
      color: #999999;
    }
  }
  .inputBox {
    padding: 0 rem(40);
    background-color: #FFF;
    height: rem(110);
    line-height: rem(110);
    display: flex;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    input {
      width: 100%;
      padding-right: rem(20);
    }
    button {
      flex-shrink: 0;
      padding: 0 rem(20);
      background-color: transparent;
      font-size: rem(30);
      color: #f39800;
    }
  }
  .but {
    margin-top: rem(154);
    padding: 0px rem(35);
    button {
      height: rem(98);
      width: 100%;
      background-color: #f39800;
      border-radius: 4px 4px 4px 4px;
      color: #ffffff;
      font-size: rem(36);
    }
  }
  .newPhone {
    padding-top: rem(38);
    .newInputBox {
      border-top: 0px;
    }
  }
}
</style>
