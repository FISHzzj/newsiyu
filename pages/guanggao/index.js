// pages/guanggao/index.js
const App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url:"",
        scrollHeight: null,

        showView: false, // 列表显示方式

        sortType: 'all', // 排序类型
        sortPrice: false, // 价格从低到高

        option: {}, // 当前页面参数
        list: {}, // 商品列表数据

        no_more: false, // 没有更多数据
        isLoading: true, // 是否正在加载中

        page: 1, // 当前页码
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this;
        _this.gettab();
        // 设置商品列表高度
        _this.setListHeight();
        // 记录option
        // _this.setData({
        //     option
        // });
        // 设置列表显示方式
        // _this.setShowView();
        // 获取商品列表
        _this.getGoodsList();

    },
    tapguanggao(e){
        let _this = this
        App._get('advert/category', {
            advert_id: e.currentTarget.dataset.advertId
        }, result => {
            // 设置顶部导航栏栏
            // _this.setPageBar(result.data.page);
            console.log(result.data)
            App.showSuccess(result.data.msg)
        });
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
        // this.getPageData();
        // this.getGuanggao();
    },
    adLoad(e) {
        console.log('Banner 广告加载成功')
        let advert_id = e.currentTarget.dataset.id;
        this.isadClick(advert_id)

    },
    adError(err) {
        onsole.log('Banner 广告加载失败', err)
    },
    adClose() {
        console.log('Banner 广告关闭')
    },
    isadClick(advert_id){
        let _this = this
        App._post_form('advert/get_advert', {
            advert_id: advert_id
        }, result => {
            // 设置顶部导航栏栏
            // _this.setPageBar(result.data.page);
            console.log(result.data)
            
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
                scrollHeight: res.windowHeight - 90,
                });
            }
        });
    },
    gettab(){
        let _this = this
        App._get('advert/category', {
            // wxapp_id: _this.data.wxapp_id || 0
        }, result => {
            // 设置顶部导航栏栏
            // _this.setPageBar(result.data.page);
            console.log(result.data)
            _this.setData({
                tabList: result.data
            });
            
            // 回调函数
            typeof callback === 'function' && callback();
        });
    },
     /**
     * 切换排序方式
     */
    switchSortType(e) {
        let _this = this,
        newSortType = e.currentTarget.dataset.type;
        // newSortPrice = newSortType === 'price' ? !this.data.sortPrice : true;

        this.setData({
            list: {},
            isLoading: true,
            page: 1,
            sortType: newSortType,
                // sortPrice: newSortPrice
            }, () => {
            _this.getGoodsList();
        });
    },
     /**
     * 获取商品列表
     * @param {bool} isPage 是否分页
     * @param {number} page 指定的页码
     */
    getGoodsList(isPage, page) {
        let _this = this;
        App._get('advert/index', {
            page: page || 1,
            type: _this.data.sortType
        }, result => {
            console.log(result)
            let resList = result.data,
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
        this.getGoodsList(true, ++this.data.page);
    },
   /**
   * 加载页面数据
   */
    getPageData(callback) {
        let _this = this;
        App._get('shop/video', {
            // wxapp_id: _this.data.wxapp_id || 0
        }, result => {
            // 设置顶部导航栏栏
            // _this.setPageBar(result.data.page);
            console.log(result.data)
            _this.setData({
                url: result.data[0]
            });
            
            // 回调函数
            typeof callback === 'function' && callback();
        });
    },
    getGuanggao(callback) {
        let _this = this;
        App._get('advert/index', {
            // wxapp_id: _this.data.wxapp_id || 0
        }, result => {
            // 设置顶部导航栏栏
            // _this.setPageBar(result.data.page);
            console.log(result.data)
            _this.setData({
                guanggaoList: result.data.data
            });
            
            // 回调函数
            typeof callback === 'function' && callback();
        });
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