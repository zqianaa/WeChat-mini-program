var util = require('../../utils/util.js');
const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
Page({
  data:{
    topicName:"topic name",
    topicID:0,
    closeDate:util.formatTime(new Date),
    closeTopicDes:'',
    items:[],
    opinionID:0,
    topicType:0
    //item array需要包含该话题的观点
  },

  onLoad:function(options) {
    console.log(options.topicid)
    var key = options.topicid + "1"
    var temp = [{opinionid:1,opinionname:"Yes"},{opinionid:0,opinionname:"No"}]
    console.log(wx.getStorageSync(key))
    this.setData({
      topicType:wx.getStorageSync(key)
    })
    this.setData({
      topicID:options.topicid
    })
    if (this.data.topicType==1) {
      this.connectDB2(options.topicid)
    } else {
      this.setData({
        items:temp
      })
    }
  },

  radioChange:function(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      opinionID:e.detail.value
    })
  },

  listenerDesInput:function(e){
    this.data.closeTopicDes=e.detail.value;
  },
  //this function should change the topic's closeTopicDes according to what user inputs
  listenerClose:function(e){
    this.connectDB1()
  },

  connectDB1: function () {
    var that = this
    console.log(that.data.topicID)
    console.log(that.data.opinionID)
    console.log(that.data.closeDate)
    console.log(that.data.closeTopicDes)
    console.log(that.data.topicType)
    qcloud.request({
      url: config.service.closeTopicUrl,
      data: {
        topicID: that.data.topicID,
        opinionID:that.data.opinionID,
        endDate:that.data.closeDate,
        topicRemark:that.data.closeTopicDes,
        topicType:that.data.topicType,
        yesNo:that.data.opinionID
      },
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log("test", res);
        wx.navigateTo({
          url: "../mainP/mainP"
        })
      }
    })
  },

  connectDB2: function (topicid) {
    var that = this
    qcloud.request({
      url: config.service.getTopicOpinionInfoUrl,
      data: {
        topicID: topicid,
        topicType:that.data.topicType,
        isClose:0
      },
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log("test", res);
        that.setData({
          items:res.data
        })
      }
    })
  },


  //this funtion should jump back to mainP and change the topicState to close
})