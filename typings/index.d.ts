/// <reference path="./types/index.d.ts" />
interface AccountInfo {
  accountName?: string;
  uaccount?: string;
  token?: string;
}

interface SessionData {
  openid: string;
  sessionKey: string;
  unionid?: string;
}

interface BpmOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
    appId: string;
    sessionData?: SessionData;
    accountInfo: AccountInfo;
    baseUrl: string;
  }
  setAccountInfo: (uaccount: string, accessToken: string) => void;
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
  wxLogin: () => void;
  getSessionCache: () => SessionData | undefined;
}
