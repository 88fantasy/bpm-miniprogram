import { wxRequest } from '../../utils/request';
import { formatTime } from '../../utils/util';
Page({
    app: getApp(),
    data: {
        approvalid: '',
        rowData: {
            categoryid: [],
        },
        operation: [],
        detail: {
            content: [],
            record: [],
            attachment: [],
            steps: [],
            active: 0,
        },
    },
    onReturn() {
        wx.navigateBack({});
    },
    onAttachmentClick(e) {
        const { dataset: { url, type } } = e.target;
        if (url) {
            wx.downloadFile({
                url,
                success: function (res) {
                    const filePath = res.tempFilePath;
                    wx.openDocument({
                        filePath,
                        fileType: type,
                        success: function (res) {
                            console.log('打开文档成功', res);
                        }
                    });
                },
                fail: function (res) {
                    console.log("download fail: ", res);
                }
            });
        }
    },
    onOperateClick(e) {
        const that = this;
        const { dataset: { operate } } = e.target;
        const { rowData } = this.data;
        if (rowData) {
            wx.navigateTo({
                url: `/pages/operate/index`,
                events: {
                    operateBack: function (data) {
                        wx.navigateBack({
                            success: () => {
                                const eventChannel = that.getOpenerEventChannel();
                                eventChannel.emit('detailBack', {
                                    promise: data.promise,
                                });
                            }
                        });
                    }
                },
                success: function (res) {
                    res.eventChannel.emit('acceptDataFromOpenerPage', {
                        rowData: rowData,
                        oper: operate,
                    });
                }
            });
        }
    },
    refreshDetail: function () {
        const { data: { approvalid, rowData }, app: { globalData: { accountInfo: { token } } } } = this;
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
                const data = res.data;
                const { record = [] } = data.data;
                let steps = [];
                let active = 0;
                record.map((item, index) => {
                    steps.push({
                        text: `${item.operator}(${item.checkmans}): ${item.comment}`,
                        desc: `${item.operatorNode}  ${item.time ? formatTime(new Date(item.time)) : "未审"}`
                    });
                    if (item.time) {
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
    onLoad: function () {
        const that = this;
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('acceptDataFromOpenerPage', function (data) {
            const operation = data.rowData.operation;
            if (operation) {
                operation.map((item) => {
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
        });
    },
    onPullDownRefresh() {
        this.refreshDetail();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTlDLElBQUksQ0FBQztJQUNILEdBQUcsRUFBRSxNQUFNLEVBQWE7SUFDeEIsSUFBSSxFQUFFO1FBQ0osVUFBVSxFQUFFLEVBQUU7UUFDZCxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUcsRUFBRTtTQUNoQjtRQUNELFNBQVMsRUFBRSxFQUFFO1FBQ2IsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsRUFBRTtZQUNWLFVBQVUsRUFBRSxFQUFFO1lBQ2QsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUcsQ0FBQztTQUNYO0tBQ0Y7SUFFRCxRQUFRO1FBQ04sRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUVmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxDQUFNO1FBQ3RCLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FLNUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNiLElBQUcsR0FBRyxFQUFFO1lBQ04sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFFZCxHQUFHO2dCQUNILE9BQU8sRUFBRSxVQUFVLEdBQUc7b0JBQ3BCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7b0JBQ2xDLEVBQUUsQ0FBQyxZQUFZLENBQUM7d0JBQ2QsUUFBUTt3QkFDUixRQUFRLEVBQUUsSUFBSTt3QkFDZCxPQUFPLEVBQUUsVUFBVSxHQUFHOzRCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQzt3QkFDNUIsQ0FBQztxQkFDRixDQUFDLENBQUE7Z0JBQ0os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LEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztDQUVGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG5pbXBvcnQgeyB3eFJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9yZXF1ZXN0JztcbmltcG9ydCB7IGZvcm1hdFRpbWUgfSBmcm9tICcuLi8uLi91dGlscy91dGlsJztcblxuUGFnZSh7XG4gIGFwcDogZ2V0QXBwPEJwbU9wdGlvbj4oKSxcbiAgZGF0YToge1xuICAgIGFwcHJvdmFsaWQ6ICcnLFxuICAgIHJvd0RhdGE6IHsgXG4gICAgICBjYXRlZ29yeWlkIDogW10sXG4gICAgfSxcbiAgICBvcGVyYXRpb246IFtdLFxuICAgIGRldGFpbDoge1xuICAgICAgY29udGVudDogW10sXG4gICAgICByZWNvcmQ6IFtdLFxuICAgICAgYXR0YWNobWVudDogW10sXG4gICAgICBzdGVwczogW10sXG4gICAgICBhY3RpdmUgOiAwLFxuICAgIH0sXG4gIH0sXG5cbiAgb25SZXR1cm4oKSB7XG4gICAgd3gubmF2aWdhdGVCYWNrKHtcblxuICAgIH0pO1xuICB9LFxuXG4gIG9uQXR0YWNobWVudENsaWNrKGU6IGFueSkge1xuICAgIGNvbnN0IHsgZGF0YXNldDogeyB1cmwsIHR5cGUgfSB9IDoge1xuICAgICAgZGF0YXNldDoge1xuICAgICAgICB1cmw6IHN0cmluZztcbiAgICAgICAgdHlwZT86ICdkb2MnIHwgJ2RvY3gnIHwgJ3hscycgfCAneGxzeCcgfCAncHB0JyB8ICdwcHR4JyB8ICdwZGYnO1xuICAgICAgfVxuICAgIH0gPSBlLnRhcmdldDtcbiAgICBpZih1cmwpIHtcbiAgICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICAgIC8vIOekuuS+iyB1cmzvvIzlubbpnZ7nnJ/lrp7lrZjlnKhcbiAgICAgICAgdXJsLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgY29uc3QgZmlsZVBhdGggPSByZXMudGVtcEZpbGVQYXRoO1xuICAgICAgICAgIHd4Lm9wZW5Eb2N1bWVudCh7XG4gICAgICAgICAgICBmaWxlUGF0aCxcbiAgICAgICAgICAgIGZpbGVUeXBlOiB0eXBlLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5omT5byA5paH5qGj5oiQ5YqfJyxyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6ZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJkb3dubG9hZCBmYWlsOiBcIixyZXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgb25PcGVyYXRlQ2xpY2soZTphbnkpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBjb25zdCB7IGRhdGFzZXQ6IHsgb3BlcmF0ZSB9IH0gOiB7XG4gICAgICBkYXRhc2V0OiB7XG4gICAgICAgIG9wZXJhdGU6IHN0cmluZztcbiAgICAgIH1cbiAgICB9ID0gZS50YXJnZXQ7XG5cbiAgICBjb25zdCB7IHJvd0RhdGEgfSA9IHRoaXMuZGF0YTtcbiAgICBpZihyb3dEYXRhKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL29wZXJhdGUvaW5kZXhgLFxuICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICAvLyDkuLrmjIflrprkuovku7bmt7vliqDkuIDkuKrnm5HlkKzlmajvvIzojrflj5booqvmiZPlvIDpobXpnaLkvKDpgIHliLDlvZPliY3pobXpnaLnmoTmlbDmja5cbiAgICAgICAgICBvcGVyYXRlQmFjazogZnVuY3Rpb24oZGF0YTogeyBcbiAgICAgICAgICAgIGNvbW1lbnQ6IHN0cmluZztcbiAgICAgICAgICAgIG9wZXI6IHN0cmluZztcbiAgICAgICAgICAgIHByb21pc2U6IFByb21pc2U8V2VjaGF0TWluaXByb2dyYW0uUmVxdWVzdFN1Y2Nlc3NDYWxsYmFja1Jlc3VsdD47XG4gICAgICAgICAgfSkge1xuICAgICAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICAgICAgc3VjY2VzczooKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnRDaGFubmVsID0gdGhhdC5nZXRPcGVuZXJFdmVudENoYW5uZWwoKTtcbiAgICAgICAgICAgICAgICBldmVudENoYW5uZWwuZW1pdCgnZGV0YWlsQmFjaycsIHtcbiAgICAgICAgICAgICAgICAgIHByb21pc2U6IGRhdGEucHJvbWlzZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgLy8g6YCa6L+HZXZlbnRDaGFubmVs5ZCR6KKr5omT5byA6aG16Z2i5Lyg6YCB5pWw5o2uXG4gICAgICAgICAgcmVzLmV2ZW50Q2hhbm5lbC5lbWl0KCdhY2NlcHREYXRhRnJvbU9wZW5lclBhZ2UnLCB7XG4gICAgICAgICAgICByb3dEYXRhOiByb3dEYXRhLFxuICAgICAgICAgICAgb3Blcjogb3BlcmF0ZSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfSxcblxuICByZWZyZXNoRGV0YWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgeyBkYXRhOiB7IGFwcHJvdmFsaWQsIHJvd0RhdGEgfSwgYXBwOiB7IGdsb2JhbERhdGE6IHsgYWNjb3VudEluZm8gOiB7IHRva2VuIH0gfSB9IH0gPSB0aGlzO1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHd4UmVxdWVzdCh7XG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgfSxcbiAgICAgIHVybDogXCIvYXNzL2Fzc2RldGFpbFwiLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRva2VuLFxuICAgICAgICBhcHByb3ZhbGlkLFxuICAgICAgICBjYXRlZ29yeWlkOiByb3dEYXRhLmNhdGVnb3J5aWQsXG4gICAgICB9XG4gICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IDIwMCkge1xuICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSByZXMuZGF0YTtcblxuICAgICAgICBjb25zdCB7IHJlY29yZCA9IFtdIH06IHsgcmVjb3JkOiBBcnJheTxhbnk+IH0gPSBkYXRhLmRhdGE7XG4gICAgICAgIGxldCBzdGVwczogeyB0ZXh0OiBzdHJpbmc7IGRlc2M6IHN0cmluZzsgfVtdID0gW107XG4gICAgICAgIGxldCBhY3RpdmUgPSAwO1xuICAgICAgICByZWNvcmQubWFwKChpdGVtLGluZGV4KSA9PiB7XG4gICAgICAgICAgc3RlcHMucHVzaCh7XG4gICAgICAgICAgICB0ZXh0OiBgJHtpdGVtLm9wZXJhdG9yfSgke2l0ZW0uY2hlY2ttYW5zfSk6ICR7aXRlbS5jb21tZW50fWAsXG4gICAgICAgICAgICBkZXNjOiBgJHtpdGVtLm9wZXJhdG9yTm9kZX0gICR7aXRlbS50aW1lPyBmb3JtYXRUaW1lKG5ldyBEYXRlKGl0ZW0udGltZSkpIDogXCLmnKrlrqFcIn1gXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYoaXRlbS50aW1lKSB7XG4gICAgICAgICAgICBhY3RpdmUgPSBpbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgIC4uLmRhdGEuZGF0YSxcbiAgICAgICAgICAgIHN0ZXBzLFxuICAgICAgICAgICAgYWN0aXZlLFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcblxuICAgICAgfVxuICAgIH0pXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBjb25zdCBldmVudENoYW5uZWwgPSB0aGlzLmdldE9wZW5lckV2ZW50Q2hhbm5lbCgpO1xuICAgIC8vIOebkeWQrGFjY2VwdERhdGFGcm9tT3BlbmVyUGFnZeS6i+S7tu+8jOiOt+WPluS4iuS4gOmhtemdoumAmui/h2V2ZW50Q2hhbm5lbOS8oOmAgeWIsOW9k+WJjemhtemdoueahOaVsOaNrlxuICAgIGV2ZW50Q2hhbm5lbC5vbignYWNjZXB0RGF0YUZyb21PcGVuZXJQYWdlJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIGNvbnN0IG9wZXJhdGlvbjogW10gPSBkYXRhLnJvd0RhdGEub3BlcmF0aW9uO1xuICAgICAgaWYgKG9wZXJhdGlvbikge1xuICAgICAgICBvcGVyYXRpb24ubWFwKChpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5vcGVyID09PSAnYXBwcm92ZScpIHtcbiAgICAgICAgICAgIGl0ZW0udHlwZSA9ICdwcmltYXJ5JztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoaXRlbS5vcGVyID09PSAnc3RvcCcpIHtcbiAgICAgICAgICAgIGl0ZW0udHlwZSA9ICdkYW5nZXInO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0udHlwZSA9ICdkZWZhdWx0JztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBvcGVyYXRpb24sXG4gICAgICB9KTtcbiAgICAgIHRoYXQucmVmcmVzaERldGFpbCgpO1xuICAgIH0pXG4gIH0sXG5cbiAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgdGhpcy5yZWZyZXNoRGV0YWlsKCk7XG4gIH1cblxufSkiXX0=