import { wxRequest } from './utils/request';
import { CONSTANT_SESSIONDATA_KEY } from './utils/constant';
import Notify from 'miniprogram_npm/@vant/weapp/notify/notify';
App({
    globalData: {
        baseUrl: "https://app.gzmpc.com/NewMobilePlatform/api",
        accountInfo: {},
        appId: "wxc3c33c1a8ecb5bd2",
        agentId: 1000012,
        hasUserInfo: false,
        isCom: false,
        statusBarHeight: 44,
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
    checkUpdate(callback) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            if (callback) {
                callback(res);
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
    },
    onLaunch() {
        const that = this;
        const res = wx.getSystemInfoSync();
        that.globalData.isCom = res.environment === 'wxwork';
        that.globalData.statusBarHeight = res.statusBarHeight;
        that.checkUpdate(function (res) {
            if (res.hasUpdate) {
                Notify({
                    safeAreaInsetTop: true,
                    type: 'success',
                    message: '检测到新版本,将进行后台更新',
                    duration: 1500,
                });
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM1RCxPQUFPLE1BQU0sTUFBTSwyQ0FBMkMsQ0FBQztBQUUvRCxHQUFHLENBQVk7SUFDYixVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsNkNBQTZDO1FBQ3RELFdBQVcsRUFBRSxFQUVaO1FBQ0QsS0FBSyxFQUFFLG9CQUFvQjtRQUMzQixPQUFPLEVBQUUsT0FBTztRQUNoQixXQUFXLEVBQUUsS0FBSztRQUNsQixLQUFLLEVBQUUsS0FBSztRQUNaLGVBQWUsRUFBRSxFQUFFO0tBQ3BCO0lBRUQsY0FBYyxDQUFDLFFBQWdCLEVBQUUsV0FBbUI7UUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUc7WUFDNUIsS0FBSyxFQUFFLFdBQVc7WUFDbEIsUUFBUTtTQUNULENBQUM7SUFDSixDQUFDO0lBR0QsT0FBTztRQUNMLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixNQUFNLEVBQUUsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUVuQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUViLFNBQVMsQ0FBQztvQkFDUixHQUFHLEVBQUUsaURBQWlEO29CQUN0RCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEtBQUs7d0JBQ1osTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJO3FCQUNqQjtpQkFDRixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2QsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTt3QkFDekIsTUFBTSxJQUFJ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SCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGFwcC50c1xuaW1wb3J0IHsgd3hSZXF1ZXN0IH0gZnJvbSAnLi91dGlscy9yZXF1ZXN0JztcbmltcG9ydCB7IENPTlNUQU5UX1NFU1NJT05EQVRBX0tFWSB9IGZyb20gJy4vdXRpbHMvY29uc3RhbnQnO1xuaW1wb3J0IE5vdGlmeSBmcm9tICdtaW5pcHJvZ3JhbV9ucG0vQHZhbnQvd2VhcHAvbm90aWZ5L25vdGlmeSc7XG5cbkFwcDxCcG1PcHRpb24+KHtcbiAgZ2xvYmFsRGF0YToge1xuICAgIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcHAuZ3ptcGMuY29tL05ld01vYmlsZVBsYXRmb3JtL2FwaVwiLFxuICAgIGFjY291bnRJbmZvOiB7XG5cbiAgICB9LFxuICAgIGFwcElkOiBcInd4YzNjMzNjMWE4ZWNiNWJkMlwiLFxuICAgIGFnZW50SWQ6IDEwMDAwMTIsXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgIGlzQ29tOiBmYWxzZSxcbiAgICBzdGF0dXNCYXJIZWlnaHQ6IDQ0LFxuICB9LFxuXG4gIHNldEFjY291bnRJbmZvKHVhY2NvdW50OiBzdHJpbmcsIGFjY2Vzc1Rva2VuOiBzdHJpbmcpIHtcbiAgICB0aGlzLmdsb2JhbERhdGEuYWNjb3VudEluZm8gPSB7XG4gICAgICB0b2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICB1YWNjb3VudCxcbiAgICB9O1xuICB9LFxuXG4gIC8vIOeZu+W9lVxuICB3eExvZ2luKCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGNvbnN0IHsgYXBwSWQsIH0gPSB0aGlzLmdsb2JhbERhdGE7XG5cbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAvLyDlj5HpgIEgcmVzLmNvZGUg5Yiw5ZCO5Y+w5o2i5Y+WIG9wZW5JZCwgc2Vzc2lvbktleSwgdW5pb25JZFxuICAgICAgICB3eFJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogXCJodHRwczovL3dlY2hhdC1hcGkuZ3ptcGMuY29tL3YxL21wL2NvZGUyU2Vzc2lvblwiLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFwcGlkOiBhcHBJZCxcbiAgICAgICAgICAgIGpzQ29kZTogcmVzLmNvZGUsXG4gICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhOiBhbnkgPSByZXMuZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb25EYXRhOiBTZXNzaW9uRGF0YSA9IHsgLi4uZGF0YSB9O1xuXG4gICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEuc2Vzc2lvbkRhdGEgPSBzZXNzaW9uRGF0YTtcblxuICAgICAgICAgICAgLy/kv53lrZjliLDnvJPlrZjkuK1cbiAgICAgICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKENPTlNUQU5UX1NFU1NJT05EQVRBX0tFWSwgc2Vzc2lvbkRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pXG4gIH0sXG5cbiAgZ2V0U2Vzc2lvbkNhY2hlKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB2YWx1ZTogU2Vzc2lvbkRhdGEgPSB3eC5nZXRTdG9yYWdlU3luYyhDT05TVEFOVF9TRVNTSU9OREFUQV9LRVkpO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5zZXNzaW9uRGF0YSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSxcblxuICBnZXRDb21TZXNzaW9uQ2FjaGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZhbHVlOiBDb21TZXNzaW9uRGF0YSA9IHd4LmdldFN0b3JhZ2VTeW5jKENPTlNUQU5UX1NFU1NJT05EQVRBX0tFWSk7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLmNvbVNlc3Npb25EYXRhID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9LFxuXG4gIGNoZWNrVXBkYXRlKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdXBkYXRlTWFuYWdlciA9IHd4LmdldFVwZGF0ZU1hbmFnZXIoKVxuXG4gICAgdXBkYXRlTWFuYWdlci5vbkNoZWNrRm9yVXBkYXRlKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIC8vIOivt+axguWujOaWsOeJiOacrOS/oeaBr+eahOWbnuiwg1xuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2socmVzKTtcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZVJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5pu05paw5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+aWsOeJiOacrOW3sue7j+WHhuWkh+Wlve+8jOaYr+WQpumHjeWQr+W6lOeUqO+8nycsXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAvLyDmlrDnmoTniYjmnKzlt7Lnu4/kuIvovb3lpb3vvIzosIPnlKggYXBwbHlVcGRhdGUg5bqU55So5paw54mI5pys5bm26YeN5ZCvXG4gICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLmFwcGx5VXBkYXRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVGYWlsZWQoZnVuY3Rpb24gKCkge1xuICAgICAgLy8g5paw54mI5pys5LiL6L295aSx6LSlXG4gICAgfSlcbiAgfSxcblxuICBvbkxhdW5jaCgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIOWIpOaWreW9k+WJjei/kOihjOeOr+Wig1xuICAgICAqL1xuICAgIGNvbnN0IHJlcyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgdGhhdC5nbG9iYWxEYXRhLmlzQ29tID0gcmVzLmVudmlyb25tZW50ID09PSAnd3h3b3JrJztcbiAgICB0aGF0Lmdsb2JhbERhdGEuc3RhdHVzQmFySGVpZ2h0ID0gcmVzLnN0YXR1c0JhckhlaWdodDtcblxuICAgIHRoYXQuY2hlY2tVcGRhdGUoZnVuY3Rpb24gKHJlcykge1xuICAgICAgLy8g6K+35rGC5a6M5paw54mI5pys5L+h5oGv55qE5Zue6LCDXG4gICAgICBpZiAocmVzLmhhc1VwZGF0ZSkge1xuICAgICAgICBOb3RpZnkoe1xuICAgICAgICAgIHNhZmVBcmVhSW5zZXRUb3A6IHRydWUsXG4gICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIG1lc3NhZ2U6ICfmo4DmtYvliLDmlrDniYjmnKws5bCG6L+b6KGM5ZCO5Y+w5pu05pawJyxcbiAgICAgICAgICBkdXJhdGlvbjogMTUwMCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSlcblxuXG4gICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm87XG4gICAgICAgICAgICAgIHRoYXQuZ2xvYmFsRGF0YS5oYXNVc2VySW5mbyA9IHRydWU7XG4gICAgICAgICAgICAgIGlmICh0aGF0LnVzZXJJbmZvUmVhZHlDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRoYXQudXNlckluZm9SZWFkeUNhbGxiYWNrKHJlcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAoIXRoYXQuZ2xvYmFsRGF0YS5pc0NvbSkge1xuICAgICAgd3guY2hlY2tTZXNzaW9uKHtcbiAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAvL3Nlc3Npb25fa2V5IOacqui/h+acn++8jOW5tuS4lOWcqOacrOeUn+WRveWRqOacn+S4gOebtOacieaViFxuICAgICAgICAgIGNvbnN0IHNlc3Npb25EYXRhID0gdGhhdC5nZXRTZXNzaW9uQ2FjaGUoKTtcbiAgICAgICAgICBpZiAoIXNlc3Npb25EYXRhKSB7XG4gICAgICAgICAgICB0aGF0Lnd4TG9naW4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWwoKSB7XG4gICAgICAgICAgLy8gc2Vzc2lvbl9rZXkg5bey57uP5aSx5pWI77yM6ZyA6KaB6YeN5paw5omn6KGM55m75b2V5rWB56iLXG4gICAgICAgICAgdGhhdC53eExvZ2luKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8g6I635Y+W55So5oi35L+h5oGvXG4gICAgd3guZ2V0U2V0dGluZyh7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICBpZiAocmVzLmF1dGhTZXR0aW5nWydzY29wZS51c2VySW5mbyddKSB7XG4gICAgICAgICAgLy8g5bey57uP5o6I5p2D77yM5Y+v5Lul55u05o6l6LCD55SoIGdldFVzZXJJbmZvIOiOt+WPluWktOWDj+aYteensO+8jOS4jeS8muW8ueahhlxuICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgIC8vIOWPr+S7peWwhiByZXMg5Y+R6YCB57uZ5ZCO5Y+w6Kej56CB5Ye6IHVuaW9uSWRcbiAgICAgICAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG5cbiAgICAgICAgICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cbiAgICAgICAgICAgICAgLy8g5omA5Lul5q2k5aSE5Yqg5YWlIGNhbGxiYWNrIOS7pemYsuatoui/meenjeaDheWGtVxuICAgICAgICAgICAgICBpZiAodGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJJbmZvUmVhZHlDYWxsYmFjayhyZXMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KVxuICB9LFxufSkiXX0=