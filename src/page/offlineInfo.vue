<template>
  <div class="offlineInfoPage">
    <head-top>详情</head-top>
    <div class="personalInfo">
      <div class="infoBox">
        <label>头像</label>
        <div class="userHeadBox">
          <img :src="'http://'+userInfo.avater">
        </div>
      </div>
      <div class="infoBox">
        <label>姓名</label>
        <div class="select">
          {{userInfo.username}}
        </div>
      </div>
      <div class="infoBox" @click="genderBoxState = true">
        <label>会员等级</label>
        <div class="select">
          <span v-if="userInfo.level == 0">未注册</span>
          <span v-if="userInfo.level == 1">一般会员</span>
          <span v-if="userInfo.level == 2">二级游戏代理</span>
          <span v-if="userInfo.level == 3">三级游戏代理</span>
          <span v-if="userInfo.level == 4">创业商家代理</span>
        </div>
      </div>
      <div class="infoBox" @click="genderBoxState = true">
        <label>性别</label>
        <div class="select">
          <span v-if="userInfo.sex == 0">男</span>
          <span v-if="userInfo.sex == 1">女</span>
        </div>
      </div>
      <div class="infoBox" @click="ageBoxState = true">
        <label>年龄</label>
        <div class="select">
          <span v-if="userInfo.age == 0">小于20</span>
          <span v-if="userInfo.age == 1">20-30</span>
          <span v-if="userInfo.age == 2">30-40</span>
          <span v-if="userInfo.age == 3">大于40</span>
        </div>
      </div>
      <div class="infoBox" @click="areaBoxState = true">
        <label>地区</label>
        <div class="select">
          <span v-if="userInfo.area == 0">随州经济开发区</span>
          <span v-if="userInfo.area == 1">曾都区</span>
          <span v-if="userInfo.area == 2">随县</span>
          <span v-if="userInfo.area == 3">广水市</span>
        </div>
      </div>
    </div>
    <div class="offlineTitle">
      TA的下级
    </div>
    <div class="offlineUserBox" v-load-more="loaderMore" type="1">
      <div class="userList" v-for="(item,index) of agentList">
        <div class="userImg">
          <img :src="'http://'+item.avater">
        </div>
        <div class="userText">
          <h2>{{item.openName}}</h2>
          <p>{{item.levelName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo, anAgent } from '@/api/user'
import { loadMore } from '@/components/common/mixin'
export default {
  data() {
    return {
      userInfo: {},
      agentList: [],
      pageNo: 1,
      pageSize: 10,
      preventRepeatReuqest: false
    }
  },
  mixins: [loadMore],
  methods: {
    //页面数据
    pageData() {
      getUserInfo(this.$route.params.id).then(
        data => {
          if (data.code == 200) {
            this.userInfo = data.data;
          } else {
            this.prompt(data.msg);
          }
        }
      );
    },
    //到达底部加载更多数据
    loaderMore() {
      if (this.preventRepeatReuqest) {
        return
      }
      this.preventRepeatReuqest = true;
      anAgent(this.$route.params.id, this.pageNo, this.pageSize).then(
        data => {
          if (data.code == 200) {
            this.agentList = this.agentList.concat(data.data.list);
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
    document.title = '详情';
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
.offlineTitle {
  padding: rem(30) rem(40);
  font-size: rem(30);
  color: #333333;
}

.offlineUserBox {
  background-color: #FFF;
  .userList {
    display: flex;
    padding: rem(30) rem(40);
    border-bottom: 1px solid #ebebeb;
    .userImg {
      width: rem(100);
      height: rem(100);
      flex-shrink: 0;
      border-radius: 50%;
      overflow: hidden;
      margin-right: rem(35);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .userText {
      padding: rem(10) 0;
      h2 {
        color: #333333;
        font-size: rem(30);
      }
      p {
        font-size: rem(24);
        color: #666666;
      }
    }
  }
}
</style>
