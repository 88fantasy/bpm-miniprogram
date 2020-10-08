export const wxRequest = (options: any, loading: boolean = true) => {
  return new Promise((resolve: WechatMiniprogram.RequestSuccessCallback, reject: WechatMiniprogram.RequestFailCallback) => {
    const { url } = options;
    if (!url) {
      reject({
        errMsg: '未定义 url'
      })
    }
    const realUrl = url.startsWith("http") ? url : getApp<BpmOption>().globalData.baseUrl + url;
    if(loading) {
      wx.showLoading({
        title: '加载中',
      });
    }
    wx.request({
      header: { 'Content-Type': 'application/json' },
      ...options,
      url: realUrl,
      success: function (res) {
        if(loading) {
          wx.hideLoading();
        }
        resolve(res);
      },
      fail: function (res) {
        if(loading) {
          wx.hideLoading();
        }
        reject(res);
      }
    })
  })
}