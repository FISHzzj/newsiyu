const App = getApp();

Page({
  data: {
    // 搜索框样式
    searchColor: "rgba(0,0,0,0.4)",
    searchSize: "15",
    searchName: "搜索商品",

    // 列表高度
    scrollHeight: 0,

    // 一级分类：指针
    curNav: true,
    curIndex: 0,

    // 分类列表
    list: [],

    // show
    notcont: false,
    page:1,
    shoplist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let _this = this;
    // 设置分类列表高度
    _this.setListHeight();
    // 获取分类列表
    _this.getCategoryList();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 更新购物车角标
    App.setCartTabBadge()
  },

  /**
   * 设置分类列表高度
   */
  setListHeight() {
    let _this = this;
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          scrollHeight: res.windowHeight - 47,
        });
      }
    });
  },

  /**
   * 获取分类列表
   */
  getCategoryList() {
    let _this = this;
    App._get('jdshop.jdelite/lists', {}, result => {
      let data = result.data;
      console.log(data);
      _this.setData({
        list: data,
        curNav: data.length > 0 ? data[0].elite_id : true,
        notcont: !data.length,
        page: 1,
        shoplist:[],
      });
      this.getShareList();
    });
  },

  /**
   * 一级分类：选中分类
   */
  selectNav(e) {
    let _this = this;
    _this.setData({
      curNav: e.target.dataset.id,
      curIndex: parseInt(e.target.dataset.index),
      scrollTop: 0,
      page: 1,
      shoplist:[],
    });
    _this.getShareList();
   

  },

  pullUpLoad(){
    let _this = this;
    console.log("====下拉====");
    console.log(_this.data.shoplist.length)
    console.log(_this.data.totalCount)
    if(_this.data.shoplist.length <= _this.data.totalCount){
      _this.data.page += 1;
      _this.setData({
            page: _this.data.page,
        })
        _this.getShareList()
    }

  },

  getShareList(){
    let _this = this;
    App._get('jdshop.jdgoods/lists', {
      elite_id: _this.data.curNav,
      page:_this.data.page,
    }, result => {
      let data = result.data.data;
      console.log(data);
      if(result.code == 1){
        _this.setData({
          shoplist: _this.data.shoplist.concat(data.list),
          totalCount: data.totalCount
        });
      }
      
    });
  },

  /**
   * 设置分享内容
   */
  onShareAppMessage() {
    const _this = this;
    return {
      title: _this.data.templet.share_title,
      path: '/pages/category/index?' + App.getShareUrlParams()
    };
  },

  /**
   * 分享到朋友圈
   * 本接口为 Beta 版本，暂只在 Android 平台支持，详见分享到朋友圈 (Beta)
   * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html
   */
  onShareTimeline() {
    const _this = this;
    return {
      title: _this.data.templet.share_title,
      path: '/pages/category/index?' + App.getShareUrlParams()
    };
  },

});