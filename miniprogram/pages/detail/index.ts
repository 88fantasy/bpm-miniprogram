// index.ts
import { wxRequest } from '../../utils/request';

Page({
  app: getApp<BpmOption>(),
  data: {
    approvalid: '',
    categoryid: '',
    operation: [],
    detail: {
      content: [],
      record: [],
      attachment: [],
      steps: [],
      active : 0,
    },
  },

  onReturn() {
    wx.navigateBack({

    });
  },

  onAttachmentClick(e: any) {
    const { dataset: { url } } = e.target;
    if(url) {
      wx.downloadFile({
        // 示例 url，并非真实存在
        url,
        success: function (res) {
          const filePath = res.tempFilePath;
          wx.openDocument({
            filePath,
            success: function (res) {
              console.log('打开文档成功',res);
            }
          })
        }
      });
    }
  },

  refreshDetail: function () {
    const { data: { approvalid, categoryid }, app: { globalData: { accountInfo : { token } } } } = this;
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

        const { record = [] }: { record: Array<any> } = data.data;
        let steps: { text: string; desc: string; }[] = [];
        let active = 0;
        record.map((item,index) => {
          steps.push({
            text: `${item.operator}(${item.checkmans}): ${item.comment}`,
            desc: `${item.operatorNode}  ${item.time}`
          });
          if(item.time) {
            active = index;
          }
        });


        that.setData({
          detail: {
            ...data.data,
            steps,
            active,
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
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      const operation: [] = data.operation;
      if (operation) {
        operation.map((item: any) => {
          if (item.oper === 'approve') {
            item.type = 'primary';
          }
          else if (item.oper === 'stop') {
            item.type = 'danger';
          }
          else {
            item.type = 'default';
          }
        });
      }

      that.setData({
        ...data,
        operation,
      });
      that.refreshDetail();
    })
  },

  onPullDownRefresh() {
    this.refreshDetail();
  }

})