<template>
  <div class="goodsDetailsPage">
    <head-top>商品详情</head-top>
    <!-- 轮播图 -->
    <swiper class="mod-banner-scroll" :options="swiperOption">
      <swiper-slide :key="1">
        <img src="../../images/11.jpg">
      </swiper-slide>
      <swiper-slide :key="2">
        <img src="../../images/12.jpg">
      </swiper-slide>
      <swiper-slide :key="3">
        <img src="../../images/13.jpg">
      </swiper-slide>
      <swiper-slide :key="4">
        <img src="../../images/14.jpg">
      </swiper-slide>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="goodsDetailsBox">
      <h3>酷耶i5四核/8G内存/GTX1060独显/台式机电脑主机家用办公网伽大型游戏绝地求生吃鸡 电脑主机+GTX650独显</h3>
      <div class="price">
        ￥2788
      </div>
    </div>
    <div class="specification">
      <div class="specificationBox">
        <label>颜色</label>
        <ul>
          <li :class="{'current':parameterIndex == 0}" @click="parameterIndex = 0">电脑主机+GTX1050独显</li>
          <li :class="{'current':parameterIndex == 1}" @click="parameterIndex = 1">电脑主机+GTX750独显</li>
          <li :class="{'current':parameterIndex == 2}" @click="parameterIndex = 2">电脑主机+GTX650独显</li>
          <li :class="{'current':parameterIndex == 3}" @click="parameterIndex = 3">电脑主机+GTX1060独显</li>
          <li :class="{'current':parameterIndex == 4}" @click="parameterIndex = 4">GTX1050主机+23英寸显示器</li>
          <li :class="{'current':parameterIndex == 5}" @click="parameterIndex = 5">GTX750主机+23英寸显示器</li>
          <li :class="{'current':parameterIndex == 6}" @click="parameterIndex = 6">GTX1060主机+23英寸显示器</li>
        </ul>
      </div>
      <div class="specificationBox">
        <label>数量</label>
        <div class="numberBox">
          <button :class="{'bidden':number <= 1}" @click="number > 1 ? number-- : number">-</button>
          <input type="text" v-model="number">
          <button @click="number++">+</button>
        </div>
      </div>
    </div>
    <div class="parameterBox">
      <div class="title">商品参数</div>
      <ul>
        <li>
          商品名称：酷耶i5四核/8G内存/GTX1060独显/台式机电脑主机家用办公网伽大型游戏绝地求生吃鸡 电脑主机+GTX1050独显
        </li>
        <li>
          商品毛重：7.0kg
        </li>
        <li>
          商品产地：中国大陆
        </li>
        <li>
处理器：Intel i5
        </li>
        <li>
内存容量：8G
        </li>
        <li>
电脑用途：游戏为主
        </li>
        <li>
          硬盘容量：固态硬盘
        </li>
        <li>
          显卡：GTX1060 3G/6G
        </li>
        <li>
          系统：Windows 7
        </li>
        <li>
          电脑形态：单主机
        </li>
      </ul>
    </div>
    <div class="parameterBox">
      <div class="title">厂家服务</div>
      <div class="description">
        <p>本产品全国联保，享受三包服务，质保期为：五年质保</p>
        <p>如因质量问题或故障，凭厂商维修中心或特约维修点的质量检测证明，享受7日内退货，15日内换货，15日以上在质保期内享受免费保修等三包服务！</p>
        <p>(注:如厂家在商品介绍中有售后保障的说明,则此商品按照厂家说明执行售后保障服务。) 您可以查询本品牌在各地售后服务中心的联系方式，请点击这儿查询......</p>
      </div>
    </div>
    <div class="parameterBox">
      <div class="title">权利声明</div>
      <div class="description">
        <p>本商场所有商品信息、商品咨询等内容，是重要的经营资源，未经许可，禁止非法转载使用。</p>
        <p>注：本站商品信息均来自于合作方，其真实性、准确性和合法性由信息拥有者（合作方）负责。本站不提供任何保证，并不承担任何法律责任。询......</p>
      </div>
    </div>
    <div class="isolation"></div>
    <div class="bot">
      <button @click="buy">立即购买</button>
    </div>
  </div>
</template>
<script>
import { setGoodsInfo } from "@/api/user";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      parameterIndex: 0,
      swiperOption: {
        autoplay: 3200,
        setWrapperSize: true,
        observeParents: true,
        loop: true,
        speed: 1000,
        //设置分页
        pagination: ".swiper-pagination",
        //设置分页点击
        paginationClickable: true
      },
      goodsInfo: {},
      number: 1
    };
  },
  methods: {
    pageData() {
      setGoodsInfo(this.$route.params.id).then(data => {
        if (data.code == 200) {
          this.goodsInfo = data.data;
        } else {
          this.prompt(data.msg);
        }
      });
    },
    buy(){
      alert('商城正在开发中。。。');
    }
  },
  mounted() {
    document.title = "优惠商家详情";
    this.pageData();
  }
};
</script>
<style lang="scss">
@import "src/style/mixin";
@import "../../../node_modules/swiper/dist/css/swiper.min.css";
.swiper-container {
  width: 100%;
  height: rem(600);
  margin-top: rem(20);
  .swiper-slide img {
    width: 100%;
  }
}
.goodsDetailsPage {
  .goodsDetailsBox {
    background-color: #fff;
    padding: rem(20) rem(30);
    h3 {
      color: #333333;
      font-size: rem(32);
    }
    .price {
      padding-top: rem(10);
      color: #ff8000;
      font-size: rem(36);
    }
  }
  .specification {
    background-color: #fff;
    padding: 0 rem(30);
    margin-top: rem(20);

    .specificationBox {
      border-top: 1px solid #e6e6e6;
      display: flex;
      padding: rem(30) 0;
      label {
        color: #333333;
        font-size: rem(28);
        line-height: rem(60);
        width: rem(120);
        flex-shrink: 0;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          height: rem(60);
          line-height: rem(60);
          border: 1px solid #fff;
          padding: 0 rem(20);
          min-width: rem(120);
          text-align: center;
          border-radius: rem(4);
          color: #333333;
          font-size: rem(28);
          margin-bottom: rem(10);
        }
        .current {
          color: #ff681c;
          border: 1px solid #ff681c;
        }
      }
      .numberBox {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        button {
          border: 1px solid #b2b2b2;
          width: rem(60);
          height: rem(60);
          background-color: transparent;
          font-size: rem(40);
        }
        input {
          width: rem(100);
          height: rem(60);
          text-align: center;
          border-top: 1px solid #b2b2b2;
          border-bottom: 1px solid #b2b2b2;
        }
        .bidden {
          background-color: #cccccc;
        }
      }
    }
    .specificationBox:first-child {
      border-top: 0;
    }
  }
  .parameterBox {
    background-color: #fff;
    padding: 0 rem(30);
    margin-top: rem(20);
    .title {
      color: #333333;
      font-size: rem(30);
      height: rem(88);
      line-height: rem(88);
      border-bottom: 1px solid #e6e6e6;
    }
    ul {
      padding: rem(10) 0;
      li {
        line-height: rem(50);
        color: #333333;
        font-size: rem(28);
        margin-bottom: rem(10);
      }
    }
    .description {
      padding: rem(10) 0;
      p {
        color: #333333;
        font-size: rem(28);
        line-height: 150%;
        margin-bottom: rem(10);
      }
    }
  }
  .isolation {
    height: rem(150);
  }
  .bot {
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    height: rem(100);
    background-color: #fff;
    button {
      width: 100%;
      height: 100%;
      background-color: #ff681c;
      font-size: rem(34);
      color: #fff;
    }
  }
}
</style>
