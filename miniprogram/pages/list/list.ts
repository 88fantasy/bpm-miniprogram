// list.ts
import { wxRequest } from '../../utils/request';
import { approve, stop } from '../../services/assapi';

Page({
  app: getApp<BpmOption>(),
  data: {
    error: '',
    assList: []
  },

  setError(errMsg: string) {
    this.setData({
      error: errMsg
    });
  },

  onRefreshData() {
    const { app } = this;
    const { token } = app.globalData.accountInfo;
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
    const that = this;
    const { dataset: { id } } = e.target;
    const row = this.searchRow(id);
    if(row) {
      wx.navigateTo({
        url: '/pages/detail/index',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          detailBack: function(data: {
            id: string;
            promise: Promise<WechatMiniprogram.RequestSuccessCallbackResult>;
          }) {
            const { id, promise } = data;
            that.updateRow(data.id, {
              loading: true,
            });
            promise.then((res: WechatMiniprogram.RequestSuccessCallbackResult) => {
              that.onOperateSuccess(id,res);
            }).catch((res: any) => {
              that.onOperateFail(id,res);
            });
          }
        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            approvalid: id,
            rowData: row,
          })
        }
      });
    }
  },

  onOperateSuccess(id: string, res: WechatMiniprogram.RequestSuccessCallbackResult) {
    const data: any = res.data;
    if(res.statusCode === 200) {
      if(data.status == 200) {
        this.removeRow(id);
      }
      else {
        this.updateRow(id, {
          error: String(data.errorMessage),
          loading: false,
        });
      }
    }
    else {
      this.updateRow(id, {
        error: String(data.message),
        loading: false,
      });
    }
  },

  onOperateFail(id: string, res: any) {
    this.updateRow(id, {
      error: String(res.message),
      loading: false,
    });
  },

  onStopClick(e: any) {
    const { dataset: { id } } = e.target;
    const that = this;
    const row: any = that.searchRow(id);

    if (row) {
      that.updateRow(id, {
        loading: true,
      });
      stop({
        approvalId: row.id,
        categoryid: row.categoryid,
        comment: '快速中止 (来自:微信小程序)',
      }).then((res) => {
        that.onOperateSuccess(id,res);
      }).catch((res) => {
        that.onOperateFail(id,res);
      });
    }
  },

  onApproveClick(e: any) {
    const { dataset: { id } } = e.target;
    const that = this;
    const row: any = that.searchRow(id);

    if (row) {
      that.updateRow(id, {
        loading: true,
      });
      approve({
        approvalId: row.id,
        categoryid: row.categoryid,
        comment: '快速同意 (来自:微信小程序)',
      }).then((res) => {
        that.onOperateSuccess(id,res);
      }).catch((res) => {
        that.onOperateFail(id,res);
      });
    }
  },

  searchRow(id: string) {
    const { assList } = this.data;
    if (assList) {
      return assList.find((item: any) => item.id === id);
    }
    else {
      return undefined;
    }
  },

  updateRow(id: string, fields: any) {
    const { assList } = this.data;
    assList.map((item: any) => {
      if (item.id == id) {
        Object.assign(item, {
          ...fields,
        });
      }
    });
    this.setData({
      assList,
    })
  },

  removeRow(id: string) {
    const { assList } = this.data;
    const newList = assList.filter((item: any) => item.id !== id);
    this.setData({
      assList: newList,
    })
  },

  onLoad() {
    // const { app } = this;
    // this.onRefreshData();

  },

  onShow() {
    this.onRefreshData();
  },

  onPullDownRefresh() {
    this.onRefreshData();
  }

})