<template>
  <div class="modifyPasPage">
    <head-top>修改提现密码</head-top>
    <div class="modifyPasBox">
      <div class="inputBox">
        <label>手机号</label>
        <span>
          {{$route.params.phone}}
        </span>
      </div>
      <div class="inputBox">
        <label>验证码</label>
        <div>
          <input type="text" placeholder="请输入验证码" v-model="code">
          <button @click="setCode">{{codeText}}</button>
        </div>
      </div>
      <div class="inputBox">
        <label>新密码</label>
        <div>
          <input type="password" placeholder="请输入密码" v-model="pwd">
        </div>
      </div>
    </div>
    <div class="publicBut">
      <button @click="modifypas">提交</button>
    </div>
  </div>
</template>
<script>
import { myCode,withdrawPas } from '@/api/user'
var clear;
export default {
  data(){
    return {
      //发送验证码文字
      codeText: '获取验证码',
      readonly: false,
      code:'',
      pwd:''
    }
  },
  methods:{
    getCodeState() {
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
              _this.getCodeState();
            } else {
              _this.prompt(data.msg);
            }
          }
        )
      }
    },
    modifypas() {
      var _this = this;
      if (!this.$route.params.phone && !/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
        this.prompt('获取手机号失败，请重新尝试');
      } else if (this.oldCode == ''){
        this.prompt('请输入验证码');
      } else if (this.pwd == ''){
        this.prompt('请输入新密码');
      } else if (!/^[0-9]{6}$/.test(this.pwd)){
        this.prompt('提现密码由6位数字组成');
      } else {
        withdrawPas(this.code, this.pwd).then(
          data => {
            if (data.code == 200) {
              _this.$router.push('/personalData');
            } else {
              _this.prompt(data.msg);
            }
          }
        );
      }
    },
  },
  mounted() {
    document.title = '修改提现密码';
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.modifyPasBox {
  background-color: #FFF;
  padding: rem(70) rem(55);
  margin-top: rem(20);
  .inputBox {
    display: flex;
    margin-top: rem(24);
    label {
      color: #666666;
      font-size: rem(28);
      line-height: rem(78);
      margin-right: rem(50);
      flex-shrink: 0;
    }
    span {
      font-size: rem(44);
      line-height: rem(78);
    }
    >div {
      border: 1px solid #d2d2d2;
      border-radius: 4px;
      flex: 1;
      display: flex;
      input {
        width: 100%;
        height: rem(78);
        line-height: rem(78);
        flex: 1;
        padding: 0 rem(15);
        display: block;
      }
      button {
        background-color: transparent;
        padding: 0 rem(28);
        color: #f39800;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          top: rem(13);
          bottom: rem(13);
          left: 0;
          width: 1px;
          background-color: #f39800;
        }
      }
    }
  }
  .inputBox:first-child {
    margin-top:0;
  }
}
</style>
