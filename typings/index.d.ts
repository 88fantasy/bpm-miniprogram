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

type ComSessionData = {
  /**
   * 企业Id
   */
  corpid: string;
  /**
   * 企业微信帐号关联的工号
   */
  userid: string;
}

interface BpmOption {
  globalData: {
    /**
     * 微信用户信息
     */
    userInfo?: WechatMiniprogram.UserInfo;
    sessionData?: SessionData;
    comSessionData?: ComSessionData;
    appId: string;
    agentId: number;
    /**
     * 帐号信息
     */
    accountInfo: AccountInfo;
    /**
     * 后端网关地址
     */
    baseUrl: string;
    /**
     * 是否已登录
     */
    hasUserInfo: boolean;
    /**
     * 是否企业微信
     */
    isCom: boolean;
  }
  setAccountInfo: (uaccount: string, accessToken: string) => void;
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
  wxLogin: () => void;
  getSessionCache: () => SessionData | undefined;
  getComSessionCache: () => ComSessionData | undefined;
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

type WechatMiniprogramCommonResult = {
  errcode: number;
  errmsg: string;
}

type WechatMiniprogramComCode2SessionResult = WechatMiniprogramCommonResult & ComSessionData; 