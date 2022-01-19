// pages/dyshop/index.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1, // 当前页码
        no_more: false, // 没有更多数据
        isLoading: true, // 是否正在加载中
        scrollHeight: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let wxapp_id = options.wxapp_id
        this.setData({
            wxapp_id
        })
        // 设置商品列表高度
        this.setListHeight();
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

      /**
   * 加载页面数据
   */
    /**
   * 获取商品列表
   * @param {bool} isPage 是否分页
   * @param {number} page 指定的页码
   */
    getPageData(isPage, page) {
        let _this = this;
        App._get('goods/lists', {
            category_id: _this.data.wxapp_id || 0,
            page: page || 1
        }, result => {

            console.log(result.data)
            // _this.setData(result.data);
            let resList = result.data.list,
            dataList = _this.data.list;
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
     * 设置商品列表高度
     */
    setListHeight() {
        let _this = this;
        wx.getSystemInfo({
        success: res => {
            _this.setData({
            scrollHeight: res.windowHeight,
            });
        }
        });
    },
      /**
   * 下拉到底加载数据
   */
    bindDownLoad() {
        // 已经是最后一页
        if (this.data.page >= this.data.list.last_page) {
        this.setData({
            no_more: true
        });
        return false;
        }
        // 加载下一页列表
        this.getPageData(true, ++this.data.page);
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