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