// dashboard.ts
import { wxRequest } from '../../utils/request';
// import { CONSTANT_SESSIONDATA_KEY  } from '../../utils/constant';

Page({
  app: getApp<BpmOption>(),
  data: {
    name: "姓名",
    uaccount: "工号",
    catelogs:[]
  },

  onLogout() {
    // wx.removeStorage({
    //   key: CONSTANT_SESSIONDATA_KEY,
    //   success () {
        wx.reLaunch({
          url: '/pages/index/index?auto=false'
        });
      // }
    // })
    
  },
   
  onLoad() {
    const { app } = this;
    const that = this;

    const uaccount= app.globalData.accountInfo?.uaccount;
    if(uaccount) {
      wxRequest({
        url: `https://auth.gzmpc.com/sso/webapi/account/load?uaccount=${uaccount}`,
      }).then((res) => {
        if(res.statusCode == 200) {
          const data:any  = res.data;
          if(data && data.status == 200) {
            that.setData({
              name: data.data.accountname
            }); 
          }
        }
      });
    }

    this.setData({
      uaccount,
    });
    
  },
  
})