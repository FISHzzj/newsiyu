const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: {}, // 用户信息
    orderCount: {}, // 订单数量
    yaoqingma:'18402015569',
    openshow: false,
    url:"",
    opentitle:'请完成授权',
    openUsershow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let _this = this;
    _this.setData({
      isLogin: App.checkIsLogin()
    });
    // 获取当前用户信息
    _this.getUserDetail();
    _this.getUrl();
    // _this.getDouUser();
    // 更新购物车角标
    App.setCartTabBadge()
  },

  /**
   * 获取当前用户信息
   */
  getUserDetail() {
    let _this = this;
    App._get('user.index/detail', {}, function (result) {
      _this.setData(result.data);
    });
  },
  getUrl(){
    let _this = this;
    App._get('tok/tok', {}, function(result) {
      _this.setData(result.data);
      console.log(result)
    });
  },
  getDouUser(){
    let _this = this;
    App._get('user.toklist/lists', {}, function(result) {
      console.log(result)
      if(result.data.data.length > 0){
        // _this.setData(result.data);
        _this.setData({
          openUsershow: true,
          opentitle:'已授权用户',
          datauserlist: result.data.data,
          openshow:true
        })
      }else{
        _this.setData({
          openUsershow: false,
          opentitle:'请完成授权',
          openshow:true
        })
        // App.showError('很抱歉，您还没有授权');
      }
    });
  },
  invite(){
    wx.navigateTo({
      url: '/pages/user/invite/index'
    });
  },
  fuzhi(e){
    var content = e.currentTarget.dataset.content;
    wx.setClipboardData({
      data: content,
      success (res) {
        wx.getClipboardData({
          success (res) {
            console.log(res.data) // data
          }
        })
      }
    })
    
  },
  shouquan(){
    // this.getDouUser();
    wx.navigateTo({
      url: '../user/douyin/index'
    });

    
  },
  guanbi(){
    this.setData({
      openshow:false
    })
  },

  /**
   * 订单导航跳转
   */
  onTargetOrder(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    let urls = {
      all: '/pages/order/index?type=all',
      payment: '/pages/order/index?type=payment',
      received: '/pages/order/index?type=received',
      refund: '/pages/order/refund/index',
    };
    // 转跳指定的页面
    wx.navigateTo({
      url: urls[e.currentTarget.dataset.type]
    })
  },

  /**
   * 菜单列表导航跳转
   */
  onTargetMenus(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/' + e.currentTarget.dataset.url
    })
  },

  /**
   * 跳转我的钱包页面
   */
  onTargetWallet(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: './wallet/index'
    })
  },

  /**
   * 跳转积分明细页
   */
  onTargetPoints(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '../points/log/index'
    });
  },
  setting(){
    wx.navigateTo({
      url: '/pages/user/setting/index'
    })
  },
  /**
   * 跳转到登录页
   */
  onLogin() {
    // wx.navigateTo({
    //   url: '../login/login',
    // });
    App.doLogin();
  },

  /**
   * 验证是否已登录
   */
  onCheckLogin() {
    let _this = this;
    if (!_this.data.isLogin) {
      App.showError('很抱歉，您还没有登录');
      return false;
    }
    return true;
  },

})