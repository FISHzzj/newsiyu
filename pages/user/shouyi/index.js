// pages/user/shouyi/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:'balance',
    points:'points',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let _this = this;
    _this.setData({
      isLogin: App.checkIsLogin()
    });
    if(_this.data.isLogin){
      // 获取当前用户信息
      _this.getUserDetail();
      // _this.getUrl();
    }
  },
  mingxi(e){
      let _this = this;
      console.log(e.currentTarget.dataset.coinid)
      
      wx.navigateTo({
        url: '/pages/user/shouyi/mingxi/index?coin_id='+ e.currentTarget.dataset.coinid, 
      })
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
  tixian(){
    wx.navigateTo({
      url: '/pages/user/tixian/index',
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
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