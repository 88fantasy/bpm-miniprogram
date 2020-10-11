// dashboard.ts
import { wxRequest } from '../../utils/request';
// import { CONSTANT_SESSIONDATA_KEY  } from '../../utils/constant';

Page({
  app: getApp<BpmOption>(),
  data: {
    userInfo: {},
    name: "姓名",
    uaccount: "工号",
    catelogs:[],
    changeLogs: [{
      text: 'OA审批操作支持选择节点',
      desc: '2020-10-11',
    },{
      text: '支持审批操作',
      desc: '2020-10-07',
    },{
      text: '支持绑定后自动登陆',
      desc: '2020-10-05',
    },{
      text: '初始版本上线',
      desc: '2020-10-03',
    }],
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

  getUserInfo(e: any) {
    const app = getApp<BpmOption>();
    app.globalData.userInfo = e.detail.userInfo
    
  },
   
  onLoad() {
    const { app } = this;
    const that = this;

    if(app.globalData.hasUserInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }

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