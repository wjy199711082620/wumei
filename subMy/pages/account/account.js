// pages/account/account.js
const WXAPI = require('../../wxapi/main')
Page({

  /**
   * 页面的初始数据
   */
  data: {


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    WXAPI.getAccount().then(function (res) {
      
    })
  },

  toWithdrawrecord:function(){
    wx.navigateTo({
      url: '/subShopping/pages/withdrawrecord/withdrawrecord',
    })
  },

  toCashout:function(){
    wx.navigateTo({
      url: '/subShopping/pages/cashout/cashout',
    })
  },

  toBill:function(){
    wx.navigateTo({
      url: '/subShopping/pages/bill/bill',
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