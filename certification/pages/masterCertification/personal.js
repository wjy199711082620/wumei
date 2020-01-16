// certification/pages/masterCertification/personal.js
const app = getApp();
let globalData = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    isClick:true,

  },
  saveInfo: function (e) {
    this.setData({
      value: e.detail.value
    })
    // globalData.addTechnology.personalIntroduce = e.detail.value;
    // console.log(globalData.addTechnology.personalIntroduce)
    // wx.navigateTo({
    //   url: '/certification/pages/masterCertification/case',
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  },
  saveGlobal:function(e){
    if (this.data.value){
      globalData.addTechnology.personalIntroduce = this.data.value;
    }
    // console.log(globalData.addTechnology.personalIntroduce)
    // console.log(globalData.addTechnology)
    this.setData({
      isClick: false
    })
    wx.navigateTo({
      url: '/certification/pages/masterCertification/case',
    })
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