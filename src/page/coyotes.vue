<template>
  <div class="coyotesPage">
    <head-top>我的小狼</head-top>
    <div class="coyotesInfo">
      <div class="msg">
        <div>待注册</div>
        <div>一般会员</div>
        <div>游戏代理</div>
        <div>创业商家代理</div>
      </div>
      <div class="msg">
        <div>{{agentInfo.notRegister}}</div>
        <div>{{agentInfo.register}}</div>
        <div>{{agentInfo.gameProxy}}</div>
        <div>{{agentInfo.superProxy}}</div>
      </div>
    </div>
    <div class="subordinateTitle">
      <div>姓名</div>
      <div>微信名</div>
      <div>类别</div>
    </div>
    <div class="offlineBox" v-load-more="loaderMore" type="1">
      <div class="offlineList" v-for="(item,index) of agentList">
        <div @click="$router.push('/offlineInfo/'+item.id)">{{item.username}}</div>
        <div>{{item.openName}}</div>
        <div>{{item.levelName}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAgentStatistics,anAgent } from '@/api/user'
import {loadMore} from '@/components/common/mixin'
export default {
  data () {
    return {
      agentInfo:{},
      agentList: [],
      pageNo: 1,
      pageSize: 10,
      preventRepeatReuqest:false
    }
  },
  mixins: [loadMore],
  methods:{
    //页面数据
    pageData() {
      getAgentStatistics().then(
        data => {
          if (data.code == 200) {
            this.agentInfo = data.data;
          }else{
            this.prompt(data.msg);
          }
        }
      );
    },
    //到达底部加载更多数据
    loaderMore(){
      if (this.preventRepeatReuqest) {
				return
      }
      this.preventRepeatReuqest = true;
      anAgent(this.$store.state.userInfo.userId,this.pageNo, this.pageSize).then(
        data => {
          if (data.code == 200) {
            this.agentList = this.agentList.concat(data.data.list);
            this.preventRepeatReuqest = false;
            if(data.data.list.length < this.pageSize){
              this.preventRepeatReuqest = true;
            }else{
              this.pageNo++;
            }
          } else if(data.code == 204){
            this.prompt(data.msg);
            this.preventRepeatReuqest = true;
          }else{
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
    document.title = '我的小狼';
    if(this.$store.state.userInfo.userId){
      this.pageData();
      this.loaderMore();
    }else{
      this.$router.push('/registered/0');
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.coyotesPage {
  .coyotesInfo {
    margin: rem(26) rem(21);
    background-color: #FFF;
    border-right: 1px solid #cdcdcd;
    border-bottom: 1px solid #cdcdcd;
    .msg {
      display: flex;
      border-top: 1px solid #cdcdcd;
      >div {
        flex: 1;
        font-size: rem(24);
        text-align: center;
        height: rem(88);
        line-height: rem(88);
        border-left: 1px solid #cdcdcd;
      }
    }
  }
  .subordinateTitle {
    margin: rem(26) rem(21);
    border-right: 1px solid #cdcdcd;
    border-bottom: 1px solid #cdcdcd;
    border-top: 1px solid #cdcdcd;
    background-color: #FFF;
    display: flex;
    >div {
      flex: 1;
      font-size: rem(24);
      text-align: center;
      height: rem(88);
      line-height: rem(88);
      border-left: 1px solid #cdcdcd;
    }
  }
  .offlineBox {
    padding: 0 rem(36);
    .offlineList {
      display: flex;
      padding: rem(20) 0;
      >div {
        flex: 1;
        font-size: rem(24);
        color: #333333;
      }
      div:first-child {
        color: #f39800;
      }
      div:nth-child(2){
        text-align: center;
      }
      div:last-child {
        text-align: right;
      }
    }
  }
}
</style>
