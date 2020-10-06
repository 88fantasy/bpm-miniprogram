// dashboard.ts
import { CONSTANT_SESSIONDATA_KEY  } from '../../utils/constant';

Page({
  app: getApp<BpmOption>(),
  data: {
    name: "姓名",
    opcode: "工号",
    catelogs:[]
  },

  onLogout() {
    wx.removeStorage({
      key: CONSTANT_SESSIONDATA_KEY,
      success () {
        wx.redirectTo({
          url: '/pages/index/index'
        });
      }
    })
    
  },
   
  onLoad() {
    const { app } = this;
    this.setData({
      opcode: app.globalData.accountInfo?.opcode
    });
    
  },
  
})