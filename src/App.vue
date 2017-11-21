<template>
  <div id="app">
    <!--页面容器-->
    <transition :name="'pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition>
    <!-- <foot-guide></foot-guide> -->
    <loading :value="pageLoading || dataLoading"></loading>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import headTop from '@/components/header/head'
import footGuide from '@/components/footer/footGuide'
import loading from '@/components/common/loading'
import { setLogIn } from '@/api/user'
export default {
  components:{
    headTop,
    footGuide,
    loading
  },
  data () {
    return {

    }
  },
  computed:{
    ...mapState([
      'pageLoading',
      'dataLoading',
      'path',
      'direction'
    ])
  },
  created(){
    this.setCacheData();
  },
  methods:{
    ...mapMutations([
      'setCacheData',
      'setUserInfo'
    ]),
    //获取url中的参数
    getRequest() {
      var strs;
      var url = location.search; //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    },
    //判断新老用户，登录
    judgment(state) {
      return new Promise((resolve, reject) => {
        const code = this.getRequest().code;
        if (code) {
          setLogIn(code).then(
            data => {
              if (data.code == 200) {
                console.log(data.data);
                if (data.data.register) {
                  this.setUserInfo(data.data);
                  resolve();
                } else {
                  if(state){
                    reject(data.data.openId);
                  }else{
                    this.$router.push('/registered/' + data.data.openId);
                  }
                }
              } else {
                this.$router.push('/registered/' + 0);
                this.prompt('获取信息失败，请重新尝试');
              }
            }
          );
        } else {
          this.$router.push('/registered/' + 0);
          this.prompt('获取code失败，请重新尝试');
        }
      });
    }
  },
  mounted(){

  }
}
</script>
<style lang="scss">
@import 'src/style/common';
@import 'src/style/personal';
/**
* vue-router transition
*/

.router-view {
  width: 100%;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  backface-visibility: hidden;
}

.pop-out-enter-active,
.pop-out-leave-active,
.pop-in-enter-active,
.pop-in-leave-active {
  will-change: transform;
  height: 100%;
  position: fixed;
  left: 0;
}

.pop-out-enter-active {
  animation-name: popInLeft;
}

.pop-out-leave-active {
  animation-name: popOutRight;
}

.pop-in-enter-active {
  perspective: 1000;
  animation-name: popInRight;
}

.pop-in-leave-active {
  animation-name: popOutLeft;
}

@keyframes popInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes popOutLeft {
  from {
    opacity: 1;
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes popInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes popOutRight {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>

