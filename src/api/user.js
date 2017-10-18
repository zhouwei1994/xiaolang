import { async } from '@/config/fetch';
import store from '@/config/store'
//获取用户信息
var getUserInfo = (id) => async('user/find/'+id, {});
//修改用户信息
var modifyUserInfo = (id,username,sex,age,area) => async('user', {
  id,username,sex,age,area
},'PUT');
//修改用户头像
var modifyUserHead = (id,file) => async('user/avatar/'+id,file,'PUT',{
  putType:'file',
});
//获取支出明细
var getFlowingWater = (pageNo,pageSize) => async('user/bills/'+store.state.userInfo.userId,{
  pageNo,pageSize
});
//获取代理统计
var getAgentStatistics = () => async('user/proxy/'+store.state.userInfo.userId,{});
//获取一级代理
var anAgent = (id,pageNo,pageSize) => async('user/proxy/one/'+id,{
  pageNo,pageSize
});
//判断新老用户，登录
var setLogIn = (code) => async('code/'+code,{});
//注册
var register = (openId,gameId ,username ,phone ,code ,sex ,age ,area,password ) => async('/user/register',{
  openId,gameId ,username ,phone ,code ,sex ,age ,area,password
},'POST');
//获取验证码
var myCode = (phone) => async('user/code/'+phone,{});
//验证旧手机
var validate = (phone,code) => async('user/validate/'+phone+'/'+code,{});
//验证新手机
var newphoneApi = (phone,code) => async('user/phone/'+store.state.userInfo.userId+'/'+phone+'/'+code,{});
//获取可提现金额
var canBeRaisedApi = () => async('user/allow/'+store.state.userInfo.userId,{});
//提现
var withdrawApi = (amount,openId = store.state.userInfo.openId) => async('user/withdraw',{
  amount,openId
});
export {
  getUserInfo,
  modifyUserInfo,
  modifyUserHead,
  getFlowingWater,
  getAgentStatistics,
  anAgent,
  setLogIn,
  register,
  myCode,
  validate,
  newphoneApi,
  canBeRaisedApi,
  withdrawApi
}
