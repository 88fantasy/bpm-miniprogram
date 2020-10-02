import { wxRequest } from '../../utils/request';
Page({
    app: getApp(),
    data: {
        sessionKey: "",
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showUserDialog: false,
        rules: [{
                name: 'user',
                rules: { required: true, message: '帐号必填' },
            }, {
                name: 'pwd',
                rules: { required: true, message: 'mobile必填' },
            }],
        confirmButton: [{ text: '确定' }],
        formData: {
            user: "",
            pwd: ""
        }
    },
    bindViewTap() {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    onShowUser() {
        this.setData({
            showUserDialog: true
        });
    },
    onUserConfirm() {
        const { app } = this;
        const that = this;
        this.selectComponent('#form').validate((valid, errors) => {
            if (!valid) {
                const firstError = Object.keys(errors);
                if (firstError.length) {
                    this.setData({
                        error: errors[firstError[0]].message
                    });
                }
            }
            else {
                wx.showLoading({
                    title: '加载中',
                });
                wxRequest({
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                    url: "login",
                    method: 'POST',
                    data: {
                        username: this.data.formData.user,
                        password: this.data.formData.pwd
                    }
                }).then((res) => {
                    wx.hideLoading();
                    if (res.statusCode == 200) {
                        const data = res.data;
                        app.setLoginInfo(data.data.token, "", this.data.formData.user);
                        this.onUserCancel();
                        wx.switchTab({ url: "/pages/dashboard/dashboard" });
                    }
                    else {
                        that.setError(res.errMsg);
                    }
                })
                    .catch((res) => {
                    wx.hideLoading();
                    that.setError(res.errMsg);
                });
            }
        });
    },
    setError(errMsg) {
        this.setData({
            error: errMsg
        });
    },
    onUserCancel() {
        this.setData({
            showUserDialog: false
        });
    },
    formInputChange(e) {
        const { field } = e.currentTarget.dataset;
        this.setData({
            [`formData.${field}`]: e.detail.value
        });
    },
    onLoad() {
        const { app } = this;
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
            });
        }
        else if (this.data.canIUse) {
            app.userInfoReadyCallback = (res) => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
            };
        }
        else {
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo;
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                    });
                },
            });
        }
    },
    getUserInfo(e) {
        const app = getApp();
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
        });
    },
    getPhoneNumber(e) {
        var that = this;
        wx.checkSession({
            success: function () {
                var ency = e.detail.encryptedData;
                var iv = e.detail.iv;
                var sessionk = that.data.sessionKey;
                if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
                    that.setData({
                        modalstatus: true
                    });
                }
                else {
                    wx.request({
                        method: "GET",
                        url: '',
                        data: {
                            encrypdata: ency,
                            ivdata: iv,
                            sessionkey: sessionk
                        },
                        header: {
                            'content-type': 'application/json'
                        },
                        success: (res) => {
                            console.log("解密成功");
                            console.log(res);
                        },
                        fail: function (res) {
                            console.log("解密失败~~~~~~~~~~~~~");
                            console.log(res);
                        }
                    });
                }
            },
            fail: function () {
                console.log("session_key 已经失效，需要重新执行登录流程");
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFaEQsSUFBSSxDQUFDO0lBQ0gsR0FBRyxFQUFFLE1BQU0sRUFBYTtJQUN4QixJQUFJLEVBQUU7UUFDSixVQUFVLEVBQUUsRUFBRTtRQUNkLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsY0FBYyxFQUFFLEtBQUs7UUFFckIsS0FBSyxFQUFFLENBQUM7Z0JBQ04sSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO2FBQzNDLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFO2FBQy9DLENBQUM7UUFDRixhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUMvQixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLEdBQUcsRUFBRSxFQUFFO1NBQ1I7S0FDRjtJQUVELFdBQVc7UUFDVCxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLGNBQWM7U0FDcEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsY0FBYyxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWE7UUFDWCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUksSUFBSSxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENB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QUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksK0JBQStCLEVBQUU7b0JBQ3RELElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1gsV0FBVyxFQUFFLElBQUk7cUJBQ2xCLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxFQUFFLENBQUMsT0FBTyxDQUFDO3dCQUNULE1BQU0sRUFBRSxLQUFLO3dCQUNiLEdBQUcsRUFBRSxFQUFFO3dCQUNQLElBQUksRUFBRTs0QkFDSixVQUFVLEVBQUUsSUFBSTs0QkFDaEIsTUFBTSxFQUFFLEVBQUU7NEJBQ1YsVUFBVSxFQUFFLFFBQVE7eUJBQ3JCO3dCQUNELE1BQU0sRUFBRTs0QkFDTixjQUFjLEVBQUUsa0JBQWtCO3lCQUNuQzt3QkFDRCxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTs0QkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBOzRCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO3dCQUdsQixDQUFDO3dCQUNELElBQUksRUFBRSxVQUFVLEdBQUc7NEJBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs0QkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbkIsQ0FBQztxQkFDRixDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUU3QyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG5pbXBvcnQgeyB3eFJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9yZXF1ZXN0JztcblxuUGFnZSh7XG4gIGFwcDogZ2V0QXBwPEJwbU9wdGlvbj4oKSxcbiAgZGF0YToge1xuICAgIHNlc3Npb25LZXk6IFwiXCIsXG4gICAgdXNlckluZm86IHt9LFxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXG4gICAgc2hvd1VzZXJEaWFsb2c6IGZhbHNlLFxuXG4gICAgcnVsZXM6IFt7XG4gICAgICBuYW1lOiAndXNlcicsXG4gICAgICBydWxlczogeyByZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ+W4kOWPt+W/heWhqycgfSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiAncHdkJyxcbiAgICAgIHJ1bGVzOiB7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAnbW9iaWxl5b+F5aGrJyB9LFxuICAgIH1dLFxuICAgIGNvbmZpcm1CdXR0b246IFt7IHRleHQ6ICfnoa7lrponIH1dLFxuICAgIGZvcm1EYXRhOiB7XG4gICAgICB1c2VyOiBcIlwiLFxuICAgICAgcHdkOiBcIlwiXG4gICAgfVxuICB9LFxuICAvLyDkuovku7blpITnkIblh73mlbBcbiAgYmluZFZpZXdUYXAoKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcuLi9sb2dzL2xvZ3MnLFxuICAgIH0pXG4gIH0sXG5cbiAgb25TaG93VXNlcigpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgc2hvd1VzZXJEaWFsb2c6IHRydWVcbiAgICB9KTtcbiAgfSxcblxuICBvblVzZXJDb25maXJtKCkge1xuICAgIGNvbnN0IHsgYXBwIH0gID0gdGhpcztcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICB0aGlzLnNlbGVjdENvbXBvbmVudCgnI2Zvcm0nKS52YWxpZGF0ZSgodmFsaWQ6IGFueSwgZXJyb3JzOiBhbnkpID0+IHtcbiAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgY29uc3QgZmlyc3RFcnJvciA9IE9iamVjdC5rZXlzKGVycm9ycylcbiAgICAgICAgaWYgKGZpcnN0RXJyb3IubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcnNbZmlyc3RFcnJvclswXV0ubWVzc2FnZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICAgIH0pO1xuICAgICAgICB3eFJlcXVlc3Qoe1xuICAgICAgICAgIGhlYWRlciA6IHtcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnIDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1cmw6IFwibG9naW5cIixcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICB1c2VybmFtZTogdGhpcy5kYXRhLmZvcm1EYXRhLnVzZXIsXG4gICAgICAgICAgICBwYXNzd29yZDogdGhpcy5kYXRhLmZvcm1EYXRhLnB3ZFxuICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICBpZihyZXMuc3RhdHVzQ29kZSA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnN0IGRhdGE6YW55ICA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgYXBwLnNldExvZ2luSW5mbyhkYXRhLmRhdGEudG9rZW4sIFwiXCIsIHRoaXMuZGF0YS5mb3JtRGF0YS51c2VyKTtcbiAgICAgICAgICAgIHRoaXMub25Vc2VyQ2FuY2VsKCk7XG4gICAgICAgICAgICB3eC5zd2l0Y2hUYWIoe3VybDogXCIvcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZFwifSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhhdC5zZXRFcnJvcihyZXMuZXJyTXNnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgocmVzOiBXZWNoYXRNaW5pcHJvZ3JhbS5HZW5lcmFsQ2FsbGJhY2tSZXN1bHQpID0+IHtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIHRoYXQuc2V0RXJyb3IocmVzLmVyck1zZyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgc2V0RXJyb3IoZXJyTXNnOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZXJyb3I6IGVyck1zZ1xuICAgIH0pO1xuICB9LFxuXG4gIG9uVXNlckNhbmNlbCgpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgc2hvd1VzZXJEaWFsb2c6IGZhbHNlXG4gICAgfSlcbiAgfSxcblxuICBmb3JtSW5wdXRDaGFuZ2UoZTogYW55KSB7XG4gICAgY29uc3QgeyBmaWVsZCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgW2Bmb3JtRGF0YS4ke2ZpZWxkfWBdOiBlLmRldGFpbC52YWx1ZVxuICAgIH0pXG4gIH0sXG5cbiAgb25Mb2FkKCkge1xuICAgIGNvbnN0IHsgYXBwIH0gPSB0aGlzO1xuICAgIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxuICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuY2FuSVVzZSkge1xuICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cbiAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcbiAgICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxuICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDlnKjmsqHmnIkgb3Blbi10eXBlPWdldFVzZXJJbmZvIOeJiOacrOeahOWFvOWuueWkhOeQhlxuICAgICAgd3guZ2V0VXNlckluZm8oe1xuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXG4gICAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIGdldFVzZXJJbmZvKGU6IGFueSkge1xuICAgIGNvbnN0IGFwcCA9IGdldEFwcDxCcG1PcHRpb24+KCk7XG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICB9KVxuICB9LFxuICBnZXRQaG9uZU51bWJlcihlOiBhbnkpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgd3guY2hlY2tTZXNzaW9uKHtcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVuY3kgPSBlLmRldGFpbC5lbmNyeXB0ZWREYXRhO1xuICAgICAgICB2YXIgaXYgPSBlLmRldGFpbC5pdjtcbiAgICAgICAgdmFyIHNlc3Npb25rID0gdGhhdC5kYXRhLnNlc3Npb25LZXk7XG4gICAgICAgIGlmIChlLmRldGFpbC5lcnJNc2cgPT0gJ2dldFBob25lTnVtYmVyOmZhaWwgdXNlciBkZW55Jykge1xuICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICBtb2RhbHN0YXR1czogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgeyAvL+WQjOaEj+aOiOadg1xuICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgZW5jcnlwZGF0YTogZW5jeSxcbiAgICAgICAgICAgICAgaXZkYXRhOiBpdixcbiAgICAgICAgICAgICAgc2Vzc2lvbmtleTogc2Vzc2lvbmtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyAvLyDpu5jorqTlgLwgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLop6Plr4bmiJDlip9cIilcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAvLyBsZXQgcGhvbmUgPSByZXMuZGF0YS5waG9uZU51bWJlcjtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGhvbmUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLop6Plr4blpLHotKV+fn5+fn5+fn5+fn5+XCIpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNlc3Npb25fa2V5IOW3sue7j+WkseaViO+8jOmcgOimgemHjeaWsOaJp+ihjOeZu+W9lea1geeoi1wiKTtcbiAgICAgICAgLy8gdGhhdC53eGxvZ2luKCk7IC8v6YeN5paw55m75b2VXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pXG4iXX0=