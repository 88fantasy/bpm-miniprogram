// index.ts
import { wxRequest } from '../../utils/request';
import { CONSTANT_SESSIONDATA_KEY } from '../../utils/constant';


const WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt');

Page({
  app: getApp<BpmOption>(),
  data: {
    sessionKey: "",
    rules: [{
      name: 'user',
      rules: { required: true, message: '帐号必填' },
    }, {
      name: 'pwd',
      rules: { required: true, message: '密码必填' },
    }],
    formData: {
      user: "",
      pwd: ""
    },
     msgShow: false,
     error: '',
     isCom: getApp<BpmOption>().globalData.isCom,
  },
  // 事件处理函数
  bindMsgHide() {
   this.setData({
    msgShow : false,
   });
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
        that.login(user,pwd, true);
      }
    })
  },

  setError(errMsg: string) {
    this.setData({
      error: errMsg,
      msgShow: true,
    });
  },

  formInputChange(e: any) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  comLogin() {
    const that = this;
    const app = getApp<BpmOption>();
    wx.qy.login({
      success: function(res: { code: string; errMsg: string; }) {
        if (res.code) {
          //发起网络请求
          wxRequest({
            url: "https://wechat-api.gzmpc.com/v1/com/code2Session",
            method: 'POST',
            data: {
              agentId: app.globalData.agentId,
              jsCode: res.code,
            }
          }).then((res) => {
            if (res.statusCode == 200) {
              const data: any = res.data;
              const result: WechatMiniprogramComCode2SessionResult = data;
              if(result.errcode === 0) {
                const sessionData: ComSessionData = { ...result }; 
                app.globalData.comSessionData = sessionData;

                //保存到缓存中
                wx.setStorageSync(CONSTANT_SESSIONDATA_KEY, sessionData);

                that.login(sessionData.userid, "mima");
              }
            }
            else {

            }
          });
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  login(user: string, pwd: string, bind: boolean = false) {
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
        wx.switchTab({url: "/pages/list/list"});

        if(bind && !app.globalData.isCom) {
          const sessionData = app.getSessionCache();
          if(sessionData) {
            wxRequest({
              url: "https://wechat-api.gzmpc.com/v1/wechat/bindOpenId",
              method: 'POST',
              data: {
                uaccount: user,
                openid: sessionData.openid
              }
            }).then((res) => {
              if(res.statusCode == 200) {
                // const data:any  = res.data;
              }
            });
          }
        }
      }
      else {
        that.setError(res.errMsg);
      }
    })
    .catch((res: WechatMiniprogram.GeneralCallbackResult) => {
      that.setError(res.errMsg);
    });
  },

  onLoad(option: any) {
    const { auto } = option;
    const { app } = this;
    const that = this;

    if(!app.globalData.isCom) {
      const sessionData = app.getSessionCache();
      if(sessionData && !auto) {
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
    }
    else {
      wx.qy.checkSession({
        success: function(){
          //session_key 未过期，并且在本生命周期一直有效
          const sessionData = app.getComSessionCache();
          if(sessionData) {
            that.login(sessionData.userid, "mima");
          }
          that.comLogin();
        },
        fail: function(){
          // session_key 已经失效，需要重新执行登录流程
          that.comLogin();
        }
      })
    }
  },
  getUserInfo(e: any) {
    const app = getApp<BpmOption>();
    app.globalData.userInfo = e.detail.userInfo;
    this.onUserConfirm();
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
