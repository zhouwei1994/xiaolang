import Vue from 'vue'
import Router from 'vue-router'
import {routerMode} from '@/config/env'
import store from '@/config/store'
Vue.use(Router)
//路由配置
const routes = [
  //个人中心
  {
    path: '/',
    name: 'index',
    component: resolve => require(['@/page/index.vue'], resolve)
  },
  //注册
  {
    path: '/registered/:id',
    name: 'registered',
    component: resolve => require(['@/page/registered.vue'], resolve)
  },
  //个人资料
  {
    path: '/personalData',
    name: 'personalData',
    component: resolve => require(['@/page/personalData.vue'], resolve)
  },
  //我的收益
  {
    path: '/income',
    name: 'income',
    component: resolve => require(['@/page/income.vue'], resolve)
  },
  //提现
  {
    path: '/withdraw',
    name: 'withdraw',
    component: resolve => require(['@/page/withdraw.vue'], resolve)
  },
  //我的小狼
  {
    path: '/myCoyotes',
    name: 'myCoyotes',
    component: resolve => require(['@/page/coyotes.vue'], resolve)
  },
  //我的小狼
  {
    path: '/offlineInfo/:id',
    name: 'offlineInfo',
    component: resolve => require(['@/page/offlineInfo.vue'], resolve)
  },
  //验证手机
  {
    path: '/verifyPhone/:phone',
    name: 'verifyPhone',
    component: resolve => require(['@/page/verifyPhone.vue'], resolve)
  },
  //一般游戏代理
  {
    path: '/gameAgent/:state',
    name: 'gameAgent',
    component: resolve => require(['@/page/gameAgent.vue'], resolve)
  },
  //创业商家代理
  {
    path: '/create/:state',
    name: 'create',
    component: resolve => require(['@/page/create.vue'], resolve)
  },
  //优惠商家列表
  {
    path: '/goodsList/:state',
    name: 'goodsList',
    component: resolve => require(['@/page/goodsList.vue'], resolve)
  },
  //优惠商家详情
  {
    path: '/goodsDetails/:id',
    name: 'goodsDetails',
    component: resolve => require(['@/page/goodsDetails.vue'], resolve)
  },
  //我的推广
  {
    path: '/promotion',
    name: 'promotion',
    component: resolve => require(['@/page/promotion.vue'], resolve)
  },
  //交友聊天
  {
    path: '/chatWith',
    name: 'chatWith',
    component: resolve => require(['@/page/chatWith.vue'], resolve)
  },
  //小狼勋章
  {
    path: '/medal',
    name: 'medal',
    component: resolve => require(['@/page/medal.vue'], resolve)
  },
  //客服
  {
    path: '/service',
    name: 'service',
    component: resolve => require(['@/page/service.vue'], resolve)
  },
  //修改提现密码
  {
    path: '/modifyPas/:phone',
    name: 'modifyPas',
    component: resolve => require(['@/page/modifyPas.vue'], resolve)
  },
  //用户反馈
  {
    path: '/feedback',
    name: 'feedback',
    component: resolve => require(['@/page/feedback.vue'], resolve)
  },
  //商城列表
  {
    path: '/goodsHome',
    name: 'modifyPas',
    component: resolve => require(['@/page/goods/goodsList.vue'], resolve)
  },
  //商城商品详情
  {
    path: '/goodsInfo/1',
    name: 'goodsDetails',
    component: resolve => require(['@/page/goods/goodsDetails.vue'], resolve)
  },
  {
    path: '/goodsInfo/2',
    name: 'goodsDetails',
    component: resolve => require(['@/page/goods/goodsDetails2.vue'], resolve)
  },
  {
    path: '/goodsInfo/3',
    name: 'goodsDetails',
    component: resolve => require(['@/page/goods/goodsDetails3.vue'], resolve)
  },
]; 
let router = new Router({
  //模式
  mode: routerMode,
  //代码检查
  // strict: process.env.NODE_ENV !== 'production',
  //页面滚动
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		  return { x: 0, y: to.meta.savedPosition ||0}
		}
  },
  routes
});
//页面加载时
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
//页面加载时
router.beforeEach(function (to, from, next) {
  store.commit('setPageLoading', true);
  store.commit('setPath',to.path)
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

	if (toIndex) {
	    if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
	      store.commit('setDirection', 'forward')
	    } else {
	      store.commit('setDirection', 'reverse')
	    }
	} else {
	    ++historyCount
	    history.setItem('count', historyCount)
	    to.path !== '/' && history.setItem(to.path, historyCount)
	    store.commit('setDirection', 'forward')
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next();
  }
});
//页面销毁时
router.afterEach(function (to) {
  store.commit('setPageLoading',false);
});
export default router;
