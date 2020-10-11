
// import { wxRequest } from '../../../utils/request';
import { approve, stop, reject, abolish, reply, sign } from '../../services/assapi';

Page({
  app: getApp<BpmOption>(),
  /**
   * 页面的初始数据
   */
  data: {
    comment: '',
    oper: '',
    node: '',
    rowData: {
      id: '',
      categoryid: '',
      isNeedApprover: 0,
    },
    msgShow: false,
    msgInfo: {
      type: '',
      title: '',
      desc: '',
    }
  },

  onAppendComment(e: any) {
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

  onNodeChange(event: any) {
    this.setData({
      node: event.detail,
    });
  },

  onRadioClick(event: any) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      node: name,
    });
  },


  onApproveClick() {
    const that = this;
    // const { rowData, comment, oper } = that.data;
    const { rowData, comment, node} = that.data

    if (rowData) {
      if(rowData.isNeedApprover === 1) {
        that.operateFail({
          message: '暂时不支持选人',
        })
      }
      else {
        approve({
          approvalId: rowData.id,
          categoryid: rowData.categoryid,
          comment: `${comment} (来自:微信小程序)`,
          nextNode: node,
        }).then(that.operateSuccess)
          .catch(that.operateFail);
      }
    }
  },

  onRejectClick() {
    const that = this;
    const { rowData, comment, node} = that.data;

    if (rowData) {
      reject({
        approvalId: rowData.id,
        categoryid: rowData.categoryid,
        comment: `${comment} (来自:微信小程序)`,
        rejectNode: node,
      }).then(that.operateSuccess)
        .catch(that.operateFail);
    }
  },

  onStopClick() {
    const that = this;
    const { rowData, comment, } = that.data;

    if (rowData) {
      stop({
        approvalId: rowData.id,
        categoryid: rowData.categoryid,
        comment: `${comment} (来自:微信小程序)`,
      }).then(that.operateSuccess)
        .catch(that.operateFail);
    }
  },

  onSignClick() {
    const that = this;
    const { rowData, comment, } = that.data;

    if (rowData) {
      sign({
        approvalId: rowData.id,
        comment: `${comment} (来自:微信小程序)`,
      }).then(that.operateSuccess)
        .catch(that.operateFail);
    }
  },

  onAbolishClick() {
    const that = this;
    const { rowData, comment, } = that.data;

    if (rowData) {
      abolish({
        approvalId: rowData.id,
        comment: `${comment} (来自:微信小程序)`,
      }).then(that.operateSuccess)
        .catch(that.operateFail);
    }
  },

  onReplyClick() {
    const that = this;
    const { rowData, comment, } = that.data;

    if (rowData) {
      reply({
        approvalId: rowData.id,
        comment: `${comment} (来自:微信小程序)`,
      }).then(that.operateSuccess)
        .catch(that.operateFail);
    }
  },

  operateSuccess(res: WechatMiniprogram.RequestSuccessCallbackResult) {
    const data: any = res.data;
    if (res.statusCode === 200) {
      if (data.status == 200) {
        wx.navigateBack({
          delta: 2,
        });
      }
      else {
        this.operateFail({
          message: data.errorMessage,
        });
      }
    }
    else {
      this.operateFail({
        message: data.message,
      });
    }
  },

  operateFail(res: any) {
    this.setData({
      msgShow: true,
      msgInfo: {
        type: 'error',
        title: '操作失败',
        desc: res.message,
      },
    });
  },

  bindMsgHide() {
    this.setData({
      msgShow: false,
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
      const { rowData, oper }: { rowData: any; oper: string; } = data;
      let node ='';
      if(oper === 'approve') {
        node = rowData && rowData.nextNode ? rowData.nextNode[0].id : '';
      }
      else if(oper === 'reject') {
        node = rowData && rowData.rejectNode ? rowData.rejectNode[0].id : '';
      }
      that.setData({
        rowData,
        oper,
        node,
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