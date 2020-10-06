/// <reference path="./types/index.d.ts" />
interface AccountInfo {
  accountName?: string;
  opcode?: string;
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
    appSecret: string;
    sessionData?: SessionData;
    accountInfo?: AccountInfo;
    token?: string;
    baseUrl: string;
  }
  setToken: (accessToken: string) => void;
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
  wxLogin: () => void;
  getSessionCache: () => SessionData | undefined;
}
