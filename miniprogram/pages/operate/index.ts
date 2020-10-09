
// import { wxRequest } from '../../../utils/request';
import { approve, stop, reject } from '../../services/assapi';

Page({
  app: getApp<BpmOption>(),
  /**
   * 页面的初始数据
   */
  data: {
    comment: '',
    oper: '',
    rowData: {
      id: '',
      categoryid: '',
    },
  },

  onAppenfComment(e: any) {
    const { dataset: { text } }: {
      dataset: {
        text: string;
      }
    } = e.target;

    const { comment } = this.data;
    const newComment = comment.concat(text);
    this.setData({
      comment: newComment,
    });
  },

  onApproveClick() {
    const that = this;
    // const { rowData, comment, oper } = that.data;
    const { rowData, comment,  } = that.data

    if (rowData) {
      // const eventChannel = that.getOpenerEventChannel();

      // const promise = approve({
      //   approvalId: rowData.id,
      //   categoryid: rowData.categoryid,
      //   comment: `${comment} (来自:微信小程序)`,
      // });

      // eventChannel.emit('operateBack', {
      //   comment,
      //   oper,
      //   promise,
      // });

      approve({
        approvalId: rowData.id,
        categoryid: rowData.categoryid,
        comment: `${comment} (来自:微信小程序)`,
      }).then((res) => {
        const data: any = res.data;
        if(res.statusCode === 200) {
          if(data.status == 200) {
            wx.navigateBack({
              delta: 2,
            });
          }
          else {
            wx.showToast({
              title: data.errorMessage
            });
          }
        }
        else {
          wx.showToast({
            title: data.message
          });
        }
      }).catch((res) => {
        wx.showToast({
          title: res.message
        });
      });

      // wx.navigateBack({
        
      // });
    }
  },

  onRejectClick() {
    const that = this;
    const { rowData, comment,  } = that.data;

    if (rowData) {
      reject({
        approvalId: rowData.id,
        categoryid: rowData.categoryid,
        comment: `${comment} (来自:微信小程序)`,
      }).then((res) => {
        const data: any = res.data;
        if(res.statusCode === 200) {
          if(data.status == 200) {
            wx.navigateBack({
              delta: 2,
            });
          }
          else {
            wx.showToast({
              title: data.errorMessage
            });
          }
        }
        else {
          wx.showToast({
            title: data.message
          });
        }
      }).catch((res) => {
        wx.showToast({
          title: res.message
        });
      });
    }
  },

  onStopClick() {
    const that = this;
    const { rowData, comment,  } = that.data;

    if (rowData) {
      stop({
        approvalId: rowData.id,
        categoryid: rowData.categoryid,
        comment: `${comment} (来自:微信小程序)`,
      }).then((res) => {
        const data: any = res.data;
        if(res.statusCode === 200) {
          if(data.status == 200) {
            wx.navigateBack({
              delta: 2,
            });
          }
          else {
            wx.showToast({
              title: data.errorMessage
            });
          }
        }
        else {
          wx.showToast({
            title: data.message
          });
        }
      }).catch((res) => {
        wx.showToast({
          title: res.message
        });
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const that = this;
    const eventChannel = this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      const { rowData, oper }: { rowData: any; oper: string; } = data;
      that.setData({
        rowData,
        oper,
      });
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
});