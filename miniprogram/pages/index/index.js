"use strict";
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
        formData: {}
    },
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    },
    onShowUser: function () {
        this.setData({
            showUserDialog: true
        });
    },
    onUserConfirm: function () {
        var _this = this;
        this.selectComponent('#form').validate(function (valid, errors) {
            if (!valid) {
                var firstError = Object.keys(errors);
                if (firstError.length) {
                    _this.setData({
                        error: errors[firstError[0]].message
                    });
                }
            }
            else {
                console.log('form data :', _this.data.formData);
                _this.onUserCancel();
                wx.switchTab({ url: "/pages/dashboard/dashboard" });
            }
        });
    },
    onUserCancel: function () {
        this.setData({
            showUserDialog: false
        });
    },
    formInputChange: function (e) {
        var _a;
        var field = e.currentTarget.dataset.field;
        this.setData((_a = {},
            _a["formData." + field] = e.detail.value,
            _a));
    },
    onLoad: function () {
        var _this = this;
        var app = this.app;
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
            });
        }
        else if (this.data.canIUse) {
            app.userInfoReadyCallback = function (res) {
                _this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                });
            };
        }
        else {
            wx.getUserInfo({
                success: function (res) {
                    app.globalData.userInfo = res.userInfo;
                    _this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                    });
                },
            });
        }
    },
    getUserInfo: function (e) {
        var app = getApp();
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
        });
    },
    getPhoneNumber: function (e) {
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
                        success: function (res) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBSSxDQUFDO0lBQ0gsR0FBRyxFQUFFLE1BQU0sRUFBYztJQUN6QixJQUFJLEVBQUU7UUFDSixVQUFVLEVBQUUsRUFBRTtRQUNkLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsY0FBYyxFQUFFLEtBQUs7UUFFckIsS0FBSyxFQUFFLENBQUM7Z0JBQ04sSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFO2FBQzNDLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFO2FBQy9DLENBQUM7UUFDRixhQUFhLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUMvQixRQUFRLEVBQUUsRUFFVDtLQUNGO0lBRUQsV0FBVztRQUNULEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixHQUFHLEVBQUUsY0FBYztTQUNwQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxjQUFjLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsYUFBYTtRQUFiLGlCQWVDO1FBZEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBQyxLQUFVLEVBQUUsTUFBVztZQUM3RCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JB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LENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxFQUFFLENBQUMsT0FBTyxDQUFDO3dCQUNULE1BQU0sRUFBRSxLQUFLO3dCQUNiLEdBQUcsRUFBRSxFQUFFO3dCQUNQLElBQUksRUFBRTs0QkFDSixVQUFVLEVBQUUsSUFBSTs0QkFDaEIsTUFBTSxFQUFFLEVBQUU7NEJBQ1YsVUFBVSxFQUFFLFFBQVE7eUJBQ3JCO3dCQUNELE1BQU0sRUFBRTs0QkFDTixjQUFjLEVBQUUsa0JBQWtCO3lCQUNuQzt3QkFDRCxPQUFPLEVBQUUsVUFBQyxHQUFHOzRCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7NEJBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7d0JBR2xCLENBQUM7d0JBQ0QsSUFBSSxFQUFFLFVBQVUsR0FBRzs0QkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzRCQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQixDQUFDO3FCQUNGLENBQUMsQ0FBQztpQkFDSjtZQUNILENBQUM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBRTdDLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcblBhZ2Uoe1xuICBhcHA6IGdldEFwcDxJQXBwT3B0aW9uPigpLFxuICBkYXRhOiB7XG4gICAgc2Vzc2lvbktleTogXCJcIixcbiAgICB1c2VySW5mbzoge30sXG4gICAgaGFzVXNlckluZm86IGZhbHNlLFxuICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcbiAgICBzaG93VXNlckRpYWxvZzogZmFsc2UsXG5cbiAgICBydWxlczogW3tcbiAgICAgIG5hbWU6ICd1c2VyJyxcbiAgICAgIHJ1bGVzOiB7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAn5biQ5Y+35b+F5aGrJyB9LFxuICAgIH0sIHtcbiAgICAgIG5hbWU6ICdwd2QnLFxuICAgICAgcnVsZXM6IHsgcmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6ICdtb2JpbGXlv4XloasnIH0sXG4gICAgfV0sXG4gICAgY29uZmlybUJ1dHRvbjogW3sgdGV4dDogJ+ehruWumicgfV0sXG4gICAgZm9ybURhdGE6IHtcblxuICAgIH1cbiAgfSxcbiAgLy8g5LqL5Lu25aSE55CG5Ye95pWwXG4gIGJpbmRWaWV3VGFwKCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnLi4vbG9ncy9sb2dzJyxcbiAgICB9KVxuICB9LFxuXG4gIG9uU2hvd1VzZXIoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHNob3dVc2VyRGlhbG9nOiB0cnVlXG4gICAgfSk7XG4gIH0sXG5cbiAgb25Vc2VyQ29uZmlybSgpIHtcbiAgICB0aGlzLnNlbGVjdENvbXBvbmVudCgnI2Zvcm0nKS52YWxpZGF0ZSgodmFsaWQ6IGFueSwgZXJyb3JzOiBhbnkpID0+IHtcbiAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgY29uc3QgZmlyc3RFcnJvciA9IE9iamVjdC5rZXlzKGVycm9ycylcbiAgICAgICAgaWYgKGZpcnN0RXJyb3IubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcnNbZmlyc3RFcnJvclswXV0ubWVzc2FnZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmb3JtIGRhdGEgOicsIHRoaXMuZGF0YS5mb3JtRGF0YSk7XG4gICAgICAgIHRoaXMub25Vc2VyQ2FuY2VsKCk7XG4gICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOiBcIi9wYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkXCJ9KTtcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIG9uVXNlckNhbmNlbCgpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgc2hvd1VzZXJEaWFsb2c6IGZhbHNlXG4gICAgfSlcbiAgfSxcblxuICBmb3JtSW5wdXRDaGFuZ2UoZTogYW55KSB7XG4gICAgY29uc3QgeyBmaWVsZCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgW2Bmb3JtRGF0YS4ke2ZpZWxkfWBdOiBlLmRldGFpbC52YWx1ZVxuICAgIH0pXG4gIH0sXG5cbiAgb25Mb2FkKCkge1xuICAgIGNvbnN0IHsgYXBwIH0gPSB0aGlzO1xuICAgIGlmIChhcHAuZ2xvYmFsRGF0YS51c2VySW5mbykge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxuICAgICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuY2FuSVVzZSkge1xuICAgICAgLy8g55Sx5LqOIGdldFVzZXJJbmZvIOaYr+e9kee7nOivt+axgu+8jOWPr+iDveS8muWcqCBQYWdlLm9uTG9hZCDkuYvlkI7miY3ov5Tlm55cbiAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcbiAgICAgIGFwcC51c2VySW5mb1JlYWR5Q2FsbGJhY2sgPSByZXMgPT4ge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXG4gICAgICAgICAgaGFzVXNlckluZm86IHRydWUsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOWcqOayoeaciSBvcGVuLXR5cGU9Z2V0VXNlckluZm8g54mI5pys55qE5YW85a655aSE55CGXG4gICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSByZXMudXNlckluZm9cbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgdXNlckluZm86IHJlcy51c2VySW5mbyxcbiAgICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgZ2V0VXNlckluZm8oZTogYW55KSB7XG4gICAgY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KCk7XG4gICAgYXBwLmdsb2JhbERhdGEudXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICB1c2VySW5mbzogZS5kZXRhaWwudXNlckluZm8sXG4gICAgICBoYXNVc2VySW5mbzogdHJ1ZSxcbiAgICB9KVxuICB9LFxuICBnZXRQaG9uZU51bWJlcihlOiBhbnkpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgd3guY2hlY2tTZXNzaW9uKHtcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVuY3kgPSBlLmRldGFpbC5lbmNyeXB0ZWREYXRhO1xuICAgICAgICB2YXIgaXYgPSBlLmRldGFpbC5pdjtcbiAgICAgICAgdmFyIHNlc3Npb25rID0gdGhhdC5kYXRhLnNlc3Npb25LZXk7XG4gICAgICAgIGlmIChlLmRldGFpbC5lcnJNc2cgPT0gJ2dldFBob25lTnVtYmVyOmZhaWwgdXNlciBkZW55Jykge1xuICAgICAgICAgIHRoYXQuc2V0RGF0YSh7XG4gICAgICAgICAgICBtb2RhbHN0YXR1czogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgeyAvL+WQjOaEj+aOiOadg1xuICAgICAgICAgIHd4LnJlcXVlc3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgZW5jcnlwZGF0YTogZW5jeSxcbiAgICAgICAgICAgICAgaXZkYXRhOiBpdixcbiAgICAgICAgICAgICAgc2Vzc2lvbmtleTogc2Vzc2lvbmtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyAvLyDpu5jorqTlgLwgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLop6Plr4bmiJDlip9cIilcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgICAvLyBsZXQgcGhvbmUgPSByZXMuZGF0YS5waG9uZU51bWJlcjtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGhvbmUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLop6Plr4blpLHotKV+fn5+fn5+fn5+fn5+XCIpO1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNlc3Npb25fa2V5IOW3sue7j+WkseaViO+8jOmcgOimgemHjeaWsOaJp+ihjOeZu+W9lea1geeoi1wiKTtcbiAgICAgICAgLy8gdGhhdC53eGxvZ2luKCk7IC8v6YeN5paw55m75b2VXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pXG4iXX0=