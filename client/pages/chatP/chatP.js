const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js');
Page({
  data:{
    messages:[
      {id:'msg-1',type:'system',content:'这是一条系统信息'},
      { id: 'msg-2', type: 'speak', content: '我发的反方信息', user: { nickName: '用户Aa1', avatarUrl: '../images/userAa1.png' },isMe:true,isPos:false},
      { id: 'msg-3', type: 'speak', content: '我发的正方信息', user: { nickName: '用户Aa2', avatarUrl: '../images/userAa2.png' }, isMe: true, isPos: true },
      { id: 'msg-4', type: 'speak', content: '别人发的反方信息', user: { nickName: '用户Bb1', avatarUrl: '../images/userBb1.png' }, isMe: false, isPos: false },
      { id: 'msg-5', type: 'speak', content: '别人发的正发信息', user: { nickName: '用户Bb2', avatarUrl: '../images/userBb2.png' }, isMe: false, isPos: true },
      { id: 'msg-6', type: 'speak', content: '别人发的正发信息', user: { nickName: '用户Bb2', avatarUrl: '../images/userBb2.png' }, isMe: false, isPos: true },
      { id: 'msg-7', type: 'speak', content: '别人发的正发信息', user: { nickName: '用户Bb2', avatarUrl: '../images/userBb2.png' }, isMe: false, isPos: true },
      { id: 'msg-8', type: 'speak', content: '别人发的正发信息', user: { nickName: '用户Bb2', avatarUrl: '../images/userBb2.png' }, isMe: false, isPos: true },
      { id: 'msg-9', type: 'speak', content: '别人发的正发信息', user: { nickName: '用户Bb2', avatarUrl: '../images/userBb2.png' }, isMe: false, isPos: true },
      { id: 'msg-10', type: 'speak', content: '别人发的正发信息', user: { nickName: '用户Bb2', avatarUrl: '../images/userBb2.png' }, isMe: false, isPos: true },
      { id: 'msg-11', type: 'speak', content: '别人发的正发信息', user: { nickName: '用户Bb2', avatarUrl: '../images/userBb2.png' }, isMe: false, isPos: true },
    ],
    outputType:[
      {name:'pos',value:'正方观点',checked:false},
      { name: 'all', value: '全部观点', checked: true },
      { name: 'neg', value: '反方观点', checked: false}
    ],
    inputType: [
      { name: 'pos', value: '输入正方观点', checked: true },
      { name: 'neg', value: '输入反方观点', checked: false }
    ],
  },
  inputTypeChange: function (e) {
    console.log(e.detail.value);
    var inputType = this.data.inputType;
    for (var i = 0; i < inputType.length; i++) {
      if (inputType[i].value == e.detail.value) {
        inputType[i].checked = true;
      }
      else {
        inputType[i].checked = false;
      }
    }
    this.setData({
      inputType: inputType
    })
  },
  outputTypeChange: function (e) {
    console.log(e.detail.value);
    var outputType = this.data.outputType;
    for (var i = 0; i < outputType.length; i++) {
      if (outputType[i].value == e.detail.value) {
        outputType[i].checked = true;
      }
      else {
        outputType[i].checked = false;
      }
    }
    this.setData({
      outputType: outputType
    })
  }
})