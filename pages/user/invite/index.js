const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseRes: App.globalData.baseRes,
        imgUrls: [
            {'img':'/images/bg/certify03.png'},
            {'img':'/images/bg/certify03.png'},
            {'img':'/images/bg/certify03.png'},
            {'img':'/images/bg/certify03.png'}
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        cardNum:2,
        swiperIndex:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPageData()
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
    bindchange:function(e){
        // 实时监控轮播图变化 改变swiperIndex

        this.setData({
            swiperIndex:e.detail.current
        })
    },
     /**
     * 加载页面数据
     */
    getPageData() {
        let _this = this;
        App._get('user.dealer.Qrcode/poster', {
        // page_id: _this.data.options.page_id || 0
        }, result => {
            // 设置顶部导航栏栏
            // _this.setPageBar(result.data.page);
            console.log(result.data)
            _this.setData({
                imgUrls: [{"img": result.data.qrcode}]
            });
      
        })
    },
   
      //  长按保存图片
      showBigImg() {
          console.log(2222222222)
        var _this = this;
        var url = '';
        wx.downloadFile({
          url: _this.data.imgUrls[0].img,
          success: function (res) {
              console.log(res);
            var benUrl = res.tempFilePath;
            //图片保存到本地相册
            wx.saveImageToPhotosAlbum({
              filePath: benUrl,
              //授权成功，保存图片
              success: function (data) {
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })
              },
              //授权失败
              fail: function (err) {
                if (err.errMsg) { //重新授权弹框确认
                  wx.showModal({
                    title: '提示',
                    content: '您好，请先授权再保存此图片。',
                    showCancel: false,
                    success(res) {
                      if (res.confirm) { //重新授权弹框用户点击了确定
                        wx.openSetting({ //进入小程序授权设置页面
                          success(settingdata) {
                            console.log(settingdata)
                            if (settingdata.authSetting['scope.writePhotosAlbum']) { //用户打开了保存图片授权开关
                              wx.saveImageToPhotosAlbum({
                                filePath: benUrl,
                                success: function (data) {
                                  wx.showToast({
                                    title: '保存成功',
                                    icon: 'success',
                                    duration: 2000
                                  })
                                },
                              })
                            } else { //用户未打开保存图片到相册的授权开关
                              wx.showModal({
                                title: '温馨提示',
                                content: '授权失败，请稍后重新获取',
                                showCancel: false,
                              })
                            }
                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          }
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