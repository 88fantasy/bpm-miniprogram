import { wxRequest } from '../../utils/request';
const WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt');
Page({
    app: getApp(),
    data: {
        sessionKey: "",
        rules: [{
                name: 'user',
                rules: { required: true, message: '帐号必填' },
            }, {
                name: 'pwd',
                rules: { required: true, message: '密码必填' },
            }],
        formData: {
            user: "",
            pwd: ""
        },
        msgShow: false,
        error: '',
    },
    bindMsgHide() {
        this.setData({
            msgShow: false,
        });
    },
    onShowUser() {
        this.setData({
            showUserDialog: true
        });
    },
    onUserConfirm() {
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
                const { user, pwd } = this.data.formData;
                that.login(user, pwd, true);
            }
        });
    },
    setError(errMsg) {
        this.setData({
            error: errMsg,
            msgShow: true,
        });
    },
    formInputChange(e) {
        const { field } = e.currentTarget.dataset;
        this.setData({
            [`formData.${field}`]: e.detail.value
        });
    },
    login(user, pwd, bind = false) {
        const app = getApp();
        const that = this;
        wxRequest({
            header: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            url: "/login",
            method: 'POST',
            data: {
                username: user,
                password: pwd
            }
        }).then((res) => {
            if (res.statusCode == 200) {
                const data = res.data;
                app.setAccountInfo(user, data.data.token);
                wx.switchTab({ url: "/pages/list/list" });
                if (bind) {
                    const sessionData = app.getSessionCache();
                    if (sessionData) {
                        wxRequest({
                            url: "https://wechat-api.gzmpc.com/v1/wechat/bindOpenId",
                            method: 'POST',
                            data: {
                                uaccount: user,
                                openid: sessionData.openid
                            }
                        }).then((res) => {
                            if (res.statusCode == 200) {
                            }
                        });
                    }
                }
            }
            else {
                that.setError(res.errMsg);
            }
        })
            .catch((res) => {
            that.setError(res.errMsg);
        });
    },
    onLoad(option) {
        const { auto } = option;
        const { app } = this;
        const that = this;
        const sessionData = app.getSessionCache();
        if (sessionData && !auto) {
            wxRequest({
                url: `https://wechat-api.gzmpc.com/v1/wechat/getUaccountByOpenId/${sessionData.openid}`,
            }).then((res) => {
                if (res.statusCode == 200) {
                    const data = res.data;
                    if (data && data.errcode == 0) {
                        that.login(data.uaccount, "mima");
                    }
                }
            });
        }
    },
    getUserInfo(e) {
        const app = getApp();
        app.globalData.userInfo = e.detail.userInfo;
        this.onUserConfirm();
    },
    getPhoneNumber(e) {
        const { app } = this;
        const that = this;
        wx.checkSession({
            success: function (res) {
                console.log(res);
                var ency = e.detail.encryptedData;
                var iv = e.detail.iv;
                var sessionk = that.data.sessionKey;
                console.log('session data: ', e, ency, iv, sessionk);
                const errMsg = e.detail.errMsg;
                if (errMsg && errMsg.startsWith('getPhoneNumber:fail')) {
                    that.setData({
                        modalstatus: true
                    });
                }
                else {
                    const pc = new WXBizDataCrypt(app.globalData.appId, sessionk);
                    var data = pc.decryptData(ency, iv);
                    console.log('解密后 data: ', data);
                }
            },
            fail: function () {
                console.log("session_key 已经失效，需要重新执行登录流程");
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHaEQsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFFL0QsSUFBSSxDQUFDO0lBQ0gsR0FBRyxFQUFFLE1BQU0sRUFBYTtJQUN4QixJQUFJLEVBQUU7UUFDSixVQUFVLEVBQUUsRUFBRTtRQUNkLEtBQUssRUFBRSxDQUFDO2dCQUNOLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTthQUMzQyxFQUFFO2dCQUNELElBQUksRUFBRSxLQUFLO2dCQUNYLEtBQUssRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRTthQUMzQyxDQUFDO1FBQ0YsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLEVBQUU7WUFDUixHQUFHLEVBQUUsRUFBRTtTQUNSO1FBQ0EsT0FBTyxFQUFFLEtBQUs7UUFDZCxLQUFLLEVBQUUsRUFBRTtLQUVYO0lBRUQsV0FBVztRQUNWLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWixPQUFPLEVBQUcsS0FBSztTQUNmLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLGNBQWMsRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxhQUFhO1FBQ1gsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBVSxFQUFFLE1BQVcsRUFBRSxFQUFFO1lBQ2pFLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsTUFBTSxVQUFVLEdBQUcs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TUFBTSxDQUFDLGFBQWEsQ0FBQztnQkFDbEMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNyRCxNQUFNLE1BQU0sR0FBVSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDdEMsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO29CQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNYLFdBQVcsRUFBRSxJQUFJO3FCQUNsQixDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsTUFBTSxFQUFFLEdBQUcsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBRTlELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFHLEVBQUUsQ0FBQyxDQUFBO29CQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQTtpQkFDaEM7WUFDSCxDQUFDO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUU3QyxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG5pbXBvcnQgeyB3eFJlcXVlc3QgfSBmcm9tICcuLi8uLi91dGlscy9yZXF1ZXN0JztcblxuXG5jb25zdCBXWEJpekRhdGFDcnlwdCA9IHJlcXVpcmUoJy4uLy4uL3V0aWxzL1JkV1hCaXpEYXRhQ3J5cHQnKTtcblxuUGFnZSh7XG4gIGFwcDogZ2V0QXBwPEJwbU9wdGlvbj4oKSxcbiAgZGF0YToge1xuICAgIHNlc3Npb25LZXk6IFwiXCIsXG4gICAgcnVsZXM6IFt7XG4gICAgICBuYW1lOiAndXNlcicsXG4gICAgICBydWxlczogeyByZXF1aXJlZDogdHJ1ZSwgbWVzc2FnZTogJ+W4kOWPt+W/heWhqycgfSxcbiAgICB9LCB7XG4gICAgICBuYW1lOiAncHdkJyxcbiAgICAgIHJ1bGVzOiB7IHJlcXVpcmVkOiB0cnVlLCBtZXNzYWdlOiAn5a+G56CB5b+F5aGrJyB9LFxuICAgIH1dLFxuICAgIGZvcm1EYXRhOiB7XG4gICAgICB1c2VyOiBcIlwiLFxuICAgICAgcHdkOiBcIlwiXG4gICAgfSxcbiAgICAgbXNnU2hvdzogZmFsc2UsXG4gICAgIGVycm9yOiAnJyxcblxuICB9LFxuICAvLyDkuovku7blpITnkIblh73mlbBcbiAgYmluZE1zZ0hpZGUoKSB7XG4gICB0aGlzLnNldERhdGEoe1xuICAgIG1zZ1Nob3cgOiBmYWxzZSxcbiAgIH0pO1xuICB9LFxuXG4gIG9uU2hvd1VzZXIoKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHNob3dVc2VyRGlhbG9nOiB0cnVlXG4gICAgfSk7XG4gIH0sXG5cbiAgb25Vc2VyQ29uZmlybSgpIHtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICB0aGlzLnNlbGVjdENvbXBvbmVudCgnI2Zvcm0nKS52YWxpZGF0ZSgodmFsaWQ6IGFueSwgZXJyb3JzOiBhbnkpID0+IHtcbiAgICAgIGlmICghdmFsaWQpIHtcbiAgICAgICAgY29uc3QgZmlyc3RFcnJvciA9IE9iamVjdC5rZXlzKGVycm9ycylcbiAgICAgICAgaWYgKGZpcnN0RXJyb3IubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcnNbZmlyc3RFcnJvclswXV0ubWVzc2FnZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHt1c2VyLCBwd2QgfSA9IHRoaXMuZGF0YS5mb3JtRGF0YTtcbiAgICAgICAgdGhhdC5sb2dpbih1c2VyLHB3ZCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBzZXRFcnJvcihlcnJNc2c6IHN0cmluZykge1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBlcnJvcjogZXJyTXNnLFxuICAgICAgbXNnU2hvdzogdHJ1ZSxcbiAgICB9KTtcbiAgfSxcblxuICBmb3JtSW5wdXRDaGFuZ2UoZTogYW55KSB7XG4gICAgY29uc3QgeyBmaWVsZCB9ID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXRcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgW2Bmb3JtRGF0YS4ke2ZpZWxkfWBdOiBlLmRldGFpbC52YWx1ZVxuICAgIH0pXG4gIH0sXG5cbiAgbG9naW4odXNlcjogc3RyaW5nLCBwd2Q6IHN0cmluZywgYmluZDogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgYXBwID0gZ2V0QXBwPEJwbU9wdGlvbj4oKTtcbiAgICBjb25zdCB0aGF0ID0gdGhpcztcbiAgICB3eFJlcXVlc3Qoe1xuICAgICAgaGVhZGVyIDoge1xuICAgICAgICAnY29udGVudC10eXBlJyA6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgfSxcbiAgICAgIHVybDogXCIvbG9naW5cIixcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZGF0YToge1xuICAgICAgICB1c2VybmFtZTogdXNlcixcbiAgICAgICAgcGFzc3dvcmQ6IHB3ZFxuICAgICAgfVxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgaWYocmVzLnN0YXR1c0NvZGUgPT0gMjAwKSB7XG4gICAgICAgIGNvbnN0IGRhdGE6YW55ICA9IHJlcy5kYXRhO1xuICAgICAgICBhcHAuc2V0QWNjb3VudEluZm8odXNlciwgZGF0YS5kYXRhLnRva2VuKTtcbiAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6IFwiL3BhZ2VzL2xpc3QvbGlzdFwifSk7XG5cbiAgICAgICAgaWYoYmluZCkge1xuICAgICAgICAgIGNvbnN0IHNlc3Npb25EYXRhID0gYXBwLmdldFNlc3Npb25DYWNoZSgpO1xuICAgICAgICAgIGlmKHNlc3Npb25EYXRhKSB7XG4gICAgICAgICAgICB3eFJlcXVlc3Qoe1xuICAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly93ZWNoYXQtYXBpLmd6bXBjLmNvbS92MS93ZWNoYXQvYmluZE9wZW5JZFwiLFxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHVhY2NvdW50OiB1c2VyLFxuICAgICAgICAgICAgICAgIG9wZW5pZDogc2Vzc2lvbkRhdGEub3BlbmlkXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICBpZihyZXMuc3RhdHVzQ29kZSA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBkYXRhOmFueSAgPSByZXMuZGF0YTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhhdC5zZXRFcnJvcihyZXMuZXJyTXNnKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIC5jYXRjaCgocmVzOiBXZWNoYXRNaW5pcHJvZ3JhbS5HZW5lcmFsQ2FsbGJhY2tSZXN1bHQpID0+IHtcbiAgICAgIHRoYXQuc2V0RXJyb3IocmVzLmVyck1zZyk7XG4gICAgfSk7XG4gIH0sXG5cbiAgb25Mb2FkKG9wdGlvbjogYW55KSB7XG4gICAgY29uc3QgeyBhdXRvIH0gPSBvcHRpb247XG4gICAgY29uc3QgeyBhcHAgfSA9IHRoaXM7XG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICBjb25zdCBzZXNzaW9uRGF0YSA9IGFwcC5nZXRTZXNzaW9uQ2FjaGUoKTtcbiAgICBpZihzZXNzaW9uRGF0YSAmJiAhYXV0bykge1xuICAgICAgd3hSZXF1ZXN0KHtcbiAgICAgICAgdXJsOiBgaHR0cHM6Ly93ZWNoYXQtYXBpLmd6bXBjLmNvbS92MS93ZWNoYXQvZ2V0VWFjY291bnRCeU9wZW5JZC8ke3Nlc3Npb25EYXRhLm9wZW5pZH1gLFxuICAgICAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlID09IDIwMCkge1xuICAgICAgICAgIGNvbnN0IGRhdGE6YW55ICA9IHJlcy5kYXRhO1xuICAgICAgICAgIGlmKGRhdGEgJiYgZGF0YS5lcnJjb2RlID09IDApIHtcbiAgICAgICAgICAgIHRoYXQubG9naW4oZGF0YS51YWNjb3VudCwgXCJtaW1hXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBnZXRVc2VySW5mbyhlOiBhbnkpIHtcbiAgICBjb25zdCBhcHAgPSBnZXRBcHA8QnBtT3B0aW9uPigpO1xuICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gZS5kZXRhaWwudXNlckluZm87XG4gICAgdGhpcy5vblVzZXJDb25maXJtKCk7XG4gIH0sXG4gIGdldFBob25lTnVtYmVyKGU6IGFueSkge1xuICAgIGNvbnN0IHsgYXBwIH0gPSB0aGlzO1xuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHd4LmNoZWNrU2Vzc2lvbih7XG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIHZhciBlbmN5ID0gZS5kZXRhaWwuZW5jcnlwdGVkRGF0YTtcbiAgICAgICAgdmFyIGl2ID0gZS5kZXRhaWwuaXY7XG4gICAgICAgIHZhciBzZXNzaW9uayA9IHRoYXQuZGF0YS5zZXNzaW9uS2V5O1xuICAgICAgICBjb25zb2xlLmxvZygnc2Vzc2lvbiBkYXRhOiAnLCBlLCBlbmN5LCBpdiwgc2Vzc2lvbmspO1xuICAgICAgICBjb25zdCBlcnJNc2c6c3RyaW5nID0gZS5kZXRhaWwuZXJyTXNnO1xuICAgICAgICBpZiAoZXJyTXNnICYmIGVyck1zZy5zdGFydHNXaXRoKCdnZXRQaG9uZU51bWJlcjpmYWlsJykpIHtcbiAgICAgICAgICB0aGF0LnNldERhdGEoe1xuICAgICAgICAgICAgbW9kYWxzdGF0dXM6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHsgLy/lkIzmhI/mjojmnYNcbiAgICAgICAgICBjb25zdCBwYyA9IG5ldyBXWEJpekRhdGFDcnlwdChhcHAuZ2xvYmFsRGF0YS5hcHBJZCwgc2Vzc2lvbmspO1xuXG4gICAgICAgICAgdmFyIGRhdGEgPSBwYy5kZWNyeXB0RGF0YShlbmN5ICwgaXYpXG4gICAgICAgICAgY29uc29sZS5sb2coJ+ino+WvhuWQjiBkYXRhOiAnLCBkYXRhKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNlc3Npb25fa2V5IOW3sue7j+WkseaViO+8jOmcgOimgemHjeaWsOaJp+ihjOeZu+W9lea1geeoi1wiKTtcbiAgICAgICAgLy8gdGhhdC53eGxvZ2luKCk7IC8v6YeN5paw55m75b2VXG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn0pXG4iXX0=