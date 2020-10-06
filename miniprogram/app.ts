// app.ts
import { wxRequest } from './utils/request';
import { CONSTANT_SESSIONDATA_KEY  } from './utils/constant';

App<BpmOption>({
  globalData: {
    baseUrl: "https://app.gzmpc.com/NewMobilePlatform/api",
    appId: "wx87d027dd5e097c89",
    appSecret: "fd356b9cea5ecf82d63abeaf4434ccdf",
    // token: "320e7274b3e7bf86c181f11d2b83903c",
  },

  setToken(accessToken: string) {
    this.globalData.token = accessToken;

    const sessionData = this.getSessionCache();
    if(sessionData) {
      sessionData.openid;
    }
  },

  // 登录
  wxLogin() {
    const that = this;
    const { appId, appSecret } = this.globalData;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wxRequest({
          url: "https://wechat-api.gzmpc.com/v1/mp/code2Session",
          method: 'POST',
          data: {
            appid: appId,
            secret: appSecret,
            jsCode: res.code,
          }
        }).then((res) => {
          if (res.statusCode == 200) {
            const data: any = res.data;
            const sessionData: SessionData = { ...data };

            that.globalData.sessionData = sessionData;

            //保存到缓存中
            wx.setStorageSync(CONSTANT_SESSIONDATA_KEY, sessionData);
          }
          else {

          }
        });
      },
    })
  },

  getSessionCache() {
    try {
      const value:SessionData  = wx.getStorageSync(CONSTANT_SESSIONDATA_KEY);
      if(value) {
        this.globalData.sessionData = value;
        return value;
      }
      else {
        return undefined;
      }
    } catch (e) {
      return undefined;
    }
  },

  onLaunch() {
    const that = this;


    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        const sessionData = that.getSessionCache();
        if(!sessionData) {
          that.wxLogin();
        }
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        that.wxLogin();
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
          })
        }
      },
    })
  },
})