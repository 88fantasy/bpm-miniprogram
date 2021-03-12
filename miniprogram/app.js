import { wxRequest } from './utils/request';
import { CONSTANT_SESSIONDATA_KEY } from './utils/constant';
App({
    globalData: {
        baseUrl: "https://app.gzmpc.com/NewMobilePlatform/api",
        accountInfo: {},
        appId: "wxc3c33c1a8ecb5bd2",
        agentId: 1000012,
        hasUserInfo: false,
        isCom: false,
    },
    setAccountInfo(uaccount, accessToken) {
        this.globalData.accountInfo = {
            token: accessToken,
            uaccount,
        };
    },
    wxLogin() {
        const that = this;
        const { appId, } = this.globalData;
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
    getComSessionCache() {
        try {
            const value = wx.getStorageSync(CONSTANT_SESSIONDATA_KEY);
            if (value) {
                this.globalData.comSessionData = value;
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
        const res = wx.getSystemInfoSync();
        that.globalData.isCom = res.environment === 'wxwork';
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            if (res.hasUpdate) {
                wx.showToast({
                    title: '检测到新版本,将进行后台更新',
                    icon: 'loading',
                    duration: 1000
                });
            }
        });
        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success(res) {
                    if (res.confirm) {
                        updateManager.applyUpdate();
                    }
                }
            });
        });
        updateManager.onUpdateFailed(function () {
        });
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: (res) => {
                            that.globalData.userInfo = res.userInfo;
                            that.globalData.hasUserInfo = true;
                            if (that.userInfoReadyCallback) {
                                that.userInfoReadyCallback(res);
                            }
                        }
                    });
                }
            }
        });
        if (!that.globalData.isCom) {
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
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU1RCxHQUFHLENBQVk7SUFDYixVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsNkNBQTZDO1FBQ3RELFdBQVcsRUFBRSxFQUVaO1FBQ0QsS0FBSyxFQUFFLG9CQUFvQjtRQUMzQixPQUFPLEVBQUUsT0FBTztRQUNoQixXQUFXLEVBQUUsS0FBSztRQUNsQixLQUFLLEVBQUUsS0FBSztLQUNiO0lBRUQsY0FBYyxDQUFDLFFBQWdCLEVBQUUsV0FBbUI7UUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUc7WUFDNUIsS0FBSyxFQUFFLFdBQVc7WUFDbEIsUUFBUTtTQUNULENBQUM7SUFDSixDQUFDO0lBR0QsT0FBTztRQUNMLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixNQUFNLEVBQUUsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUVuQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUViLFNBQVMsQ0FBQztvQkFDUixHQUFHLEVBQUUsaURBQWlEO29CQUN0RCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEtBQUs7d0JBQ1osTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJO3FCQUNqQjtpQkFDRixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2QsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTt3QkFDekIsTUFBTSxJQUFJLEdBQVEsR0FBRyxDQUFDLElBQUksQ0FBQzt3QkFDM0IsTUFBTSxXQUFXLEdBQWdCLEVBQUUs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O1NBQ0YsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQzFCLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ2QsT0FBTztvQkFFTCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQzNDLElBQUksQ0FBQyxXQUFXLEVBQUU7d0JBQ2hCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztxQkFDaEI7Z0JBQ0gsQ0FBQztnQkFDRCxJQUFJO29CQUVGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDakIsQ0FBQzthQUNGLENBQUMsQ0FBQTtTQUNIO1FBR0QsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDYixJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFFckMsRUFBRSxDQUFDLFdBQVcsQ0FBQzt3QkFDYixPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7NEJBRWIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQTs0QkFJdkMsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7Z0NBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQTs2QkFDaEM7d0JBQ0gsQ0FBQztxQkFDRixDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC50c1xuaW1wb3J0IHsgd3hSZXF1ZXN0IH0gZnJvbSAnLi91dGlscy9yZXF1ZXN0JztcbmltcG9ydCB7IENPTlNUQU5UX1NFU1NJT05EQVRBX0tFWSB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnQnO1xuXG5BcHA8QnBtT3B0aW9uPih7XG4gIGdsb2JhbERhdGE6IHtcbiAgICBiYXNlVXJsOiBcImh0dHBzOi8vYXBwLmd6bXBjLmNvbS9OZXdNb2JpbGVQbGF0Zm9ybS9hcGlcIixcbiAgICBhY2NvdW50SW5mbzoge1xuXG4gICAgfSxcbiAgICBhcHBJZDogXCJ3eGMzYzMzYzFhOGVjYjViZDJcIixcbiAgICBhZ2VudElkOiAxMDAwMDEyLFxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcbiAgICBpc0NvbTogZmFsc2UsXG4gIH0sXG5cbiAgc2V0QWNjb3VudEluZm8odWFjY291bnQ6IHN0cmluZywgYWNjZXNzVG9rZW46IHN0cmluZykge1xuICAgIHRoaXMuZ2xvYmFsRGF0YS5hY2NvdW50SW5mbyA9IHtcbiAgICAgIHRva2VuOiBhY2Nlc3NUb2tlbixcbiAgICAgIHVhY2NvdW50LFxuICAgIH07XG4gIH0sXG5cbiAgLy8g55m75b2VXG4gIHd4TG9naW4oKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgY29uc3QgeyBhcHBJZCwgfSA9IHRoaXMuZ2xvYmFsRGF0YTtcblxuICAgIHd4LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIC8vIOWPkemAgSByZXMuY29kZSDliLDlkI7lj7DmjaLlj5Ygb3BlbklkLCBzZXNzaW9uS2V5LCB1bmlvbklkXG4gICAgICAgIHd4UmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBcImh0dHBzOi8vd2VjaGF0LWFwaS5nem1wYy5jb20vdjEvbXAvY29kZTJTZXNzaW9uXCIsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYXBwaWQ6IGFwcElkLFxuICAgICAgICAgICAganNDb2RlOiByZXMuY29kZSxcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGE6IGFueSA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvbkRhdGE6IFNlc3Npb25EYXRhID0geyAuLi5kYXRhIH07XG5cbiAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS5zZXNzaW9uRGF0YSA9IHNlc3Npb25EYXRhO1xuXG4gICAgICAgICAgICAvL+S/neWtmOWIsOe8k+WtmOS4rVxuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoQ09OU1RBTlRfU0VTU0lPTkRBVEFfS0VZLCBzZXNzaW9uRGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSlcbiAgfSxcblxuICBnZXRTZXNzaW9uQ2FjaGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZhbHVlOiBTZXNzaW9uRGF0YSA9IHd4LmdldFN0b3JhZ2VTeW5jKENPTlNUQU5UX1NFU1NJT05EQVRBX0tFWSk7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnNlc3Npb25EYXRhID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9LFxuXG4gIGdldENvbVNlc3Npb25DYWNoZSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmFsdWU6IENvbVNlc3Npb25EYXRhID0gd3guZ2V0U3RvcmFnZVN5bmMoQ09OU1RBTlRfU0VTU0lPTkRBVEFfS0VZKTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEuY29tU2Vzc2lvbkRhdGEgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH0sXG5cbiAgb25MYXVuY2goKSB7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiDliKTmlq3lvZPliY3ov5DooYznjq/looNcbiAgICAgKi9cbiAgICBjb25zdCByZXMgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgIHRoYXQuZ2xvYmFsRGF0YS5pc0NvbSA9IHJlcy5lbnZpcm9ubWVudCA9PT0gJ3d4d29yayc7XG5cbiAgICBjb25zdCB1cGRhdGVNYW5hZ2VyID0gd3guZ2V0VXBkYXRlTWFuYWdlcigpXG5cbiAgICB1cGRhdGVNYW5hZ2VyLm9uQ2hlY2tGb3JVcGRhdGUoZnVuY3Rpb24gKHJlcykge1xuICAgICAgLy8g6K+35rGC5a6M5paw54mI5pys5L+h5oGv55qE5Zue6LCDXG4gICAgIGlmKHJlcy5oYXNVcGRhdGUpIHtcbiAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgdGl0bGU6ICfmo4DmtYvliLDmlrDniYjmnKws5bCG6L+b6KGM5ZCO5Y+w5pu05pawJyxcbiAgICAgICAgIGljb246J2xvYWRpbmcnLFxuICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICB9KVxuICAgICB9XG4gICAgfSlcblxuICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVSZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+abtOaWsOaPkOekuicsXG4gICAgICAgIGNvbnRlbnQ6ICfmlrDniYjmnKzlt7Lnu4/lh4blpIflpb3vvIzmmK/lkKbph43lkK/lupTnlKjvvJ8nLFxuICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgLy8g5paw55qE54mI5pys5bey57uP5LiL6L295aW977yM6LCD55SoIGFwcGx5VXBkYXRlIOW6lOeUqOaWsOeJiOacrOW5tumHjeWQr1xuICAgICAgICAgICAgdXBkYXRlTWFuYWdlci5hcHBseVVwZGF0ZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB1cGRhdGVNYW5hZ2VyLm9uVXBkYXRlRmFpbGVkKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIOaWsOeJiOacrOS4i+i9veWksei0pVxuICAgIH0pXG5cbiAgICB3eC5nZXRTZXR0aW5nKHtcbiAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mbztcbiAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLmhhc1VzZXJJbmZvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKHRoYXQudXNlckluZm9SZWFkeUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhhdC51c2VySW5mb1JlYWR5Q2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmICghdGhhdC5nbG9iYWxEYXRhLmlzQ29tKSB7XG4gICAgICB3eC5jaGVja1Nlc3Npb24oe1xuICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgIC8vc2Vzc2lvbl9rZXkg5pyq6L+H5pyf77yM5bm25LiU5Zyo5pys55Sf5ZG95ZGo5pyf5LiA55u05pyJ5pWIXG4gICAgICAgICAgY29uc3Qgc2Vzc2lvbkRhdGEgPSB0aGF0LmdldFNlc3Npb25DYWNoZSgpO1xuICAgICAgICAgIGlmICghc2Vzc2lvbkRhdGEpIHtcbiAgICAgICAgICAgIHRoYXQud3hMb2dpbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbCgpIHtcbiAgICAgICAgICAvLyBzZXNzaW9uX2tleSDlt7Lnu4/lpLHmlYjvvIzpnIDopoHph43mlrDmiafooYznmbvlvZXmtYHnqItcbiAgICAgICAgICB0aGF0Lnd4TG9naW4oKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyDojrflj5bnlKjmiLfkv6Hmga9cbiAgICB3eC5nZXRTZXR0aW5nKHtcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLnVzZXJJbmZvJ10pIHtcbiAgICAgICAgICAvLyDlt7Lnu4/mjojmnYPvvIzlj6/ku6Xnm7TmjqXosIPnlKggZ2V0VXNlckluZm8g6I635Y+W5aS05YOP5pi156ew77yM5LiN5Lya5by55qGGXG4gICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgLy8g5Y+v5Lul5bCGIHJlcyDlj5HpgIHnu5nlkI7lj7Dop6PnoIHlh7ogdW5pb25JZFxuICAgICAgICAgICAgICB0aGlzLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cblxuICAgICAgICAgICAgICAvLyDnlLHkuo4gZ2V0VXNlckluZm8g5piv572R57uc6K+35rGC77yM5Y+v6IO95Lya5ZyoIFBhZ2Uub25Mb2FkIOS5i+WQjuaJjei/lOWbnlxuICAgICAgICAgICAgICAvLyDmiYDku6XmraTlpITliqDlhaUgY2FsbGJhY2sg5Lul6Ziy5q2i6L+Z56eN5oOF5Ya1XG4gICAgICAgICAgICAgIGlmICh0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKHJlcylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pXG4gIH0sXG59KSJdfQ==