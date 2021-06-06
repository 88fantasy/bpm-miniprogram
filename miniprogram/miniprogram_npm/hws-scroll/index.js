/*
***********
@pager： 列表请求参数，对象，必须包含pageSize，pageIndex
@getData: 请求数据方法
@marginTop：顶部如果有其他元素占位，则传入该元素的rpx值
@tabBarHeight: 底部如果有其他元素占位，则传入该元素rpx值
@isTocuh: 是否开启上拉加载和下拉刷新，主要应对父级组件有tocuh事件，防止和这里的tocuh事件冲突。默认为true
@backgroundColor: 整体背景色，默认#f5f5f5；
@notDataText: 加载至没有更多数据时显示的文字，默认“没有更多了”
@initIndex: 初始页数从几开始，Number，默认从1开始

onReachBottom 父组件触发这个上拉方法方法
no-data  slot，无数据时展示

getData 成功调用：this.setData({ list: this.scroll.successHandle(list) });  //  调用子组件成功函数，并获得子组件返回的list
getData 失败调用：this.setData({ list: this.scroll.errorHandle(list) });  //  调用子组件失败函数，并获得子组件返回的list
***********
*/

const app = getApp();
const fmtDate = require('./date.js');
const icon = require('./icon.js');
const REFRESHHEIGHT = 80;

const LOAD_UP_TEXT = '上拉查看更多';
const PULL_DOWN_REFRESH = '下拉刷新';
const MAX_SCROLL_TOP = 20;
const MAX_MOVE_TOP = 120;



Component({
  properties: {
    pager: {
      type: Object,
      value: { pageIndex: 0, pageSize: 10 },
    },
    marginTop: {
      type: Number,
      value: 0,
    },
    tabBarHeight: {
      type: Number,
      value: 0,
    },
    isTocuh: {
      type: Boolean,
      value: true,
    },
	backgroundColor: {
	  type: String,
	  value: '#F5F5F5',
	},
	notDataText: {
	  type: String,
	  value: '没有更多了',
	},
	initIndex: {
	  type: Number,
	  value: 1,
	}
  },

  data: {
    width: 375,
    bottomLoadingShow: false,
    topLoadingShow: false, 
    hasMore: true, // 是否还有更多数据
    lineText: LOAD_UP_TEXT,
    notDataShow: false,
    recycleList: [],
    scrollTop: -REFRESHHEIGHT,
    contentHeight: '120%',
    pageHeight: '100vh',
    refreshText: PULL_DOWN_REFRESH,
    refreshTime: '2021-01-27 09:53:52',
    springbacking: false, //是否正在回弹
    refreshing: false, // 松开刷新，正在请求中
    overflow: '',
    fillHeight: 0,
    loading: false, // 请求中
    trunMarginTop: 0,
    contentFlow: 'absolute',
	icon: icon,
  },

  top: 0,
  lastTop: 0,
  canPullUp: false,
  maxTop: 30,
  nowY: 0,
  system: '',
  
  lifetimes: {
    ready() {
      this.getPageHeight();
      this.top = 0;
      this.lastTop = 0;
      this.canPullUp = false;
      this.maxTop = 100;
    },
  },

  pageLifetimes: {
    show() {
      if(app.globalData.isRefresh) {
        app.globalData.isRefresh = false;
        this.refresh();
      }
    },
  },

  methods: {
    onReachBottom() {
      if(!(this.data.recycleList.length % this.data.pager.pageSize) && !this.data.loading) {
        this.canPullUp = true;
      }
    },
    refresh() {
      this.setData({ loading: true });
      this.gotoTop(); // 回顶
      wx.showNavigationBarLoading();
      this.setData({
        ['pager.pageIndex']: this.data.initIndex,
        recycleList: [],
        hasMore: true,
        refreshTime: fmtDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      }) 
      this.triggerEvent('getList', this.data.pager.pageIndex);
    },
    successHandle(list) {
      if(this.data.pager.pageIndex === this.data.initIndex) {
        this.setData({recycleList: list || []});
      } else {
        this.setData({recycleList: this.data.recycleList.concat(list)});
      }

      if(!this.data.recycleList.length) {
        this.setData({
          notDataShow: true,
          hasMore: false,
          refreshText: PULL_DOWN_REFRESH,
          lineText: this.data.notDataText,
          topLoadingShow: false,
          bottomLoadingShow: false,
        });
      } else {
        let flag = this.data.recycleList.length % this.data.pager.pageSize;
        let lineText = '';
        if(flag) {
          lineText = this.data.notDataText;
        } else {
          lineText = list.length ? LOAD_UP_TEXT : this.data.notDataText;
        }
        this.setData({
          notDataShow: false,
          hasMore: !flag,
          refreshText: PULL_DOWN_REFRESH,
          lineText: lineText,
          topLoadingShow: true,
          bottomLoadingShow: false,
        });
      }
      this.canPullUp = false;
      this.top = 0;

      this.refreshElementHandle(true);

      wx.hideNavigationBarLoading();
      this.fillHidle();
      return this.data.recycleList;
    },
    errorHandle() {
      this.setData({
        notDataShow: this.data.recycleList.length ? false : true,
        hasMore: false,
        refreshText: PULL_DOWN_REFRESH,
        lineText: this.data.notDataText,
        topLoadingShow: this.data.recycleList.length ? true : false,
        bottomLoadingShow: false,
      });
      this.canPullUp = false;
      this.top = 0;

      this.refreshElementHandle(true);

      wx.hideNavigationBarLoading();
      this.fillHidle();
      return this.data.recycleList;
    },
    movePull(ev) {
      if(this.data.isTocuh && this.data.recycleList.length) {
        this.nowY = ev.changedTouches[0].clientY;
        this.nowY = this.nowY - this.lastTop;
      /* 处理下拉刷新 */
        if(!this.data.loading) {
          const query = wx.createSelectorQuery();
          query.select('.scroll__content').boundingClientRect();
          query.selectViewport().scrollOffset();
          query.exec((rect) => { 
            if (rect[1].scrollTop <= 0) { // 必须是滚动高度为0即在顶部的时候触发
              if(this.nowY > 0 && this.nowY <= MAX_MOVE_TOP) {
				if(this.data.tabBarHeight > 0 && this.system.indexOf('iOS') > -1) {
                  this.setData({ contentFlow: 'fixed' });
                }
                this.setData({
                  scrollTop: -REFRESHHEIGHT + this.nowY,
                })
                if(this.nowY >= 100) {
                  try {
                    wx.vibrateShort({
                      type: 'medium'
                    });
                  } catch (error) {
                    
                  }
                  
                  this.setData({
                    refreshText: '松开刷新',
                  })
                } else {
                  this.setData({
                    refreshText: '下拉刷新',
                  })
                }
              }

              if(this.nowY > MAX_MOVE_TOP && this.data.scrollTop < MAX_SCROLL_TOP) { // 滑动速度过快出现非线性滑动情况处理
                try {
                  wx.vibrateShort({
                    type: 'medium'
                  });
                } catch (error) {
                  
                }
                this.setData({
                  refreshText: '松开刷新',
                  scrollTop: MAX_SCROLL_TOP,
                })
              }
            }
          })
        }
        
        if(this.nowY > 0 ) {
          this.canPullUp = false;
        }
        /* 处理上拉加载 */
        if(!this.data.loading) {
          if( this.nowY <= 0 && this.canPullUp ) {
            this.top = this.nowY;
          }
          if( -this.top >= this.maxTop  ) {
            this.top = -this.maxTop;
          }
          if(this.top <= -this.maxTop && this.data.hasMore) {
            this.setData({
              bottomLoadingShow: true,
              lineText: '松开加载更多',
            });
          }
        }
      }
    },
    startPull(ev) {
      if(this.data.isTocuh && this.data.recycleList.length) {
        this.setData({ springbacking: false });
        this.lastTop = ev.changedTouches[0].clientY;
      }
    },
    endPull() {
      if(!this.data.loading) {
        if(this.data.scrollTop >= MAX_SCROLL_TOP) {
          this.setData({
            refreshing: true,
          })
          this.refresh();
        } else {
          if (this.data.scrollTop > -REFRESHHEIGHT) {
            this.refreshElementHandle(false);
          }
        }
      }
      
      if(this.top <= -this.maxTop && this.data.hasMore && !this.data.loading) {
        this.setData({ loading: true });
        wx.showNavigationBarLoading();
        this.setData({
          ['pager.pageIndex']: this.data.pager.pageIndex + 1,
          hasMore: true,
          lineText: '正在加载...'
        });
        this.triggerEvent('getList', this.data.pager.pageIndex);
      }
    },
    gotoTop() {
      wx.pageScrollTo({
        scrollTop: 0,
      })
    },
    refreshElementHandle(refresh) {
      this.setData({ loading: false });
      if (this.data.scrollTop > -REFRESHHEIGHT) {
        setTimeout(() => { // 定时器是防止因为手指离开屏幕过快（类似点击事件，但又下拉了一段距离）导致的数据更新，视图未更新，而卡住的情况
          this.setData({
            refreshing: refresh,
            springbacking: true,
            scrollTop: -REFRESHHEIGHT
          })
        }, 50)
        if(refresh) {
          setTimeout(() => {
            this.setData({
              refreshing: false,
            })
          }, 450)
        }
      }
    },
    getPageHeight() {
      wx.showNavigationBarLoading();
      const self = this;
      wx.getSystemInfo({
        success: (res) => {
          const marginTop = self.data.marginTop / 750 * res.windowWidth;
          const tabBarHeight = self.data.tabBarHeight / 750 * res.windowWidth;
          self.system = res.system;
          self.setData({
            trunMarginTop: marginTop,
            pageHeight: `${res.windowHeight - marginTop - tabBarHeight}px`,
            contentHeight: `${res.windowHeight - marginTop - tabBarHeight + REFRESHHEIGHT + 2}px`,
          })
          this.refresh();
        },
        fail: () => {
          self.setData({
            pageHeight: '100vh',
            contentHeight: '120%',
          })
          this.refresh();
        }
      })
    },
    fillHidle() {
      if(this.data.pager.pageIndex === this.data.initIndex && !this.data.recycleList.length) {
        this.setData({ overflow: 'hidden' });
      } else {
        this.setData({ overflow: '' });
      }
      if(this.system.indexOf('iOS') > -1 && 
        this.data.recycleList.length < this.data.pager.pageSize) {
          setTimeout(() => {
            const query = this.createSelectorQuery();
            query.select('.content').boundingClientRect(rect => {
              if(rect.height < parseFloat(this.data.pageHeight)) {
                this.setData({ contentFlow: 'fixed' });
              } else {
                this.setData({ contentFlow: 'relative' });
              }
            }).exec();
          }, 300)
      } else {
        this.setData({ contentFlow: 'relative' });
      }
    },
  }
});
