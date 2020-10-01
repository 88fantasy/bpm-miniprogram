// index.ts
Page({
  app: getApp<IAppOption>(),
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
      rules: { required: true, message: 'mobile必填' },
    }],
    confirmButton: [{ text: '确定' }],
    formData: {

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
    this.selectComponent('#form').validate((valid: any, errors: any) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        console.log('form data :', this.data.formData);
        this.onUserCancel();
        wx.switchTab({url: "/pages/dashboard/dashboard"});
      }
    })
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

  onLoad() {
    const { app } = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
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
    const app = getApp<IAppOption>();
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
  getPhoneNumber(e: any) {
    var that = this;
    wx.checkSession({
      success: function () {
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        var sessionk = that.data.sessionKey;
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          that.setData({
            modalstatus: true
          });
        } else { //同意授权
          wx.request({
            method: "GET",
            url: '',
            data: {
              encrypdata: ency,
              ivdata: iv,
              sessionkey: sessionk
            },
            header: {
              'content-type': 'application/json' // 默认值  
            },
            success: (res) => {
              console.log("解密成功")
              console.log(res)
              // let phone = res.data.phoneNumber;
              // console.log(phone);
            },
            fail: function (res) {
              console.log("解密失败~~~~~~~~~~~~~");
              console.log(res);
            }
          });
        }
      },
      fail: function () {
        console.log("session_key 已经失效，需要重新执行登录流程");
        // that.wxlogin(); //重新登录
      }
    });
  }
})
