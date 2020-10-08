import { wxRequest }  from '../utils/request';

const operate = (url: string, options: ApproveRequest, other?: any) => {
  const app = getApp<BpmOption>();
  const { token }  = app.globalData.accountInfo; 
  if(!options.token) {
    options.token = token;
  }
  return wxRequest({
    url,
    method: 'POST',
    header : {
      'content-type' : 'application/x-www-form-urlencoded',
    },
    ...other,
    data: {
      ...options,
    }
  }, false);
}

export const approve = (options: ApproveRequest, other?: any) => {
  return operate('/ass/approve',options,other);
}

export const reject = (options: RejectRequest, other?: any) => {
  return operate('/ass/reject',options,other);
}

export const stop = (options: StopRequest, other?: any) => {
  return operate('/ass/stop',options,other);
}