// index.ts
import { wxRequest } from '../../utils/request';

Page({
  app: getApp<BpmOption>(),
  data: {
    approvalid: '',
    categoryid: '',
    detail: {
      content: [],
      record: [], 
      attachment: [],
    },
  },

  onReturn() {
    wx.navigateBack({
      
    });
  },

  refreshDetail: function () {
    const { data : {approvalid, categoryid }, app : { globalData : { token } } } = this;
    const that = this;
    wxRequest({
      header: {
          'content-type': 'application/x-www-form-urlencoded',
      },
      url: "/ass/assdetail",
      method: 'POST',
      data: {
        token,
        approvalid,
        categoryid,
      }
  }).then((res) => {
      wx.hideLoading();
      if (res.statusCode == 200) {
          const data: any = res.data;
          that.setData({
            detail : {
              ...data.data
            }
          });
      }
      else {
        
      }
  })
      .catch(() => {
      wx.hideLoading();
  });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this;
    const eventChannel = this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      that.setData({
        ...data
      });
      that.refreshDetail();
    })
  },

  onPullDownRefresh() {
    this.refreshDetail();
  }

})