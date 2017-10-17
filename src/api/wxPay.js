import wx from 'weixin-js-sdk';
import { async } from '@/config/fetch';
import store from '@/config/store';

function wxPay(type) {
  return new Promise((resolve, reject) => {
    var body, description, origin = type, subject, totalAmount, uid = store.state.userInfo.userId;
    if (type == 1) {
      body = '小狼创业商家代理开通支付金额。';
      description = '创业商家代理';
      subject = '小狼创业商家代理';
      totalAmount = 688;
    } else if (type == 2) {
      body = '小狼二级商家代理开通支付金额。';
      description = '二级商家代理';
      subject = '小狼二级商家代理';
      totalAmount = 268;
    } else if (type == 3) {
      body = '小狼三级商家代理开通支付金额。';
      description = '三级商家代理';
      subject = '小狼三级商家代理';
      totalAmount = 88;
    }
    async('user/signOrder', { body, description, origin, subject, totalAmount, uid }, 'POST').then(
      data => {
        if (data.code == 200) {
          function onBridgeReady() {
            wx.invoke(
              'getBrandWCPayRequest', {
                "appId": data.data.appId,     //公众号名称，由商户传入
                "timeStamp": data.data.timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr": data.data.nonceStr, //随机串
                "package": data.data.pacKageValue,
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
          if (typeof wx == "undefined") {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
          } else {
            onBridgeReady();
          }
        }
      }
    );
  })
}
export {
  wxPay
}
