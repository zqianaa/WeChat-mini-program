Page({
  data:{
    userInfo:{}
  },
  
  getInfo: function (e) {
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo
    })
    console.log(this.data.userInfo);
    wx.setStorageSync('info', this.data.userInfo);
    wx.redirectTo({
      url: "../mainP/mainP?userInfo"
    })
  }
})