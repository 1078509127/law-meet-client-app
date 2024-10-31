var api = require('../../../../../config/api.js');
var util = require('../../../../../utils/util.js');
var user = require('../../../../../utils/user.js');

var app = getApp();
Page({
  data: {
    username: '',
    password: '',
    isDisabled: true,
    code: '',
    loginErrorCount: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
  /**相关协议 法律文件 */
  bindAgreeChange: function (e) {
    this.setData({
      isDisabled: !e.detail.value.includes('true'),
    })
  },

  accountLogin: function () {
    var that = this;
    if(this.data.isDisabled){
      wx.showToast({
        title: '请先勾选服务条款',
        icon: 'error',
        duration: 600 
      })
      return;
    }
    if (this.data.password.length < 1 || this.data.username.length < 1) {
      wx.showModal({
        title: '错误信息',
        content: '请输入正确的用户名和密码',
        showCancel: false
      });
      return false;
    }

    wx.request({
      url: api.AuthLoginByAccount,
      data: {
        userName: that.data.username,
        passWord: that.data.password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(() => {
            that.setData({
              loginErrorCount: 0
            });
            app.globalData.hasLogin = true;
            wx.setStorageSync('userInfo', res.data.data.userInfo);
            wx.setStorage({
              key: "token",
              data: res.data.data.token,
              success: function () {
                wx.switchTab({
                  url: '/projects/house/pages/my/index/my_index'
                });
              }
            });
          }, 1000)
        } else {
          console.log(res)
          that.setData({
            loginErrorCount: that.data.loginErrorCount + 1
          });
          app.globalData.hasLogin = false;
          util.showErrorToast(res.data.errmsg);
        }
      }
    });
  },
  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  bindCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    });
  },
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
})