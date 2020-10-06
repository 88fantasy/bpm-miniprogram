export const wxRequest = (options: any) => {
  return new Promise((resolve: WechatMiniprogram.RequestSuccessCallback, reject: WechatMiniprogram.RequestFailCallback) => {
    const { url } = options;
    if (!url) {
      reject({
        errMsg: '未定义 url'
      })
    }
    const realUrl = url.startsWith("http") ? url : getApp<BpmOption>().globalData.baseUrl + url;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      header: { 'Content-Type': 'application/json' },
      ...options,
      url: realUrl,
      success: function (res) {
        wx.hideLoading();
        resolve(res);
      },
      fail: function (res) {
        wx.hideLoading();
        reject(res);
      }
    })
  })
}