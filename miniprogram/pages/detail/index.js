import { wxRequest } from '../../utils/request';
Page({
    app: getApp(),
    data: {
        approvalid: '',
        categoryid: '',
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
    refreshDetail: function () {
        const { data: { approvalid, categoryid }, app: { globalData: { token } } } = this;
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
                const data = res.data;
                const { record = [] } = data.data;
                let steps = [];
                let active = 0;
                record.map((item, index) => {
                    steps.push({
                        text: `${item.operator}(${item.checkmans}): ${item.comment}`,
                        desc: `${item.operatorNode}  ${item.time}`
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
            const operation = data.operation;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFaEQsSUFBSSxDQUFDO0lBQ0gsR0FBRyxFQUFFLE1BQU0sRUFBYTtJQUN4QixJQUFJLEVBQUU7UUFDSixVQUFVLEVBQUUsRUFBRTtRQUNkLFVBQVUsRUFBRSxFQUFFO1FBQ2QsU0FBUyxFQUFFLEVBQUU7UUFDYixNQUFNLEVBQUU7WUFDTixPQUFPLEVBQUUsRUFBRTtZQUNYLE1BQU0sRUFBRSxFQUFFO1lBQ1YsVUFBVSxFQUFFLEVBQUU7WUFDZCxLQUFLLEVBQUUsRUFBRTtZQUNULE1BQU0sRUFBRyxDQUFDO1NBQ1g7S0FDRjtJQUVELFFBQVE7UUFDTixFQUFFLENBQUMsWUFBWSxDQUFDLEVBRWYsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWEsRUFBRTtRQUNiLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNsRixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsU0FBUyxDQUFDO1lBQ1IsTUFBTSxFQUFFO2dCQUNOLGNBQWMsRUFBRSxtQ0FBbUM7YUFDcEQ7WUFDRCxHQUFHLEVBQUUsZ0JBQWdCO1lBQ3JCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFO2dCQUNKLEtBQUs7Z0JBQ0wsVUFBVTtnQkFDVixVQUFVO2FBQ1g7U0FDRixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDZCxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakIsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtnQkFDekIsTUFBTSxJQUFJLEdBQVEsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFFM0IsTUFBTSxFQUFFLE1BQU0sR0FBRyxFQUFFLEVBQUUsR0FBMkIsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDMUQsSUFBSSxLQUFLLEdBQXNDLEVBQUUsQ0FBQztnQkFDbEQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUM7d0JBQ1QsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7d0JBQzVELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtxQkFDM0MsQ0FBQyxDQUFDO29CQUNILElBQUcsSUFBSSxDQUFDLElBQUksRUFBRTt3QkFDWixNQUFNLEdBQUcsS0FBSyxDQUFDO3FCQUNoQjtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFHSCxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNYLE1BQU0sRUFBRTt3QkFDTixHQUFHLElBQUksQ0FBQyxJQUFJO3dCQUNaLEtBQUs7d0JBQ0wsTUFBTTtxQkFDUDtpQkFDRixDQUFDLENBQUM7YUFDSjtpQkFDSTthQUVKO1FBQ0gsQ0FBQyxDQUFDO2FBQ0MsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNWLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFLRCxNQUFNLEVBQUU7UUFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFbEQsWUFBWSxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxVQUFVLElBQUk7WUFDeEQsTUFBTSxTQUFTLEdBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNyQyxJQUFJLFNBQVMsRUFBRTtnQkFDYixTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7b0JBQzFCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7d0JBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO3FCQUN2Qjt5QkFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO3dCQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztxQkFDdEI7eUJBQ0k7d0JBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7cUJBQ3ZCO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLEdBQUcsSUFBSTtnQkFDUCxTQUFTO2FBQ1YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0NBRUYsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcbmltcG9ydCB7IHd4UmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL3JlcXVlc3QnO1xuXG5QYWdlKHtcbiAgYXBwOiBnZXRBcHA8QnBtT3B0aW9uPigpLFxuICBkYXRhOiB7XG4gICAgYXBwcm92YWxpZDogJycsXG4gICAgY2F0ZWdvcnlpZDogJycsXG4gICAgb3BlcmF0aW9uOiBbXSxcbiAgICBkZXRhaWw6IHtcbiAgICAgIGNvbnRlbnQ6IFtdLFxuICAgICAgcmVjb3JkOiBbXSxcbiAgICAgIGF0dGFjaG1lbnQ6IFtdLFxuICAgICAgc3RlcHM6IFtdLFxuICAgICAgYWN0aXZlIDogMCxcbiAgICB9LFxuICB9LFxuXG4gIG9uUmV0dXJuKCkge1xuICAgIHd4Lm5hdmlnYXRlQmFjayh7XG5cbiAgICB9KTtcbiAgfSxcblxuICByZWZyZXNoRGV0YWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgeyBkYXRhOiB7IGFwcHJvdmFsaWQsIGNhdGVnb3J5aWQgfSwgYXBwOiB7IGdsb2JhbERhdGE6IHsgdG9rZW4gfSB9IH0gPSB0aGlzO1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHd4UmVxdWVzdCh7XG4gICAgICBoZWFkZXI6IHtcbiAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgfSxcbiAgICAgIHVybDogXCIvYXNzL2Fzc2RldGFpbFwiLFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHRva2VuLFxuICAgICAgICBhcHByb3ZhbGlkLFxuICAgICAgICBjYXRlZ29yeWlkLFxuICAgICAgfVxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSAyMDApIHtcbiAgICAgICAgY29uc3QgZGF0YTogYW55ID0gcmVzLmRhdGE7XG5cbiAgICAgICAgY29uc3QgeyByZWNvcmQgPSBbXSB9OiB7IHJlY29yZDogQXJyYXk8YW55PiB9ID0gZGF0YS5kYXRhO1xuICAgICAgICBsZXQgc3RlcHM6IHsgdGV4dDogc3RyaW5nOyBkZXNjOiBzdHJpbmc7IH1bXSA9IFtdO1xuICAgICAgICBsZXQgYWN0aXZlID0gMDtcbiAgICAgICAgcmVjb3JkLm1hcCgoaXRlbSxpbmRleCkgPT4ge1xuICAgICAgICAgIHN0ZXBzLnB1c2goe1xuICAgICAgICAgICAgdGV4dDogYCR7aXRlbS5vcGVyYXRvcn0oJHtpdGVtLmNoZWNrbWFuc30pOiAke2l0ZW0uY29tbWVudH1gLFxuICAgICAgICAgICAgZGVzYzogYCR7aXRlbS5vcGVyYXRvck5vZGV9ICAke2l0ZW0udGltZX1gXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYoaXRlbS50aW1lKSB7XG4gICAgICAgICAgICBhY3RpdmUgPSBpbmRleDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgIC4uLmRhdGEuZGF0YSxcbiAgICAgICAgICAgIHN0ZXBzLFxuICAgICAgICAgICAgYWN0aXZlLFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcblxuICAgICAgfVxuICAgIH0pXG4gICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICBjb25zdCBldmVudENoYW5uZWwgPSB0aGlzLmdldE9wZW5lckV2ZW50Q2hhbm5lbCgpO1xuICAgIC8vIOebkeWQrGFjY2VwdERhdGFGcm9tT3BlbmVyUGFnZeS6i+S7tu+8jOiOt+WPluS4iuS4gOmhtemdoumAmui/h2V2ZW50Q2hhbm5lbOS8oOmAgeWIsOW9k+WJjemhtemdoueahOaVsOaNrlxuICAgIGV2ZW50Q2hhbm5lbC5vbignYWNjZXB0RGF0YUZyb21PcGVuZXJQYWdlJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIGNvbnN0IG9wZXJhdGlvbjogW10gPSBkYXRhLm9wZXJhdGlvbjtcbiAgICAgIGlmIChvcGVyYXRpb24pIHtcbiAgICAgICAgb3BlcmF0aW9uLm1hcCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0ub3BlciA9PT0gJ2FwcHJvdmUnKSB7XG4gICAgICAgICAgICBpdGVtLnR5cGUgPSAncHJpbWFyeSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGl0ZW0ub3BlciA9PT0gJ3N0b3AnKSB7XG4gICAgICAgICAgICBpdGVtLnR5cGUgPSAnZGFuZ2VyJztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpdGVtLnR5cGUgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhhdC5zZXREYXRhKHtcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgb3BlcmF0aW9uLFxuICAgICAgfSk7XG4gICAgICB0aGF0LnJlZnJlc2hEZXRhaWwoKTtcbiAgICB9KVxuICB9LFxuXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVmcmVzaERldGFpbCgpO1xuICB9XG5cbn0pIl19