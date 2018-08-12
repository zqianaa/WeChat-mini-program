const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js');
Page({
  data:{
    topicName:"topic 1",
    creator:"琴瑟在御莫不静好",
    des:"this is a brainstorm topic",
    startDate:"",
    endDate:"2018.06.10",
    opinionArray:[],
    url:'',
    topicID:0,
    isClose:0,
    topicType:0
  },

  onLoad:function(options){
    console.log(options.topicid)
    this.setData({
      topicID:options.topicid
    })
    console.log(options.topicid)
    var pages = getCurrentPages()
    var currentPage = pages[pages.length - 1]
    var url = currentPage.route
    this.setData({
      url:url
    })
    console.log(url)
    this.connectDB1(this.data.topicID)
  },

  goToChatP: function(e){
    var key = e.currentTarget.dataset.opinionid + "2"
    wx.setStorageSync(key, 2)
    wx.navigateTo({
      url:'../chat/chat?opinionid='+e.currentTarget.dataset.opinionid
    })
  },

  goToOpinionSettingP: function(e){
    console.log(e.currentTarget.dataset.opinionid)
    wx.setStorageSync(e.currentTarget.dataset.opinionid, this.data.topicID)
    wx.navigateTo({
      url:'../opinionSettingP/opinionSettingP?opinionid=' + e.currentTarget.dataset.opinionid
    })
  },

  goToOpinionCreateP: function (e) {
    console.log(this.data.topicID)
    wx.navigateTo({
      url: '../opinionCreateP/opinionCreateP?topicid=' + this.data.topicID
    })
  },

  onShareAppMessage: function () {
    return {
      title: '决策速',
      path: this.data.url
    }
  },

  goToMainP:function(){
    wx.navigateTo({
      url: '../mainP/mainP'
    })
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
        console.log("test",res);
        that.setData({
          topicName:res.data[0].topicname
        })
        that.setData({
          des:res.data[0].topicdes
        })
        that.setData({
          creator:res.data[0].topicCreator
        })
        that.setData({
          startDate:res.data[0].startdate
        })
        if (res.data[0].enddate != null) {
        that.setData({
          endDate:res.data[0].enddate
        })
        } else {
          that.setData({
            endDate:''
          })
        }
        that.setData({
          topicType:res.data[0].topictype
        })
        that.setData({
          isClose:res.data[0].isClose
        })
        that.connectDB2(that.data.topicID)
      }
    })
  },

   connectDB2: function (topicid) {
     var that = this
     console.log(that.data.isClose)
     console.log(topicid)
     console.log(that.data.topicType)
     qcloud.request({
       url: config.service.getTopicOpinionInfoUrl,
       data: {
         topicID:topicid,
         isClose:that.data.isClose,
         topicType:that.data.topicType
       },
       header: { "content-type": "application/json" },
       success: function (res) {
         console.log("test", res);
         that.setData({
           opinionArray:res.data
         })
       }
     })
   },
})