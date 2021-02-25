// index.ts
import { wxRequest } from '../../utils/request';
import { formatTime } from '../../utils/util';

Page({
  app: getApp<BpmOption>(),
  data: {
    approvalid: '',
    rowData: { 
      categoryid : [],
    },
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
    const { dataset: { url, type } } : {
      dataset: {
        url: string;
        type?: 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'pdf';
      }
    } = e.target;
    if(url) {
      wx.downloadFile({
        // 示例 url，并非真实存在
        url,
        success: function (res) {
          const filePath = res.tempFilePath;
          wx.openDocument({
            filePath,
            fileType: type,
            success: function (res) {
              console.log('打开文档成功',res);
            }
          })
        },
        fail:function(res) {
          console.log("download fail: ",res);
        }
      });
    }
  },

  onOperateClick(e:any) {
    const that = this;
    const { dataset: { operate } } : {
      dataset: {
        operate: string;
      }
    } = e.target;

    const { rowData } = this.data;
    if(rowData) {
      wx.navigateTo({
        url: `/pages/operate/index`,
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          operateBack: function(data: { 
            comment: string;
            oper: string;
            promise: Promise<WechatMiniprogram.RequestSuccessCallbackResult>;
          }) {
            wx.navigateBack({
              success:() => {
                const eventChannel = that.getOpenerEventChannel();
                eventChannel.emit('detailBack', {
                  promise: data.promise,
                });
              }
            });
          }
        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            rowData: rowData,
            oper: operate,
          })
        }
      });
    }

  },

  refreshDetail: function () {
    const { data: { approvalid, rowData }, app: { globalData: { accountInfo : { token } } } } = this;
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
        categoryid: rowData.categoryid,
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
            desc: `${item.operatorNode}  ${item.time? formatTime(new Date(item.time)) : "未审"}`
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
      const operation: [] = data.rowData.operation;
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