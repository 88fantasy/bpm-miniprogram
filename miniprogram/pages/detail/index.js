import { wxRequest } from '../../utils/request';
Page({
    app: getApp(),
    data: {
        approvalid: '',
        categoryid: '',
        detail: {
            content: [],
            record: [],
            attachment: [],
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
                that.setData({
                    detail: {
                        ...data.data
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
            that.setData({
                ...data
            });
            that.refreshDetail();
        });
    },
    onPullDownRefresh() {
        this.refreshDetail();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFaEQsSUFBSSxDQUFDO0lBQ0gsR0FBRyxFQUFFLE1BQU0sRUFBYTtJQUN4QixJQUFJLEVBQUU7UUFDSixVQUFVLEVBQUUsRUFBRTtRQUNkLFVBQVUsRUFBRSxFQUFFO1FBQ2QsTUFBTSxFQUFFO1lBQ04sT0FBTyxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsRUFBRTtZQUNWLFVBQVUsRUFBRSxFQUFFO1NBQ2Y7S0FDRjtJQUVELFFBQVE7UUFDTixFQUFFLENBQUMsWUFBWSxDQUFDLEVBRWYsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWEsRUFBRTtRQUNiLE1BQU0sRUFBRSxJQUFJLEVBQUcsRUFBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLEVBQUUsR0FBRyxFQUFHLEVBQUUsVUFBVSxFQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNwRixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsU0FBUyxDQUFDO1lBQ1IsTUFBTSxFQUFFO2dCQUNKLGNBQWMsRUFBRSxtQ0FBbUM7YUFDdEQ7WUFDRCxHQUFHLEVBQUUsZ0JBQWdCO1lBQ3JCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFO2dCQUNKLEtBQUs7Z0JBQ0wsVUFBVTtnQkFDVixVQUFVO2FBQ1g7U0FDSixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDWixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakIsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtnQkFDdkIsTUFBTSxJQUFJLEdBQVEsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQztvQkFDWCxNQUFNLEVBQUc7d0JBQ1AsR0FBRyxJQUFJLENBQUMsSUFBSTtxQkFDYjtpQkFDRixDQUFDLENBQUM7YUFDTjtpQkFDSTthQUVKO1FBQ0wsQ0FBQyxDQUFDO2FBQ0csS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNaLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNILENBQUM7SUFLRCxNQUFNLEVBQUU7UUFDTixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFbEQsWUFBWSxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxVQUFTLElBQUk7WUFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxHQUFHLElBQUk7YUFDUixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Q0FFRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuaW1wb3J0IHsgd3hSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbHMvcmVxdWVzdCc7XG5cblBhZ2Uoe1xuICBhcHA6IGdldEFwcDxCcG1PcHRpb24+KCksXG4gIGRhdGE6IHtcbiAgICBhcHByb3ZhbGlkOiAnJyxcbiAgICBjYXRlZ29yeWlkOiAnJyxcbiAgICBkZXRhaWw6IHtcbiAgICAgIGNvbnRlbnQ6IFtdLFxuICAgICAgcmVjb3JkOiBbXSwgXG4gICAgICBhdHRhY2htZW50OiBbXSxcbiAgICB9LFxuICB9LFxuXG4gIG9uUmV0dXJuKCkge1xuICAgIHd4Lm5hdmlnYXRlQmFjayh7XG4gICAgICBcbiAgICB9KTtcbiAgfSxcblxuICByZWZyZXNoRGV0YWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgeyBkYXRhIDoge2FwcHJvdmFsaWQsIGNhdGVnb3J5aWQgfSwgYXBwIDogeyBnbG9iYWxEYXRhIDogeyB0b2tlbiB9IH0gfSA9IHRoaXM7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgd3hSZXF1ZXN0KHtcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgICAgIH0sXG4gICAgICB1cmw6IFwiL2Fzcy9hc3NkZXRhaWxcIixcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZGF0YToge1xuICAgICAgICB0b2tlbixcbiAgICAgICAgYXBwcm92YWxpZCxcbiAgICAgICAgY2F0ZWdvcnlpZCxcbiAgICAgIH1cbiAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09IDIwMCkge1xuICAgICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IHJlcy5kYXRhO1xuICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICBkZXRhaWwgOiB7XG4gICAgICAgICAgICAgIC4uLmRhdGEuZGF0YVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIFxuICAgICAgfVxuICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9vVxuICAgKi9cbiAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgY29uc3QgZXZlbnRDaGFubmVsID0gdGhpcy5nZXRPcGVuZXJFdmVudENoYW5uZWwoKTtcbiAgICAvLyDnm5HlkKxhY2NlcHREYXRhRnJvbU9wZW5lclBhZ2Xkuovku7bvvIzojrflj5bkuIrkuIDpobXpnaLpgJrov4dldmVudENoYW5uZWzkvKDpgIHliLDlvZPliY3pobXpnaLnmoTmlbDmja5cbiAgICBldmVudENoYW5uZWwub24oJ2FjY2VwdERhdGFGcm9tT3BlbmVyUGFnZScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgIC4uLmRhdGFcbiAgICAgIH0pO1xuICAgICAgdGhhdC5yZWZyZXNoRGV0YWlsKCk7XG4gICAgfSlcbiAgfSxcblxuICBvblB1bGxEb3duUmVmcmVzaCgpIHtcbiAgICB0aGlzLnJlZnJlc2hEZXRhaWwoKTtcbiAgfVxuXG59KSJdfQ==