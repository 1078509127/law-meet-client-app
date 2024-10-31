//const api = require('../../../../../../miniprogram/projects/config/api.js');
var stratDate = new Date();
var start = stratDate.getFullYear() + "-" + (stratDate.getMonth() + 1) + "-" + stratDate.getDate();
Page({

	/**
	 * 页面的初始数据
	 */

	data: {
  
    st:new Date().getDate(),
    userName:"",//律师姓名
    phone:"",//手机号码
    inter_view_user:"", //会见人
    starDate:"",//预约日期
    start_time: "",//预约开始时间
    end_time: "",//预约结束时间
    add: "",//会见地点
    remark:""//备注

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

  },
  // 会见人
  getMeetingPeople:function(e){
    let thst =  this
    thst.setData({
      inter_view_user:e.detail.value
    })
  },
  //会见开始时间
  bindStart:function(e){
    let thst =  this
    thst.setData({
      start_time:e.detail.value
    })
  },
// 会见结束时间
bindEnd:function(e){
  let thst =  this
    thst.setData({
      end_time:e.detail.value
    })
},
//会见日期 
bindStartDate:function(e){
  let thst =  this
  thst.setData({
      starDate:e.detail.value
  })
},
// 会见地点
getAddressValue:function(e){
  let thst =  this
  thst.setData({
      Address:e.detail.value
  })
},
//说明
getRemarkValue:function(e){
  let thst =  this
  thst.setData({
    remark:e.detail.value
  })
},


//预约申请
  submitForm(e){
    var that = this;
    let formData = e.detail.value;
    var strTime = that.data.starDate+' '+that.data.start_time+":00"; 
    var endTime = that.data.starDate+' '+that.data.end_time+":00";// end时间
    var startDate = new Date(strTime)
    var endDate = new Date(endTime)

    formData.userName = e.detail.value.userName;//律师姓名
    formData.phone = e.detail.value.phone;// 律师手机号码
    //formData.starDate=that.data.starDate;// 日期
    formData.start_time = startDate;// sta 时间
    formData.end_time = endDate;// end时间
    formData.add = e.detail.value.add// 预约地址
    formData.remark = e.detail.value.remark;//备注
    formData.inter_view_user =e.detail.value.inter_view_user;// 会见人
    if(formData.userName == "" ){
      wx.showModal({
        title: '用户名不能为空',
        showCancel: false
      });
      return;
      }else if(formData.phone ==""){
        wx.showModal({
          title: '电话号不能为空',
          showCancel: false
        });
        return;
      }else if(formData.inter_view_user ==""){
        wx.showModal({
          title: '会见人不能为空',
          showCancel: false
        });
        return;
      }else if(that.data.starDate ==""){
        wx.showModal({
          title: '日期不能为空',
          showCancel: false
        });
        return;

    }else if(that.data.start_time==""){
      wx.showModal({
        title: '开始时间不能为空',
        showCancel: false
      });
      return;

    }else if(that.data.end_time==""){
      wx.showModal({
        title: '结束时间不能为空',
        showCancel: false
      });
      return;

    }else if(formData.add ==""){
        wx.showModal({
          title: '地址不能为空',
          showCancel: false
        });
        return;
      }
    //预约添加
    wx.request({
      url: 'http://localhost:8080/client/reserve/InsertReserveInfo', 
      method:'POST',
      data: 
        formData,
      header: {
        'Content-type': 'application/json' // 默认值
       //'content-type': 'application/x-www-form-urlencoded'
        
      },
      success (res) {
        console.log(res.data)
      }
    })
  } 
})
