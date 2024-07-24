const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
    newsCateArr:[
      {label:"预约申请",val:"1",url:"/projects/house/pages/default/form/index"},
      {label:"审核查询",val:"2",url:"/projects/house/pages/default/search/index"},
     ],
     meetTypeArr:[
      {label:"认证中心",val:"1",url:"/projects/house/pages/default/auth/index"},
      {label:"会见流程",val:"2",url:"/projects/house/pages/default/process/index"},
      // {label:"认证中心",val:"3"},
      // {label:"婚姻登记",val:"4"},
      // {label:"职业资格",val:"5"},
      // {label:"职业资格",val:"5"},
      // {label:"行驶驾驶",val:"7"},
      // {label:"婚姻登记",val:"8"},
      // {label:"职业资格",val:"9"},
      // {label:"行政缴费",val:"10"},
     ]
	},
  url: async function (e) {
    console.log(e.currentTarget.dataset.url)
		wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);
	},

	_loadList: async function () {
		let opts = {
			title: 'bar'
		}
		await cloudHelper.callCloudSumbit('home/list', {}, opts).then(res => {
			let newsList = [];
			for (let k = 0; k < res.data.length; k++) {
				if (res.data[k].type == 'news' && res.data[k].cateId == 1)
					newsList.push(res.data[k]);
			}

			this.setData({
				newsList,
				dataList: res.data
			});

		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {
		PassportBiz.loginSilence(this);
		this._loadList();
	},

	onPullDownRefresh: async function () {
		await this._loadList();
		wx.stopPullDownRefresh();
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},


	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
})