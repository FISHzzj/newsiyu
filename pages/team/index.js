// pages/team/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindteam: false,
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
      this.getUserDetail();
      this.getteam();
    }
  },

    /**
   * 获取当前用户信息
   */
  getUserDetail() {
    let _this = this;
    App._get('user.index/detail', {}, function (result) {
      console.log(result)
      _this.setData(result.data);
    });
  },
    /**
   * 获取 团队数据
   */
  getteam() {
    let _this = this;
    App._get('user/teamlist', {}, function (result) {
      console.log(result)
      _this.setData(result.data);
      console.log(_this.data)
    });
  },
  //选择
  teamdown(){

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