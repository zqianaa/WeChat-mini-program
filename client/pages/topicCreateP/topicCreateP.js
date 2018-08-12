const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js');
Page({
  data: {
    array: ["正反讨论", "头脑风暴" ],
    'index': 0,
    'topicName':'',
    'description':'',
    'topicId':0,
    'Date': util.formatTime(new Date),
    'username':''
  },
  
  listenerDescriptionInput:function(e) {
    console.log(e.detail.value);
    this.setData({
      description:e.detail.value
    })
  },

  onLoad:function(options){
    this.setData({
      username: wx.getStorageSync('info').nickName
    })
    if (options.topicid != null) {
      this.setData({
        topicId:options.topicid
      })
      console.log(options.topicid)
    } else {
      var timestamp = Date.parse(new Date());
      this.setData({
        topicId:timestamp
      })
    }
    console.log(this.data.topicId)
    console.log(this.data.Date)
  },

  listenerPhoneInput:function(e) {
    console.log(e.detail.value);
    this.setData({
      topicName: e.detail.value
    })
  },

  listenerPickerSelected: function (e) {
    this.setData({
      index: e.detail.value
    });
    console.log(e.detail.value)
  }, 

  finishButton:function() {
    if (!wx.getStorageSync('isUpdate')) {
      this.connectDB();
    } else {
      console.log("this is connectDB2")
      this.connectDB2();
    }
  },

  connectDB: function () {
    var that = this
    qcloud.request({

      url: config.service.createTopicUrl,

      data: {
        topicName:this.data.topicName,
        topicDes:this.data.description,
        topicType:this.data.index,
        topicID:this.data.topicId,
        userName:this.data.username,
        startDate:this.data.Date
      },

      header: { "content-type": "application/json" },

      success: function (res) {

        console.log("this is DB1",res);

        //console.log(res.data[0].username)
        wx.redirectTo({
          url: '../mainP/mainP'
        })
      }

    })
  },

  connectDB2: function () {
    console.log("this is topic id in DB2",this.data.topicID)
    qcloud.request({

      url: config.service.updateTopicInfoUrl,

      data: {
        topicName: this.data.topicName,
        topicDes: this.data.description,
        topicType: this.data.index,
        topicID: this.data.topicId,
      },

      header: { "content-type": "application/json" },

      success: function (res) {

        console.log("this is DB2 res",res);

        console.log(res.data[0].username)

        wx.setStorageSync('isUpdate', false)

        wx.redirectTo({
          url: '../mainP/mainP'
        })

      }

    })
  }
})