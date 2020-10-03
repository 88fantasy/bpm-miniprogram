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
                rules: { required: true, message: '密码必填' },
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
                    url: "/login",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFaEQsSUFBSSxDQUFDO0lBQ0gsR0FBRyxFQUFFLE1BQU0sRUFBYTtJQUN4QixJQUFJLEVBQUU7UUFDSixVQUFVLEVBQUUsRUFBRTtRQUNkLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsY0FBYyxFQUFFLEtBQUs7UUFFckIsS0FBSyxFQUFFLENBQUM7Z0JBQ04sSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO2FBQzNDLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO2FBQzNDLENBQUM7UUFDRixhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUMvQixRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsRUFBRTtZQUNSLEdBQUcsRUFBRSxFQUFFO1NBQ1I7S0FDRjtJQUVELFdBQVc7UUFDVCxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLGNBQWM7U0FDcEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsY0FBYyxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGFBQWE7UUFDWCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUksSUFBSSxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLENB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QUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksK0JBQStCLEVBQUU7b0JBQ3RELElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1gsV0FBVyxFQUFFLElBQUk7cUJBQ2xCLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxFQUFFLENBQUMsT0FBTyxDQUFDO3dCQUNULE1BQU0sRUFBRSxLQUFLO3dCQUNiLEdBQUcsRUFBRSxFQUFFO3dCQUNQLElBQUksRUFBRTs0QkFDSixVQUFVLEVBQUUsSUFBSTs0QkFDaEIsTUFBTSxFQUFFLEVBQUU7NEJBQ1YsVUFBVSxFQUFFLFFBQVE7eUJBQ3JCO3dCQUNELE1BQU0sRUFBRTs0QkFDTixjQUFjLEVBQUUsa0JBQWtCO3lCQUNuQzt3QkFDRCxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTs0QkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBOzRCQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO3dCQUdsQixDQUFDO3dCQUNELElBQUksRUFBRSxVQUFVLEdBQUc7NEJBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQzs0QkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbkIsQ0FBQztxQkFDRixDQUFDLENBQUM7aUJBQ0o7WUFDSCxDQUFDO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUU3QyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG5pbXBvcnQgeyB3eFJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9yZXF1ZXN0JztcblxuUGFnZSh7XG4gIGFwcDogZ2V0QXBwPEJwbU9wdGlvbj4oKSxcbiAgZGF0YToge1xuICAgIHNlc3Npb25LZXk6IFwiXCIsXG4gICAgdXNlckluZm86IHt9LFxuICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcbiAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXG4gICAgc2hvd1VzZXJEaWFsb2c6IGZhbHNlLFxuXG4gICAgcnVsZXM6IFt7XG4gICAgICBuYW1lOiAndXNlcicsXG4gICAgICBydWxlczogeyByZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ+W4kOWPt+W/heWhqycgfSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiAncHdkJyxcbiAgICAgIHJ1bGVzOiB7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAn5a+G56CB5b+F5aGrJyB9LFxuICAgIH1dLFxuICAgIGNvbmZpcm1CdXR0b246IFt7IHRleHQ6ICfnoa7lrponIH1dLFxuICAgIGZvcm1EYXRhOiB7XG4gICAgICB1c2VyOiBcIlwiLFxuICAgICAgcHdkOiBcIlwiXG4gICAgfVxuICB9LFxuICAvLyDkuovku7blpITnkIblh73mlbBcbiAgYmluZFZpZXdUYXAoKSB7XG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcuLi9sb2dzL2xvZ3MnLFxuICAgIH0pXG4gIH0sXG5cbiAgb25TaG93VXNlcigpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgc2hvd1VzZXJEaWFsb2c6IHRydWVcbiAgICB9KTtcbiAgfSxcblxuICBvblVzZXJDb25maXJtKCkge1xuICAgIGNvbnN0IHsgYXBwIH0gID0gdGhpcztcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICB0aGlzLnNlbGVjdENvbXBvbmVudCgnI2Zvcm0nKS52YWxpZGF0ZSgodmFsaWQ6IGFueSwgZXJyb3JzOiBhbnkpID0+IHtcbiAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgY29uc3QgZmlyc3RFcnJvciA9IE9iamVjdC5rZXlzKGVycm9ycylcbiAgICAgICAgaWYgKGZpcnN0RXJyb3IubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcnNbZmlyc3RFcnJvclswXV0ubWVzc2FnZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICAgIH0pO1xuICAgICAgICB3eFJlcXVlc3Qoe1xuICAgICAgICAgIGhlYWRlciA6IHtcbiAgICAgICAgICAgICdjb250ZW50LXR5cGUnIDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1cmw6IFwiL2xvZ2luXCIsXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMuZGF0YS5mb3JtRGF0YS51c2VyLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMuZGF0YS5mb3JtRGF0YS5wd2RcbiAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgaWYocmVzLnN0YXR1c0NvZGUgPT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhOmFueSAgPSByZXMuZGF0YTtcbiAgICAgICAgICAgIGFwcC5zZXRMb2dpbkluZm8oZGF0YS5kYXRhLnRva2VuLCBcIlwiLCB0aGlzLmRhdGEuZm9ybURhdGEudXNlcik7XG4gICAgICAgICAgICB0aGlzLm9uVXNlckNhbmNlbCgpO1xuICAgICAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6IFwiL3BhZ2VzL2Rhc2hib2FyZC9kYXNoYm9hcmRcIn0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoYXQuc2V0RXJyb3IocmVzLmVyck1zZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKHJlczogV2VjaGF0TWluaXByb2dyYW0uR2VuZXJhbENhbGxiYWNrUmVzdWx0KSA9PiB7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICB0aGF0LnNldEVycm9yKHJlcy5lcnJNc2cpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIHNldEVycm9yKGVyck1zZzogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGVycm9yOiBlcnJNc2dcbiAgICB9KTtcbiAgfSxcblxuICBvblVzZXJDYW5jZWwoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHNob3dVc2VyRGlhbG9nOiBmYWxzZVxuICAgIH0pXG4gIH0sXG5cbiAgZm9ybUlucHV0Q2hhbmdlKGU6IGFueSkge1xuICAgIGNvbnN0IHsgZmllbGQgfSA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIFtgZm9ybURhdGEuJHtmaWVsZH1gXTogZS5kZXRhaWwudmFsdWVcbiAgICB9KVxuICB9LFxuXG4gIG9uTG9hZCgpIHtcbiAgICBjb25zdCB7IGFwcCB9ID0gdGhpcztcbiAgICBpZiAoYXBwLmdsb2JhbERhdGEudXNlckluZm8pIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHVzZXJJbmZvOiBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyxcbiAgICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLmNhbklVc2UpIHtcbiAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXG4gICAgICAvLyDmiYDku6XmraTlpITliqDlhaUgY2FsbGJhY2sg5Lul6Ziy5q2i6L+Z56eN5oOF5Ya1XG4gICAgICBhcHAudXNlckluZm9SZWFkeUNhbGxiYWNrID0gKHJlczogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcbiAgICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5Zyo5rKh5pyJIG9wZW4tdHlwZT1nZXRVc2VySW5mbyDniYjmnKznmoTlhbzlrrnlpITnkIZcbiAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICB1c2VySW5mbzogcmVzLnVzZXJJbmZvLFxuICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcbiAgICBjb25zdCBhcHAgPSBnZXRBcHA8QnBtT3B0aW9uPigpO1xuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm9cbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgdXNlckluZm86IGUuZGV0YWlsLnVzZXJJbmZvLFxuICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgfSlcbiAgfSxcbiAgZ2V0UGhvbmVOdW1iZXIoZTogYW55KSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHd4LmNoZWNrU2Vzc2lvbih7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbmN5ID0gZS5kZXRhaWwuZW5jcnlwdGVkRGF0YTtcbiAgICAgICAgdmFyIGl2ID0gZS5kZXRhaWwuaXY7XG4gICAgICAgIHZhciBzZXNzaW9uayA9IHRoYXQuZGF0YS5zZXNzaW9uS2V5O1xuICAgICAgICBpZiAoZS5kZXRhaWwuZXJyTXNnID09ICdnZXRQaG9uZU51bWJlcjpmYWlsIHVzZXIgZGVueScpIHtcbiAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgbW9kYWxzdGF0dXM6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHsgLy/lkIzmhI/mjojmnYNcbiAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIHVybDogJycsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGVuY3J5cGRhdGE6IGVuY3ksXG4gICAgICAgICAgICAgIGl2ZGF0YTogaXYsXG4gICAgICAgICAgICAgIHNlc3Npb25rZXk6IHNlc3Npb25rXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgLy8g6buY6K6k5YC8ICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Kej5a+G5oiQ5YqfXCIpXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgLy8gbGV0IHBob25lID0gcmVzLmRhdGEucGhvbmVOdW1iZXI7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBob25lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6Kej5a+G5aSx6LSlfn5+fn5+fn5+fn5+flwiKTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGZhaWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzZXNzaW9uX2tleSDlt7Lnu4/lpLHmlYjvvIzpnIDopoHph43mlrDmiafooYznmbvlvZXmtYHnqItcIik7XG4gICAgICAgIC8vIHRoYXQud3hsb2dpbigpOyAvL+mHjeaWsOeZu+W9lVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59KVxuIl19