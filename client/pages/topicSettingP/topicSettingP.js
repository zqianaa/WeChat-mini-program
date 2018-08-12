const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Page({
  data:{
    topicName:"topic name",
    showView: false,
    description:'description2',
    topicID:''
  },
  
  recreateTopic: function () {
    wx.setStorageSync('isUpdate', true)
    wx.navigateTo({
      url: '../topicCreateP/topicCreateP?topicid=' + this.data.topicID
    })
  },

  goToCloseTopicP:function(e){
    wx.navigateTo({
      url:"../closeTopicP/closeTopicP?topicid=" + this.data.topicID
    })
  },

  onLoad: function (options) {
    // 生命周期函数--监听页面加载 
    showView: (options.showView == "true" ? true : false)
    console.log("options",options.topicid)
    this.setData({
      topicID:options.topicid
    })
    this.connectDB1(this.data.topicID)
  },

  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  }, 

  quitTopic:function() {
    this.connectDB2(this.data.topicID)
  },

  connectDB1: function (topicid) {
    var that = this
    qcloud.request({
      url: config.service.getTopicDesUrl,
      data: {
        topicID:topicid
      },
      header: { "content-type": "application/json" },
      success: function (res) {
      console.log(res);
      that.setData({
        description:res.data[0].topicdes
      })
      console.log(res.data[0].username)
      }
    })
  },

  connectDB2: function (topicid) {
    qcloud.request({
      url: config.service.leaveTopicUrl,
      data: {
        topicID: topicid,
        userName: wx.getStorageSync('info').nickName
      },
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log(res);
        console.log(res.data[0].username)
        wx.redirectTo({
          url: '../mainP/mainP',
        })
      }
    })
  }


})