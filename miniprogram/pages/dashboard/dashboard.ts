// dashboard.ts
Page({
  app: getApp<BpmOption>(),
  data: {
    name: "姓名",
    opcode: "工号",
    catelogs:[]
  },
  
  onLoad() {
    const { app } = this;
    this.setData({
      opcode: app.globalData.accountInfo?.opcode
    });
    
  },
  
})