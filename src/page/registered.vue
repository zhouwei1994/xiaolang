<template>
  <div class="registeredPage">
    <div class="inputBox">
      <label>我的上级</label>
      <div class="superior">
        <span>{{superior}}</span>
      </div>
    </div>
    <div class="inputBox">
      <label>游戏ID</label>
      <div class="inputText">
        <input type="number" v-model="gameId" placeholder="请输入游戏ID">
      </div>
    </div>
    <div class="remarks">（请先下载游戏，app软件左上角有游戏ID）</div>
    <div class="inputBox">
      <label>姓　名</label>
      <div class="inputText">
        <input type="text" v-model="name" placeholder="请输入姓名">
      </div>
    </div>
    <div class="inputBox">
      <label>手机号</label>
      <div class="inputText">
        <input type="tel" v-model="phone" placeholder="请输入手机号">
      </div>
    </div>
    <div class="inputBox">
      <label>验证码</label>
      <div class="inputText">
        <input type="number" v-model="code" placeholder="验证码">
        <button @click="setCode">{{codeText}}</button>
      </div>
    </div>
    <div class="inputBox">
      <label>提现密码</label>
      <div class="inputText">
        <input type="password" v-model="password" placeholder="请输入6位数字提现密码">
      </div>
    </div>
    <div class="inputBox">
      <label>确认密码</label>
      <div class="inputText">
        <input type="password" v-model="detePassword" placeholder="请确认提现密码">
      </div>
    </div>
    <div class="inputBox">
      <label>性　别</label>
      <div class="radioBox">
        <div class="radio" :class="{'current':sex === 0}" @click="sex = 0">
          <i class="icon"></i>
          <span>男</span>
        </div>
        <div class="radio" :class="{'current':sex === 1}" @click="sex = 1">
          <i class="icon"></i>
          <span>女</span>
        </div>
      </div>
    </div>
    <div class="inputBox">
      <label>年　龄</label>
      <div class="inputText text" @click="ageBoxState = true">
        {{ageValue.name}}
      </div>
    </div>
    <div class="inputBox">
      <label>地　区</label>
      <div class="inputText text" @click="areaBoxState = true">
        {{areaValue.name}}
      </div>
    </div>
    <div class="but">
      <button @click="register">立即注册</button>
    </div>
    <div class="description">
      <p>说明</p>
      <p>1.注册成功，即送20元现金奖励。</p>
      <p>2.注册成功，即获得小狼人勋章，享线下商家消费优惠。</p>
      <p>3.注册后即可推广，获推广奖励。成功推荐一个注册会员， 奖励20元；成功推荐一个创业商家代理奖励288元； 间接推荐一个商家代理奖励30元。</p>
    </div>
    <picker v-model="ageBoxState" :data-items="ageItems" @change="onAgeChange">
      <div class="top-content" slot="top-content">
        <span @click="ageBoxState = false">确定</span>
      </div>
    </picker>
    <picker v-model="areaBoxState" :data-items="areaItems" @change="onAreaChange">
      <div class="top-content" slot="top-content">
        <span @click="areaBoxState = false">确定</span>
      </div>
    </picker>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import picker from "vue-3d-picker";
import { myCode, register, setSuperior } from "@/api/user";
const age = [
  { name: "20以下", value: 0 },
  { name: "20-30", value: 1 },
  { name: "30-40", value: 2 },
  { name: "40以上", value: 3 }
];
const area = [
  { name: "随州经济发区", value: 0 },
  { name: "增都区", value: 1 },
  { name: "随县", value: 2 },
  { name: "广水市", value: 3 }
];
var clear;
export default {
  components: {
    picker
  },
  data() {
    return {
      //游戏ID
      gameId: "",
      //姓名
      name: "",
      //手机号
      phone: "",
      //验证码
      code: "",
      // 提现密码
      password: "",
      //确认密码
      detePassword: "",
      //性别
      sex: "",
      //年龄选择状态
      ageBoxState: false,
      ageValue: { name: "请选择", value: -1 },
      //年龄选择数据
      ageItems: [
        {
          values: age,
          index: 0,
          name: "name"
        }
      ],
      //地区选择状态
      areaBoxState: false,
      areaValue: { name: "请选择", value: -1 },
      //地区选择数据
      areaItems: [
        {
          values: area,
          index: 0,
          name: "name"
        }
      ],
      //发送验证码文字
      codeText: "获取验证码",
      readonly: false,
      superior: "",
      opendId:'',
    };
  },
  mounted() {
    document.title = "会员注册";
    this.opendId = this.$route.params.id;
    this.pageData();
  },
  methods: {
    ...mapMutations([
      'setUserInfo'
    ]),
    pageData() {
      if (this.opendId == '' || this.opendId == 0) {
        this.$parent.judgment(true).then(
          () => {
            this.prompt('程序错误');
          },
          data => {
            console.log(data);
            this.opendId = data;
            setSuperior(data).then(data => {
              if (data.code == 200) {
                this.superior = data.data;
              } else {
                this.prompt(data.msg);
              }
            });
          }
        );
      } else {
        setSuperior(this.opendId).then(data => {
          if (data.code == 200) {
            this.superior = data.data;
          } else {
            this.prompt(data.msg);
          }
        });
      }
    },
    onAgeChange(val) {
      console.log(val);
      this.ageValue = val;
    },
    onAreaChange(val) {
      this.areaValue = val;
    },
    //验证码按钮文字状态
    getCodeState() {
      const _this = this;
      this.readonly = true;
      this.codeText = "60S后重新获取";
      var s = 60;
      clear = setInterval(() => {
        s--;
        _this.codeText = s + "S后重新获取";
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
        this.prompt("验证码已发送");
      } else if (this.phone == "") {
        this.prompt("请填写手机号");
      } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
        this.prompt("手机号码格式不正确");
      } else {
        myCode(_this.phone).then(data => {
          if (data.code == 200) {
            _this.getCodeState();
          } else {
            _this.prompt(data.msg);
          }
        });
      }
    },
    //立即注册
    register() {
      var _this = this;
      if (this.opendId === 0) {
        this.prompt("获取微信openId失败，请退出重新尝试");
      } else if (this.gameId == "") {
        this.prompt("请输入游戏ID");
      } else if (this.name == "") {
        this.prompt("请输入姓名");
      } else if (this.phone == "") {
        this.prompt("请输入手机号码");
      } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)) {
        this.prompt("手机号码格式不正确");
      } else if (this.code == "") {
        this.prompt("请输入验证码");
      } else if (this.password == "") {
        this.prompt("请输入提现密码");
      } else if (!/^[0-9]{6}$/.test(this.password)) {
        this.prompt("提现密码由6位数字组成");
      } else if (this.detePassword == "") {
        this.prompt("请确认提现密码");
      } else if (this.detePassword != this.password) {
        this.prompt("两次密码不一致");
      } else if (this.sex === "") {
        this.prompt("请选择性别");
      } else if (this.ageValue.value === -1) {
        this.prompt("请选择年龄范围");
      } else if (this.areaValue.value === -1) {
        this.prompt("请选择地区");
      } else {
        register(
          this.opendId,
          this.gameId,
          this.name,
          this.phone,
          this.code,
          this.sex,
          this.ageValue.value,
          this.areaValue.value,
          this.password
        ).then(data => {
          if (data.code == 200) {
            this.setUserInfo({userId:data.data});
            //注册成功
            _this.prompt("注册成功！");
            _this.$router.go(-1);
          } else {
            _this.prompt(data.msg);
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
.registeredPage {
  padding: rem(25) rem(60);
  $h: rem(78);
  background-color: #fff;
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  .inputBox {
    display: flex;
    margin-top: rem(24);
    label {
      width: rem(120);
      font-size: rem(28);
      color: #666666;
      height: $h;
      line-height: $h;
      margin-right: rem(17);
      flex-shrink: 0;
    }
    .inputText {
      height: $h;
      line-height: $h;
      flex: 1;
      display: flex;
      border: 1px solid #d2d2d2;
      input {
        padding: 0px rem(30);
        height: 100%;
        width: 100%;
        font-size: rem(28);
      }
      button {
        flex-shrink: 0;
        background-color: #fff;
        padding: 0 rem(30);
        border-left: 1px solid #f39800;
        margin-top: rem(10);
        margin-bottom: rem(10);
        color: #f39800;
        font-size: rem(28);
      }
    }
    .text {
      color: #666666;
      font-size: rem(28);
      padding: 0px rem(30);
    }
    .superior {
      height: $h;
      line-height: $h;
      flex: 1;
      span {
        display: block;
        color: #666666;
        font-size: rem(28);
        text-align: right;
        flex: 1;
      }
    }
    .radioBox {
      height: $h;
      line-height: $h;
      display: flex;
      .radio {
        margin-right: rem(70);
        display: flex;
        i::after {
          content: "\e661";
          font-size: rem(38);
          color: #999;
        }
        span {
          font-size: rem(28);
          margin-left: rem(20);
        }
      }
      .current {
        i::after {
          content: "\e646";
          color: #f39800;
        }
      }
    }
  }
  .remarks {
    font-size: rem(24);
    color: #999999;
    margin-top: rem(10);
  }
  .but {
    margin-top: rem(70);
    button {
      width: 100%;
      height: rem(86);
      background-color: #f39800;
      color: #fff;
      font-size: rem(36);
      border-radius: 4px 4px 4px 4px;
    }
  }
  .description {
    padding: rem(60) rem(0);
    font-size: rem(24);
    color: #666666;
    line-height: 200%;
  }
}
</style>
