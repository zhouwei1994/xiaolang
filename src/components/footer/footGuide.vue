<template>
  <footer id="foot_guide" v-show="pageState">
    
    <div class="menu" :class="{'current':path == '/goodsHome'}" @click="$router.push('/goodsHome')">
      <i></i>
      <p>代理商城</p>
    </div>
    <!-- <div class="menu" :class="{'current':path == '/proxyList'}" @click="$router.push('/proxyList')">
      <i></i>
      <p>优品代理</p>
    </div> -->
    <div class="menu" :class="{'current':path == '/'}" @click="$router.push('/')">
      <i></i>
      <p>个人中心</p>
    </div>
  </footer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'path'
    ]),
    pageState(){
      if(this.path == '/'){
        return true;
      }else{
        return /entertainment|goodsHome|proxyList/g.test(this.path);
      }
    }
  },
}
</script>
<style lang="scss" scoped>
@import "../../style/mixin";
#foot_guide {
  background-color: #fff;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  display: flex;
  padding: rem(12) 0;
  > .menu {
    flex: 1;
    i {
      display: block;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: auto 100%;
      height: rem(44);
    }
    p {
      color: #888888;
      font-size: rem(20);
      text-align: center;
      margin-top: rem(5);
    }
  }
  .menu:nth-child(1) {
    i {
      background-image: url(../../images/tabbar_icon_youhuishangjia_default.png);
    }
  }
  // .menu:nth-child(2) {
  //   i {
  //     background-image: url(../../images/tabbar_icon_youpingdaili_default.png);
  //   }
  // }
  .menu:nth-child(2) {
    i {
      background-image: url(../../images/tabbar_icon_me.png);
    }
  }
  .current {
    p {
      color: #12aa1b;
    }
  }
  .current:nth-child(1) {
    i {
      background-image: url(../../images/tabbar_icon_youhuishangjia.png);
    }
  }
  // .current:nth-child(2) {
  //   i {
  //     background-image: url(../../images/tabbar_icon_youpingdail.png);
  //   }
  // }
  .current:nth-child(2) {
    i {
      background-image: url(../../images/tabbar_icon_me_pressed.png);
    }
  }
}
</style>
