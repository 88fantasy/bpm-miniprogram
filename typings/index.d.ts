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
    /**
     * 状态栏高度
     */
    statusBarHeight: number;
  }
  setAccountInfo: (uaccount: string, accessToken: string) => void;
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback;
  wxLogin: () => void;
  getSessionCache: () => SessionData | undefined;
  getComSessionCache: () => ComSessionData | undefined;
  checkUpdate:(callback?: (WechatMiniprogram.OnCheckForUpdateCallback)) => void;
}

type CommonOperationRequest = {
  token?: string;
  approvalId: string;
  comment: string;
}

type AssOperationRequest = CommonOperationRequest & {
  categoryid: string;
}

type ApproveRequest = AssOperationRequest & {
  nextNode?: string;
  nextApprovalStaff?: string;
}

type StopRequest = AssOperationRequest & {

}

type RejectRequest = AssOperationRequest & {
  rejectNode?: string;
}

type SignRequest = CommonOperationRequest & {

}

type AbolishRequest = CommonOperationRequest & {

}

type ReplyRequest = CommonOperationRequest & {

}

type SendRequest = AssOperationRequest & {
  staff: string;
}

type WechatMiniprogramCommonResult = {
  errcode: number;
  errmsg: string;
}

type WechatMiniprogramComCode2SessionResult = WechatMiniprogramCommonResult & ComSessionData; 

type OperatePageData = {
  comment: string;
  oper: string;
  node: string;
  rowData: {
    id: string;
    categoryid: string;
    isNeedApprover: number;
  },
  msgShow: boolean;
  msgInfo: {
    type: string;
    title: string;
    desc: string;
  },
  toAccount: AccountInfo[],
  isCom: boolean;
};

type OperatePageMethod = {
  app: any;
  onAppendComment: (e:any) => void;
};

type OperatePageChannel = {
  rowData: any; 
  oper: string;
};