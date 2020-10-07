import { wxRequest } from './utils/request';
import { CONSTANT_SESSIONDATA_KEY } from './utils/constant';
App({
    globalData: {
        baseUrl: "https://app.gzmpc.com/NewMobilePlatform/api",
        appId: "wx87d027dd5e097c89",
        accountInfo: {}
    },
    setAccountInfo(uaccount, accessToken) {
        this.globalData.accountInfo = {
            token: accessToken,
            uaccount,
        };
        const sessionData = this.getSessionCache();
        if (sessionData) {
            wxRequest({
                url: "https://wechat-api.gzmpc.com/v1/wechat/bindOpenId",
                method: 'POST',
                data: {
                    uaccount: uaccount,
                    openid: sessionData.openid
                }
            }).then((res) => {
                if (res.statusCode == 200) {
                }
            });
        }
    },
    wxLogin() {
        const that = this;
        const { appId } = this.globalData;
        wx.login({
            success: res => {
                wxRequest({
                    url: "https://wechat-api.gzmpc.com/v1/mp/code2Session",
                    method: 'POST',
                    data: {
                        appid: appId,
                        jsCode: res.code,
                    }
                }).then((res) => {
                    if (res.statusCode == 200) {
                        const data = res.data;
                        const sessionData = { ...data };
                        that.globalData.sessionData = sessionData;
                        wx.setStorageSync(CONSTANT_SESSIONDATA_KEY, sessionData);
                    }
                    else {
                    }
                });
            },
        });
    },
    getSessionCache() {
        try {
            const value = wx.getStorageSync(CONSTANT_SESSIONDATA_KEY);
            if (value) {
                this.globalData.sessionData = value;
                return value;
            }
            else {
                return undefined;
            }
        }
        catch (e) {
            return undefined;
        }
    },
    onLaunch() {
        const that = this;
        wx.checkSession({
            success() {
                const sessionData = that.getSessionCache();
                if (!sessionData) {
                    that.wxLogin();
                }
            },
            fail() {
                that.wxLogin();
            }
        });
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.globalData.userInfo = res.userInfo;
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                            }
                        },
                    });
                }
            },
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUcsTUFBTSxrQkFBa0IsQ0FBQztBQUU3RCxHQUFHLENBQVk7SUFDYixVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsNkNBQTZDO1FBQ3RELEtBQUssRUFBRSxvQkFBb0I7UUFDM0IsV0FBVyxFQUFHLEVBRWI7S0FDRjtJQUVELGNBQWMsQ0FBQyxRQUFnQixFQUFFLFdBQW1CO1FBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHO1lBQzVCLEtBQUssRUFBRyxXQUFXO1lBQ25CLFFBQVE7U0FDVCxDQUFDO1FBRUYsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNDLElBQUcsV0FBVyxFQUFFO1lBQ2QsU0FBUyxDQUFDO2dCQUNSLEdBQUcsRUFBRSxtREFBbUQ7Z0JBQ3hELE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRTtvQkFDSixRQUFRLEVBQUUsUUFBUTtvQkFDbEIsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO2lCQUMzQjthQUNGLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDZCxJQUFHLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxFQUFFO2lCQUV6QjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBR0QsT0FBTztRQUNMLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNsQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUViLFNBQVMsQ0FBQztvQkFDUixHQUFHLEVBQUUsaURBQWlEO29CQUN0RCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEtBQUs7d0JBQ1osTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJO3FCQUNqQjtpQkFDRixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2QsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTt3QkFDekIsTUFBTSxJQUFJLEdBQVEsR0FBRyxDQUFDLElBQUksQ0FBQzt3QkFDM0IsTUFBTSxXQUFXLEdBQWdCLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQzt3QkFFN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO3dCQUcxQyxFQUFFLENBQUMsY0FBYyxDQUFDLHdCQUF3QixFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUMxRDt5QkFDSTtxQkFFSjtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUk7WUFDRixNQUFNLEtBQUssR0FBZ0IsRUFBRSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3ZFLElBQUcsS0FBSyxFQUFFO2dCQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztnQkFDcEMsT0FBTyxLQUFLLENBQUM7YUFDZDtpQkFDSTtnQkFDSCxPQUFPLFNBQVMsQ0FBQzthQUNsQjtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLFNBQVMsQ0FBQztTQUNsQjtJQUNILENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBR2xCLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDZCxPQUFPO2dCQUVMLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDM0MsSUFBRyxDQUFDLFdBQVcsRUFBRTtvQkFDZixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ2hCO1lBQ0gsQ0FBQztZQUNELElBQUk7Z0JBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLENBQUM7U0FDRixDQUFDLENBQUE7UUFHRixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO29CQUVyQyxFQUFFLENBQUMsV0FBVyxDQUFDO3dCQUNiLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTs0QkFFYixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBOzRCQUl2QyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQ0FDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFBOzZCQUNoQzt3QkFDSCxDQUFDO3FCQUNGLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwLnRzXG5pbXBvcnQgeyB3eFJlcXVlc3QgfSBmcm9tICcuL3V0aWxzL3JlcXVlc3QnO1xuaW1wb3J0IHsgQ09OU1RBTlRfU0VTU0lPTkRBVEFfS0VZICB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnQnO1xuXG5BcHA8QnBtT3B0aW9uPih7XG4gIGdsb2JhbERhdGE6IHtcbiAgICBiYXNlVXJsOiBcImh0dHBzOi8vYXBwLmd6bXBjLmNvbS9OZXdNb2JpbGVQbGF0Zm9ybS9hcGlcIixcbiAgICBhcHBJZDogXCJ3eDg3ZDAyN2RkNWUwOTdjODlcIixcbiAgICBhY2NvdW50SW5mbyA6IHtcbiAgICAgIFxuICAgIH1cbiAgfSxcblxuICBzZXRBY2NvdW50SW5mbyh1YWNjb3VudDogc3RyaW5nLCBhY2Nlc3NUb2tlbjogc3RyaW5nKSB7XG4gICAgdGhpcy5nbG9iYWxEYXRhLmFjY291bnRJbmZvID0ge1xuICAgICAgdG9rZW4gOiBhY2Nlc3NUb2tlbixcbiAgICAgIHVhY2NvdW50LFxuICAgIH07XG5cbiAgICBjb25zdCBzZXNzaW9uRGF0YSA9IHRoaXMuZ2V0U2Vzc2lvbkNhY2hlKCk7XG4gICAgaWYoc2Vzc2lvbkRhdGEpIHtcbiAgICAgIHd4UmVxdWVzdCh7XG4gICAgICAgIHVybDogXCJodHRwczovL3dlY2hhdC1hcGkuZ3ptcGMuY29tL3YxL3dlY2hhdC9iaW5kT3BlbklkXCIsXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdWFjY291bnQ6IHVhY2NvdW50LFxuICAgICAgICAgIG9wZW5pZDogc2Vzc2lvbkRhdGEub3BlbmlkXG4gICAgICAgIH1cbiAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICBpZihyZXMuc3RhdHVzQ29kZSA9PSAyMDApIHtcbiAgICAgICAgICAvLyBjb25zdCBkYXRhOmFueSAgPSByZXMuZGF0YTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIOeZu+W9lVxuICB3eExvZ2luKCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGNvbnN0IHsgYXBwSWQgfSA9IHRoaXMuZ2xvYmFsRGF0YTtcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAvLyDlj5HpgIEgcmVzLmNvZGUg5Yiw5ZCO5Y+w5o2i5Y+WIG9wZW5JZCwgc2Vzc2lvbktleSwgdW5pb25JZFxuICAgICAgICB3eFJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogXCJodHRwczovL3dlY2hhdC1hcGkuZ3ptcGMuY29tL3YxL21wL2NvZGUyU2Vzc2lvblwiLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFwcGlkOiBhcHBJZCxcbiAgICAgICAgICAgIGpzQ29kZTogcmVzLmNvZGUsXG4gICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSByZXMuZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb25EYXRhOiBTZXNzaW9uRGF0YSA9IHsgLi4uZGF0YSB9O1xuXG4gICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEuc2Vzc2lvbkRhdGEgPSBzZXNzaW9uRGF0YTtcblxuICAgICAgICAgICAgLy/kv53lrZjliLDnvJPlrZjkuK1cbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKENPTlNUQU5UX1NFU1NJT05EQVRBX0tFWSwgc2Vzc2lvbkRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pXG4gIH0sXG5cbiAgZ2V0U2Vzc2lvbkNhY2hlKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB2YWx1ZTpTZXNzaW9uRGF0YSAgPSB3eC5nZXRTdG9yYWdlU3luYyhDT05TVEFOVF9TRVNTSU9OREFUQV9LRVkpO1xuICAgICAgaWYodmFsdWUpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnNlc3Npb25EYXRhID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9LFxuXG4gIG9uTGF1bmNoKCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG5cbiAgICB3eC5jaGVja1Nlc3Npb24oe1xuICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgLy9zZXNzaW9uX2tleSDmnKrov4fmnJ/vvIzlubbkuJTlnKjmnKznlJ/lkb3lkajmnJ/kuIDnm7TmnInmlYhcbiAgICAgICAgY29uc3Qgc2Vzc2lvbkRhdGEgPSB0aGF0LmdldFNlc3Npb25DYWNoZSgpO1xuICAgICAgICBpZighc2Vzc2lvbkRhdGEpIHtcbiAgICAgICAgICB0aGF0Lnd4TG9naW4oKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZhaWwoKSB7XG4gICAgICAgIC8vIHNlc3Npb25fa2V5IOW3sue7j+WkseaViO+8jOmcgOimgemHjeaWsOaJp+ihjOeZu+W9lea1geeoi1xuICAgICAgICB0aGF0Lnd4TG9naW4oKTtcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8g6I635Y+W55So5oi35L+h5oGvXG4gICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM5Y+v5Lul55u05o6l6LCD55SoIGdldFVzZXJJbmZvIOiOt+WPluWktOWDj+aYteensO+8jOS4jeS8muW8ueahhlxuICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgIC8vIOWPr+S7peWwhiByZXMg5Y+R6YCB57uZ5ZCO5Y+w6Kej56CB5Ye6IHVuaW9uSWRcbiAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG5cbiAgICAgICAgICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cbiAgICAgICAgICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxuICAgICAgICAgICAgICBpZiAodGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjayhyZXMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KVxuICB9LFxufSkiXX0=