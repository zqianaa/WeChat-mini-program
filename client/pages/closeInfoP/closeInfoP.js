const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js');
Page({
  data:{
    topicName:"topic1",
    topicCreator:"俊_泽",
    startDate:"2018.06.01",
    endDate:"2018.06.10",
    topicDes:"这是话题描述",
    chosenOpinion:"这是被选择的观点（如果是YS就是是或否）",
    topicSum:"这是关闭是输入的总结",
    topicID:0,
    topicType:0
  },

  onLoad:function(options) {
    this.setData({
      topicID:options.topicid
    })
    this.connectDB1(options.topicid)
  },

  connectDB1: function (topicid) {
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
          topicDes: res.data[0].topicdes
        })
        that.setData({
          topicCreator: res.data[0].topicCreator
        })
        that.setData({
          startDate: res.data[0].startdate
        })
        if (res.data[0].enddate != null) {
          that.setData({
            endDate: res.data[0].enddate
          })
        } else {
          that.setData({
            endDate: ''
          })
        }
        that.setData({
          topicType: res.data[0].topictype
        })
        that.setData({
          topicSum:res.data[0].topicremark
        })
        that.connectDB2(that.data.topicID)
      }
    })
  },

  connectDB2: function (topicid) {
    var that = this
    console.log(topicid)
    console.log(that.data.topicType)
    qcloud.request({
      url: config.service.getTopicOpinionInfoUrl,
      data: {
        topicID: topicid,
        isClose: 1,
        topicType: that.data.topicType
      },
      header: { "content-type": "application/json" },
      success: function (res) {
        console.log("test", res);
        that.setData({
          chosenOpinion:res.data[0].opinionname
        })
      }
    })
  },
})