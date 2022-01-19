// pages/user/dingdang/index.js
let App = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        order_id:"",
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
        
       
    },
    shuru(event){
        let _this = this;
        let detail = event.detail.value
        console.log(detail)
        _this.setData({
            order_id: detail
        })
    },
    /**
     * 提交订单
    */
    tijiaoorder: function () {
        if(this.data.order_id == "") {
            App.showSuccess('请输入订单号');
            return
        }
        let _this = this;
        App._post_form('tok.getorder/info', {
            order_id: this.data.order_id
        }, function (result) {
            console.log(result)
            App.showSuccess(result.msg);
            _this.setData({
                order_id:"",
            });
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