const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], // 充值记录
    isLoading: true, // 是否正在加载中
    page: 1, // 当前页码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    // 设置列表容器高度
    _this.setListHeight();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let _this = this;
    // 获取积分明细列表
    _this.getPointsLog();
  },
  banddou(){
    wx.navigateTo({
      url: '/pages/user/zhanhao/index'
    });
  },
  /**
   * 获取积分明细列表
   */
  getPointsLog(isPage, page) {
    let _this = this;
    App._get('user.toklist/lists', {
      page: page || 1
    }, result => {
      console.log(result)
      let resList = result.data,
        dataList = _this.data.list;
        console.log(resList)
      if (isPage == true) {
        _this.setData({
          'list.data': dataList.data.concat(resList.data),
          isLoading: false,
        });
      } else {
        _this.setData({
          list: resList,
          isLoading: false,
        });
      }
    });
  },

  /**
   * 设置列表容器高度
   */
  setListHeight() {
    let _this = this,
      systemInfo = wx.getSystemInfoSync();
    _this.setData({
      scrollHeight: systemInfo.windowHeight * 0.98
    });
  },

  /**
   * 下拉到底加载数据
   */
  onPageDown() {
    let _this = this;
    // 已经是最后一页
    if (_this.data.page >= _this.data.list.last_page) {
      _this.setData({
        no_more: true
      });
      return false;
    }
    // 加载下一页列表
    _this.getPointsLog(true, ++_this.data.page);
  },

})