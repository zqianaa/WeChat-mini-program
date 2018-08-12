const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js');
Page({
  data:{
    opinionName:"opinion name",
    opinionID:0,
    showView: false,
    description:'description1',
  },

  recreate:function() {
    wx.setStorageSync('opinionIsUpdate', true)
    wx.navigateTo({
      url: '../opinionCreateP/opinionCreateP?opinionid=' +this.data.opinionID
    })
  },
 
  onLoad: function (options) {
    // 生命周期函数--监听页面加载 
    showView: (options.showView == "true" ? true : false)
    this.setData({
      opinionID:options.opinionid
    })
    this.connectDB1(options.opinionid)
  }, 
  
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  }, 

  connectDB1: function (opinionid) {
    var that = this
    qcloud.request({
      url: config.service.getOpinionDesUrl,
      data: {
        opinionID: opinionid
      },
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log(res);
        that.setData({
          opinionName:res.data[0].opinionname
        })
        that.setData({
          description:res.data[0].opiniondes
        })
      }
    })
  },

})