const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    _this.setData({
      options
    });
  },

  /**
   * 授权登录（旧版弃用）
   */
  getUserInfo(e) {
    let _this = this;
    App.getUserInfo(e, () => {
      // 跳转回原页面
      _this.onNavigateBack(1);
    });
  },

  /**
   * 授权登录（新版）
   */
  getUserProfile() {
    console.log('getUserProfile')
    const app = this
    try {
      wx.getUserProfile({
        lang: 'zh_CN',
        desc: '获取用户相关信息',
        success({
          userInfo
        }) {
          console.log('用户同意了授权')
          console.log('userInfo：', userInfo)
          App.getUserInfo(userInfo, () => {
            // 跳转回原页面
            app.onNavigateBack(1)
          });
        },
        fail() {
          console.log('用户拒绝了授权')
        }
      })
    } catch (e) {
      console.log('error：', e.message)
      if (e.message === 'wx.getUserProfile is not a function') {
        App.showError('wx.getUserProfile 接口无法使用，请升级到最新版微信')
      } else {
        App.showError(error.message)
      }
    }
  },

  /**
   * 暂不登录
   */
  onNotLogin() {
    let _this = this;
    // 跳转回原页面
    _this.onNavigateBack(_this.data.options.delta);
  },

  /**
   * 授权成功 跳转回原页面
   */
  onNavigateBack(delta) {
    wx.navigateBack({
      delta: Number(delta || 1)
    });
  },

})