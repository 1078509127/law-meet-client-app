var util = require('../../../../../utils/util.js');
var api = require('../../../../../config/api.js');
var user = require('../../../../../utils/user.js');
var app = getApp();

Page({
  data: {
    userInfo: {},
    hasLogin: false,
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {},
  onShow: function() {
    if (app.globalData.hasLogin) {
      let userInfo = wx.getStorageSync('userInfo');
      this.setData({
        userInfo: userInfo,
        hasLogin: true
      });
    }
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  //登录
  goLogin() {
    if (!this.data.hasLogin) {
      wx.navigateTo({
        url: "/projects/house/pages/auth/login/login"
      });
    }
  },
  redirect(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
  },
  bindSetTap: function (e, skin) {
		let itemList = ['清除缓存'];
		wx.showActionSheet({
			itemList,
			success: async res => {
				let idx = res.tapIndex;
				if (idx == 0) {
					cacheHelper.clear();
					pageHelper.showNoneToast('清除缓存成功');
				}
				if (idx == 1) {
					if (setting.IS_SUB) {
						AdminBiz.adminLogin(this, 'admin', '123456');
					} else {
						wx.reLaunch({
							url: '../../admin/index/login/admin_login',
						});
					}
				}
			},
			fail: function (res) { }
		})
	}
})