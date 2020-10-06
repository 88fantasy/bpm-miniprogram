// list.ts
import { wxRequest } from '../../utils/request';

Page({
  app: getApp<BpmOption>(),
  data: {
    error: '',
    assList: []
  },

  onSlideButtonTap(e: any) {
    console.log('slide button tap', e.detail);
  },

  setError(errMsg: string) {
    this.setData({
      error: errMsg
    });
  },

  onRefreshData() {
    const { app } = this;
    const { token } = app.globalData;
    const that = this;
    wxRequest({
      url: "/ass/asslist/" + token,
    }).then((res) => {
      wx.hideLoading();
      if (res.statusCode == 200) {
        const data: any = res.data;
        that.setData({
          assList: data.data
        })
      }
      else {
        that.setError(res.errMsg);
      }
    })
      .catch((res: WechatMiniprogram.GeneralCallbackResult) => {
        that.setError(res.errMsg);
      });
  },

  onCellClick(e: any) {
    const { dataset: { id, categoryid, operation } } = e.target;
    wx.navigateTo({
      url: '/pages/detail/index',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          approvalid: id,
          categoryid,
          operation,
        })
      }
    });
  },

  onLoad() {
    // const { app } = this;
    this.onRefreshData();

  },

  onPullDownRefresh() {
    this.onRefreshData();
  }

})