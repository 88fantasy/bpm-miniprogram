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
                    url: "https://develop.gzmpc.com/api/wechat/v1/mp/code2Session",
                    method: 'POST',
                    data: {
                        appid: appId,
                        jsCode: res.code,
                    }
                }).then((res) => {
                    if (res.statusCode == 200) {
                        const respo = res.data;
                        if (respo.status) {
                            const sessionData = respo.data;
                            that.globalData.sessionData = sessionData;
                            wx.setStorageSync(CONSTANT_SESSIONDATA_KEY, sessionData);
                        }
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
                wx.showToast({
                    mask: true,
                    icon: 'success',
                    title: '检测到新版本,将进行后台更新',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUU1RCxHQUFHLENBQVk7SUFDYixVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsNkNBQTZDO1FBQ3RELFdBQVcsRUFBRSxFQUVaO1FBQ0QsS0FBSyxFQUFFLG9CQUFvQjtRQUMzQixPQUFPLEVBQUUsT0FBTztRQUNoQixXQUFXLEVBQUUsS0FBSztRQUNsQixLQUFLLEVBQUUsS0FBSztRQUNaLGVBQWUsRUFBRSxFQUFFO0tBQ3BCO0lBRUQsY0FBYyxDQUFDLFFBQWdCLEVBQUUsV0FBbUI7UUFDbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUc7WUFDNUIsS0FBSyxFQUFFLFdBQVc7WUFDbEIsUUFBUTtTQUNULENBQUM7SUFDSixDQUFDO0lBR0QsT0FBTztRQUNMLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixNQUFNLEVBQUUsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUVuQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUViLFNBQVMsQ0FBQztvQkFDUixHQUFHLEVBQUUseURBQXlEO29CQUM5RCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLEtBQUs7d0JBQ1osTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJO3FCQUNqQjtpQkFDRixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ2QsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsRUFBRTt3QkFDekIsTUFBTSxLQUFLLEdBQWlDLEdBQUcsQ0FBQyxJQUFvQyxDQUFDO3dCQUNyRixJQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7NEJBQ2YsTUFBTSxXQUFXLEdBQWdCLEtBQUssQ0FBQyxJQUFJLENBQUM7NEJBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs0QkFFMUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRSxXQUFXLENBQUMsQ0FBQzt5QkFDMUQ7cUJBQ0Y7eUJBQ0k7cUJBRUo7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJO1lBQ0YsTUFBTSxLQUFLLEdBQWdCLEVBQUUsQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN2RSxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3BDLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7aUJBQ0k7Z0JBQ0gsT0FBTyxTQUFTLENBQUM7YUFDbEI7U0FDRjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxTQUFTLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2hCLElBQUk7WUFDRixNQUFNLEtBQUssR0FBbUIsRUFBRSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzFFLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztnQkFDdkMsT0FBTyxLQUFLLENBQUM7YUFDZDtpQkFDSTtnQkFDSCxPQUFPLFNBQVMsQ0FBQzthQUNsQjtTQUNGO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLFNBQVMsQ0FBQztTQUNsQjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsUUFBUTtRQUNsQixNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtRQUUzQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxHQUFHO1lBRTFDLElBQUksUUFBUSxFQUFFO2dCQUNaLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNmO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFRixhQUFhLENBQUMsYUFBYSxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLGtCQUFrQjtnQkFDM0IsT0FBTyxDQUFDLEdBQUc7b0JBQ1QsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO3dCQUVmLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtxQkFDNUI7Z0JBQ0gsQ0FBQzthQUNGLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO1FBRUYsYUFBYSxDQUFDLGNBQWMsQ0FBQztRQUU3QixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBS2xCLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEtBQUssUUFBUSxDQUFDO1FBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUM7UUFFdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUc7WUFFNUIsSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFO2dCQUNqQixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNYLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRSxTQUFTO29CQUNmLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFHRixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osT0FBTyxDQUFDLEdBQUc7Z0JBQ1QsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBQ3JDLEVBQUUsQ0FBQyxXQUFXLENBQUM7d0JBQ2IsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7NEJBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQzs0QkFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDOzRCQUNuQyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQ0FDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDOzZCQUNqQzt3QkFDSCxDQUFDO3FCQUNGLENBQUMsQ0FBQztpQkFDSjtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDMUIsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDZCxPQUFPO29CQUVMLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDaEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3FCQUNoQjtnQkFDSCxDQUFDO2dCQUNELElBQUk7b0JBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNqQixDQUFDO2FBQ0YsQ0FBQyxDQUFBO1NBQ0g7UUFHRCxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO29CQUVyQyxFQUFFLENBQUMsV0FBVyxDQUFDO3dCQUNiLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTs0QkFFYixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBOzRCQUl2QyxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtnQ0FDOUIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFBOzZCQUNoQzt3QkFDSCxDQUFDO3FCQUNGLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYXBwLnRzXG5pbXBvcnQgeyB3eFJlcXVlc3QgfSBmcm9tICcuL3V0aWxzL3JlcXVlc3QnO1xuaW1wb3J0IHsgQ09OU1RBTlRfU0VTU0lPTkRBVEFfS0VZIH0gZnJvbSAnLi91dGlscy9jb25zdGFudCc7XG5cbkFwcDxCcG1PcHRpb24+KHtcbiAgZ2xvYmFsRGF0YToge1xuICAgIGJhc2VVcmw6IFwiaHR0cHM6Ly9hcHAuZ3ptcGMuY29tL05ld01vYmlsZVBsYXRmb3JtL2FwaVwiLFxuICAgIGFjY291bnRJbmZvOiB7XG5cbiAgICB9LFxuICAgIGFwcElkOiBcInd4YzNjMzNjMWE4ZWNiNWJkMlwiLFxuICAgIGFnZW50SWQ6IDEwMDAwMTIsXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgIGlzQ29tOiBmYWxzZSxcbiAgICBzdGF0dXNCYXJIZWlnaHQ6IDQ0LFxuICB9LFxuXG4gIHNldEFjY291bnRJbmZvKHVhY2NvdW50OiBzdHJpbmcsIGFjY2Vzc1Rva2VuOiBzdHJpbmcpIHtcbiAgICB0aGlzLmdsb2JhbERhdGEuYWNjb3VudEluZm8gPSB7XG4gICAgICB0b2tlbjogYWNjZXNzVG9rZW4sXG4gICAgICB1YWNjb3VudCxcbiAgICB9O1xuICB9LFxuXG4gIC8vIOeZu+W9lVxuICB3eExvZ2luKCkge1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIGNvbnN0IHsgYXBwSWQsIH0gPSB0aGlzLmdsb2JhbERhdGE7XG5cbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAvLyDlj5HpgIEgcmVzLmNvZGUg5Yiw5ZCO5Y+w5o2i5Y+WIG9wZW5JZCwgc2Vzc2lvbktleSwgdW5pb25JZFxuICAgICAgICB3eFJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogXCJodHRwczovL2RldmVsb3AuZ3ptcGMuY29tL2FwaS93ZWNoYXQvdjEvbXAvY29kZTJTZXNzaW9uXCIsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYXBwaWQ6IGFwcElkLFxuICAgICAgICAgICAganNDb2RlOiByZXMuY29kZSxcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvOiBBcGlSZXNwb25zZURhdGE8U2Vzc2lvbkRhdGE+ID0gcmVzLmRhdGEgYXMgQXBpUmVzcG9uc2VEYXRhPFNlc3Npb25EYXRhPjtcbiAgICAgICAgICAgIGlmKHJlc3BvLnN0YXR1cykge1xuICAgICAgICAgICAgICBjb25zdCBzZXNzaW9uRGF0YTogU2Vzc2lvbkRhdGEgPSByZXNwby5kYXRhO1xuICAgICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEuc2Vzc2lvbkRhdGEgPSBzZXNzaW9uRGF0YTtcbiAgICAgICAgICAgICAgLy/kv53lrZjliLDnvJPlrZjkuK1cbiAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoQ09OU1RBTlRfU0VTU0lPTkRBVEFfS0VZLCBzZXNzaW9uRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSlcbiAgfSxcblxuICBnZXRTZXNzaW9uQ2FjaGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZhbHVlOiBTZXNzaW9uRGF0YSA9IHd4LmdldFN0b3JhZ2VTeW5jKENPTlNUQU5UX1NFU1NJT05EQVRBX0tFWSk7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxEYXRhLnNlc3Npb25EYXRhID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9LFxuXG4gIGdldENvbVNlc3Npb25DYWNoZSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmFsdWU6IENvbVNlc3Npb25EYXRhID0gd3guZ2V0U3RvcmFnZVN5bmMoQ09OU1RBTlRfU0VTU0lPTkRBVEFfS0VZKTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEuY29tU2Vzc2lvbkRhdGEgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH0sXG5cbiAgY2hlY2tVcGRhdGUoY2FsbGJhY2spIHtcbiAgICBjb25zdCB1cGRhdGVNYW5hZ2VyID0gd3guZ2V0VXBkYXRlTWFuYWdlcigpXG5cbiAgICB1cGRhdGVNYW5hZ2VyLm9uQ2hlY2tGb3JVcGRhdGUoZnVuY3Rpb24gKHJlcykge1xuICAgICAgLy8g6K+35rGC5a6M5paw54mI5pys5L+h5oGv55qE5Zue6LCDXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2socmVzKTtcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZVJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAn5pu05paw5o+Q56S6JyxcbiAgICAgICAgY29udGVudDogJ+aWsOeJiOacrOW3sue7j+WHhuWkh+Wlve+8jOaYr+WQpumHjeWQr+W6lOeUqO+8nycsXG4gICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAvLyDmlrDnmoTniYjmnKzlt7Lnu4/kuIvovb3lpb3vvIzosIPnlKggYXBwbHlVcGRhdGUg5bqU55So5paw54mI5pys5bm26YeN5ZCvXG4gICAgICAgICAgICB1cGRhdGVNYW5hZ2VyLmFwcGx5VXBkYXRlKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVGYWlsZWQoZnVuY3Rpb24gKCkge1xuICAgICAgLy8g5paw54mI5pys5LiL6L295aSx6LSlXG4gICAgfSlcbiAgfSxcblxuICBvbkxhdW5jaCgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIOWIpOaWreW9k+WJjei/kOihjOeOr+Wig1xuICAgICAqL1xuICAgIGNvbnN0IHJlcyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgdGhhdC5nbG9iYWxEYXRhLmlzQ29tID0gcmVzLmVudmlyb25tZW50ID09PSAnd3h3b3JrJztcbiAgICB0aGF0Lmdsb2JhbERhdGEuc3RhdHVzQmFySGVpZ2h0ID0gcmVzLnN0YXR1c0JhckhlaWdodDtcblxuICAgIHRoYXQuY2hlY2tVcGRhdGUoZnVuY3Rpb24gKHJlcykge1xuICAgICAgLy8g6K+35rGC5a6M5paw54mI5pys5L+h5oGv55qE5Zue6LCDXG4gICAgICBpZiAocmVzLmhhc1VwZGF0ZSkge1xuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgIHRpdGxlOiAn5qOA5rWL5Yiw5paw54mI5pysLOWwhui/m+ihjOWQjuWPsOabtOaWsCcsXG4gICAgICAgICAgZHVyYXRpb246IDE1MDAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pXG5cblxuICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgdGhhdC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvO1xuICAgICAgICAgICAgICB0aGF0Lmdsb2JhbERhdGEuaGFzVXNlckluZm8gPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAodGhhdC51c2VySW5mb1JlYWR5Q2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGF0LnVzZXJJbmZvUmVhZHlDYWxsYmFjayhyZXMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKCF0aGF0Lmdsb2JhbERhdGEuaXNDb20pIHtcbiAgICAgIHd4LmNoZWNrU2Vzc2lvbih7XG4gICAgICAgIHN1Y2Nlc3MoKSB7XG4gICAgICAgICAgLy9zZXNzaW9uX2tleSDmnKrov4fmnJ/vvIzlubbkuJTlnKjmnKznlJ/lkb3lkajmnJ/kuIDnm7TmnInmlYhcbiAgICAgICAgICBjb25zdCBzZXNzaW9uRGF0YSA9IHRoYXQuZ2V0U2Vzc2lvbkNhY2hlKCk7XG4gICAgICAgICAgaWYgKCFzZXNzaW9uRGF0YSkge1xuICAgICAgICAgICAgdGhhdC53eExvZ2luKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWlsKCkge1xuICAgICAgICAgIC8vIHNlc3Npb25fa2V5IOW3sue7j+WkseaViO+8jOmcgOimgemHjeaWsOaJp+ihjOeZu+W9lea1geeoi1xuICAgICAgICAgIHRoYXQud3hMb2dpbigpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOWPr+S7peebtOaOpeiwg+eUqCBnZXRVc2VySW5mbyDojrflj5blpLTlg4/mmLXnp7DvvIzkuI3kvJrlvLnmoYZcbiAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAvLyDlj6/ku6XlsIYgcmVzIOWPkemAgee7meWQjuWPsOino+eggeWHuiB1bmlvbklkXG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuXG4gICAgICAgICAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXG4gICAgICAgICAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcbiAgICAgICAgICAgICAgaWYgKHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2socmVzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSlcbiAgfSxcbn0pIl19