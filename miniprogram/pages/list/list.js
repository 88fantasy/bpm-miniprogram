import { wxRequest } from '../../utils/request';
import { approve, stop } from '../../services/assapi';
Page({
    app: getApp(),
    data: {
        error: '',
        assList: [],
        statusBarHeight: getApp().globalData.statusBarHeight,
        batch: false,
        checkedList: [],
    },
    setError(errMsg) {
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
                const data = res.data;
                that.setData({
                    assList: data.data
                });
            }
            else {
                that.setError(res.errMsg);
            }
        })
            .catch((res) => {
            that.setError(res.errMsg);
        });
    },
    onCellClick(e) {
        const that = this;
        const { batch, } = that.data;
        const { dataset: { id, index } } = e.target;
        const row = this.searchRow(id);
        if (row && !row.loading) {
            if (batch) {
                const checkbox = that.selectComponent(`.checkboxes-${index}`);
                checkbox.toggle();
            }
            else {
                wx.navigateTo({
                    url: '/pages/detail/index',
                    events: {
                        detailBack: function (data) {
                            const { id, promise } = data;
                            that.updateRow(data.id, {
                                loading: true,
                            });
                            promise.then((res) => {
                                that.onOperateSuccess(id, res);
                            }).catch((res) => {
                                that.onOperateFail(id, res);
                            });
                        }
                    },
                    success: function (res) {
                        res.eventChannel.emit('acceptDataFromOpenerPage', {
                            approvalid: id,
                            rowData: row,
                        });
                    }
                });
            }
        }
    },
    onOperateSuccess(id, res) {
        const data = res.data;
        if (res.statusCode === 200) {
            if (data.status == 200) {
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
    onOperateFail(id, res) {
        this.updateRow(id, {
            error: String(res.message),
            loading: false,
        });
    },
    onStopClick(e) {
        const { dataset: { id } } = e.target;
        const that = this;
        const row = that.searchRow(id);
        if (row) {
            that.updateRow(id, {
                loading: true,
            });
            stop({
                approvalId: row.id,
                categoryid: row.categoryid,
                comment: '快速中止 (来自:微信小程序)',
            }).then((res) => {
                that.onOperateSuccess(id, res);
            }).catch((res) => {
                that.onOperateFail(id, res);
            });
        }
    },
    onApproveClick(e) {
        const { dataset: { id } } = e.target;
        const that = this;
        that.onApprove(id, false);
    },
    onApprove(id, batch) {
        const that = this;
        const row = that.searchRow(id);
        if (row) {
            that.updateRow(id, {
                loading: true,
            });
            approve({
                approvalId: row.id,
                categoryid: row.categoryid,
                comment: `${batch ? '批量' : ''}快速同意 (来自:微信小程序)`,
            }).then((res) => {
                that.onOperateSuccess(id, res);
            }).catch((res) => {
                that.onOperateFail(id, res);
            });
        }
    },
    searchRow(id) {
        const { assList } = this.data;
        if (assList) {
            return assList.find((item) => item.id === id);
        }
        else {
            return undefined;
        }
    },
    updateRow(id, fields) {
        const { assList } = this.data;
        assList.map((item) => {
            if (item.id == id) {
                Object.assign(item, {
                    ...fields,
                });
            }
        });
        this.setData({
            assList,
        });
    },
    removeRow(id) {
        const { assList } = this.data;
        const newList = assList.filter((item) => item.id !== id);
        this.setData({
            assList: newList,
        });
    },
    toBatch() {
        this.setData({ batch: true, checkedList: [], });
    },
    onBatchSubmit() {
        const that = this;
        const { checkedList, } = that.data;
        if (checkedList.length > 0) {
            checkedList.forEach((value) => {
                that.onApprove(value, true);
            });
        }
        that.onBatchCancel();
    },
    onBatchCancel() {
        this.setData({
            batch: false,
            checkedList: [],
        });
    },
    onCheckChange(event) {
        this.setData({
            checkedList: event.detail
        });
    },
    onLoad() {
        wx.stopPullDownRefresh();
    },
    onShow() {
        this.onRefreshData();
    },
    onPullDownRefresh() {
        this.onRefreshData();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdEQsSUFBSSxDQUFDO0lBQ0gsR0FBRyxFQUFFLE1BQU0sRUFBYTtJQUN4QixJQUFJLEVBQUU7UUFDSixLQUFLLEVBQUUsRUFBRTtRQUNULE9BQU8sRUFBRSxFQUFFO1FBQ1gsZUFBZSxFQUFFLE1BQU0sRUFBYSxDQUFDLFVBQVUsQ0FBQyxlQUFlO1FBQy9ELEtBQUssRUFBRSxLQUFLO1FBQ1osV0FBVyxFQUFFLEVBQUU7S0FDaEI7SUFFRCxRQUFRLENBQUMsTUFBYztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsS0FBSyxFQUFFLE1BQU07U0FDZCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsYUFBYTtRQUNYLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBQzdDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixTQUFTLENBQUM7WUFDUixHQUFHLEVBQUUsZUFBZSxHQUFHLEtBQUs7U0FDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2QsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2pCLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7Z0JBQ3pCLE1BQU0sSUFBSSxHQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQ1gsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJO2lCQUNuQixDQUFDLENBQUE7YUFDSDtpQkFDSTtn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QUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsRUFBRTtTQUNoQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQVU7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFdBQVcsRUFBRSxLQUFLLENBQUMsTUFBTTtTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTTtRQUdKLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztDQUVGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGxpc3QudHNcbmltcG9ydCB7IHd4UmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL3JlcXVlc3QnO1xuaW1wb3J0IHsgYXBwcm92ZSwgc3RvcCB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Fzc2FwaSc7XG5cblBhZ2Uoe1xuICBhcHA6IGdldEFwcDxCcG1PcHRpb24+KCksXG4gIGRhdGE6IHtcbiAgICBlcnJvcjogJycsXG4gICAgYXNzTGlzdDogW10sXG4gICAgc3RhdHVzQmFySGVpZ2h0OiBnZXRBcHA8QnBtT3B0aW9uPigpLmdsb2JhbERhdGEuc3RhdHVzQmFySGVpZ2h0LFxuICAgIGJhdGNoOiBmYWxzZSxcbiAgICBjaGVja2VkTGlzdDogW10sXG4gIH0sXG5cbiAgc2V0RXJyb3IoZXJyTXNnOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZXJyb3I6IGVyck1zZ1xuICAgIH0pO1xuICB9LFxuXG4gIG9uUmVmcmVzaERhdGEoKSB7XG4gICAgY29uc3QgeyBhcHAgfSA9IHRoaXM7XG4gICAgY29uc3QgeyB0b2tlbiB9ID0gYXBwLmdsb2JhbERhdGEuYWNjb3VudEluZm87XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgd3hSZXF1ZXN0KHtcbiAgICAgIHVybDogXCIvYXNzL2Fzc2xpc3QvXCIgKyB0b2tlbixcbiAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gMjAwKSB7XG4gICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IHJlcy5kYXRhO1xuICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgIGFzc0xpc3Q6IGRhdGEuZGF0YVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoYXQuc2V0RXJyb3IocmVzLmVyck1zZyk7XG4gICAgICB9XG4gICAgfSlcbiAgICAgIC5jYXRjaCgocmVzOiBXZWNoYXRNaW5pcHJvZ3JhbS5HZW5lcmFsQ2FsbGJhY2tSZXN1bHQpID0+IHtcbiAgICAgICAgdGhhdC5zZXRFcnJvcihyZXMuZXJyTXNnKTtcbiAgICAgIH0pO1xuICB9LFxuXG4gIG9uQ2VsbENsaWNrKGU6IGFueSkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGNvbnN0IHsgYmF0Y2gsIH0gPSB0aGF0LmRhdGE7XG4gICAgY29uc3QgeyBkYXRhc2V0OiB7IGlkLCBpbmRleCB9IH0gPSBlLnRhcmdldDtcbiAgICBjb25zdCByb3cgPSB0aGlzLnNlYXJjaFJvdyhpZCk7XG4gICAgaWYgKHJvdyAmJiAhcm93LmxvYWRpbmcpIHtcbiAgICAgIGlmIChiYXRjaCkge1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IHRoYXQuc2VsZWN0Q29tcG9uZW50KGAuY2hlY2tib3hlcy0ke2luZGV4fWApO1xuICAgICAgICBjaGVja2JveC50b2dnbGUoKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcvcGFnZXMvZGV0YWlsL2luZGV4JyxcbiAgICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAgIC8vIOS4uuaMh+WumuS6i+S7tua3u+WKoOS4gOS4quebkeWQrOWZqO+8jOiOt+WPluiiq+aJk+W8gOmhtemdouS8oOmAgeWIsOW9k+WJjemhtemdoueahOaVsOaNrlxuICAgICAgICAgICAgZGV0YWlsQmFjazogZnVuY3Rpb24gKGRhdGE6IHtcbiAgICAgICAgICAgICAgaWQ6IHN0cmluZztcbiAgICAgICAgICAgICAgcHJvbWlzZTogUHJvbWlzZTxXZWNoYXRNaW5pcHJvZ3JhbS5SZXF1ZXN0U3VjY2Vzc0NhbGxiYWNrUmVzdWx0PjtcbiAgICAgICAgICAgIH0pIHtcbiAgICAgICAgICAgICAgY29uc3QgeyBpZCwgcHJvbWlzZSB9ID0gZGF0YTtcbiAgICAgICAgICAgICAgdGhhdC51cGRhdGVSb3coZGF0YS5pZCwge1xuICAgICAgICAgICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oKHJlczogV2VjaGF0TWluaXByb2dyYW0uUmVxdWVzdFN1Y2Nlc3NDYWxsYmFja1Jlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoYXQub25PcGVyYXRlU3VjY2VzcyhpZCwgcmVzKTtcbiAgICAgICAgICAgICAgfSkuY2F0Y2goKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhhdC5vbk9wZXJhdGVGYWlsKGlkLCByZXMpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIC8vIOmAmui/h2V2ZW50Q2hhbm5lbOWQkeiiq+aJk+W8gOmhtemdouS8oOmAgeaVsOaNrlxuICAgICAgICAgICAgcmVzLmV2ZW50Q2hhbm5lbC5lbWl0KCdhY2NlcHREYXRhRnJvbU9wZW5lclBhZ2UnLCB7XG4gICAgICAgICAgICAgIGFwcHJvdmFsaWQ6IGlkLFxuICAgICAgICAgICAgICByb3dEYXRhOiByb3csXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIG9uT3BlcmF0ZVN1Y2Nlc3MoaWQ6IHN0cmluZywgcmVzOiBXZWNoYXRNaW5pcHJvZ3JhbS5SZXF1ZXN0U3VjY2Vzc0NhbGxiYWNrUmVzdWx0KSB7XG4gICAgY29uc3QgZGF0YTogYW55ID0gcmVzLmRhdGE7XG4gICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgIGlmIChkYXRhLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgdGhpcy5yZW1vdmVSb3coaWQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlUm93KGlkLCB7XG4gICAgICAgICAgZXJyb3I6IFN0cmluZyhkYXRhLmVycm9yTWVzc2FnZSksXG4gICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMudXBkYXRlUm93KGlkLCB7XG4gICAgICAgIGVycm9yOiBTdHJpbmcoZGF0YS5tZXNzYWdlKSxcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgb25PcGVyYXRlRmFpbChpZDogc3RyaW5nLCByZXM6IGFueSkge1xuICAgIHRoaXMudXBkYXRlUm93KGlkLCB7XG4gICAgICBlcnJvcjogU3RyaW5nKHJlcy5tZXNzYWdlKSxcbiAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIH0pO1xuICB9LFxuXG4gIG9uU3RvcENsaWNrKGU6IGFueSkge1xuICAgIGNvbnN0IHsgZGF0YXNldDogeyBpZCB9IH0gPSBlLnRhcmdldDtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBjb25zdCByb3c6IGFueSA9IHRoYXQuc2VhcmNoUm93KGlkKTtcblxuICAgIGlmIChyb3cpIHtcbiAgICAgIHRoYXQudXBkYXRlUm93KGlkLCB7XG4gICAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHN0b3Aoe1xuICAgICAgICBhcHByb3ZhbElkOiByb3cuaWQsXG4gICAgICAgIGNhdGVnb3J5aWQ6IHJvdy5jYXRlZ29yeWlkLFxuICAgICAgICBjb21tZW50OiAn5b+r6YCf5Lit5q2iICjmnaXoh6o65b6u5L+h5bCP56iL5bqPKScsXG4gICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgdGhhdC5vbk9wZXJhdGVTdWNjZXNzKGlkLCByZXMpO1xuICAgICAgfSkuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICB0aGF0Lm9uT3BlcmF0ZUZhaWwoaWQsIHJlcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgb25BcHByb3ZlQ2xpY2soZTogYW55KSB7XG4gICAgY29uc3QgeyBkYXRhc2V0OiB7IGlkIH0gfSA9IGUudGFyZ2V0O1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHRoYXQub25BcHByb3ZlKGlkLCBmYWxzZSk7XG4gIH0sXG5cbiAgb25BcHByb3ZlKGlkOiBzdHJpbmcsIGJhdGNoOiBib29sZWFuKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgY29uc3Qgcm93OiBhbnkgPSB0aGF0LnNlYXJjaFJvdyhpZCk7XG5cbiAgICBpZiAocm93KSB7XG4gICAgICB0aGF0LnVwZGF0ZVJvdyhpZCwge1xuICAgICAgICBsb2FkaW5nOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBhcHByb3ZlKHtcbiAgICAgICAgYXBwcm92YWxJZDogcm93LmlkLFxuICAgICAgICBjYXRlZ29yeWlkOiByb3cuY2F0ZWdvcnlpZCxcbiAgICAgICAgY29tbWVudDogYCR7YmF0Y2g/J+aJuemHjyc6Jyd95b+r6YCf5ZCM5oSPICjmnaXoh6o65b6u5L+h5bCP56iL5bqPKWAsXG4gICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgdGhhdC5vbk9wZXJhdGVTdWNjZXNzKGlkLCByZXMpO1xuICAgICAgfSkuY2F0Y2goKHJlcykgPT4ge1xuICAgICAgICB0aGF0Lm9uT3BlcmF0ZUZhaWwoaWQsIHJlcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgc2VhcmNoUm93KGlkOiBzdHJpbmcpOiBhbnkgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHsgYXNzTGlzdCB9ID0gdGhpcy5kYXRhO1xuICAgIGlmIChhc3NMaXN0KSB7XG4gICAgICByZXR1cm4gYXNzTGlzdC5maW5kKChpdGVtOiBhbnkpID0+IGl0ZW0uaWQgPT09IGlkKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSxcblxuICB1cGRhdGVSb3coaWQ6IHN0cmluZywgZmllbGRzOiBhbnkpIHtcbiAgICBjb25zdCB7IGFzc0xpc3QgfSA9IHRoaXMuZGF0YTtcbiAgICBhc3NMaXN0Lm1hcCgoaXRlbTogYW55KSA9PiB7XG4gICAgICBpZiAoaXRlbS5pZCA9PSBpZCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGl0ZW0sIHtcbiAgICAgICAgICAuLi5maWVsZHMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBhc3NMaXN0LFxuICAgIH0pXG4gIH0sXG5cbiAgcmVtb3ZlUm93KGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB7IGFzc0xpc3QgfSA9IHRoaXMuZGF0YTtcbiAgICBjb25zdCBuZXdMaXN0ID0gYXNzTGlzdC5maWx0ZXIoKGl0ZW06IGFueSkgPT4gaXRlbS5pZCAhPT0gaWQpO1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBhc3NMaXN0OiBuZXdMaXN0LFxuICAgIH0pXG4gIH0sXG5cbiAgdG9CYXRjaCgpIHtcbiAgICB0aGlzLnNldERhdGEoeyBiYXRjaDogdHJ1ZSwgY2hlY2tlZExpc3Q6IFtdLCB9KTtcbiAgfSxcblxuICBvbkJhdGNoU3VibWl0KCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGNvbnN0IHsgY2hlY2tlZExpc3QsIH0gPSB0aGF0LmRhdGE7XG5cbiAgICBpZihjaGVja2VkTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICBjaGVja2VkTGlzdC5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nKT0+IHtcbiAgICAgICAgdGhhdC5vbkFwcHJvdmUodmFsdWUsIHRydWUpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoYXQub25CYXRjaENhbmNlbCgpO1xuICB9LFxuXG4gIG9uQmF0Y2hDYW5jZWwoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGJhdGNoOiBmYWxzZSxcbiAgICAgIGNoZWNrZWRMaXN0OiBbXSxcbiAgICB9KVxuICB9LFxuXG4gIG9uQ2hlY2tDaGFuZ2UoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBjaGVja2VkTGlzdDogZXZlbnQuZGV0YWlsXG4gICAgfSk7XG4gIH0sXG5cbiAgb25Mb2FkKCkge1xuICAgIC8vIGNvbnN0IHsgYXBwIH0gPSB0aGlzO1xuICAgIC8vIHRoaXMub25SZWZyZXNoRGF0YSgpO1xuICAgIHd4LnN0b3BQdWxsRG93blJlZnJlc2goKTtcbiAgfSxcblxuICBvblNob3coKSB7XG4gICAgdGhpcy5vblJlZnJlc2hEYXRhKCk7XG4gIH0sXG5cbiAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgdGhpcy5vblJlZnJlc2hEYXRhKCk7XG4gIH1cblxufSkiXX0=