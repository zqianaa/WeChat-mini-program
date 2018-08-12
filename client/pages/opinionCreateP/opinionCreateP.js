const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js');
Page({
  data:{
    'opinionName': '',
    'description': '',
    'opinionID':0,
    'topicID':0,
  },

  onLoad:function(options) {
    if (options.topicid != null) {
    this.setData({
      topicID:options.topicid
    })
    } else {
      this.setData({
        topicID: wx.getStorageSync(options.opinionid)
      })      
    }
    if (options.opinionid != null) {
      this.setData({
        opinionID:options.opinionid
      })
    } else {
      var timestamp = Date.parse(new Date());
      console.log(timestamp)
      this.setData({
        opinionID:timestamp
      })
    }
    console.log(this.data.opinionID)
  },

  listenerDescriptionInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      description: e.detail.value
    })
  },

  listenerPhoneInput: function (e) {
    console.log(e.detail.value);
    this.setData({
      opinionName: e.detail.value
    })
  },

  finishButton: function () {
    if (wx.getStorageSync('opinionIsUpdate')) {
      this.connectDB2(this.data.opinionID)
    } else {
      this.connectDB1(this.data.topicID)
    }
  },

connectDB1: function (topicid) {
  var that = this
  console.log(topicid)
  console.log(that.data.opinionID)
  console.log(that.data.opinionName)
  console.log(that.data.description)
  console.log(wx.getStorageSync('info').nickName)
  qcloud.request({
      url: config.service.createOpinionUrl,
      data: {
        topicID: topicid,
        opinionID:that.data.opinionID,
        opinionName:that.data.opinionName,
        opinionDes:that.data.description,
        creatorName:wx.getStorageSync('info').nickName
      },
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log(res);
        console.log(that.data.topicID)
        wx.redirectTo({
          url: '../topicBSInfoP/topicBSInfoP?topicid=' + that.data.topicID
        })
      }
    })
  },

connectDB2: function (opinionid) {
  var that = this
  console.log(opinionid)
  console.log(that.data.opinionName)
  console.log(that.data.description)
  qcloud.request({
    url: config.service.updateOpinionInfoUrl,
    data: {
      opinionID: opinionid,
      opinionName: that.data.opinionName,
      opinionDes: that.data.description,
    },
    header: { "content-type": "application/json" },
    success: function (res) {
      console.log(res);
      wx.setStorageSync('opinionIsUpdate', false)
      wx.redirectTo({
        url: '../topicBSInfoP/topicBSInfoP?topicid=' + that.data.topicID
      })
    }
  })
},
})