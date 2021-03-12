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
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaGJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsT0FBTyxFQUFHLE1BQU0sc0JBQXNCLENBQUM7QUFFaEQsSUFBSSxDQUFDO0lBQ0gsR0FBRyxFQUFFLE1BQU0sRUFBYTtJQUN4QixJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUUsRUFBRTtRQUNaLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFLElBQUk7UUFDZCxRQUFRLEVBQUMsRUFBRTtRQUNYLFVBQVUsRUFBRSxDQUFDO2dCQUNYLElBQUksRUFBRSxhQUFhO2dCQUNuQixJQUFJLEVBQUUsV0FBVzthQUNsQixFQUFDO2dCQUNBLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxXQUFXO2FBQ2xCLEVBQUM7Z0JBQ0EsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLElBQUksRUFBRSxZQUFZO2FBQ25CLEVBQUM7Z0JBQ0EsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLFlBQVk7YUFDbkIsRUFBQztnQkFDQSxJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLFlBQVk7YUFDbkIsRUFBQztnQkFDQSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsWUFBWTthQUNuQixDQUFDO1FBQ0YsT0FBTyxFQUFFLE9BQU87S0FDakI7SUFFRCxRQUFRO1FBSUYsRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNWLEdBQUcsRUFBRSwrQkFBK0I7U0FDckMsQ0FBQyxDQUFDO0lBSVQsQ0FBQztJQUVELFdBQVcsQ0FBQyxDQUFNO1FBQ2hCLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBYSxDQUFDO1FBQ2hDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFBO0lBRTdDLENBQUM7SUFFRCxNQUFNO1FBQ0osTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBRyxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLFFBQVEsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVE7YUFDbEMsQ0FBQyxDQUFBO1NBQ0g7UUFFRCxNQUFNLFFBQVEsR0FBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUM7UUFDckQsSUFBRyxRQUFRLEVBQUU7WUFDWCxTQUFTLENBQUM7Z0JBQ1IsR0FBRyxFQUFFLDJEQUEyRCxRQUFRLEVBQUU7YUFDM0UsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNkLElBQUcsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7b0JBQ3hCLE1BQU0sSUFBSSxHQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQzNCLElBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO3dCQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7eUJBQzVCLENBQUMsQ0FBQztxQkFDSjtpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsUUFBUTtTQUNULENBQUMsQ0FBQztJQUVMLENBQUM7Q0FFRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBkYXNoYm9hcmQudHNcbmltcG9ydCB7IHd4UmVxdWVzdCB9IGZyb20gJy4uLy4uL3V0aWxzL3JlcXVlc3QnO1xuaW1wb3J0IHsgVkVSU0lPTiAgfSBmcm9tICcuLi8uLi91dGlscy9jb25zdGFudCc7XG5cblBhZ2Uoe1xuICBhcHA6IGdldEFwcDxCcG1PcHRpb24+KCksXG4gIGRhdGE6IHtcbiAgICB1c2VySW5mbzoge30sXG4gICAgbmFtZTogXCLlp5PlkI1cIixcbiAgICB1YWNjb3VudDogXCLlt6Xlj7dcIixcbiAgICBjYXRlbG9nczpbXSxcbiAgICBjaGFuZ2VMb2dzOiBbe1xuICAgICAgdGV4dDogJ+S8geS4muW+ruS/oeWGheaUr+aMgemAieS6uuaTjeS9nCcsXG4gICAgICBkZXNjOiAnMjAyMS0zLTEyJyxcbiAgICB9LHtcbiAgICAgIHRleHQ6ICfmlK/mjIHkvIHkuJrlvq7kv6EnLFxuICAgICAgZGVzYzogJzIwMjEtMi0yNicsXG4gICAgfSx7XG4gICAgICB0ZXh0OiAnT0HlrqHmibnmk43kvZzmlK/mjIHpgInmi6noioLngrknLFxuICAgICAgZGVzYzogJzIwMjAtMTAtMTEnLFxuICAgIH0se1xuICAgICAgdGV4dDogJ+aUr+aMgeWuoeaJueaTjeS9nCcsXG4gICAgICBkZXNjOiAnMjAyMC0xMC0wNycsXG4gICAgfSx7XG4gICAgICB0ZXh0OiAn5pSv5oyB57uR5a6a5ZCO6Ieq5Yqo55m76ZmGJyxcbiAgICAgIGRlc2M6ICcyMDIwLTEwLTA1JyxcbiAgICB9LHtcbiAgICAgIHRleHQ6ICfliJ3lp4vniYjmnKzkuIrnur8nLFxuICAgICAgZGVzYzogJzIwMjAtMTAtMDMnLFxuICAgIH1dLFxuICAgIHZlcnNpb246IFZFUlNJT04sXG4gIH0sXG5cbiAgb25Mb2dvdXQoKSB7XG4gICAgLy8gd3gucmVtb3ZlU3RvcmFnZSh7XG4gICAgLy8gICBrZXk6IENPTlNUQU5UX1NFU1NJT05EQVRBX0tFWSxcbiAgICAvLyAgIHN1Y2Nlc3MgKCkge1xuICAgICAgICB3eC5yZUxhdW5jaCh7XG4gICAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2luZGV4P2F1dG89ZmFsc2UnXG4gICAgICAgIH0pO1xuICAgICAgLy8gfVxuICAgIC8vIH0pXG4gICAgXG4gIH0sXG5cbiAgZ2V0VXNlckluZm8oZTogYW55KSB7XG4gICAgY29uc3QgYXBwID0gZ2V0QXBwPEJwbU9wdGlvbj4oKTtcbiAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXG4gICAgXG4gIH0sXG4gICBcbiAgb25Mb2FkKCkge1xuICAgIGNvbnN0IHsgYXBwIH0gPSB0aGlzO1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgaWYoYXBwLmdsb2JhbERhdGEuaGFzVXNlckluZm8pIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHVzZXJJbmZvOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgdWFjY291bnQ9IGFwcC5nbG9iYWxEYXRhLmFjY291bnRJbmZvPy51YWNjb3VudDtcbiAgICBpZih1YWNjb3VudCkge1xuICAgICAgd3hSZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly9hdXRoLmd6bXBjLmNvbS9zc28vd2ViYXBpL2FjY291bnQvbG9hZD91YWNjb3VudD0ke3VhY2NvdW50fWAsXG4gICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYocmVzLnN0YXR1c0NvZGUgPT0gMjAwKSB7XG4gICAgICAgICAgY29uc3QgZGF0YTphbnkgID0gcmVzLmRhdGE7XG4gICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICAgIG5hbWU6IGRhdGEuZGF0YS5hY2NvdW50bmFtZVxuICAgICAgICAgICAgfSk7IFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHVhY2NvdW50LFxuICAgIH0pO1xuICAgIFxuICB9LFxuICBcbn0pIl19