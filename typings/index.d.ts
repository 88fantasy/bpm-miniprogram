/// <reference path="./types/index.d.ts" />
interface AccountInfo {
  accountName?: string;
  opcode?: string;
}

interface BpmOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo;
    accountInfo?: AccountInfo;
    token?: string;
    baseUrl: string;
  }
  setLoginInfo: (accessToken: string, accountName: string, opcode: string) => void;
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
}