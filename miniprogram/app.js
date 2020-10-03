"use strict";
App({
    globalData: {
        baseUrl: "https://app.gzmpc.com/NewMobilePlatform/api",
        token: "320e7274b3e7bf86c181f11d2b83903c",
    },
    setLoginInfo(accessToken, accountName, opcode) {
        this.globalData.token = accessToken;
        const accountInfo = {
            accountName,
            opcode,
        };
        this.globalData.token = accessToken;
        this.globalData.accountInfo = accountInfo;
    },
    onLaunch() {
        const logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
        wx.checkSession({
            success() {
            },
            fail() {
                wx.login({
                    success: res => {
                        console.log(res.code);
                    },
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxHQUFHLENBQVk7SUFDYixVQUFVLEVBQUU7UUFDVixPQUFPLEVBQUUsNkNBQTZDO1FBQ3RELEtBQUssRUFBRSxrQ0FBa0M7S0FDMUM7SUFFRCxZQUFZLENBQUMsV0FBbUIsRUFBRSxXQUFtQixFQUFFLE1BQWM7UUFDbkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDO1FBQ3BDLE1BQU0sV0FBVyxHQUFHO1lBQ2xCLFdBQVc7WUFDWCxNQUFNO1NBQ1AsQ0FBQTtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDNUMsQ0FBQztJQUdELFFBQVE7UUFFTixNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQ3hCLEVBQUUsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRS9CLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDZCxPQUFPO1lBRVAsQ0FBQztZQUNELElBQUk7Z0JBR0YsRUFBRSxDQUFDLEtBQUssQ0FBQztvQkFDUCxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7d0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBRXZCLENBQUM7aUJBQ0YsQ0FBQyxDQUFBO1lBQ0osQ0FBQztTQUNGLENBQUMsQ0FBQTtRQUdGLEVBQUUsQ0FBQyxVQUFVLENBQUM7WUFDWixPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7b0JBRXJDLEVBQUUsQ0FBQyxXQUFXLENBQUM7d0JBQ2IsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFOzRCQUViLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7NEJBSXZDLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO2dDQUM5QixJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUE7NkJBQ2hDO3dCQUNILENBQUM7cUJBQ0YsQ0FBQyxDQUFBO2lCQUNIO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAudHNcblxuQXBwPEJwbU9wdGlvbj4oe1xuICBnbG9iYWxEYXRhOiB7XG4gICAgYmFzZVVybDogXCJodHRwczovL2FwcC5nem1wYy5jb20vTmV3TW9iaWxlUGxhdGZvcm0vYXBpXCIsXG4gICAgdG9rZW46IFwiMzIwZTcyNzRiM2U3YmY4NmMxODFmMTFkMmI4MzkwM2NcIixcbiAgfSxcblxuICBzZXRMb2dpbkluZm8oYWNjZXNzVG9rZW46IHN0cmluZywgYWNjb3VudE5hbWU6IHN0cmluZywgb3Bjb2RlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmdsb2JhbERhdGEudG9rZW4gPSBhY2Nlc3NUb2tlbjtcbiAgICBjb25zdCBhY2NvdW50SW5mbyA9IHtcbiAgICAgIGFjY291bnROYW1lLFxuICAgICAgb3Bjb2RlLFxuICAgIH1cbiAgICB0aGlzLmdsb2JhbERhdGEudG9rZW4gPSBhY2Nlc3NUb2tlbjtcbiAgICB0aGlzLmdsb2JhbERhdGEuYWNjb3VudEluZm8gPSBhY2NvdW50SW5mbztcbiAgfSxcbiAgXG5cbiAgb25MYXVuY2goKSB7XG4gICAgLy8g5bGV56S65pys5Zyw5a2Y5YKo6IO95YqbXG4gICAgY29uc3QgbG9ncyA9IHd4LmdldFN0b3JhZ2VTeW5jKCdsb2dzJykgfHwgW11cbiAgICBsb2dzLnVuc2hpZnQoRGF0ZS5ub3coKSlcbiAgICB3eC5zZXRTdG9yYWdlU3luYygnbG9ncycsIGxvZ3MpXG5cbiAgICB3eC5jaGVja1Nlc3Npb24oe1xuICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgLy9zZXNzaW9uX2tleSDmnKrov4fmnJ/vvIzlubbkuJTlnKjmnKznlJ/lkb3lkajmnJ/kuIDnm7TmnInmlYhcbiAgICAgIH0sXG4gICAgICBmYWlsKCkge1xuICAgICAgICAvLyBzZXNzaW9uX2tleSDlt7Lnu4/lpLHmlYjvvIzpnIDopoHph43mlrDmiafooYznmbvlvZXmtYHnqItcbiAgICAgICAgLy8g55m75b2VXG4gICAgICAgIHd4LmxvZ2luKHtcbiAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLmNvZGUpXG4gICAgICAgICAgICAvLyDlj5HpgIEgcmVzLmNvZGUg5Yiw5ZCO5Y+w5o2i5Y+WIG9wZW5JZCwgc2Vzc2lvbktleSwgdW5pb25JZFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICAgIC8vIOW3sue7j+aOiOadg++8jOWPr+S7peebtOaOpeiwg+eUqCBnZXRVc2VySW5mbyDojrflj5blpLTlg4/mmLXnp7DvvIzkuI3kvJrlvLnmoYZcbiAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAvLyDlj6/ku6XlsIYgcmVzIOWPkemAgee7meWQjuWPsOino+eggeWHuiB1bmlvbklkXG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuXG4gICAgICAgICAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXG4gICAgICAgICAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcbiAgICAgICAgICAgICAgaWYgKHRoaXMudXNlckluZm9SZWFkeUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VySW5mb1JlYWR5Q2FsbGJhY2socmVzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSlcbiAgfSxcbn0pIl19