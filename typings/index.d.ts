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

interface CommonOperationRequest {
  token?: string;
  approvalId: string;
  comment: string;
}

interface AssOperationRequest extends CommonOperationRequest {
  categoryid: string;
}

interface ApproveRequest extends AssOperationRequest{
  nextNode?: string;
  nextApprovalStaff?: string;
}

interface StopRequest extends AssOperationRequest{

}

interface RejectRequest extends AssOperationRequest {
  rejectNode?: string;
}

interface SignRequest extends CommonOperationRequest{

}

interface AbolishRequest extends CommonOperationRequest{

}

interface ReplyRequest extends CommonOperationRequest{

}