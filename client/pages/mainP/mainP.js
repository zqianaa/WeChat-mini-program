//index.js
//获取应用实例
const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Topic:[],
    TopicAll: [],
    TopicCreate: [],
    TopicJoin: [],
    reserve:[],
    items: [
      { name: 'all', value: '全部话题', checked: true },
      { name: 'create', value: '我参与的话题', checked: false },
      { name: 'join', value: '我创建的话题', checked: false }
    ]
  },

  radioChange: function (e) {
    console.log(e.detail.value);
    var items = this.data.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].value == e.detail.value) {
        items[i].checked = true;
      }
      else {
        items[i].checked = false;
      }
    }
    this.setData({
      items: items
    })
    var TC = this.data.TopicCreate;
    var TJ = this.data.TopicJoin;
    var TA = this.data.TopicAll;
    
    if (e.detail.value == "我创建的话题") {
      
      this.setData({
        Topic: TC
      })
    }
    if (e.detail.value == "我参与的话题") {
      console.log("test")
      this.setData({
        Topic: TJ
      })
    }
    if (e.detail.value == "全部话题") {
      console.log("before",TA)
      this.setData({
        Topic: TA
      })
      console.log("after",this.data.Topic)
    }
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function (options) {
  var dataInfo = wx.getStorageSync('info')
  console.log(dataInfo)
  this.setData({
    userInfo:dataInfo
  })
  this.connectDB(this.data.userInfo.nickName);
  this.connectDB2(this.data.userInfo.nickName)
  },

  fuckThatShit:function() {
    var fuckyou = wx.getStorageSync('fuck2')
    this.setData({
      reserve: fuckyou
    })
    this.setData({
      Topic: this.data.reserve.data
    })
    this.setData({
      TopicAll: this.data.reserve.data
    })
    var allTopic = this.data.reserve.data;
    var joinTopic = []
    var createTopic = []
    for (var i = 0; i < allTopic.length; i++) {
      if (allTopic[i].isCreator == 1) {
        createTopic.push(allTopic[i])
      } else {
        joinTopic.push(allTopic[i])
      }
    }
    this.setData({
      TopicCreate: createTopic
    })
    this.setData({
      TopicJoin: joinTopic
    })
  },

  suo: function (e) {
    wx.navigateTo({
      url: '../searchP/searchP'
    })  
  },

  goToTopicCreateP: function (e) {
    var username = this.data.userInfo.nickName
    wx.navigateTo({
      url: '../topicCreateP/topicCreateP?username='+ username
    })
  },

  goToNext: function(e) {
    console.log(e)
    var lista = e.currentTarget.dataset.type.split(",")
    console.log(lista)
    if (lista[2] == 1) {
      wx.navigateTo({
        url: '../closeInfoP/closeInfoP?topicid=' +lista[1]
      })
    } else
    if(lista[0] == 1){
    wx.navigateTo({
      url:'../topicBSInfoP/topicBSInfoP?topicid=' +lista[1]
    })}
    else{
    wx.navigateTo({
      url:'../topicYNInfoP/topicYNInfoP?topicid=' +lista[1]
    })}
  },

  goToTopicSettingP:function(e) {
    console.log(e.currentTarget.dataset.listb)
    var listb = e.currentTarget.dataset.listb.split(",")
    console.log(listb)
    var key = listb[0] + "1";
    wx.setStorageSync(key,listb[1])
    wx.navigateTo({
      url: '../topicSettingP/topicSettingP?topicid=' + listb[0]
    })
  },

  getInfo: function (e) {
    this.setData({
      userInfo: e.detail.userInfo
    })
  },

  connectDB2:function (username) {
    var that = this
    qcloud.request({

      url: config.service.userTopicUrl,

      data: {
        userName:username
      },

      header: { "content-type": "application/json" },
      success: function (res) {
        console.log(res.data)
        wx.setStorageSync('fuck2', res)
        that.fuckThatShit();
      },
      
    })

  },

  connectDB: function (username) {
  var that = this
    qcloud.request({

      url: config.service.saveUserNameUrl,

  

      data: {
        userName:username
      },

      header: { "content-type": "application/json" },

      success: function (res) {

        console.log("this is usernameDB",res);

        console.log(res.data[0].username)
       
      }

    }) 
  }
})