// index.ts
import { wxRequest } from '../../utils/request';


const WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt');

Page({
  app: getApp<BpmOption>(),
  data: {
    sessionKey: "",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showUserDialog: false,

    rules: [{
      name: 'user',
      rules: { required: true, message: '帐号必填' },
    }, {
      name: 'pwd',
      rules: { required: true, message: '密码必填' },
    }],
    confirmButton: [{ text: '确定' }],
    formData: {
      user: "",
      pwd: ""
    }
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },

  onShowUser() {
    this.setData({
      showUserDialog: true
    });
  },

  onUserConfirm() {
    const that = this;
    this.selectComponent('#form').validate((valid: any, errors: any) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        const {user, pwd } = this.data.formData;
        that.login(user,pwd);
      }
    })
  },

  setError(errMsg: string) {
    this.setData({
      error: errMsg
    });
  },

  onUserCancel() {
    this.setData({
      showUserDialog: false
    })
  },

  formInputChange(e: any) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  login(user: string, pwd: string) {
    const app = getApp<BpmOption>();
    const that = this;
    wxRequest({
      header : {
        'content-type' : 'application/x-www-form-urlencoded',
      },
      url: "/login",
      method: 'POST',
      data: {
        username: user,
        password: pwd
      }
    }).then((res) => {
      if(res.statusCode == 200) {
        const data:any  = res.data;
        app.setAccountInfo(user, data.data.token);
        that.onUserCancel();
        wx.switchTab({url: "/pages/dashboard/dashboard"});
      }
      else {
        that.setError(res.errMsg);
      }
    })
    .catch((res: WechatMiniprogram.GeneralCallbackResult) => {
      that.setError(res.errMsg);
    });
  },

  onLoad() {
    const { app } = this;
    const that = this;

    const sessionData = app.getSessionCache();
    if(sessionData) {
      wxRequest({
        url: `https://wechat-api.gzmpc.com/v1/wechat/getUaccountByOpenId/${sessionData.openid}`,
      }).then((res) => {
        if(res.statusCode == 200) {
          const data:any  = res.data;
          if(data && data.errcode == 0) {
            that.login(data.uaccount, "mima");
          }
        }
      });
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (res: any) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
        },
      })
    }
  },
  getUserInfo(e: any) {
    const app = getApp<BpmOption>();
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
  getPhoneNumber(e: any) {
    const { app } = this;
    const that = this;
    wx.checkSession({
      success: function (res) {
        console.log(res);
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionk = that.data.sessionKey;
        console.log('session data: ', e, ency, iv, sessionk);
        const errMsg:string = e.detail.errMsg;
        if (errMsg && errMsg.startsWith('getPhoneNumber:fail')) {
          that.setData({
            modalstatus: true
          });
        } else { //同意授权
          const pc = new WXBizDataCrypt(app.globalData.appId, sessionk);

          var data = pc.decryptData(ency , iv)
          console.log('解密后 data: ', data)
        }
      },
      fail: function () {
        console.log("session_key 已经失效，需要重新执行登录流程");
        // that.wxlogin(); //重新登录
      }
    });
  }
})
