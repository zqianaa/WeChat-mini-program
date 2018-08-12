/**
 * @fileOverview 聊天室综合 Demo 示例
 */

const app = getApp()
var config = require('../../config')
var util = require('../../utils/util.js');
// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/wafer2-client-sdk/index');

// 引入配置
var config = require('../../config');

/**
 * 生成一条聊天室的消息的唯一 ID
 */
function msgUuid() {
    var timestamp = Date.parse(new Date());
    return 'msg-' + timestamp;
}

/**
 * 生成聊天室的系统消息
 */
function createSystemMessage(content) {
    return { id: msgUuid(), type: 'system', content };
}

/**
 * 生成聊天室的聊天消息
 */
function createUserMessage(content, user, isMe, isPos) {
    return { id: msgUuid(), type: 'speak', content, user, isMe, isPos };
}

// 声明聊天室页面
Page({

    /**
     * 聊天室使用到的数据，主要是消息集合以及当前输入框的文本
     */
    data: {
      messages: [],
      outputType: [
        { name: 'pos', value: '正方观点', checked: false },
        { name: 'all', value: '全部观点', checked: false },
        { name: 'neg', value: '反方观点', checked: false }
      ],
      inputType: [
        { name: 'pos', value: '输入正方观点', checked: true },
        { name: 'neg', value: '输入反方观点', checked: false }
      ],
        inputContent: '大家好啊',
        lastMessageId: 'none',
        isPos:1,
        isMe:1,
        content:"",
        userOpenId:0,
        msgID:"",
        opinionID:0,
        messagesPos:[],
        messagesNeg:[],
        position:2
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
      if (e.detail.value == "输入正方观点") {
        this.setData({
          isPos:1
        })
      } else {
        this.setData({
          isPos:0
        })
      }
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
      var key = this.data.opinionID + "2"
      if (e.detail.value == "正方观点") {
        wx.setStorageSync(key, 1)
      } else if(e.detail.value == "反方观点") {
        wx.setStorageSync(key, 0)
      } else {
        wx.setStorageSync(key, 2)
      }
      wx.redirectTo({
        url:'../chat/chat?opinionid=' + this.data.opinionID
      })
    },

    onLoad:function(options) {
      if (options.opinionid!=null) {
        this.setData({
          opinionID:options.opinionid
        })
      } else {
        this.setData({
          opinionID:options.topicid
        })
      }
        var key = this.data.opinionID + "2"
        this.setData({
          position:wx.getStorageSync(key)
        })
        this.connectDB1()
    },

    /**
     * 页面渲染完成后，启动聊天室
     * */
    onReady() {
        wx.setNavigationBarTitle({ title: '聊天室' });

        if (!this.pageReady) {
            this.pageReady = true;
            this.enter();
        }
    },

    /**
     * 后续后台切换回前台的时候，也要重新启动聊天室
     */
    onShow() {
        if (this.pageReady) {
            this.enter();
        }
    },

    /**
     * 页面卸载时，退出聊天室
     */
    onUnload() {
        this.quit();
    },

    /**
     * 页面切换到后台运行时，退出聊天室
     */
    onHide() {
        this.quit();
    },

    /**
     * 启动聊天室
     */
    enter() {
        //this.pushMessage(createSystemMessage('正在登录...'));

        // 如果登录过，会记录当前用户在 this.me 上
        if (!this.me) {
            qcloud.request({
                url: config.service.requestUrl,
                login: true,
                success: (response) => {
                    this.me = response.data.data;
                    console.log("mark", this.me)
                    this.connect();
                }
            });
        } else {
            this.connect();
        }
    },

    /**
     * 连接到聊天室信道服务
     */
    connect() {
        // 避免重复创建信道
        var that = this
        if (this.tunnel && this.tunnel.isActive()) return;

        this.pushMessage(createSystemMessage('正在加入群聊...'));

        // 创建信道
        var tunnel = this.tunnel = new qcloud.Tunnel(config.service.tunnelUrl);

        // 连接成功后，去掉「正在加入群聊」的系统提示
        tunnel.on('connect', () => this.popMessage());

        // 聊天室有人加入或退出，反馈到 UI 上
        tunnel.on('people', people => {
            const { total, enter, leave } = people;

            if (enter) {
                this.pushMessage(createSystemMessage(`${enter.nickName}已加入群聊，当前共 ${total} 人`));
            } else {
                this.pushMessage(createSystemMessage(`${leave.nickName}已退出群聊，当前共 ${total} 人`));
            }
        });
        // 有人说话，创建一条消息
        tunnel.on('speak', speak => {
            const { word, who } = speak;
            console.log(who)
            this.pushMessage(createUserMessage(word, who, who.openId === this.me.openId, this.data.isPos));
        });

        // 信道关闭后，显示退出群聊
        tunnel.on('close', () => {
            this.pushMessage(createSystemMessage('您已退出群聊'));
        });

        // 重连提醒
        tunnel.on('reconnecting', () => {
            this.pushMessage(createSystemMessage('已断线，正在重连...'));
        });

        tunnel.on('reconnect', () => {
            this.amendMessage(createSystemMessage('重连成功'));
        });

        // 打开信道
        tunnel.open();
    },

    /**
     * 退出聊天室
     */
    quit() {
        if (this.tunnel) {
            this.tunnel.close();
        }
    },

    /**
     * 通用更新当前消息集合的方法
     */
    updateMessages(updater) {
        var messages = this.data.messages;
        updater(messages);

        this.setData({ messages });

        // 需要先更新 messagess 数据后再设置滚动位置，否则不能生效
        var lastMessageId = messages.length ? messages[messages.length-1].id : 'none';
        console.log("2",messages)
        this.setData({ lastMessageId });
    },

    /**
     * 追加一条消息
     */
    pushMessage(message) {
        if (message.user != null) {
          console.log("3",message.user.openId)
          this.setData({
            content:message.content
          })
          this.setData({
            userOpenId:message.user.openId
          })
          if (message.isMe) {
          this.setData({
            isMe:1
          })
          } else {
            this.setData({
              isMe: 0
            })
          }
          if (message.isPos) {
            this.setData({
              isPos: 1
            })
          } else {
            this.setData({
              isPos: 0
            })
          }
          this.setData({
            msgID:message.id
          })
          this.connectDB2()
        }

        this.updateMessages(messages => messages.push(message));
    },

    /**
     * 替换上一条消息
     */
    amendMessage(message) {
      console.log("step",message)
        this.updateMessages(messages => messages.splice(-1, 1, message));
    },

    /**
     * 删除上一条消息
     */
    popMessage() {
        console.log("step2")
        this.updateMessages(messages => messages.pop());
    },

    /**
     * 用户输入的内容改变之后
     */
    changeInputContent(e) {
        this.setData({ inputContent: e.detail.value });
    },

    /**
     * 点击「发送」按钮，通过信道推送消息到服务器
     **/
    sendMessage(e) {
        // 信道当前不可用
        if (!this.tunnel || !this.tunnel.isActive()) {
            this.pushMessage(createSystemMessage('您还没有加入群聊，请稍后重试'));
            if (!this.tunnel || this.tunnel.isClosed()) {
                this.enter();
            }
            return;
        }

        setTimeout(() => {
            if (this.data.inputContent && this.tunnel) {
                this.tunnel.emit('speak', { word: this.data.inputContent });
                this.setData({ inputContent: '' });
            }
        });
    },

    connectDB2: function () {
      var that = this
      console.log(that.data.opinionID)
      console.log(that.data.isPos)
      console.log(that.data.isMe)
      console.log(that.data.content)
      console.log(that.data.msgID)
      console.log(that.data.userOpenId)
      qcloud.request({
        url: config.service.uploadMsg,
      data: {
          opinionID:that.data.opinionID,
          isPos:that.data.isPos,
          isMe:that.data.isMe,
          content:that.data.content,
          msgID:that.data.msgID,
          userOpenID: that.data.userOpenId
        },
        header: { "content-type": "application/json" },
        success: function (res) {
          console.log("test", res);
        }
      
      });
    },

    connectDB1: function () {
      var that = this
      qcloud.request({
        url: config.service.downloadMsgUrl,
        data: {
          opinionID:that.data.opinionID
        },
        header: { "content-type": "application/json" },
        success: function (res) {
          console.log("test", res);
          if (res.data[0] != null) {
          console.log("test")
          var temp = res.data
          var postemp = []
          var negtemp = []
          for (var i = 0;i < temp.length;i++) {
            var jsonstr = temp[i].user
            var jsonobj = JSON.parse(jsonstr)
            temp[i].user = jsonobj
            if (temp[i].isMe == 1) {
              temp[i].isMe = true;
            } else {
              temp[i].isMe = false;
            }
            if (temp[i].isPos == 1) {
              temp[i].isPos = true;
              postemp.push(temp[i])
            } else {
              temp[i].isPos = false;
              negtemp.push(temp[i])
            }
          }
          console.log(temp)
          console.log(postemp)
          console.log(negtemp)
          var tempoutput = that.data.outputType
          if (that.data.position == 2) {
          tempoutput[1].checked = true;
          that.setData({
            messages:temp
          })
          } else if (that.data.position == 1) {
            tempoutput[0].checked = true;
          that.setData({
            messages:postemp
          })
          } else {
            tempoutput[2].checked = true;
          that.setData({
            messages:negtemp
          })
          }
          that.setData({
            outputType:tempoutput
          })
          console.log(temp[0].user)
        }
        }
      });
    },
});
  