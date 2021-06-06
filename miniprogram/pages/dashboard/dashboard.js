import { wxRequest } from '../../utils/request';
import { VERSION } from '../../utils/constant';
Page({
    app: getApp(),
    data: {
        userInfo: {},
        name: "姓名",
        uaccount: "工号",
        catelogs: [],
        changeLogs: [{
                text: '支持批量操作',
                desc: '2021-6-6',
            }, {
                text: '企业微信内支持选人操作',
                desc: '2021-3-12',
            }, {
                text: '支持企业微信',
                desc: '2021-2-26',
            }, {
                text: 'OA审批操作支持选择节点',
                desc: '2020-10-11',
            }, {
                text: '支持审批操作',
                desc: '2020-10-07',
            }, {
                text: '支持绑定后自动登陆',
                desc: '2020-10-05',
            }, {
                text: '初始版本上线',
                desc: '2020-10-03',
            }],
        version: VERSION,
        hasUpdate: false,
    },
    onLogout() {
        wx.reLaunch({
            url: '/pages/index/index?auto=false'
        });
    },
    getUserInfo(e) {
        const app = getApp();
        app.globalData.userInfo = e.detail.userInfo;
    },
    onLoad() {
        const { app } = this;
        const that = this;
        if (app.globalData.hasUserInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
            });
        }
        const uaccount = app.globalData.accountInfo?.uaccount;
        if (uaccount) {
            wxRequest({
                url: `https://auth.gzmpc.com/sso/webapi/account/load?uaccount=${uaccount}`,
            }).then((res) => {
                if (res.statusCode == 200) {
                    const data = res.data;
                    if (data && data.status == 200) {
                        that.setData({
                            name: data.data.accountname
                        });
                    }
                }
            });
        }
        this.setData({
            uaccount,
        });
        app.checkUpdate(function (res) {
            that.setData({
                hasUpdate: res.hasUpdate,
            });
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFL0MsSUFBSSxDQUFDO0lBQ0gsR0FBRyxFQUFFLE1BQU0sRUFBYTtJQUN4QixJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsRUFBRTtRQUNaLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLElBQUk7UUFDZCxRQUFRLEVBQUUsRUFBRTtRQUNaLFVBQVUsRUFBRSxDQUFDO2dCQUNYLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxVQUFVO2FBQ2pCLEVBQUM7Z0JBQ0EsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLElBQUksRUFBRSxXQUFXO2FBQ2xCLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLFdBQVc7YUFDbEIsRUFBRTtnQkFDRCxJQUFJLEVBQUUsY0FBYztnQkFDcEIsSUFBSSxFQUFFLFlBQVk7YUFDbkIsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsWUFBWTthQUNuQixFQUFFO2dCQUNELElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsWUFBWTthQUNuQixFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxZQUFZO2FBQ25CLENBQUM7UUFDRixPQUFPLEVBQUUsT0FBTztRQUNoQixTQUFTLEVBQUUsS0FBSztLQUNqQjtJQUVELFFBQVE7UUFJTixFQUFFLENBQUMsUUFBUSxDQUFDO1lBQ1YsR0FBRyxFQUFFLCtCQUErQjtTQUNyQyxDQUFDLENBQUM7SUFJTCxDQUFDO0lBRUQsV0FBVyxDQUFDLENBQU07UUFDaEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFhLENBQUM7UUFDaEMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7SUFFN0MsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUVsQixJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUTthQUNsQyxDQUFDLENBQUE7U0FDSDtRQUVELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztRQUN0RCxJQUFJLFFBQVEsRUFBRTtZQUNaLFNBQVMsQ0FBQztnQkFDUixHQUFHLEVBQUUsMkRBQTJELFFBQVEsRUFBRTthQUMzRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2QsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTtvQkFDekIsTUFBTSxJQUFJLEdBQVEsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDM0IsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7d0JBQzlCLElBQUksQ0FBQyxPQUFPLENBQUM7NEJBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVzt5QkFDNUIsQ0FBQyxDQUFDO3FCQUNKO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxRQUFRO1NBQ1QsQ0FBQyxDQUFDO1FBSUgsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUc7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRyxDQUFDLFNBQVM7YUFDekIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0NBRUYsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZGFzaGJvYXJkLnRzXG5pbXBvcnQgeyB3eFJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9yZXF1ZXN0JztcbmltcG9ydCB7IFZFUlNJT04gfSBmcm9tICcuLi8uLi91dGlscy9jb25zdGFudCc7XG5cblBhZ2Uoe1xuICBhcHA6IGdldEFwcDxCcG1PcHRpb24+KCksXG4gIGRhdGE6IHtcbiAgICB1c2VySW5mbzoge30sXG4gICAgbmFtZTogXCLlp5PlkI1cIixcbiAgICB1YWNjb3VudDogXCLlt6Xlj7dcIixcbiAgICBjYXRlbG9nczogW10sXG4gICAgY2hhbmdlTG9nczogW3tcbiAgICAgIHRleHQ6ICfmlK/mjIHmibnph4/mk43kvZwnLFxuICAgICAgZGVzYzogJzIwMjEtNi02JyxcbiAgICB9LHtcbiAgICAgIHRleHQ6ICfkvIHkuJrlvq7kv6HlhoXmlK/mjIHpgInkurrmk43kvZwnLFxuICAgICAgZGVzYzogJzIwMjEtMy0xMicsXG4gICAgfSwge1xuICAgICAgdGV4dDogJ+aUr+aMgeS8geS4muW+ruS/oScsXG4gICAgICBkZXNjOiAnMjAyMS0yLTI2JyxcbiAgICB9LCB7XG4gICAgICB0ZXh0OiAnT0HlrqHmibnmk43kvZzmlK/mjIHpgInmi6noioLngrknLFxuICAgICAgZGVzYzogJzIwMjAtMTAtMTEnLFxuICAgIH0sIHtcbiAgICAgIHRleHQ6ICfmlK/mjIHlrqHmibnmk43kvZwnLFxuICAgICAgZGVzYzogJzIwMjAtMTAtMDcnLFxuICAgIH0sIHtcbiAgICAgIHRleHQ6ICfmlK/mjIHnu5HlrprlkI7oh6rliqjnmbvpmYYnLFxuICAgICAgZGVzYzogJzIwMjAtMTAtMDUnLFxuICAgIH0sIHtcbiAgICAgIHRleHQ6ICfliJ3lp4vniYjmnKzkuIrnur8nLFxuICAgICAgZGVzYzogJzIwMjAtMTAtMDMnLFxuICAgIH1dLFxuICAgIHZlcnNpb246IFZFUlNJT04sXG4gICAgaGFzVXBkYXRlOiBmYWxzZSxcbiAgfSxcblxuICBvbkxvZ291dCgpIHtcbiAgICAvLyB3eC5yZW1vdmVTdG9yYWdlKHtcbiAgICAvLyAgIGtleTogQ09OU1RBTlRfU0VTU0lPTkRBVEFfS0VZLFxuICAgIC8vICAgc3VjY2VzcyAoKSB7XG4gICAgd3gucmVMYXVuY2goe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4P2F1dG89ZmFsc2UnXG4gICAgfSk7XG4gICAgLy8gfVxuICAgIC8vIH0pXG5cbiAgfSxcblxuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcbiAgICBjb25zdCBhcHAgPSBnZXRBcHA8QnBtT3B0aW9uPigpO1xuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cblxuICB9LFxuXG4gIG9uTG9hZCgpIHtcbiAgICBjb25zdCB7IGFwcCB9ID0gdGhpcztcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgIGlmIChhcHAuZ2xvYmFsRGF0YS5oYXNVc2VySW5mbykge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCB1YWNjb3VudCA9IGFwcC5nbG9iYWxEYXRhLmFjY291bnRJbmZvPy51YWNjb3VudDtcbiAgICBpZiAodWFjY291bnQpIHtcbiAgICAgIHd4UmVxdWVzdCh7XG4gICAgICAgIHVybDogYGh0dHBzOi8vYXV0aC5nem1wYy5jb20vc3NvL3dlYmFwaS9hY2NvdW50L2xvYWQ/dWFjY291bnQ9JHt1YWNjb3VudH1gLFxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSAyMDApIHtcbiAgICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSByZXMuZGF0YTtcbiAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIG5hbWU6IGRhdGEuZGF0YS5hY2NvdW50bmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdWFjY291bnQsXG4gICAgfSk7XG5cblxuXG4gICAgYXBwLmNoZWNrVXBkYXRlKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgIGhhc1VwZGF0ZTogcmVzLmhhc1VwZGF0ZSxcbiAgICAgIH0pO1xuICAgIH0pXG4gIH0sXG5cbn0pIl19