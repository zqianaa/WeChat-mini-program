const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js');
Page({
  data:{
    topicName: "topic 2",
    creator: "俊_泽",
    des: "this is a Y/N topic",
    startDate: "2018.06.01",
    endDate: "2018.06.10",
    url:'',
    topicID:0
  },
  goToChatP: function (e) {
    var key = this.data.topicID + "2"
    wx.setStorageSync(key, 2)
    wx.navigateTo({
      url: '../chat/chat?topicid=' + this.data.topicID
    })
  },

  onLoad: function (options) {
    this.setData({
      topicID:options.topicid
    })
    var pages = getCurrentPages()
    var currentPage = pages[pages.length - 1]
    var url = currentPage.route
    this.setData({
      url: url
    })
    console.log(url)
    this.connectDB1(options.topicid)
  },

  onShareAppMessage: function () {
    return {
      title: '决策速',
      path: '/page/user?id=123'
    }
  },

  goToMainP: function () {
    wx.navigateTo({
      url: '../mainP/mainP'
    })
  },

  connectDB1: function (topicid) {
    console.log(topicid)
    var that = this
    qcloud.request({
      url: config.service.getTopicBasicInfoUrl,
      data: {
        topicID: topicid
      },
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log("test", res);
        that.setData({
          topicName: res.data[0].topicname
        })
        that.setData({
          creator: res.data[0].topicCreator
        })
        that.setData({
          des: res.data[0].topicdes
        })
        that.setData({
          startDate: res.data[0].startdate
        })
        if (res.data[0].enddate == null) {
          that.setData({
            endDate: ''
          })
        } else {
          that.setData({
            endDate: res.data[0].enddate
          })
        }
      }
    })
  },
})