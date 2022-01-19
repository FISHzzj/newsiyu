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
    xuanpinId:"",
    dyleftimg:"",
    dyshopId:"",
    page: 1, // 当前页码
    no_more: false, // 没有更多数据
    isLoading: true, // 是否正在加载中
    scrollHeight: null,
    sortType: 'all',
    sortPrice: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 加载页面数据
     this.getPageData();
     this.getbanner();
     this.getjdimg();
     this.getdyimg();
     this.setListHeight();
     this.getdydaohang();
  },
  poster_bg(){
    wx.navigateTo({
      url: '/pages/detail/index?id=4',
    })
  },
  jd(){
    wx.navigateTo({
      url: '/pages/detail/index?id=3',
    })
  },
  gojingdong(){
    wx.navigateTo({
      url: '/pages/category/index',
    })
  },
  gojdshop(){
    // console.log(this.data.xuanpinId)
    wx.navigateTo({
      url: '/pages/jdshop/index?elite_id=' + this.data.xuanpinId
    })
  },
  godyshop(){
    wx.navigateTo({
      url: '/pages/dyshop/index?wxapp_id=' + this.data.dyshopId
    })
  },
  godyshop1(){
    wx.navigateTo({
      url: '/pages/dyshop/index?wxapp_id=' + this.data.dyrighttopshopId
    })
  },
  godyshop2(){
    wx.navigateTo({
      url: '/pages/dyshop/index?wxapp_id=' + this.data.dyrightbottomshopId
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
  getbanner(){
    let _this = this;
    App._get('shop/banner', {
      // page_id: _this.data.options.page_id || 0
    }, result => {
 
      console.log(result.data)
      _this.setData({
        banner: result.data
      });
    });
  },
       /**
   * 加载页面数据
   */
    /**
   * 获取商品列表
   * @param {bool} isPage 是否分页
   * @param {number} page 指定的页码
   */
  getPageData(isPage, page,) {
    let _this = this;
    App._get('goods/lists', {
        category_id:  _this.data.dyshopId,
         page: page || 1,
         sortType: _this.data.sortType,
         sortPrice: _this.data.sortPrice
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
  getshop(e){
    var active = App.pdata(e).active;
    console.log(active)
    this.setData({
      active: active
    })
  },
  getflbshop(e){
    var flbactive = App.pdata(e).flbactive;
    var dyshopId = App.pdata(e).dyshopid;
    // console.log(flbactive)
    this.setData({
      flbactive: flbactive,
      dyshopId: dyshopId
    })
    this.getPageData()
  },
  getflshop(e){
    var flactive = App.pdata(e).flactive;
    var activename = App.pdata(e).activename;
    console.log(flactive)
    this.setData({
      flactive: flactive,
      sortType: activename,
      sortPrice: '0'
    })
    this.getPageData()
  
    
  },
  getjdimg(){
    let _this = this;
    App._get('jdshop.banner/index', {
      // page_id: _this.data.options.page_id || 0
      type:'jd'
    }, result => {
    
      console.log(result.data)
      let data = result.data[0]
      console.log(data.goods_id)
      _this.setData({
        xuanpinId:data.goods_id,
        file_path:data.image.file_path
      });
  })   
  
  },
  getdyimg(){
    let _this = this;
    App._get('jdshop.banner/index', {
      // page_id: _this.data.options.page_id || 0
      type:'tok'
    }, result => {
    
      console.log(result.data)
      let data = result.data[0]
      // console.log(data.goods_id)
      _this.setData({
        dyshopId:data.goods_id,
        dyleftimg:data.image.file_path,
        dyrighttopshopId:result.data[1].goods_id,
        dyrightbottomshopId:result.data[2].goods_id,
        dyrighttop:result.data[1].image.file_path,
        dyrightbottom:result.data[2].image.file_path,
      });
  })   
  
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

  getdydaohang(){
    let _this = this;
    App._get('category/index', {
      // page_id: _this.data.options.page_id || 0
      // type:'tok'
    }, result => {
    
      console.log(result.data)
      // let data = result.data[0]
      // console.log(data.goods_id)
      _this.setData({
        categoryList: result.data.list
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