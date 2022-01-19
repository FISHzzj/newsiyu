// pages/detail/index.js
const App = getApp();
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
    detail_img:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    console.log(options)
    _this.setData(options);
    // console.log(_this.data)
    _this.getPageData();
   
  },
  copyText: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
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
    App._post_form('jdshop.jdgoods/detail', {
      skuid: _this.data.id
    }, result => {
      // 设置顶部导航栏栏
      // _this.setPageBar(result.data.page);
      // console.log(result.data)
      let data = result.data.data
      _this.setData(data);
      console.log(data)
      _this.geturl(data.ItemInfo[0].materialUrl);
    //   let article_content = result.data.detail.content
    //   article_content = article_content.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ')
    //   .replace(/<section/g, '<div')
    //  .replace(/\/section>/g, '\div>');

      
      // _this.setData({
      //   detailcontent: article_content
      // });
      console.log(_this.data)
      // 回调函数
      typeof callback === 'function' && callback();
    });
  },
  geturl(materialUrl){
    let _this = this;
    App._get('jdshop.jdgoods/set_url', {
      url: materialUrl
    }, result => {
      // console.log(result.data)
      let data = result.data.data
      console.log(data)
      _this.setData({
        urljd: data
      });
      // console.log(_this.data)
      // 回调函数
      typeof callback === 'function' && callback();
    });
  },
  goback(){
    wx.navigateBack({
      delta: 1,
      success(res){
        console.log(res)
      },
      fail(res){
        console.log(res)
      }
    })
  },
  fenxiang(){
    this.onShareAppMessage();
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
    // return {
    //   title: '微信小程序联盟',
    //   desc: '最具人气的小程序开发联盟!',
    //   path: '/page/user?id=123'
    // }
  }
})