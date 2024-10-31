var api = require('../../../../../config/api.js');
var util = require('../../../../../utils/util.js');
var user = require('../../../../../utils/user.js');
var FormData = require('../../../../../utils/formData.js');
Page({
  data: {
    name: '',
    phone: '',
    sex: '',
    image: '',
    idCard: '',
    wkCard: '',
    city: '',
    baDate: '',
    wkImage: '',
    sex_list: ["女", "男"],
    count: 3,
    tempFilePaths: [],
    starDate: "",
  },
  //会见日期 
  bindStartDate: function (e) {
    let thst = this
    thst.setData({
      baDate: e.detail.value
    })
  },
  //预览图片
  imgViwe: function () {
    var that = this;
    util.request(api.selSwiper, null, 'GET').then(res => {
      if (res.errno == 0) {
        that.setData({
          imgs: res.data.items
        })
      } else {
        wx.showModal({
          title: res.errmsg,
          icon: 'error',
          duration: 2000
        });
      }
    })
  },
  //选中图片
  chooseImage(e) {
    var sign = e.currentTarget.dataset.item
    if (sign == '最新照片') {
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          this.setData({
            image: res.tempFilePaths[0],
          });
        },
      });
    }
    if (sign == '职业资格证书') {
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          this.setData({
            wkImage: res.tempFilePaths[0],
          });
        },
      });
    }
  },
  // 删除图片
  deleteImage(e) {
    var sign = e.currentTarget.dataset.item
    if (sign == '最新照片') {
      this.setData({
        image: '',
      });
    }
    if (sign == '职业资格证书') {
      this.setData({
        wkImage: '',
      });
    }

  },
  //提交表单
  formSubmit(e) {
    var that = this
    const formData = new FormData();
    if (this.data.image) {
      formData.appendFile("file", this.data.image, "最新照片.jpg")
    }
    if (this.data.wkImage) {
      formData.appendFile("file", this.data.wkImage, "职业资格证书.jpg")
    }

    const form = e.detail.value
    formData.append("userId", wx.getStorageSync('userInfo').userId);
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("idCard", form.idCard);
    formData.append("wkCard", form.wkCard);
    formData.append("city", form.city);
    formData.append("sex", this.data.sex);
    formData.append("baDate", this.data.baDate);

    var data = formData.getData();
    wx.request({
      url: api.CertAdd,
      method: 'POST',
      data: data.buffer,
      header: {
        'content-Type': data.contentType,
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success(res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: "上传成功等待，等待认证",
            icon: 'success',
            duration: 2000
          });
          that.setData({
            name: '',phone: '',sex: '', image: '',idCard: '',wkCard: '', city: '',baDate: '',wkImage: '',
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'error',
            duration: 2000
          });
        }
      },
      fail(err) {
        console.log(err)
      }
    });
  },
  bindChange: function (e) {
    this.setData({
      sex: this.data.sex_list[e.detail.value]
    })
  },
  //查看个人信息
  getMyInfo(){
    var userInfo =  wx.getStorageSync('userInfo');
    util.request(api.CretSelect, {userId:userInfo.userId}, 'GET').then(res => {
      if (res.errno == 0) {
        that.setData({
          imgs: res.data.items
        })
      } else {
        wx.showModal({
          title: res.errmsg,
          icon: 'error',
          duration: 2000
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

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

  }
})