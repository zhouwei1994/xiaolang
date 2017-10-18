<template>
  <div class="personalDataPage">
    <head-top>个人资料</head-top>
    <div class="personalInfo">
      <div class="infoBox active">
        <label>头像</label>
        <div class="userHeadBox">
          <img :src="'http://'+userInfo.avater">
        </div>
        <input type="file" :value="fileUrl" @change="clipImg($event)" />
      </div>
      <div class="infoBox">
        <label>姓名</label>
        <input type="text" class="userName" v-model="userInfo.username">
      </div>
      <div class="infoBox active" @click="genderBoxState = true">
        <label>性别</label>
        <div class="select" v-if="genderItems[0].values[userInfo.sex]">
          {{genderItems[0].values[userInfo.sex].name}}
        </div>
        <div class="select" v-else>
          请选择
        </div>
      </div>
      <div class="infoBox active" @click="ageBoxState = true">
        <label>年龄</label>
        <div class="select" v-if="ageItems[0].values[userInfo.age]">
          {{ageItems[0].values[userInfo.age].name}}
        </div>
        <div class="select" v-else>
          请选择
        </div>
      </div>
      <div class="infoBox active" @click="$router.push('/verifyPhone/'+userInfo.phone)">
        <label>手机号</label>
        <div class="select">
          {{userInfo.phone}}<i class="icon">&#xe612;</i>
        </div>
      </div>
      <div class="infoBox active" @click="areaBoxState = true">
        <label>地区</label>
        <div class="select" v-if="areaItems[0].values[userInfo.area]">
          {{areaItems[0].values[userInfo.area].name}}
        </div>
        <div class="select" v-else>
          请选择
        </div>
      </div>
      <div class="infoBox active" @click="$router.push('/modifyPas/'+userInfo.phone)">
        <label>修改提现密码</label>
        <div class="select">
          <i class="icon">&#xe612;</i>
        </div>
      </div>
    </div>
    <div class="publicBut">
      <button @click="modify">保存</button>
    </div>
    <picker v-model="genderBoxState" :data-items="genderItems" @change="onGenderChange">
      <div class="top-content" slot="top-content">
        <span @click="genderBoxState = false">确定</span>
      </div>
    </picker>
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
    <!--截取图片组件-->
    <clip @file="fileImg" @viewState="fileUrl = ''" v-model="imgFiles"></clip>
  </div>
</template>
<script>
import picker from 'vue-3d-picker'
import clip from '@/components/common/uploadClip'
import { getUserInfo, modifyUserInfo,modifyUserHead } from '@/api/user'
const gender = [
  { name: '男', value: 0 },
  { name: '女', value: 1 },
];
const age = [
  { name: '20以下', value: 0 },
  { name: '20-30', value: 1 },
  { name: '30-40', value: 2 },
  { name: '40以上', value: 3 }
];
const area = [
  { name: '随州经济发区', value: 0 },
  { name: '增都区', value: 1 },
  { name: '随县', value: 2 },
  { name: '广水市', value: 3 }
];
export default {
  components: {
    picker,
    clip
  },
  data() {
    return {
      //性别选择状态
      genderBoxState: false,
      //性别选择数据
      genderItems: [
        {
          values: gender,
          index: 0,
          name: 'name'
        }
      ],
      //年龄选择状态
      ageBoxState: false,
      //年龄选择数据
      ageItems: [
        {
          values: age,
          index: 0,
          name: 'name'
        }
      ],
      //地区选择状态
      areaBoxState: false,
      //地区选择数据
      areaItems: [
        {
          values: area,
          index: 0,
          name: 'name'
        }
      ],
      //图片数据
      imgFiles: '',
      fileUrl: '',
      userInfo: {
        sex: 0,
        age: 0,
        area: 0
      }
    }
  },
  mounted() {
    document.title = '个人资料';
    if (this.$store.state.userInfo.userId) {
      this.pageData();
    } else {
      this.$router.push('/registered/0');
    }
  },
  methods: {
    //选择图片
    clipImg(event) {
      console.log(event.target.files[0]);
      this.imgFiles = event.target.files[0];
    },
    //截图回调
    fileImg(data) {
      this.fileUrl = '';
      console.log(data);
      const _this = this;
      var oData = new FormData();
      oData.append("file", data,'a.jpg');
      modifyUserHead(this.userInfo.id,oData).then(
        data => {
          if (data.code == 200) {
            this.userInfo.avater = data.data;
            this.prompt('修改头像成功！');
          }
        }
      );

    },
    //性别
    onGenderChange(val) {
      this.userInfo.sex = val.value;
      this.genderItems[0].index = val.value;
    },
    //年龄
    onAgeChange(val) {
      this.userInfo.age = val.value;
      this.ageItems[0].index = val.value;
    },
    //地区
    onAreaChange(val) {
      this.userInfo.area = val.value;
      this.areaItems[0].index = val.value;
    },
    //页面数据
    pageData() {
      getUserInfo(this.$store.state.userInfo.userId).then(
        data => {
          if (data.code == 200) {
            this.userInfo = data.data;
            this.genderItems[0].index = data.data.sex;
            this.ageItems[0].index = data.data.age;
            this.areaItems[0].index = data.data.area;
          }else {
            this.prompt(data.msg);
          }
        }
      );
    },
    //修改数据
    modify() {
      modifyUserInfo(this.userInfo.id,this.userInfo.username,this.userInfo.sex,this.userInfo.age,this.userInfo.area).then(
        data => {
          if (data.code == 200) {
            this.prompt('保存成功！');
          }else {
            this.prompt(data.msg);
          }
        }
      );
    },
  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
</style>
