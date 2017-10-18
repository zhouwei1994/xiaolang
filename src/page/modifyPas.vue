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
          <input type="text" placeholder="请输入验证码">
          <button>发送验证码</button>
        </div>
      </div>
      <div class="inputBox">
        <label>新密码</label>
        <div>
          <input type="password" placeholder="请输入密码">
        </div>
      </div>
    </div>
    <div class="publicBut">
      <button>提交</button>
    </div>
  </div>
</template>
<script>
export default {
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
