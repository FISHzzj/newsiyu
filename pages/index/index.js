const App = getApp();
// pages/zhibojian/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[
      'https://jx.czk520.icu/attachment/images/3/2021/09/G94t7dG4cSMYMGcgmTP4M9bpWgLP8j.jpg',
      'https://jx.czk520.icu/attachment/images/3/2021/09/G94t7dG4cSMYMGcgmTP4M9bpWgLP8j.jpg'
    ],
    indicatorDots: true,
    autoplay: !0,
    interval: 5e3,
    duration: 500,
    active: 0,
    flbactive:0,
    flactive:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 加载页面数据
     this.getPageData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
   /**
   * 加载页面数据
   */
  getPageData(callback) {
    let _this = this;
    App._get('goods/lists', {
      // page_id: _this.data.options.page_id || 0
    }, result => {
      // 设置顶部导航栏栏
      // _this.setPageBar(result.data.page);
      console.log(result.data)
      _this.setData(result.data.list);
      // 回调函数
      typeof callback === 'function' && callback();
    });
  },
  getshop(e){
    var active = App.pdata(e).active;
    console.log(active)
    this.setData({
      active: active
    })
  },
  getflbshop(e){
    var flbactive = App.pdata(e).flbactive;
    console.log(flbactive)
    this.setData({
      flbactive: flbactive
    })
  },
  getflshop(e){
    var flactive = App.pdata(e).flactive;
    console.log(flactive)
    this.setData({
      flactive: flactive
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})