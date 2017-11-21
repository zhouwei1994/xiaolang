import wx from 'weixin-js-sdk';
import { async } from '@/config/fetch';
import store from '@/config/store';

function wxPay(info) {
  return new Promise((resolve, reject) => {
    var body, description, origin = info.code, subject, totalAmount, uid = store.state.userInfo.userId;
    body = '小狼人' + info.name+'开通支付金额。';
    description = info.name;
    subject = '小狼人' + info.name;
    totalAmount = info.price;
    console.log(body, description, origin, subject, totalAmount, uid);
    async('user/signOrder', { body, description, origin, subject, totalAmount, uid }, 'POST').then(
      data => {
        if (data.code == 200) {
          function onBridgeReady() {
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                "appId": data.data.appId,     //公众号名称，由商户传入
                "timeStamp": data.data.timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr": data.data.nonceStr, //随机串
                "package": data.data.packageValue,
                "signType": data.data.signType,         //微信签名方式：
                "paySign": data.data.paySign //微信签名
              },
              function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  resolve(data);
                } else {
                  reject();
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              }
            );
          }
          if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
          } else {
            onBridgeReady();
          }
        } else {
          reject(data.msg);
        }
      }
    );
  })
}
export {
  wxPay
}
