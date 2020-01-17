// certification/pages/masterCertification/case.js
const WXAPI = require('../../wxapi/main');
const app = getApp();
let globalData = app.globalData;
let len = 0; //图片最多能上传的数量
let mulImage = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    upload_picture_list: [],
    caseTitle: true,
    imgs: [],
    isShowPic: true, //是否显示上传照片的图片
    isShowPic1: true, //是否显示上传照片的图片
    date: '请输入日期',
    region: ['请输入地址', '', ''],
    caseList: [], //后台提交的列表
    form_info: '', //设置清空的
    modalName: ''
  },
  // 选择不同的选图方式
  chooseWxImage: function(type) {
    let that = this //获取上下文
    // console.log(that.data.upload_picture_list)  
    let upload_picture_list = that.data.upload_picture_list
    // console.log(upload_picture_list)
    //选择图片
    this.setData({
      isShowPic: false
    })
    if (that.data.upload_picture_list.length > 0) {
      len = that.data.upload_picture_list.length;
    };
    // if (that.data.upload_picture_list.length = 0) {
    //   this.setData({
    //     isShowPic1: true
    //   })
    // };
    if (that.data.upload_picture_list.length > 5) {
      wx.showToast({
        title: '图片最多6张',
        icon: 'none'
      })
      this.setData({
        isShowPic1: false
      })
      return;
    };

    //获取当前已有的图片
    wx.chooseImage({
      count: 6 - len, // 默认9，这里显示一次选择相册的图片数量 
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显
        let tempFiles = res.tempFiles
        console.log(tempFiles);
        //把选择的图片 添加到集合里
        upload_picture_list = upload_picture_list.concat(tempFiles);
        //显示
        that.setData({
          upload_picture_list: upload_picture_list,
        });
        that.uploadimage(tempFiles);
      },
      fail: function() {
        wx.showToast({
          title: '图片上传失败',
          icon: 'none'
        })
        return;
      }
    })
  },
  uploadpic: function() {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#a3a2a2",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })

  },
  // 点击删除图片
  deleteImg(e) {
    let upload_picture_list = this.data.upload_picture_list;
    let index = e.currentTarget.dataset.index;
    upload_picture_list.splice(index, 1);
    this.setData({
      upload_picture_list: upload_picture_list
    });

  },
  // 预览图片
  previewImg(e) {
    //获取当前图片的下标
    let index = e.currentTarget.dataset.index;
    //所有图片
    let imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
  },
  // 点击上传图片
  uploadimage: function(tempFiles) {
    // console.log(this.data.upload_picture_list.length);
    var that = this;
    for (let i = 0; i < tempFiles.length; i++) {
      let filterName = {
        "filterName": "technology"
      }
      wx.uploadFile({
        url: 'http://10.20.11.252:8080/wumei-server/file/imageUpload',
        header: {
          'content-type': 'multipart/form-data'
        },
        filePath: tempFiles[i].path,
        formData: filterName,
        name: 'file', //name是后台接收到字段
        success: function(res) {
          let str = JSON.parse(res.data);
          if (str.code == 200) {
            mulImage.push(str.data);
          } else {
            wx.showToast({
              title: str.message,
            })
          }

        },
        fail: function(res) {
          console.log(res)
        }
      })
    }
  },
  //  表单提交事件
  fromSubmit: function(e) {
    let that = this;
    setTimeout(function() {
      let master = e.detail.value;
      console.log(mulImage.length)
      console.log(master.caseName)
      console.log(master.caseIntroduce)
      console.log(master.caseCity)
      console.log(master.caseTime)
      console.log(master.caseIntroduce)
      console.log(master.caseCity)
      console.log(master.imageUrlArray)
      if (mulImage.length == 0 && !master.caseName && !master.caseIntroduce && master.caseCity.length == 0 && !master.caseTime) {
        console.log('失败进来')

      } else {
        if (mulImage.length == 0) {
          wx.showToast({
            title: '案例图片不能为空',
            icon: 'none',
            image: '',
            duration: 1000
          })
          return;
        } else if (master.caseName.length == 0) {
          wx.showToast({
            title: '案例名称不能为空',
            icon: 'none',
            image: '',
            duration: 1000
          })
          return;
        } else if (!master.caseTime) {
          wx.showToast({
            title: '日期还没有选择',
            icon: 'none',
            duration: 1000
          })
          return
        } else if (master.caseCity.length == 0) {
          wx.showToast({
            title: '请选择服务城市',
            icon: 'none',
            duration: 1000
          })
          return
        } else if (!master.caseIntroduce) {
          wx.showToast({
            title: '案例介绍必填',
            icon: 'none',
            duration: 1000
          })
          return
        }
        master.technologyId = wx.getStorageSync('token').userId
        master.caseCity = master.caseCity[0] + master.caseCity[1] + master.caseCity[2];
        master.imageUrlArray = mulImage;
        let caseList = that.data.caseList;
        caseList.push(master);
        that.setData({
          caseList: caseList,
          showTitle: false,
          form_info: '',
          upload_picture_list: [],
          isShowPic: true,
          date: '请输入日期',
          region: ['请输入地址', '', ''],
        });
        mulImage = []
      }
    }, 1500)
  },
  fromReset: function(e) {
    wx.navigateBack({
      delta: 2
    })
  },
  showModal(e) {
  let  that=this;
    setTimeout(function() {
      that.setData({
        modalName: e.currentTarget.dataset.target
      })
    }, 1800)
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  submitInfo(e) {
    let that = this;
    wx.showLoading({
      title: '正在为您认证',
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 2000)
    globalData.addTechnology.caseList = that.data.caseList;
    let data = globalData.addTechnology;
    data.userId = wx.getStorageSync('token').userId;
    WXAPI.addTechnology(data).then(res => {
      console.log(res)
      if (res.code == 200) {
        console.log('sdfbf');
        wx.setStorageSync("token", res.data)
        wx.navigateTo({
          url: '/certification/pages/masterCertification/finnish',
        })
      } else {
        wx.showToast({
          icon: "none",
          title: res.message,
        })
      }
    })
  },


  // 选择器
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})