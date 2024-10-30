// projects/house/pages/default/auth/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
    sex:'',
    sex_list:["女","男"],
    //sex_list:['男','女'],
    imgs: [],
    count: 3,
    tempFilePaths:[],
    starDate:"",
    
    // sex_list:[
    //   {
    //     id: 5,
    //     sex_name: "男"
    //   },{
    //     id: 10,
    //     sex_name: "女"
    //   }
    // ],

  },
  //会见日期 
bindStartDate:function(e){
  let thst =  this
  thst.setData({
      starDate:e.detail.value
  })
},
  //查看图片
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
  //上传图片
  bindUpload: function (e) {
    switch (this.data.imgs.length) {
      case 0:
        this.data.count = 3
        break
      case 1:
        this.data.count = 2
        break
      case 2:
        this.data.count = 1
        break
    }
    var that = this
    //wx.chooseMedia
    wx.chooseImage({
      count: that.data.count, // 默认3
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        // for (var i = 0; i < tempFilePaths.length; i++) {
        //   that.data.imgs.push({url:tempFilePaths[i]})
        //   that.data.tempFilePaths.push(tempFilePaths[i])
        // }
        // that.setData({ imgs: that.data.imgs })
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: api.creSwiper,
            filePath: tempFilePaths[i],
            name: "file",
            header: {
              "content-type": "multipart/form-data",
              'X-Dts-Admin-Token': wx.getStorageSync('X-Dts-Admin-Token')
            },
            success: function (res) {
              if (res.statusCode == 200) {
                wx.showToast({
                  title: "上传成功",
                  icon: "none",
                  duration: 1500
                })
                that.data.imgs.push(JSON.parse(res.data).data)
                that.setData({
                  imgs: that.data.imgs
                })
              }
            },
            fail: function (err) {
              wx.showToast({
                title: "上传失败",
                icon: "none",
                duration: 2000
              })
            },
            complete: function (result) {console.log(result.errMsg) }
          })
        }
      },
      fail: (res) => {
        console.log(res)
       }
    })
  },
  // 删除图片
  deleteImg: function (e) {
    var img = e.currentTarget.dataset.item
    var that = this
    wx.showModal({
      title: "提示",
      content: "是否删除",
      success: function (res) {
        if (res.confirm) {
          util.request(api.delSwiper, img, 'POST').then(res => {
            if (res.errno == 0) {
              that.imgViwe()
              wx.showToast({
                title: "删除成功",
                icon: "none",
                duration: 1500
              })
            } else {
              wx.showModal({
                title: res.errmsg,
                icon: 'error',
                duration: 2000
              });
            }
          })
        }
      },
      fail:function(err){}
    })
  },

  //上传按钮
  btn:function(){
    console.log(this.data.tempFilePaths)
    for (var i = 0; i < this.data.tempFilePaths.length; i++) {
      wx.uploadFile({
        url: api.creSwiper,
        filePath: this.data.tempFilePaths[i],
        name: "file",
        header: {
          "content-type": "multipart/form-data",
          'X-Dts-Admin-Token': wx.getStorageSync('X-Dts-Admin-Token')
        },
        success: function (res) {
          if (res.statusCode == 200) {
            wx.showToast({
              title: "上传成功",
              icon: "none",
              duration: 1500
            })
            that.data.imgs.push(JSON.parse(res.data).data)
            that.setData({
              imgs: that.data.imgs
            })
          }
        },
        fail: function (err) {
          wx.showToast({
            title: "上传失败",
            icon: "none",
            duration: 2000
          })
        },
        complete: function (result) {
          console.log(result.errMsg)
        }
      })
    }
  },
  bindChange:function(e) {
    debugger
    const res = this.data.sex_list[e.detail.value]
    this.setData({
      sex: res.sex_name
    })
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

	}
})